import useStoreGlobal, { setStoreGlobal } from "@/src/Stores/useStoreGlobal";

export function playSong(path, song) {
    const currentSong = useStoreGlobal.getState().currentSong;
    if (currentSong) {
        currentSong.audio.pause();
        currentSong.audio.currentTime = 0;
    }
    const audio = new Audio(path);
    audio.play();
    setStoreGlobal({
        currentSong: {
            info: song,
            audio,
        },
    });
}
