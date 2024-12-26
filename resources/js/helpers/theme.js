const FONT = "Grandstander, Pally";

export function getThemedComponents() {
    return {
        components: {
            MuiTabs: {
                styleOverrides: {
                    root: {
                        width: "max-content",
                        backgroundColor: "#30A2C8",
                        minHeight: "0",
                        border: "1px solid",
                        borderColor: "#317085",
                        borderRadius: "10px",
                        padding: 0,
                    },
                    flexContainer: {
                        position: "relative",
                        zIndex: 1,

                        ".MuiButtonBase-root.MuiTab-root": {
                            flex: 1,
                            minHeight: "0",
                            height: "auto",
                            textTransform: "uppercase",
                            color: "#1D5061",
                            fontWeight: 800,
                            borderRadius: "10px",
                            fontSize: "24px",
                            fontFamily: "Grandstander",
                            fontStyle: "italic",
                            marginBlock: "-1px",
                            paddingInline: "40px",
                            minWidth: "max-content",
                            maxWidth: "none",
                            "&.Mui-selected": {
                                color: "#1D5061",
                                backgroundColor: "#9CDCF2",
                                border: "1px solid",
                                borderColor: "#317085",
                                boxShadow: "inset 0 -4px 0 0 #00000033",
                                "&:first-child": {
                                    borderLeftWidth: 0,
                                },
                                "&:last-child": {
                                    borderRightWidth: 0,
                                },
                            },
                            ".MuiSvgIcon-root": {
                                width: "40px",
                                height: "40px",
                            },
                        },
                    },
                    indicator: {
                        // height: "100%",
                        // borderRadius: "6px",
                        // zIndex: "0",
                        // backgroundColor: "#9CDCF2",
                        // background: "#9CDCF2",
                        // border: "1px solid",
                        // borderColor: "#317085",
                        display: "none",
                    },
                },
            },
            MuiTableContainer: {
                styleOverrides: {
                    root: {
                        border: "1.5px solid #3F93B0",
                        backgroundColor: "#84D3EF",
                        borderRadius: "10px",
                        boxShadow: "inset 0 2px 0 0 #74B9D2",
                    },
                },
            },
            MuiTable: {
                styleOverrides: {
                    root: {
                        borderCollapse: "collapse",
                        borderSpacing: "0",
                        width: "100%",
                        borderColor: "#3F93B0",
                    },
                },
            },
            MuiTableHead: {
                styleOverrides: {
                    root: {
                        backgroundColor: "#84D3EF",
                        borderBottom: "1.5px solid #3F93B0",
                        zIndex: 1,
                    },
                },
            },
            MuiTableRow: {
                styleOverrides: {
                    root: {
                        borderColor: "#3F93B0",
                    },
                },
            },
            MuiTableCell: {
                styleOverrides: {
                    root: {
                        borderColor: "#3F93B0",
                        textAlign: "center",
                        color: "#1D5061",
                        fontFamily: FONT,
                        fontSize: "28px",
                        lineHeight: "32px",
                        fontWeight: 800,
                        fontStyle: "italic",
                        boxShadow: "inset 0 2px 0 0 #FFFFFF33",
                        "&.MuiTableCell-head": {
                            fontSize: "18px",
                            fontWeight: 700,
                            lineHeight: "18px",
                            boxShadow: "none",
                        },
                    },
                },
            },
            MuiDivider: {
                styleOverrides: {
                    root: {
                        backgroundColor: "#3F93B0",
                        boxShadow: "0 2px 0 0 #FFFFFF33",
                    },
                },
            },
        },
    };
}
