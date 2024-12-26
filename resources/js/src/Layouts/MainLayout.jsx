import React from "react";
import Header from "../Components/primitives/Header";
import Sidebar from "../Components/common/Sidebar";
import { cn } from "@/helpers/base";
import { AppGlobalStyles } from "../Contexts/AppGlobalStyles";

const MainLayout = ({ children }) => {
    return (
        <AppGlobalStyles>
            <div className={cn("main-layout")}>
                <Sidebar />
                <div className="flex flex-col w-full h-full bg-[#222] pl-[40px] pt-[36px]">
                    <Header />
                    {children}
                </div>
            </div>
        </AppGlobalStyles>
    );
};

export default MainLayout;
