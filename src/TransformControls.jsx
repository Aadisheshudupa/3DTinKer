//FOR TRANSFORM MOVE,ROTATE,SCALE

import { useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import { transformControlsAtom } from './atoms';

export default function TransformControls() {

    const [transform,setTransform] = useAtom(transformControlsAtom);
  return (
    <div>
    <div className='tooltip-container' style={{position:'absolute',zIndex:'2',top:'90%'}}>
    <span className="tooltip">Move</span>
    <button onClick={()=>{setTransform('translate')}}>
    <svg width="40px" height="40px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className='icon'><path d="M15.707,17.293a1,1,0,0,1,0,1.414C12.738,21.54,12.726,22,12,22s-.783-.5-3.707-3.293a1,1,0,0,1,1.414-1.414L12,19.586l2.293-2.293A1,1,0,0,1,15.707,17.293Zm0-12-3-3a1,1,0,0,0-1.414,0l-3,3A1,1,0,0,0,9.707,6.707L12,4.414l2.293,2.293a1,1,0,0,0,1.414-1.414ZM5.293,15.707a1,1,0,1,0,1.414-1.414L4.414,12,6.707,9.707A1,1,0,0,0,5.293,8.293l-3,3a1,1,0,0,0,0,1.414Zm12,0a1,1,0,0,0,1.414,0l3-3a1,1,0,0,0,0-1.414l-3-3a1,1,0,0,0-1.414,1.414L19.586,12l-2.293,2.293A1,1,0,0,0,17.293,15.707ZM16,12a4,4,0,1,1-4-4A4,4,0,0,1,16,12Zm-2,0a2,2,0,1,0-2,2A2,2,0,0,0,14,12Z"/></svg>
    </button>
    </div>
    <div className='tooltip-container' style={{position:'absolute',zIndex:'2',top:'90%',left:'5%'}}>
    <span className="tooltip">Rotate</span>
    <button onClick={()=>{setTransform('rotate')}}>
    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 64 64" className='icon'><path d="M6.198 49.601L10.586 54H2v2h11l1-1V44h-2v8.59l-4.246-4.247C-.815 36.89.358 20.631 10.495 10.494 15.972 5.017 23.254 2 31 2V0C22.72 0 14.936 3.225 9.081 9.08-1.773 19.934-3.013 37.354 6.198 49.601zM53.414 10H62V8H51l-1 1v11h2v-8.59l4.246 4.247c8.569 11.453 7.396 27.712-2.741 37.849C48.028 58.983 40.746 62 33 62v2c8.28 0 16.064-3.225 21.919-9.08 10.854-10.854 12.094-28.273 2.883-40.521L53.414 10z"></path></svg>
    </button>
    </div>
    <div className='tooltip-container' style={{position:'absolute',zIndex:'2',top:'90%',left:'10%'}}>
    <span className="tooltip">Scale</span>
    <button onClick={()=>{setTransform('scale')}}>
    <svg width="40px" height="40px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className='icon'>
<path d="M16 21H16.2C17.8802 21 18.7202 21 19.362 20.673C19.9265 20.3854 20.3854 19.9265 20.673 19.362C21 18.7202 21 17.8802 21 16.2V7.8C21 6.11984 21 5.27976 20.673 4.63803C20.3854 4.07354 19.9265 3.6146 19.362 3.32698C18.7202 3 17.8802 3 16.2 3H7.8C6.11984 3 5.27976 3 4.63803 3.32698C4.07354 3.6146 3.6146 4.07354 3.32698 4.63803C3 5.27976 3 6.11984 3 7.8V8M11.5 12.5L17 7M17 7H12M17 7V12M6.2 21H8.8C9.9201 21 10.4802 21 10.908 20.782C11.2843 20.5903 11.5903 20.2843 11.782 19.908C12 19.4802 12 18.9201 12 17.8V15.2C12 14.0799 12 13.5198 11.782 13.092C11.5903 12.7157 11.2843 12.4097 10.908 12.218C10.4802 12 9.92011 12 8.8 12H6.2C5.0799 12 4.51984 12 4.09202 12.218C3.71569 12.4097 3.40973 12.7157 3.21799 13.092C3 13.5198 3 14.0799 3 15.2V17.8C3 18.9201 3 19.4802 3.21799 19.908C3.40973 20.2843 3.71569 20.5903 4.09202 20.782C4.51984 21 5.07989 21 6.2 21Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg></button>
</div>
<div>

</div>

    </div>
  );
}