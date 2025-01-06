import { create } from "zustand";

const store = () => ({
    currentSong: null,
});

const useStoreGlobal = create(store);

export default useStoreGlobal;

export function setStoreGlobal(x) {
    useStoreGlobal.setState(x);
}
