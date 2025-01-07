import { useForm } from "@inertiajs/react";
import { Favorite, FavoriteBorderOutlined } from "@mui/icons-material";
import React, { useEffect } from "react";

const SongLove = ({ song }) => {
    const { post } = useForm();

    useEffect(() => {
        const handle = (e) => {
            if (e.detail.id === song?.id) {
                song.is_loved = e.detail.isLoved;
            }
        };

        window.addEventListener("song-love", handle);

        return () => {
            window.removeEventListener("song-love", handle);
        };
    }, [song]);

    return (
        <div
            className="rounded-full p-4 hover:bg-[#fff2] w-[24px] h-[24px] flex items-center justify-center cursor-pointer"
            onClick={() => {
                post(
                    route("song.love", {
                        id: song?.id,
                    }),
                    {
                        onSuccess: () => {
                            window.dispatchEvent(
                                new CustomEvent("song-love", {
                                    detail: {
                                        id: song?.id,
                                        isLoved: !song.is_loved,
                                    },
                                })
                            );
                        },
                    }
                );
            }}
        >
            {song?.is_loved ? (
                <Favorite
                    sx={{
                        color: "#fff",
                        fontSize: "18px",
                    }}
                />
            ) : (
                <FavoriteBorderOutlined
                    sx={{
                        color: "#fff",
                        fontSize: "18px",
                    }}
                />
            )}
        </div>
    );
};

export default SongLove;
