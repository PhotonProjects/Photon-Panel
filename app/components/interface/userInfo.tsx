"use client";

import Image from "next/image";

export default function UserInfo({
    username,
    role,
    profileImageSrc,
}: {
    username: string;
    role: string;
    profileImageSrc: string;
}) {
    return (
        <div className="flex items-center gap-[var(--user-info-gap)]">
            <div className="flex flex-col items-end gap-[var(--user-info-text-gap)]">
                <p className="text-medium text-text-100">{username}</p>
                <span className="inline-flex h-[var(--role-tag-height)] w-fit items-center self-end rounded-[var(--role-tag-radius)] border border-[var(--role-tag-border-width)] border-status-info-outline bg-status-info-background px-[var(--role-tag-padding-x)] text-label text-status-info-foreground">
                    {role}
                </span>
            </div>
            <div className="relative size-[var(--user-avatar-size)] overflow-hidden rounded-[var(--user-avatar-radius)]">
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
