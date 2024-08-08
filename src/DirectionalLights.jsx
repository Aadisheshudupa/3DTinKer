import { useHelper } from '@react-three/drei';
import { DirectionalLightHelper } from 'three';
import './App.css';
import { useEffect, useRef } from 'react';
import { useAtom } from 'jotai';
import { TransformControls } from '@react-three/drei';
import { globalExposures } from './atoms';
import { useThree } from '@react-three/fiber';
import { selectedLight } from './atoms';
import { transformControlsAtom } from './atoms';
export default function DirectionalLights({ light }) {
  const lightRef = useRef();
  const [globalExposure, setGlobalExposure] = useAtom(globalExposures);
  const { camera, gl } = useThree();
  const helper = useHelper(light.active &&lightRef,DirectionalLightHelper);
  const [select,setSelect] = useAtom(selectedLight);
  const [transform,setTransform] = useAtom(transformControlsAtom);

  useEffect(()=>{
    console.log(light.id);
    console.log(select);
  },[select])
  return (
    <>
        {select && light.id == select.id && <TransformControls mode={transform} object={lightRef}/>}

      <directionalLight
        ref={lightRef}
        color={light.color}
        intensity={light.intensity * globalExposure}
        position={light.position}
        castShadow={light.shadows}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-near={0.5}
        shadow-camera-far={500}
        shadow-normalBias={1 - light.shadowIntensity}
      >
      </directionalLight>
    </>
  );
}
