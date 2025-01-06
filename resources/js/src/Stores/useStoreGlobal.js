import { create } from "zustand";

const store = () => ({
    currentSong: null,
    volume: 0.5,
    isOpenPlaylist: false,
});

const useStoreGlobal = create(store);

export default useStoreGlobal;

export function setStoreGlobal(x) {
    useStoreGlobal.setState(x);
}
