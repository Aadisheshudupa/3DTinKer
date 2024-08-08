//CHANGE PROPERTIES OF SELECTED LIGHTS IN THE SCENE

import React from 'react';
import { useAtom } from 'jotai';
import { selectedLight } from './atoms';
import { light } from './atoms.js';
import { SketchPicker } from 'react-color';

const LightProperties = () => {
    const [lights, setLights] = useAtom(light);
    const [Light, setLight] = useAtom(selectedLight);
   
    const updateLight = (id, property, value) => {
        const updatedLights = lights.map(light =>
          light.id === id ? { ...light, [property]: value } : light
        );
        setLights(updatedLights);
        const temp = Light.id === id ? { ...Light, [property]: value } : Light;
        setLight(temp);
    };

    return (
        <div style={{ position: 'absolute', zIndex: 2, height: '240px', overflowY: 'auto', padding: '10px',borderRadius: '10px', backgroundColor:  'rgba(0, 0, 30, 0.5)',color:'white',top:'60%',left:'80%',scrollbarWidth:'none',backdropFilter: 'blur(5px)' }}>
            {Light && (
                <>
                    <div style={{ marginBottom: '10px' }}>
                        <SketchPicker
                            color={Light.color}
                            onChange={(color) => updateLight(Light.id, 'color', color.hex)}
                        />
                    </div>

                    <label style={{ display: 'block', marginBottom: '10px' }}>
                        Intensity
                        <input
                            type="range"
                            min="0"
                            max="10"
                            step="0.1"
                            value={Light.intensity}
                            onChange={(e) => updateLight(Light.id, 'intensity', parseFloat(e.target.value))}
                            aria-label="Intensity"
                        />
                    </label>
                    <label style={{ display: 'block', marginBottom: '10px' }}>
                        Shadow Intensity
                        <input
                            type="range"
                            min="0"
                            max="2"
                            step="0.1"
                            value={Light.shadowIntensity}
                            onChange={(e) => updateLight(Light.id, 'shadowIntensity', parseFloat(e.target.value))}
                            aria-label="Shadow Intensity"
                        />
                    </label>
                    {Light.type === 'spot' && (
                        <>
                            <label style={{ display: 'block', marginBottom: '10px' }}>
                                Angle
                                <input
                                    type="range"
                                    min="0"
                                    max={Math.PI}
                                    step="0.1"
                                    value={Light.angle}
                                    onChange={(e) => updateLight(Light.id, 'angle', parseFloat(e.target.value))}
                                    aria-label="Angle"
                                />
                            </label>
                            <label style={{ display: 'block', marginBottom: '10px' }}>
                                Penumbra
                                <input
                                    type="range"
                                    min="0"
                                    max="1"
                                    step="0.1"
                                    value={Light.penumbra}
                                    onChange={(e) => updateLight(Light.id, 'penumbra', parseFloat(e.target.value))}
                                    aria-label="Penumbra"
                                />
                            </label>
                            <label style={{ display: 'block', marginBottom: '10px' }}>
                                Distance
                                <input
                                    type="range"
                                    min="0"
                                    max="100"
                                    step="1"
                                    value={Light.distance}
                                    onChange={(e) => updateLight(Light.id, 'distance', parseFloat(e.target.value))}
                                    aria-label="Distance"
                                />
                            </label>
                        </>
                    )}
                    {Light.type === 'point' && (
                        <label style={{ display: 'block', marginBottom: '10px' }}>
                            Distance
                            <input
                                type="range"
                                min="0"
                                max="100"
                                step="1"
                                value={Light.distance}
                                onChange={(e) => updateLight(Light.id, 'distance', parseFloat(e.target.value))}
                                aria-label="Distance"
                            />
                        </label>
                    )}
                </>
            )}
        </div>
    );
};

export default LightProperties;
