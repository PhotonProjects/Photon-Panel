"use client";

export default function Sidebar({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-full w-66 bg-(--neutral-100) rounded-normal border border-(--neutral-150) p-2.75 rounded-20 flex flex-col gap-3">
      <div className="w-full h-15 bg-(--neutral-150) rounded-8 py-5.25 flex justify-center">
        <img
          src={"https://cdn.nicolas4tech.fr/logos/nobg/nicolas4tech_dark.png"}
          className="h-full"
        />
      </div>
      <div className="flex flex-col gap-0.5">{children}</div>
    </div>
  );
}
