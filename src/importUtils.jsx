import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
export const importModel = (modelPath, onLoad) => {
    if(modelPath)
    {
    const loader = new GLTFLoader();
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.7/');
    loader.setDRACOLoader(dracoLoader);

    loader.load(
        modelPath,
        (gltf) => {
            onLoad(gltf);
        },
        undefined,
        (error) => {
            console.error('An error occurred while loading the model:', error);
        }
    );
}
};
