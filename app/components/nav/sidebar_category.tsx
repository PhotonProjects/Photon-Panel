"use client";

import { IconChevronRight } from "@tabler/icons-react";
import { useState } from "react";
import clsx from "clsx/lite";

export default function SidebarCategory({
  name,
  children,
}: {
  name: String;
  children: React.ReactNode;
}) {
  const [expanded, setExpanded] = useState(true);

  return (
    <div className="flex flex-col gap-0.5 group">
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex items-center justify-between px-1.5 pb-3 pt-3 hover:bg-(--neutral-ghost-250) rounded-8 border border-transparent group-hover:border-(--neutral-ghost-250) transition-colors duration-100"
      >
        <p className="text-label text-[13px] text-(--on-neutral-450) uppercase group-hover:text-(--on-neutral-950) transition-colors duration-100">
          {name}
        </p>
        <IconChevronRight
          stroke={2}
          size={18}
          className={clsx(
            "transition-all duration-100 stroke-(--on-neutral-450) group-hover:stroke-(--on-neutral-950)",
            expanded && "rotate-90",
          )}
        />
      </button>
      {expanded && children}
    </div>
  );
}
