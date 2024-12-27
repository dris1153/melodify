import React from "react";
import { AppGlobalStyles } from "./AppGlobalStyles";
import { Toaster } from "react-hot-toast";

const GlobalProvider = ({ children }) => {
    return (
        <AppGlobalStyles>
            <Toaster position="top-right" />
            {children}
        </AppGlobalStyles>
    );
};

export default GlobalProvider;
