import { cn } from "@/helpers/base";
import { playSong } from "@/helpers/song";
import useStoreGlobal from "@/src/Stores/useStoreGlobal";
import { Link } from "@inertiajs/react";
import { PlayArrow, PlayCircleOutline } from "@mui/icons-material";
import React, { useEffect } from "react";

const Song = ({ ...song }) => {
    const { image, title, artists, audio, duration } = song;
    const currentSong = useStoreGlobal((state) => state.currentSong);
    const [isPlaying, setIsPlaying] = React.useState(false);

    useEffect(() => {
        const audio = currentSong?.audio;
        if (audio && song?.id === currentSong?.info?.id) {
            audio.addEventListener("timeupdate", () => {
                setIsPlaying(!audio?.paused);
            });
            audio.addEventListener("ended", () => {
                setIsPlaying(false);
            });
        }

        return () => {
            if (audio) {
                audio.removeEventListener("timeupdate", () => {});
            }
        };
    }, [currentSong, song?.id]);

    return (
        <div className="w-full h-full">
            <div className="relative rounded-[8px] overflow-hidden w-full aspect-square group select-none">
                <img
                    src={image}
                    alt={title}
                    className="absolute left-1/2 -translate-x-1/2 origin-center object-cover object-center w-full h-full group-hover:scale-110 transition-all duration-300 ease-in-out"
                />
                <div
                    className={cn(
                        "absolute inset-0 bg-[#0008] opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-300 ease-in-out flex items-center justify-center",
                        {
                            "opacity-100 pointer-events-auto": isPlaying,
                        }
                    )}
                >
                    <div
                        className="w-[48px] h-[48px] border-[2px] border-solid border-white rounded-full flex items-center justify-center cursor-pointer"
                        onClick={() => {
                            if (isPlaying) {
                                setIsPlaying(false);
                                currentSong?.audio.pause();
                            } else {
                                setIsPlaying(true);
                                playSong(audio, song);
                            }
                        }}
                    >
                        {isPlaying ? (
                            <img
                                src="/images/gifs/icon-playing.gif"
                                className="w-[20px] h-[20px] object-contain"
                            />
                        ) : (
                            <PlayArrow
                                sx={{
                                    fontSize: 36,
                                    color: "#fff",
                                }}
                            />
                        )}
                    </div>
                </div>
            </div>
            <div className="mt-2">
                <h3 className="text-sm font-semibold line-clamp-1">{title}</h3>
                <p className="text-sm text-gray-500">
                    {artists?.map((artist, index) => (
                        <>
                            <Link
                                href={route("artist.detail", {
                                    id: artist?.id,
                                })}
                                className="hover:text-sky-600"
                            >
                                {artist?.name}
                            </Link>
                            {index < artists?.length - 1 && ", "}
                        </>
                    ))}
                </p>
            </div>
        </div>
    );
};

export default Song;
