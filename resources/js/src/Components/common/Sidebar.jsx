import React from "react";

const ListItems = [
    {
        title: "Home",
        icon: "home",
        url: "/",
    },
    {
        title: "Discover",
        icon: "discover",
        url: "/discover",
    },
    {
        title: "Albums",
        icon: "album",
        url: "/albums",
    },
];

const Sidebar = () => {
    return (
        <div className="w-full h-full pt-[45px]">
            <h1 className="text-[24px] font-[700] ml-[32px]">Melodify</h1>
            <div className="flex flex-col mt-[28px]">
                {ListItems?.map((item, index) => (
                    <a
                        key={index}
                        href={item.link}
                        className="flex items-center py-[8px] pl-[40px] hover:bg-[#383838] group cursor-pointer h-[64px]"
                    >
                        <img
                            src={`/images/sidebar-icons/${item?.icon}.svg`}
                            className="grayscale group-hover:grayscale-0"
                        />
                        <span className="text-[16px] ml-[16px] group-hover:text-[#FFC100]">
                            {item.title}
                        </span>
                        <span className="w-[6px] h-0 bg-[#FFC100] block ml-auto rounded-bl-full rounded-tl-full group-hover:h-[48px] transition-all duration-150"></span>
                    </a>
                ))}
            </div>
        </div>
    );
};

export default Sidebar;
