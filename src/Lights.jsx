//aDDING LIGHTS IN THE SCENE
import React, { useRef, useEffect } from 'react';
import { DirectionalLightHelper, PointLightHelper, SpotLightHelper } from 'three';
import {light} from './atoms.js'
import { expandedLight } from './atoms.js';
import { globalExposures } from './atoms.js';
import { useAtom } from 'jotai';
import { Helper } from '@react-three/drei';
import { TransformControls } from '@react-three/drei';
import DirectionalLights from './DirectionalLights.jsx';
import PointLights from './PointLights.jsx';
import SpotLights from './SpotLights.jsx';

const Lights = () => {
  const lightRefs = useRef({});
  const [lights,setLights] = useAtom(light);
  const [expandedLightId,setExpandedLightId] = useAtom(expandedLight);
  const [globalExposure,setGlobalExposure] = useAtom(globalExposures);

  useEffect(() => {
    lights.forEach((light) => {
      if (!lightRefs.current[light.id]) {
        lightRefs.current[light.id] = React.createRef();
      }
    });
    console.log(lightRefs);

  }, [lights]);

  return (
    <>
      {lights.map((light) => {
        const ref = lightRefs.current[light.id];
        switch (light.type) {
          case 'directional':
            return (
              <DirectionalLights light={light}/>
            );
          case 'point':
            return (
              <PointLights light={light}/>
            );
          case 'spot':
            return (
              <SpotLights light={light}/>
            );
          default:
            return null;
        }
      })}
    </>
  );
};

export default Lights;