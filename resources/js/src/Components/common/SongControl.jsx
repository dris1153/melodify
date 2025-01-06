import useStoreGlobal from "@/src/Stores/useStoreGlobal";
import React from "react";

const SongControl = () => {
    const currentSong = useStoreGlobal((state) => state.currentSong);
    return (
        <div className="w-full bg-[#333] h-[90px] border-t-[0.5px] border-solid border-[#fff2] flex items-center justify-between px-[16px]">
            <div className="flex items-center gap-[12px]">
                <img
                    className="w-[64px] h-[64px] rounded-[6px]"
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
            <div></div>
            <div></div>
        </div>
    );
};

export default SongControl;
