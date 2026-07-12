"use client";

import Button from "../interactions/button";
import UserInfo from "../interface/userInfo";

export default function Topbar() {
    return (
        <header className="mt-[var(--topbar-margin-top)] ml-[var(--topbar-margin-left)] mr-[var(--topbar-margin-right)] flex h-[var(--topbar-height)] items-center justify-between rounded-[var(--topbar-radius)] border border-[color:var(--surface-outline)] bg-surface-background pl-[var(--topbar-home-offset)] pr-[var(--topbar-user-offset)]">
            <Button
                icon="Home"
                ariaLabel="Go to home"
                title="Home"
                className="size-[var(--topbar-home-button-size)] justify-center bg-surface-subtle-background p-0 hover:bg-surface-subtle-background-hover"
            />
            <UserInfo
                username="Jamesfrench"
                role="User"
                profileImageSrc="https://cdn.discordapp.com/avatars/1094693285416685690/da8f052dd8635f8f06e68b9b56c11bd8.webp?size=1024"
            />
        </header>
    );
}
