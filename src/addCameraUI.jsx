//ui TO ADD CAMERA TO THE SCENE

import React, { useState, useEffect, useRef } from 'react';
import { useAtom } from 'jotai';
import { cameraNames, newCamera } from './atoms.js';

export default function AddCameraUI() {
  const [cameras, setCameras] = useAtom(cameraNames);
  const [newCam, setNewCam] = useAtom(newCamera);
  const containerRef = useRef(null);

  const addPerspectiveCamera = () => {
    const name = `Camera${Object.keys(cameras).length + 1}`;
    const newCameras = { ...cameras, [name]: [true, 'perspective', name] };
    setCameras(newCameras);
    setNewCam(false);
  };

  const addOrthographicCamera = () => {
    const name = `Camera${Object.keys(cameras).length + 1}`;
    const newCameras = { ...cameras, [name]: [true, 'ortho', name] };
    setCameras(newCameras);
    setNewCam(false);
  };

  const deleteCamera = (id) => {
    const newCameras = { ...cameras };
    delete newCameras[id];
    setCameras(newCameras);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setNewCam(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [containerRef]);

  useEffect(() => {
    Object.keys(cameras).forEach((camera) => {
      console.log(cameras[camera][1]);
    });
  }, [cameras]);

  return (
    <div ref={containerRef} style={{ position: 'absolute', zIndex: 1, top: '40%', left: '40%', border: '10px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
      <button onClick={addPerspectiveCamera}>Add Perspective Camera</button>
      <button onClick={addOrthographicCamera}>Add Orthographic Camera</button>
    </div>
  );
}
