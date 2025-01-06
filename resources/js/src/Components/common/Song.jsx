import { playSong } from "@/helpers/song";
import { PlayArrowRounded, PlayCircleOutline } from "@mui/icons-material";
import React from "react";

const Song = ({ ...song }) => {
    const { image, title, artists, audio, duration } = song;
    return (
        <div className="w-full h-full">
            <div className="relative rounded-[8px] overflow-hidden w-full aspect-square group select-none">
                <img
                    src={image}
                    alt={title}
                    className="object-cover object-center w-full h-full group-hover:scale-110 transition-all duration-300 ease-in-out"
                />
                <div className="absolute inset-0 bg-[#0008] opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-300 ease-in-out flex items-center justify-center">
                    <PlayCircleOutline
                        sx={{
                            fontSize: 48,
                            color: "#fff",
                        }}
                        className="cursor-pointer"
                        onClick={() => playSong(audio, song)}
                    />
                </div>
            </div>
            <div className="mt-2">
                <h3 className="text-sm font-semibold line-clamp-1">{title}</h3>
                <p className="text-sm text-gray-500">
                    {artists?.map((artist) => artist?.name)?.join(", ")}
                </p>
            </div>
        </div>
    );
};

export default Song;
