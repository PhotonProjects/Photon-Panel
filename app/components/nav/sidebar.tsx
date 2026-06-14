"use client";

import { useEffect, useRef, useState } from "react";
import Button from "../interactions/button";
import clsx from "clsx";
import { SidebarContext } from "./sidebarContext";

export default function Sidebar({ children }: { children: React.ReactNode }) {
	const [sideBarExpanded, setSideBarExpanded] = useState(false);

	return (
		<div 
			className={clsx(
				"h-full bg-(--neutral-100) rounded-normal border border-(--neutral-150) p-2.75 rounded-20 flex flex-col gap-3 transition-all duration-250 items-end",
				sideBarExpanded ? "w-66" : "w-16.5"
			)}
		>
			<div className="w-full h-15 flex justify-center">
				<div className={clsx(
					"bg-(--neutral-150) rounded-8 py-5.25 flex justify-center w-full",
					!sideBarExpanded ? "h-14.5" : "h-full"
				)}>

				</div>
			</div>
			<div className="flex flex-col gap-0.5 overflow-y-auto overflow-x-hidden min-h-0 flex-1 scrollbar-thumb-(--on-neutral-450) scrollbar-track-transparent justify-stretch scrollbar-thin w-full">
				<SidebarContext.Provider value={{sideBarExpanded: sideBarExpanded, inSideBar: true}}>
					{children}
				</SidebarContext.Provider>
			</div>
			<Button icon="LayoutOpen" onClick={() => setSideBarExpanded(!sideBarExpanded)}/>
		</div>
	);
}
