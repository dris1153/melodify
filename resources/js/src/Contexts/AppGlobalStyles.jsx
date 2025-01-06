import { getThemedComponents } from "@/helpers/theme";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { deepmerge } from "@mui/utils";
import React, { useMemo } from "react";

export const ColorModeContext = React.createContext({});

/**
 * Main Layout component which wrapps around the whole app
 * @param param0
 * @returns
 */
export function AppGlobalStyles({ children, backgroundColor }) {
    const theme = useMemo(() => {
        const themeCreate = createTheme({
            components: {
                MuiCssBaseline: {
                    styleOverrides: {
                        body: {
                            backgroundColor: backgroundColor || "#2c2c2c",
                            margin: 0,
                            padding: 0,
                        },
                    },
                },
            },
        });
        return deepmerge(themeCreate, getThemedComponents());
    }, []);

    return (
        <ThemeProvider theme={theme}>
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />
            {children}
        </ThemeProvider>
    );
}
