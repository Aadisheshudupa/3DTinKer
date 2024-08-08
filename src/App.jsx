import { Canvas } from '@react-three/fiber';
import './App.css';
import CustomGizmoHelper from './CustomGizmoHelper.jsx';
import PerspectiveCameraWithHelper from './PerspectiveCameraWithHelper.jsx';
import { Environment, Stats } from '@react-three/drei';
import { useState, useRef, useEffect } from 'react';
import ColorPickerGrid from './ColorPicker.jsx';
import OrthographicCameraWithHelper from './OrthographicCameraWithHelper.jsx';
import CameraNamesList from './CameraNamesList.jsx';
import UiForFirebase from './uiForFirebase.jsx';
import BackgroundColorWithGrid from './BackgroundColorWithGrid.jsx';
import { globalShadow, modelPath } from './atoms.js';
import { useAtom } from 'jotai';
import LightControls from './LightControls.jsx';
import Lights from './Lights.jsx';
import { cameraNames } from './atoms.js';
import CameraManager from './CameraManager.jsx';
import AddCameraUI from './addCameraUI.jsx';
import LightNamesList from './lightNamesList.jsx';
import TransformControls from './TransformControls.jsx';
import KeyframesContainer from './KeyframesContainer.jsx';
import Model from './Model.jsx';
import playImage from './assets/cssIcons/playButtonWhite.png';
import pauseImage from './assets/cssIcons/pauseButtonWhite.png';
import loopActiveImage from './assets/cssIcons/loopActive.png';
import loopInactiveImage from './assets/cssIcons/loopInactive.svg';
import { ExportTrigger } from './atoms.js';
import Joyride, { STATUS } from 'react-joyride';
import { ModelLoaded } from './atoms.js';
import { inputModelUrl } from './atoms.js';
import { XR, createXRStore, useXR } from '@react-three/xr'
import vricon from './assets/cssIcons/VR.svg'
const store = createXRStore()

function XRSessionListener({ onSessionEnd }) {
  const { session } = useXR();
  
  useEffect(() => {
    if (session) {
      session.addEventListener('end', onSessionEnd);
    }
    return () => {
      if (session) {
        session.removeEventListener('end', onSessionEnd);
      }
    };
  }, [session, onSessionEnd]);

  return null;
}

export default function App() {
  const [shadows, setShadows] = useAtom(globalShadow);
  const [ModelPath, setModelPath] = useAtom(modelPath);
  const [exportTrigger, setExportTrigger] = useAtom(ExportTrigger);
  const [importFile, setImportFile] = useState(null);
  const [animationControl, setAnimationControl] = useState('pause');
  const [loop, setLoop] = useState(false);
  const [availableAnimations, setAvailableAnimations] = useState([]);
  const [selectedAnimations, setSelectedAnimations] = useState([]);
  const [customAnimations, setCustomAnimations] = useState({});
  const modelRef = useRef(null);
  const [selectedObject, setSelectedObject] = useState(null);
  const [selectedObjectState, setSelectedObjectState] = useState(null);
  const [showInfoPanel, setShowInfoPanel] = useState(false);
  const [showInfoPanel2D, setShowInfoPanel2D] = useState(false);
  const sceneRef = useRef();
  const selectedObjectRef = useRef(null);
  const [highlightedMesh, setHighlightedMesh] = useState(null);
  const [isExploding, setIsExploding] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [modelLoaded, setModelLoaded] = useAtom(inputModelUrl);
  const [steps, setSteps] = useState([]);
  const [canvasKey, setCanvasKey] = useState(0);
  
  
 
  const togglePlayPause = () => {
    setAnimationControl((prev) => (prev === 'play' ? 'pause' : 'play'));
  };

  const handleAnimationSelect = (animationName) => {
    setSelectedAnimations((prev) => {
      if (prev.includes(animationName)) {
        return prev.filter((name) => name !== animationName);
      } else {
        return [...prev, animationName];
      }
    });
  };

  const handleAddNewAnimation = (newAnimation) => {
    setAvailableAnimations((prev) => [...prev, newAnimation.name]);
    setCustomAnimations((prev) => ({
      ...prev,
      [newAnimation.name]: newAnimation,
    }));
  };

  const handleObjectClick = (mesh) => {
    setSelectedObject(mesh);
    setSelectedObjectState(mesh.uuid);
    setShowInfoPanel(true);
    setShowInfoPanel2D(true);
  };

  useEffect(() => {
    setSteps([
      {
        target: '.transform', // CSS class of the UiForFirebase component
        content: 'To change the Transform Controls',
        disableBeacon: true,
      },
      {
        target: '.back', // CSS class of the UiForFirebase component
        content: 'To Change the background colour',
        disableBeacon: true,
      },
    ]);
  }, []);

  const handleJoyrideCallback = (data) => {
    const { status, type } = data;
    const finishedStatuses = [STATUS.FINISHED, STATUS.SKIPPED];

    console.log(type, data);
  };

  const handleExitAR = () => {
    store.exitAR();
    setCanvasKey((prevKey) => prevKey + 1); // Update the key to force re-render
  };

  const handleSessionEnd = () => {
    console.log("VR session ended");
    setCanvasKey((prevKey) => prevKey + 1); // Update the key to force re-render
  };

  return (
    <>
      <UiForFirebase />
      <button onClick={() => store.enterAR()} style={{position:'absolute',zIndex:'200',left:'35%',left: '160px', top: '7px',borderRadius:'10px',height:'45px',backgroundColor: 'rgba(0,0,0,0.5)'}}>      <img src={vricon} className="icon" alt="My Icon" style={{fill:"white"}} />     </button>
      <div className="transform" style={{ position: 'absolute', top: '90%', width: '200px', height: '50px' }}> </div>
      <div className="back" style={{ position: 'absolute', top: '100px', left: '20px', width: '50px', height: '50px' }}> </div>
      {modelLoaded &&
        <Joyride
          callback={handleJoyrideCallback}
          scrollToFirstStep
          showSkipButton
          steps={steps}
        />}
      <KeyframesContainer
        togglePlayPause={togglePlayPause}
        animationControl={animationControl}
        playImage={playImage}
        pauseImage={pauseImage}
        loop={loop}
        setLoop={setLoop}
        loopActiveImage={loopActiveImage}
        loopInactiveImage={loopInactiveImage}
        availableAnimations={availableAnimations}
        selectedAnimations={selectedAnimations}
        handleAnimationSelect={handleAnimationSelect}
        onAddNewAnimation={handleAddNewAnimation}
      />
      <TransformControls />
      <ColorPickerGrid />
      <CameraNamesList position={'absolute'} />
      <LightNamesList position={'absolute'} />
      <Canvas key={canvasKey} camera={{ position: [0, 3, 10] }} shadows={shadows}>
        <XR store={store}>
          <XRSessionListener onSessionEnd={handleSessionEnd} />
          <Lights />
          <Model
            ref={modelRef}
            setExportTrigger={setExportTrigger}
            importFile={ModelPath}
            animationControl={animationControl}
            loop={loop}
            selectedAnimations={selectedAnimations}
            customAnimations={customAnimations}
            setAvailableAnimations={setAvailableAnimations}
            onObjectClick={handleObjectClick}
            highlightedMesh={highlightedMesh}
          />
          <ambientLight />
          <CameraManager />
          <BackgroundColorWithGrid />
          <Stats />
        </XR>
        <CustomGizmoHelper />
      </Canvas>
    </>
  );
}
