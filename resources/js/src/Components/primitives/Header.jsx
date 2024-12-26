import React from "react";
import Container from "./Container";
import {
    ArrowBackIos,
    ArrowForwardIos,
    SearchOutlined,
    Settings,
} from "@mui/icons-material";
import Profile from "../common/Profile";

const Searchbar = () => {
    return (
        <div className="flex items-center bg-white rounded-[16px] py-[6px] px-[24px] w-[60%] max-w-[400px]">
            <input
                placeholder="Search..."
                className="outline-none border-none text-black text-[14px] flex-1"
            />
            <SearchOutlined className="text-black cursor-pointer" />
        </div>
    );
};

const Header = () => {
    return (
        <header className="w-full ">
            <Container className="flex items-center py-[16px] justify-between">
                <div className="flex items-center gap-[24px]">
                    <ArrowBackIos
                        className="text-white"
                        sx={{
                            width: "20px",
                        }}
                    />
                    <ArrowForwardIos
                        className="text-white"
                        sx={{
                            width: "20px",
                        }}
                    />
                </div>
                <Searchbar />
                <div className=" flex items-center gap-[24px]">
                    <Settings />
                    <Profile />
                </div>
            </Container>
        </header>
    );
};

export default Header;
