import useStoreGlobal, { setStoreGlobal } from "@/src/Stores/useStoreGlobal";

export function playSong(path, song) {
    const state = useStoreGlobal.getState();
    const currentSong = state.currentSong;
    const volume = state.volume;
    if (currentSong && currentSong.info.id === song.id) {
        currentSong.audio.play();
    } else {
        if (currentSong) {
            currentSong.audio.removeEventListener("timeupdate", () => {});
            currentSong.audio.pause();
        }
        const audio = new Audio(path);
        audio.volume = volume;
        audio.play();
        setStoreGlobal({
            currentSong: {
                info: song,
                audio,
            },
        });
    }
}
