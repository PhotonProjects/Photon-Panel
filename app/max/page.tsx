"use client";

import { useEffect } from "react";
import Button from "../components/interactions/button";
import Sidebar from "../components/nav/sidebar";
import SidebarCategory from "../components/nav/sidebarCategory";
import Topbar from "../components/nav/topbar";

export default function Max() {
	useEffect(() => {
		const isFirefox = navigator.userAgent.toLowerCase().includes("firefox")
		if (isFirefox) {
			document.documentElement.style.setProperty("--scrollbar-width", "6px");
		}
	}, []);

	return (
		<div className="flex h-full min-h-0">
			<Sidebar>
				<SidebarCategory name="Overview">
					<Button primary outlined value="Dashboard" icon="ConsoleFilled" />
				</SidebarCategory>
				<SidebarCategory name="Files">
					<Button filledicon value="Files" icon="Folder" />
					<Button filledicon value="Databases" icon="Database" />
					<Button filledicon value="Backups" icon="Box" />
				</SidebarCategory>
				<SidebarCategory name="Server">
					<Button filledicon value="Startup" icon="Start" />
					<Button filledicon value="Schedules" icon="Calendar" />
				</SidebarCategory>
				<SidebarCategory name="Networking">
					<Button filledicon value="Allocations" icon="Tree" />
					<Button filledicon value="Subdomains" icon="Globe" />
				</SidebarCategory>
				<SidebarCategory name="Management">
					<Button filledicon value="Settings" icon="Settings" />
					<Button filledicon value="Users" icon="Users" />
					<Button filledicon value="Logs" icon="Clock" />
				</SidebarCategory>
			</Sidebar>
			<div className="flex min-w-0 flex-1 flex-col">
				<Topbar />
			</div>
		</div>
	);
}
