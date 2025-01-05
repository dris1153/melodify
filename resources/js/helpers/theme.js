const FONT = "Grandstander, Pally";

export function getThemedComponents() {
    return {
        components: {
            MuiButton: {
                styleOverrides: {
                    root: {
                        backgroundColor: "#ffc100",
                        color: "#000",
                        borderRadius: "16px",
                        paddingInline: "24px",
                        paddingBlock: "6px",
                        textTransform: "none",
                        "&:hover": {
                            backgroundColor: "#ffab00",
                        },
                    },
                },
            },
            MuiTabs: {
                styleOverrides: {},
            },
            MuiTableContainer: {
                styleOverrides: {},
            },
            MuiTable: {
                styleOverrides: {},
            },
            MuiTableHead: {
                styleOverrides: {},
            },
            MuiTableRow: {
                styleOverrides: {},
            },
            MuiTableCell: {
                styleOverrides: {
                    root: {},
                },
            },
            MuiDivider: {
                styleOverrides: {
                    root: {},
                },
            },
        },
    };
}
