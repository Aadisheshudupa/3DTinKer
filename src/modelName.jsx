import React, { useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { modelUrls, inputModelUrl, modelPath } from './atoms';

const MySwal = withReactContent(Swal);

export function ModelName() {
  const [isUrlUnique, setIsUrlUnique] = useState(true); // State to track if the URL is unique
  const [ModelUrls, setModelUrls] = useAtom(modelUrls);
  const [InputModelUrl, setInputModelUrl] = useAtom(inputModelUrl);
  const [ModelPath, setModelPath] = useAtom(modelPath);
  const [shouldShowModal, setShouldShowModal] = useState(false);

  useEffect(() => {
    // Open the modal when the component mounts
    if (!InputModelUrl) {
      openInputModal();
    }
  }, []);

  useEffect(() => {
    // Open the modal when the ModelPath changes
    if (ModelPath) {
      setShouldShowModal(true);
    }
  }, [ModelPath]);

  useEffect(() => {
    // Check if the input URL is already in modelUrls
    const urlExists = ModelUrls.some(model => model.name === InputModelUrl + '.glb');
    setIsUrlUnique(!urlExists);
  }, [InputModelUrl, ModelUrls]);

  useEffect(() => {
    if (shouldShowModal) {
      openInputModal();
    }
  }, [shouldShowModal]);

  const handleInputChange = (value) => {
    setInputModelUrl(value);
  };

  const openInputModal = () => {
    MySwal.fire({
      title: 'Enter Model name',
      input: 'text',
      inputValue: InputModelUrl,
      inputPlaceholder: 'Enter a new model name',
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) {
          return 'You need to write something!';
        }
        const urlExists = ModelUrls.some(model => model.name === value + '.glb');
        if (urlExists) {
          return 'This model name is taken and will be replaced';
        }
        return null;
      }
    }).then(result => {
      if (result.isConfirmed) {
        handleInputChange(result.value);
        setIsUrlUnique(true);
      }
      setShouldShowModal(false); // Reset modal show flag
    });
  };

  return (
    <div style={{ float: 'left', padding: '5px' }}>
      {!isUrlUnique && <p style={{ color: 'red' }}>This model name is taken and will be replaced</p>}
    </div>
  );
}
