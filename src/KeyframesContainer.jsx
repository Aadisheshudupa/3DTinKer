import React, { useState } from 'react';
import Draggable from 'react-draggable';
import ThreeDIcons from './ThreeDIcons';
import { useAtom } from 'jotai';
import { toggleDropAction, dropdownCam, dropdownLight, GroupRef } from './atoms';

const KeyframesContainer = ({
    togglePlayPause,
    animationControl,
    playImage,
    pauseImage,
    loop,
    setLoop,
    loopActiveImage,
    loopInactiveImage,
    availableAnimations,
    selectedAnimations,
    handleAnimationSelect,
    onAddNewAnimation,
    recordingEnabled,
    setRecordingEnabled
}) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [newAnimation, setNewAnimation] = useState({
        name: '',
        initposition: [0, 0, 0],
        initscale: [1, 1, 1],
        initrotation: [0, 0, 0],
        position: [0, 0, 0],
        scale: [1, 1, 1],
        rotation: [0, 0, 0],
        duration: 5
    });
    const [drop, setDrop] = useAtom(toggleDropAction);
    const [dropdownVisible, setDropdownVisible] = useAtom(dropdownCam);
    const [dropLight, setDropLight] = useAtom(dropdownLight);
    const [groupRef, setGroupRefState] = useAtom(GroupRef);

    const radToDeg = (radians) => radians * (180 / Math.PI);

    const handleButtonClick = () => {
        if (groupRef && groupRef.current) {
            const { position, rotation, scale } = groupRef.current;

            const rotationInDegrees = [
                radToDeg(rotation.x),
                radToDeg(rotation.y),
                radToDeg(rotation.z)
            ];

            setNewAnimation(prevState => ({
                ...prevState,
                initposition: [position.x, position.y, position.z],
                initscale: [scale.x, scale.y, scale.z],
                initrotation: rotationInDegrees,
            }));

            console.log('Position:', position);
            console.log('Rotation (degrees):', rotationInDegrees);
            console.log('Scale:', scale);
        }
    };

    const handleButtonClickfinal = () => {
        if (groupRef && groupRef.current) {
            const { position, rotation, scale } = groupRef.current;

            const rotationInDegrees = [
                radToDeg(rotation.x),
                radToDeg(rotation.y),
                radToDeg(rotation.z)
            ];

            setNewAnimation(prevState => ({
                ...prevState,
                position: [position.x, position.y, position.z],
                scale: [scale.x, scale.y, scale.z],
                rotation: rotationInDegrees,
            }));

            console.log('Position:', position);
            console.log('Rotation (degrees):', rotationInDegrees);
            console.log('Scale:', scale);
        }
    };

    const handleInputChange = (e, type, index) => {
        const value = type === 'name' ? e.target.value : parseFloat(e.target.value);
        setNewAnimation(prev => {
            const updated = { ...prev };
            if (type === 'position' || type === 'scale' || type === 'rotation' || type === 'initposition' || type === 'initscale' || type === 'initrotation') {
                updated[type][index] = value;
            } else {
                updated[type] = value;
            }
            return updated;
        });
    };

    const toggle = () => {
        if (drop) {
            setDrop(false);
        } else {
            setDrop(true);
            if (dropdownVisible) {
                setDropdownVisible(false);
            }
            if (dropLight) {
                setDropLight(false);
            }
        }
    };

    const handleAddAnimation = () => {
        onAddNewAnimation(newAnimation);
        setIsExpanded(false);
    };

    const handleRecordingToggle = (e) => {
        setRecordingEnabled(prevState => !prevState);
    };

    return (
        <div className={`input-container ${isExpanded ? 'expanded' : 'collapsed'}`}>
            <div onClick={toggle} className="tooltip-container" style={{ position: 'absolute', left: '94%', zIndex: '1', top: '22%' }}>
                <ThreeDIcons path={'./action.glb'} key={"1"} />
                <span className="tooltip">Action</span>
            </div>
            {drop && (
                <div style={{
                    position: 'absolute', left: '86%', zIndex: '1', top: '35%',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)', color: 'white', padding: '10px',
                    maxHeight: '300px', overflowY: 'auto', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                    borderRadius: '10px', scrollbarWidth: 'none', backdropFilter: 'blur(4px)'
                }}>
                    <button className="closeButton" onClick={() => setIsExpanded(!isExpanded)}>
                        {isExpanded ? 'Close' : (
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" className='icon'>
                                <path d="M19 11h-6V5a1 1 0 0 0-2 0v6H5a1 1 0 0 0 0 2h6v6a1 1 0 0 0 2 0v-6h6a1 1 0 0 0 0-2z" />
                            </svg>
                        )}
                    </button>
                    <div className="recording-button-container">
                    <button 
                        className={`recording-button ${recordingEnabled ? 'enabled' : 'disabled'}`} 
                        onClick={handleRecordingToggle}
                    >
                        {recordingEnabled ? 'Disable Recording' : 'Enable Recording'}
                    </button>
                    <span className="tooltip">Toggle to enable or disable recording</span>
                </div>
                    <div className="buttonFunctionalities">
                        <div className="playLoopButtons">
                            <button onClick={togglePlayPause} className="playButton">
                                <img src={animationControl === 'play' ? pauseImage : playImage} alt={animationControl === 'play' ? 'Pause' : 'Play'} style={{ height: '12px' }} />
                            </button>
                            <button onClick={() => setLoop(!loop)} className="loopButton">
                                <img src={loop ? loopActiveImage : loopInactiveImage} alt={loop ? 'Loop: On' : 'Loop: Off'} style={{ width: '18px', height: '18px' }} className='icon' />
                            </button>
                        </div>
                    </div>

                    <div className="animation-selector">
                        <div className="animationsListTitle">
                        </div>
                        <div className="animation-list">
                            {availableAnimations.map(animation => (
                                <label key={animation} className="animationsCollection">
                                    <input
                                        type="checkbox"
                                        checked={selectedAnimations.includes(animation)}
                                        onChange={() => handleAnimationSelect(animation)}
                                    />
                                    <span></span> {animation}
                                </label>
                            ))}
                        </div>
                    </div>

                    {isExpanded && drop && (
                        <div>
                            <div className="expanded-content" style={{ fontSize: '13px' }}>
                                <div className="inputs">
                                    <label>
                                        Name:
                                        <input
                                            type="text"
                                            placeholder="Name"
                                            value={newAnimation.name}
                                            onChange={(e) => handleInputChange(e, 'name')}
                                            style={{ width: '160px', background: 'rgba(1,1,1,0.4)', borderRadius: '5px', border: 'none' }}
                                        />
                                    </label>
                                    <button onClick={handleButtonClick}>Mark Initial Keyframe</button>
                                    <label>
                                        Initial Position:
                                        <div className="input-group">
                                            <input
                                                type='number'
                                                placeholder="X"
                                                value={newAnimation.initposition[0]}
                                                onChange={(e) => handleInputChange(e, 'initposition', 0)}
                                                style={{ width: '160px', background: 'rgba(1,1,1,0.4)', borderRadius: '5px', border: 'none' }}
                                            />
                                            <input
                                                type="number"
                                                placeholder="Y"
                                                value={newAnimation.initposition[1]}
                                                onChange={(e) => handleInputChange(e, 'initposition', 1)}
                                                style={{ width: '160px', background: 'rgba(1,1,1,0.4)', borderRadius: '5px', border: 'none' }}
                                            />
                                            <input
                                                type="number"
                                                placeholder="Z"
                                                value={newAnimation.initposition[2]}
                                                onChange={(e) => handleInputChange(e, 'initposition', 2)}
                                                style={{ width: '160px', background: 'rgba(1,1,1,0.4)', borderRadius: '5px', border: 'none' }}
                                            />
                                        </div>
                                    </label>
                                    <label>
                                        Initial Scale:
                                        <div className="input-group">
                                            <input
                                                type="number"
                                                placeholder="X"
                                                value={newAnimation.initscale[0]}
                                                onChange={(e) => handleInputChange(e, 'initscale', 0)}
                                                style={{ width: '160px', background: 'rgba(1,1,1,0.4)', borderRadius: '5px', border: 'none' }}
                                            />
                                            <input
                                                type="number"
                                                placeholder="Y"
                                                value={newAnimation.initscale[1]}
                                                onChange={(e) => handleInputChange(e, 'initscale', 1)}
                                                style={{ width: '160px', background: 'rgba(1,1,1,0.4)', borderRadius: '5px', border: 'none' }}
                                            />
                                            <input
                                                type="number"
                                                placeholder="Z"
                                                value={newAnimation.initscale[2]}
                                                onChange={(e) => handleInputChange(e, 'initscale', 2)}
                                                style={{ width: '160px', background: 'rgba(1,1,1,0.4)', borderRadius: '5px', border: 'none' }}
                                            />
                                        </div>
                                    </label>
                                    <label>
                                        Initial Rotation:
                                        <div className="input-group">
                                            <input
                                                type="number"
                                                placeholder="X"
                                                value={newAnimation.initrotation[0]}
                                                onChange={(e) => handleInputChange(e, 'initrotation', 0)}
                                                style={{ width: '160px', background: 'rgba(1,1,1,0.4)', borderRadius: '5px', border: 'none' }}
                                            />
                                            <input
                                                type="number"
                                                placeholder="Y"
                                                value={newAnimation.initrotation[1]}
                                                onChange={(e) => handleInputChange(e, 'initrotation', 1)}
                                                style={{ width: '160px', background: 'rgba(1,1,1,0.4)', borderRadius: '5px', border: 'none' }}
                                            />
                                            <input
                                                type="number"
                                                placeholder="Z"
                                                value={newAnimation.initrotation[2]}
                                                onChange={(e) => handleInputChange(e, 'initrotation', 2)}
                                                style={{ width: '160px', background: 'rgba(1,1,1,0.4)', borderRadius: '5px', border: 'none' }}
                                            />
                                        </div>
                                    </label>

                                    <button onClick={handleButtonClickfinal}>Mark Final Keyframe</button>

                                    <label>
                                        Position:
                                        <div className="input-group">
                                            <input
                                                type="number"
                                                placeholder="X"
                                                value={newAnimation.position[0]}
                                                onChange={(e) => handleInputChange(e, 'position', 0)}
                                                style={{ width: '160px', background: 'rgba(1,1,1,0.4)', borderRadius: '5px', border: 'none' }}
                                            />
                                            <input
                                                type="number"
                                                placeholder="Y"
                                                value={newAnimation.position[1]}
                                                onChange={(e) => handleInputChange(e, 'position', 1)}
                                                style={{ width: '160px', background: 'rgba(1,1,1,0.4)', borderRadius: '5px', border: 'none' }}
                                            />
                                            <input
                                                type="number"
                                                placeholder="Z"
                                                value={newAnimation.position[2]}
                                                onChange={(e) => handleInputChange(e, 'position', 2)}
                                                style={{ width: '160px', background: 'rgba(1,1,1,0.4)', borderRadius: '5px', border: 'none' }}
                                            />
                                        </div>
                                    </label>
                                    <label>
                                        Scale:
                                        <div className="input-group">
                                            <input
                                                type="number"
                                                placeholder="X"
                                                value={newAnimation.scale[0]}
                                                onChange={(e) => handleInputChange(e, 'scale', 0)}
                                                style={{ width: '160px', background: 'rgba(1,1,1,0.4)', borderRadius: '5px', border: 'none' }}
                                            />
                                            <input
                                                type="number"
                                                placeholder="Y"
                                                value={newAnimation.scale[1]}
                                                onChange={(e) => handleInputChange(e, 'scale', 1)}
                                                style={{ width: '160px', background: 'rgba(1,1,1,0.4)', borderRadius: '5px', border: 'none' }}
                                            />
                                            <input
                                                type="number"
                                                placeholder="Z"
                                                value={newAnimation.scale[2]}
                                                onChange={(e) => handleInputChange(e, 'scale', 2)}
                                                style={{ width: '160px', background: 'rgba(1,1,1,0.4)', borderRadius: '5px', border: 'none' }}
                                            />
                                        </div>
                                    </label>
                                    <label>
                                        Rotation:
                                        <div className="input-group">
                                            <input
                                                type="number"
                                                placeholder="X"
                                                value={newAnimation.rotation[0]}
                                                onChange={(e) => handleInputChange(e, 'rotation', 0)}
                                                style={{ width: '160px', background: 'rgba(1,1,1,0.4)', borderRadius: '5px', border: 'none' }}
                                            />
                                            <input
                                                type="number"
                                                placeholder="Y"
                                                value={newAnimation.rotation[1]}
                                                onChange={(e) => handleInputChange(e, 'rotation', 1)}
                                                style={{ width: '160px', background: 'rgba(1,1,1,0.4)', borderRadius: '5px', border: 'none' }}
                                            />
                                            <input
                                                type="number"
                                                placeholder="Z"
                                                value={newAnimation.rotation[2]}
                                                onChange={(e) => handleInputChange(e, 'rotation', 2)}
                                                style={{ width: '160px', background: 'rgba(1,1,1,0.4)', borderRadius: '5px', border: 'none' }}
                                            />
                                        </div>
                                    </label>
                                    <label>
                                        Duration:
                                        <input
                                            type="number"
                                            placeholder="Duration"
                                            value={newAnimation.duration}
                                            onChange={(e) => handleInputChange(e, 'duration')}
                                            style={{ width: '160px', background: 'rgba(1,1,1,0.4)', borderRadius: '5px', border: 'none' }}
                                        />
                                    </label>
                                    <button onClick={handleAddAnimation}>Add Animation</button>

                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default KeyframesContainer;
