import React from 'react';
import { ref, listAll, getDownloadURL } from 'firebase/storage';
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { useEffect } from 'react';
import Swal from 'sweetalert2';
import { useAtom } from 'jotai';
import { modelPath, exports, toCloud, modelUrls } from './atoms';

const firebaseConfig = {
  apiKey: "AIzaSyBUsbX0lNGuDwn_sDkqy4djrDJpdL3Qr5g",
  authDomain: "twojs-bdb50.firebaseapp.com",
  projectId: "twojs-bdb50",
  storageBucket: "twojs-bdb50.appspot.com",
  messagingSenderId: "667804797365",
  appId: "1:667804797365:web:0abfa39c37ece6f5bef1fc",
  measurementId: "G-MRTQCCHDXN"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

const listModels = async () => {
  const modelsRef = ref(storage, 'models'); // Change 'models' to your folder name
  try {
    const res = await listAll(modelsRef);
    const modelPromises = res.items.map(item => getDownloadURL(item).then(url => ({ name: item.name, url })));
    const models = await Promise.all(modelPromises);
    return models;
  } catch (error) {
    console.error("Error listing models:", error);
  }
};

function Dropdown() {
  const [ModelPath, setModelPath] = useAtom(modelPath);
  const [Exports, setExport] = useAtom(exports);
  const [Tocloud, setToCloud] = useAtom(toCloud);
  const [ModelUrls, setModelUrls] = useAtom(modelUrls);

  useEffect(() => {
    const fetchModels = async () => {
      const modelList = await listModels();
      setModelUrls(modelList);
    };

    fetchModels();
  }, []);

  const handleModelChange = (url) => {
    setModelPath(url);
    setExport(false);
    setToCloud(false);
  };

  const openDropdown = () => {
    Swal.fire({
      title: 'Select a model',
      input: 'select',
      inputOptions: ModelUrls.reduce((acc, model) => {
        acc[model.url] = model.name;
        return acc;
      }, {}),
      inputPlaceholder: 'Select a model',
      showCancelButton: true,
      inputValidator: (value) => {
        return new Promise((resolve) => {
          if (value) {
            handleModelChange(value);
            resolve();
          } else {
            resolve('You need to select a model');
          }
        });
      }
    });
  };

  return (
    <div className="model-selector" style={{padding:'10px'}}>
      <div onClick={openDropdown}>Import from Cloud</div>
    </div>
  );
}

export default Dropdown;
