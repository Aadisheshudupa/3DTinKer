const handleExport = (model, gltf, existingAnimations, customAnimations,InputModelUrl,Exports,ToCloud,setToCloud) => {

    const allAnimations = [
        ...existingAnimations,
        ...Object.keys(customAnimations).map(name => {
            const anim = customAnimations[name];
            return new THREE.AnimationClip(
                name,
                anim.duration,
                [
                    new THREE.VectorKeyframeTrack(
                        'myModel.position',
                        [0, anim.duration],
                        [0, 0, 0, ...anim.position]
                    ),
                    new THREE.VectorKeyframeTrack(
                        'myModel.scale',
                        [0, anim.duration],
                        [1, 1, 1, ...anim.scale]
                    ),
                    new THREE.QuaternionKeyframeTrack(
                        'myModel.quaternion',
                        [0, anim.duration],
                        [
                            0, 0, 0, 1,
                            ...new THREE.Quaternion().setFromEuler(new THREE.Euler(...anim.rotation.map(r => r * (Math.PI / 180)))).toArray()
                        ]
                    )
                ]
            );
        })
    ];

    const gltfExporter = new GLTFExporter();

    const options = {
        binary: true,
        animations: allAnimations,
    };

    const link = document.createElement('a');
    link.style.display = 'none';
    document.body.appendChild(link);
    function save(blob, filename) {
        link.href = URL.createObjectURL(blob);
        link.download = filename;
        link.click();
    }
    function saveString(text, filename) {
        save(new Blob([text], { type: 'text/plain' }), filename);
    }
    function saveArrayBuffer(buffer, filename) {
        save(new Blob([buffer], { type: 'application/octet-stream' }), filename);
        
    }
    

    // Create a new array to hold the children that we want to export
    const objectsToExport = [];

    // Traverse the scene and add only the model to the array
    scene.traverse((child) => {
        if (child === model) {
            objectsToExport.push(child);
        }
    });

    // Create a new scene for export and add only the model
    const exportScene = new THREE.Scene();
    objectsToExport.forEach((object) => {
        exportScene.add(object);
    });
    
    gltfExporter.parse(exportScene, function (result) {
        if (result instanceof ArrayBuffer) {
            saveArrayBuffer(result,InputModelUrl+'.glb');
        } else {
            const output = JSON.stringify(result, null, 2);
            console.log(output);
            saveString(output, InputModelUrl+'.glb');
        }
    }, function (error) {
        console.error('An error occurred during the export:', error);
    }, options);
};
