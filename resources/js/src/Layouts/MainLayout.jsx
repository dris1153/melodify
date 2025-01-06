import React from "react";
import Header from "../Components/primitives/Header";
import Sidebar from "../Components/common/Sidebar";
import { cn } from "@/helpers/base";
import GlobalProvider from "../Contexts/GlobalProvider";
import Container from "../Components/primitives/Container";
import SongControl from "../Components/common/SongControl";

const MainLayout = ({ children }) => {
    return (
        <GlobalProvider>
            <div className="h-[100svh] flex flex-col">
                <div className={cn("main-layout")}>
                    <Sidebar />
                    <div className="flex flex-col w-full h-full bg-[#222] px-[40px] pt-[36px]">
                        <Header />
                        <Container className="w-full">{children}</Container>
                    </div>
                    <div className="w-full h-full bg-[#1f1f1f] border-l-[0.5px] border-solid border-[#fff2]"></div>
                </div>
                <SongControl />
            </div>
        </GlobalProvider>
    );
};

export default MainLayout;
