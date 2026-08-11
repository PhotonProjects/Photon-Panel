import Image from "next/image";

interface UserInfoProps {
    username: string;
    role: string;
    profileImageSrc: string;
}

export default function UserInfo({ username, role, profileImageSrc }: UserInfoProps) {
    return (
        <div className="flex items-center gap-md">
            <div className="flex flex-col items-end gap-xs">
                <p className="text-medium text-text-100">{username}</p>
                <span className="text-label inline-flex h-[var(--role-tag-height)] w-fit items-center self-end rounded-[var(--radius-default)] bg-status-info-background px-md text-status-info-foreground inset-ring inset-ring-status-info-ring">
                    {role}
                </span>
            </div>
            <div className="relative size-[var(--user-avatar-size)] overflow-hidden rounded-[var(--radius-default)]">
                <Image
                    src={profileImageSrc}
                    alt={`${username} profile`}
                    fill
                    className="object-cover"
                />
            </div>
        </div>
    );
}
