import React from "react";
import Header from "../Components/primitives/Header";
import Sidebar from "../Components/common/Sidebar";
import { cn } from "@/helpers/base";
import GlobalProvider from "../Contexts/GlobalProvider";
import Container from "../Components/primitives/Container";
import SongControl from "../Components/common/SongControl";
import useStoreGlobal from "../Stores/useStoreGlobal";

const MainLayout = ({ children, positionHeader }) => {
    const currentSong = useStoreGlobal((state) => state.currentSong);
    const isOpenPlaylist = useStoreGlobal((state) => state.isOpenPlaylist);
    return (
        <GlobalProvider>
            <div className="h-[100svh] flex flex-col overflow-hidden">
                <div className={cn("main-layout overflow-hidden")}>
                    <Sidebar />
                    <div className="flex-1 flex flex-col h-full bg-[#222] px-[40px] pt-[36px] py-[40px] relative overflow-auto">
                        <Header positionHeader={positionHeader} />
                        <Container className="w-full">{children}</Container>
                    </div>
                    <div
                        className={cn(
                            "w-0 translate-x-full h-full bg-[#1f1f1f] border-l-[0.5px] border-solid border-[#fff2]  transition-all duration-[450ms]",
                            {
                                "w-[360px] translate-x-0": isOpenPlaylist,
                            }
                        )}
                    ></div>
                </div>
                {currentSong && <SongControl />}
            </div>
        </GlobalProvider>
    );
};

export default MainLayout;
