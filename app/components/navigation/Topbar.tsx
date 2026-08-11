import Button from "@/app/components/ui/Button";
import UserInfo from "@/app/components/ui/UserInfo";

export default function Topbar() {
    return (
        <header className="mt-none mr-lg ml-lg flex h-[var(--topbar-height)] items-center justify-between rounded-[var(--radius-default)] bg-interface-surface px-md inset-ring inset-ring-[color:var(--interface-surface-ring)]">
            <Button
                icon="Home"
                ariaLabel="Go to home"
                title="Home"
                className="size-[var(--interactive-size)] justify-center bg-interface-high-surface p-none hover:bg-interface-high-surface-hover"
            />
            <UserInfo
                username="Jamesfrench"
                role="User"
                profileImageSrc="https://cdn.discordapp.com/avatars/1094693285416685690/da8f052dd8635f8f06e68b9b56c11bd8.webp?size=1024"
            />
        </header>
    );
}
