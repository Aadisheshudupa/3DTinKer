import React from 'react';
import {modelPath} from './atoms';
import { exports } from './atoms';
import { toCloud } from './atoms';
import { useAtom } from 'jotai';

function LocalImport() {
    const [ModelPath,setModelPath]=useAtom(modelPath);
    const [Exports,setExport]=useAtom(exports);
    const [Tocloud,setToCloud]=useAtom(toCloud);

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (file) {

            const url = URL.createObjectURL(file);
            setModelPath(url);
            console.log("Original File Size: "+file.size);
            setExport(false);
            setToCloud(false);         
        }
    };
    return (
        <>
                            <input type="file" accept=".glb,.gltf" onChange={handleFileUpload} style={{ display: 'none' }} id="importFileInput" />
                            <div onClick={() => document.getElementById('importFileInput').click()} className="importButton" style={{padding:'10px'}}>Import local</div>
                            </>
    );
}

export default LocalImport;