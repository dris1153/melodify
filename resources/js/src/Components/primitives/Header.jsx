import React, { useEffect } from "react";
import Container from "./Container";
import {
    ArrowBackIos,
    ArrowForwardIos,
    SearchOutlined,
    Settings,
} from "@mui/icons-material";
import Profile from "../common/Profile";
import { router, useForm, usePage } from "@inertiajs/react";
import { Button } from "@mui/material";
import { cn } from "@/helpers/base";

const Searchbar = () => {
    const [isChanging, setIsChanging] = React.useState(false);

    const { data, setData, get } = useForm({
        value: "",
    });

    useEffect(() => {
        setIsChanging(true);
        const handler = setTimeout(() => {
            setIsChanging(false);
        }, 500);

        return () => {
            clearTimeout(handler);
        };
    }, [data?.value]);

    const search = () => {
        get(route("search"));
    };

    return (
        <div className="w-[60%] max-w-[400px] relative">
            <div className="flex items-center bg-white rounded-[16px] py-[6px] pl-[8px] pr-[24px] w-full">
                <input
                    placeholder="Search..."
                    className="outline-none border-none text-black text-[14px] flex-1"
                    value={data?.value}
                    onChange={(e) => setData("value", e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            search();
                        }
                    }}
                />
                <SearchOutlined
                    className="text-black cursor-pointer"
                    onClick={search}
                />
            </div>
            {/* <div className="absolute top-[calc(100%+8px)] left-0 w-full h-[100px] bg-white rounded-[8px]">
                <p>Suggested results</p>
                {isChanging && <span className="text-black">Loading...</span>}
            </div> */}
        </div>
    );
};

const Header = ({ positionHeader }) => {
    const user = usePage().props.auth.user;
    return (
        <header
            className={cn("w-full z-50", {
                "l-[40px] r-[40px] w-[calc(100%-80px)]":
                    positionHeader === "absolute",
            })}
            style={{
                position: positionHeader || "relative",
            }}
        >
            <Container className="flex items-center py-[16px] justify-between">
                <div className="flex items-center gap-[24px]">
                    <ArrowBackIos
                        className={cn("text-white cursor-pointer", {
                            "text-zinc-500 pointer-events-none":
                                !navigation?.canGoBack,
                        })}
                        sx={{
                            width: "20px",
                        }}
                        onClick={() => {
                            window.history.back();
                        }}
                    />
                    <ArrowForwardIos
                        className={cn("text-white cursor-pointer", {
                            "text-zinc-500 pointer-events-none":
                                !navigation?.canGoForward,
                        })}
                        sx={{
                            width: "20px",
                        }}
                        onClick={() => {
                            window.history.forward();
                        }}
                    />
                </div>
                <Searchbar />

                <div
                    className={cn("flex items-center gap-[24px]", {
                        "gap-[8px]": !user,
                    })}
                >
                    {/* <Settings /> */}
                    {user ? (
                        <Profile />
                    ) : (
                        <>
                            <Button
                                onClick={() => {
                                    router.visit(route("login"));
                                }}
                            >
                                Sign in
                            </Button>
                            <Button
                                onClick={() => {
                                    router.visit(route("register"));
                                }}
                            >
                                Sign up
                            </Button>
                        </>
                    )}
                </div>
            </Container>
        </header>
    );
};

export default Header;
