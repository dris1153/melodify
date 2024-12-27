import React from "react";
import Header from "../Components/primitives/Header";
import Sidebar from "../Components/common/Sidebar";
import { cn } from "@/helpers/base";
import { AppGlobalStyles } from "../Contexts/AppGlobalStyles";
import GlobalProvider from "../Contexts/GlobalProvider";

const MainLayout = ({ children }) => {
    return (
        <GlobalProvider>
            <div className={cn("main-layout")}>
                <Sidebar />
                <div className="flex flex-col w-full h-full bg-[#222] pl-[40px] pt-[36px]">
                    <Header />
                    {children}
                </div>
            </div>
        </GlobalProvider>
    );
};

export default MainLayout;
