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
        <div className="flex items-center gap-3">
            <div className="flex flex-col items-end gap-1">
                <p className="text-medium text-text-100">{username}</p>
                <span className="inline-flex h-[18px] w-fit items-center self-end rounded-[5px] border border-[1px] border-[#1283D9] bg-[none] px-2.5 text-label text-[#39A0EF]">
                    {role}
                </span>
            </div>
            <div className="relative size-10 overflow-hidden rounded-[8px]">
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
