"use client";

import Button from "../interactions/button";
import UserInfo from "../interface/userInfo";

export default function Topbar() {
    return (
        <header className="ml-[15px] mr-4 flex h-16 items-center justify-between rounded-[20px] border border-[#141316] bg-surface-background pl-3 pr-3">
            <Button
                icon="Home"
                ariaLabel="Go to home"
                title="Home"
                className="size-10.5 justify-center bg-[#151419] p-0 hover:bg-[#1A191D]"
            />
            <UserInfo
                username="Jamesfrench"
                role="User"
                profileImageSrc="https://cdn.discordapp.com/avatars/1094693285416685690/da8f052dd8635f8f06e68b9b56c11bd8.webp?size=1024"
            />
        </header>
    );
}
