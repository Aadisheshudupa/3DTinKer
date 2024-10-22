import React, { useState, useEffect, useRef } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';

function SceneComponent({ path, scale, hovered, setScale }) {
  const gltf = useLoader(GLTFLoader, path, (loader) => {
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.7/');
    loader.setDRACOLoader(dracoLoader);
  });

  const meshRef = useRef();
  const [rotationSpeed, setRotationSpeed] = useState(0.02);

  useEffect(() => {
    if (hovered) {
      setRotationSpeed(0.005);
      setScale(1.8);
    } else {
      setRotationSpeed(0.01);
      setScale(1.5);
    }
  }, [hovered, setScale]);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += rotationSpeed;
    }
  });

  return (
    <primitive object={gltf.scene} ref={meshRef} scale={[scale, scale, scale]} />
  );
}

function ThreeDIcons({ path }) {
  const [hovered, setHovered] = useState(false);
  const [scale, setScale] = useState(1.5);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const loader = new GLTFLoader();
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.7/');
    loader.setDRACOLoader(dracoLoader);

    loader.load(
      path,
      () => {
        setIsLoaded(true);
        console.log("hiii");
      },
      undefined,
      (error) => {
        console.error('Error loading model:', error);
      }
    );
  }, [path]);

  return (
    <>
      {isLoaded ? (
        <Canvas
          style={{ width: '80px', height: '80px', padding: '0', border: 'none', overflow: 'hidden' }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <ambientLight intensity={2} />
          <SceneComponent path={path} scale={scale} hovered={hovered} setScale={setScale} />
        </Canvas>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
}

export default ThreeDIcons;
