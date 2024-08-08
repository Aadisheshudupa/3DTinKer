import { atom } from "jotai";

export const backgroundColor = atom('#3b3b3b');

export const gridColor = atom('#ffffff');

export const cameraNames = atom({});

export const activeCamera = atom('defaults');

export const selectedCamera = atom('defaults');

export const modelPath = atom(null);

export const exports = atom(false);

export const toCloud = atom(false);

export const inputModelUrl = atom('');

export const modelUrls = atom([]);

export const light = atom([]);

export const expandedLight = atom(null);

export const globalExposures = atom(1);

export const globalShadow = atom(true);

export const newCamera = atom(false);

export const selectedLight = atom(null);

export const dropdownCam = atom(false);

export const dropdownLight = atom(false);

export const newLight = atom(false);

export const transformControlsAtom = atom('translate');

export const record = atom(null);

export const ExportTrigger = atom(null);

export const blob = atom(null);

export const toggleDropAction = atom(false);

export const ModelLoaded = atom(false);

export const GroupRef = atom(null);

export const CameraRef = atom(null);