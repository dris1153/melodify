import { cn } from "@/helpers/base";
import React from "react";

const Container = ({ className, children }) => {
    return (
        <div
            className={cn(
                "flex items-center max-w-[1840px] px-[16px] mx-auto",
                className
            )}
        >
            {children}
        </div>
    );
};

export default Container;
