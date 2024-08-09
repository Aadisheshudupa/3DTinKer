import { useState,useEffect } from "react";
import LocalImport from "./localImport";
import Dropdown from "./dropdown";
import { ModelName } from "./modelName";
import { exports } from "./atoms";
import { toCloud } from "./atoms";
import { useAtom } from "jotai";
import { modelPath } from "./atoms";
import { inputModelUrl } from "./atoms";
import { ExportTrigger } from "./atoms";
import Draggable from 'react-draggable';
import Joyride, { STATUS } from 'react-joyride';

export default function UiForFirebase() {
   const [Exports, setExport] = useAtom(exports);
   const [Tocloud, setToCloud] = useAtom(toCloud);
   const [InputModelUrl, setInputModelUrl] = useAtom(inputModelUrl);
   const [ModelPath, setModelPath] = useAtom(modelPath);
   const [exportTrigger, setExportTrigger] = useAtom(ExportTrigger);
   const [steps,setSteps] = useState([])
   const handleJoyrideCallback = (data) => {
      const { status, type } = data;
      const finishedStatuses = [STATUS.FINISHED, STATUS.SKIPPED];
  
      console.log(type, data);
    };
   useEffect(() => {
      setSteps([
        {
          target: '.menu', // CSS class of the UiForFirebase component
          content: 'Click here to import and export',
          disableBeacon: true,
        },
      ]);
  
    }, []);

   return (
      <>      <Joyride
          callback={handleJoyrideCallback}
          steps={steps}
          styles={{
            options: {
              zIndex: 10000,
            },
          }}
        />
         
         <div style={{position: 'absolute', zIndex: '1', left: '100px', top: '7px', backgroundColor: 'rgba(0,0,0,0.5)', color: 'white',borderRadius:'10px' }}>
            <div className="menu">
               <div className="menu-item">
                  <span>File</span>
                  <div className="dropdown">
                     <div className="dropdown-item">
                        <span>Import</span>
                        <div className="nested-dropdown">
                           <LocalImport />
                           <Dropdown/>
                        </div>
                     </div>
                     <div className="dropdown-item">
                        <span>Export</span>
                        <div className="nested-dropdown">
                           {
                              <div onClick={() => { setExport(true) }} style={{padding:'10px'}} className='hover-button'>
                                 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="download" className='icon'><g><g><rect width="16" height="2" x="4" y="18" rx="1" ry="1"></rect><rect width="4" height="2" x="3" y="17" rx="1" ry="1" transform="rotate(-90 5 18)"></rect><rect width="4" height="2" x="17" y="17" rx="1" ry="1" transform="rotate(-90 19 18)"></rect><path d="M12 15a1 1 0 0 1-.58-.18l-4-2.82a1 1 0 0 1-.24-1.39 1 1 0 0 1 1.4-.24L12 12.76l3.4-2.56a1 1 0 0 1 1.2 1.6l-4 3a1 1 0 0 1-.6.2z"></path><path d="M12 13a1 1 0 0 1-1-1V4a1 1 0 0 1 2 0v8a1 1 0 0 1-1 1z"></path></g></g></svg>
                                 <span >Dowload</span>
                              </div>}
                           {
                              <div onClick={() => { setToCloud(true) }} style={{padding:'10px'}}>
                                 <img src="./firebase.png" alt="" style={{ width: '20px' }} />
                                 <span >Export to firebase</span>
                              </div>}
                        </div>
                     </div>
                  </div>
               </div>
            </div>
            {ModelPath && <ModelName />}
         </div>
      </>
   );
}
