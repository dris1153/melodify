import useStoreGlobal, { setStoreGlobal } from "@/src/Stores/useStoreGlobal";
import TimeSlider from "react-input-slider";
import React, { useEffect, useMemo } from "react";
import {
    Favorite,
    FavoriteBorderOutlined,
    LibraryMusic,
    PauseCircleOutlined,
    PlayCircleOutlined,
    VolumeDown,
    VolumeOff,
    VolumeUp,
} from "@mui/icons-material";
import { cn, formatSongDuration } from "@/helpers/base";
import { Box } from "@mui/material";

const SongControl = () => {
    const currentSong = useStoreGlobal((state) => state.currentSong);
    const volume = useStoreGlobal((state) => state.volume);
    const [currentTime, setCurrentTime] = React.useState(0);
    const [isPlaying, setIsPlaying] = React.useState(false);

    useEffect(() => {
        const audio = currentSong?.audio;
        if (audio) {
            audio.addEventListener("timeupdate", () => {
                setCurrentTime(audio.currentTime);
                setIsPlaying(!audio?.paused);
            });
            audio.addEventListener("ended", () => {
                setIsPlaying(false);
            });
        }

        return () => {
            if (audio) {
                audio.removeEventListener("timeupdate", () => {
                    setCurrentTime(audio.currentTime);
                });
            }
        };
    }, [currentSong]);

    useEffect(() => {
        const audio = currentSong?.audio;
        if (audio) {
            audio.volume = volume;
        }
    }, [volume, currentSong]);

    return (
        <div className="w-full bg-[#333] h-[90px] border-t-[0.5px] border-solid border-[#fff2] flex items-center justify-between px-[16px]">
            <div className="flex-1 flex items-center gap-[16px]">
                <div className="flex items-center gap-[12px]">
                    <img
                        className="w-[64px] h-[64px] rounded-[6px] object-cover"
                        src={currentSong?.info?.image}
                    />
                    <div>
                        <h6 className="text-white text-sm font-[600]">
                            {currentSong?.info?.title}
                        </h6>
                        <p className="text-slate-400 text-sm">
                            {currentSong?.info?.artists
                                ?.map((artist) => artist?.name)
                                ?.join(", ")}
                        </p>
                    </div>
                </div>
                <div>
                    <div className="rounded-full p-4 hover:bg-[#fff2] w-[24px] h-[24px] flex items-center justify-center cursor-pointer">
                        <FavoriteBorderOutlined
                            sx={{
                                color: "#fff",
                                fontSize: "18px",
                            }}
                        />
                    </div>
                </div>
            </div>
            <div className="w-[35%] flex flex-col gap-[2px]">
                <div className="flex items-center justify-center w-full">
                    {isPlaying ? (
                        <PauseCircleOutlined
                            sx={{
                                color: "#fff",
                                fontSize: "40px",
                                cursor: "pointer",
                            }}
                            onClick={() => {
                                const audio = currentSong?.audio;
                                if (audio) {
                                    audio.pause();
                                    setIsPlaying(false);
                                }
                            }}
                        />
                    ) : (
                        <PlayCircleOutlined
                            sx={{
                                color: "#fff",
                                fontSize: "40px",
                                cursor: "pointer",
                            }}
                            onClick={() => {
                                const audio = currentSong?.audio;
                                if (audio) {
                                    audio.play();
                                    setIsPlaying(true);
                                }
                            }}
                        />
                    )}
                </div>
                <div className="w-full relative flex items-center gap-[8px] *:!duration-0">
                    <span className="text-slate-400 text-[14px] font-[500]">
                        {formatSongDuration(currentTime)}
                    </span>
                    <TimeSlider
                        axis="x"
                        xmax={currentSong?.info?.duration}
                        x={currentTime}
                        onChange={({ x }) => {
                            const audio = currentSong?.audio;
                            if (audio) {
                                setCurrentTime(x);
                                audio.currentTime = x;
                            }
                        }}
                        styles={{
                            track: {
                                backgroundColor: "#fff4",
                                height: "4px",
                                width: "100%",
                                transition: "height 0.1s",
                                transformOrigin: "center",
                                cursor: "pointer",
                                ":hover": {
                                    height: "6px",
                                },
                            },
                            active: {
                                backgroundColor: "#fff",
                                height: "100%",
                            },
                            thumb: {
                                width: "8px",
                                height: "8px",
                                backgroundColor: "#fff",
                                borderRadius: "50%",
                            },
                        }}
                    />
                    <span className="text-white text-[14px] font-[500]">
                        {formatSongDuration(currentSong?.info?.duration)}
                    </span>
                </div>
            </div>
            <div className="flex items-center justify-end gap-[12px] flex-1">
                <VolumeControl />
                <div className="w-[1px] h-[24px] bg-[#fff4]" />
                <PlaylistControl />
            </div>
        </div>
    );
};

export default SongControl;

const VolumeControl = () => {
    const volume = useStoreGlobal((state) => state.volume);

    const icon = useMemo(() => {
        if (volume === 0) {
            return <VolumeOff />;
        } else if (volume < 0.5) {
            return <VolumeDown />;
        }
        return <VolumeUp />;
    }, [volume]);

    return (
        <div className="flex items-center gap-[8px]">
            <Box
                className="p-1 flex items-center justify-center rounded-full cursor-pointer hover:bg-[#fff2]"
                sx={{
                    color: "#fff",
                    ".MuiSvgIcon-root": {
                        fontSize: "24px",
                    },
                }}
                onClick={() => {
                    setStoreGlobal({ volume: volume === 0 ? 0.5 : 0 });
                }}
            >
                {icon}
            </Box>
            <div className="w-[70px] flex items-center justify-center h-[24px] *:!duration-0 ">
                <TimeSlider
                    axis="x"
                    xmax={100}
                    x={volume * 100}
                    onChange={(value) => {
                        setStoreGlobal({ volume: value?.x / 100 });
                    }}
                    styles={{
                        track: {
                            backgroundColor: "#fff4",
                            height: "4px",
                            width: "100%",
                            transition: "height 0.1s",
                            transformOrigin: "center",
                            cursor: "pointer",
                            ":hover": {
                                height: "6px",
                            },
                        },
                        active: {
                            backgroundColor: "#fff",
                            height: "100%",
                        },
                        thumb: {
                            width: "8px",
                            height: "8px",
                            backgroundColor: "#fff",
                            borderRadius: "50%",
                        },
                    }}
                />
            </div>
        </div>
    );
};

const PlaylistControl = () => {
    const isOpenPlaylist = useStoreGlobal((state) => state.isOpenPlaylist);
    return (
        <div
            className={cn(
                "bg-[#222] p-1 rounded-[4px] w-[28px] h-[28px] flex items-center justify-center cursor-pointer transition-all duration-300",
                {
                    "bg-[#FFC100]": isOpenPlaylist,
                }
            )}
            onClick={() => {
                setStoreGlobal({ isOpenPlaylist: !isOpenPlaylist });
            }}
        >
            <LibraryMusic
                className="transition-all duration-300"
                sx={{
                    color: isOpenPlaylist ? "#000" : "#fff",
                    fontSize: "16px",
                }}
            />
        </div>
    );
};
