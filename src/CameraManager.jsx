// CameraManager.jsx IT MANAGES THE ADDITION OF CAMERAS IN THE SCENE
import { useEffect, useState } from 'react';
import PerspectiveCameraWithHelper from './PerspectiveCameraWithHelper.jsx';
import OrthographicCameraWithHelper from './OrthographicCameraWithHelper.jsx';
import { cameraNames } from './atoms.js';
import { useAtom } from 'jotai';

export default function CameraManager() {
  const [cameras, setCameras] = useAtom(cameraNames);

  console.log(cameras);

  return (
    cameras && Object.keys(cameras).map(camera => (
      cameras[camera][1] === 'perspective' ? (
        <PerspectiveCameraWithHelper key={camera} name={camera} position={[0, 1.3, 0]} far={10} />
      ) : (
        <OrthographicCameraWithHelper key={camera} name={camera} position={[0, 0, 5]} far={16} left={-5} right={5} top={5} bottom={-5} />
      )
    ))
  );
}