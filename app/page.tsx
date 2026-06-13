import Button from "./components/interactions/button";
import Sidebar from "./components/nav/sidebar";
import SidebarCategory from "./components/nav/sidebar_category";

export default function Home() {
	return (
		<Sidebar>
			<SidebarCategory name="overview">
				<Button primary value="Dashboard" icon={"Console" + "Filled"} />
			</SidebarCategory>
			<SidebarCategory name="files">
				<Button filledicon value="Files" icon="Folder" />
				<Button filledicon value="Databases" icon="Database" />
				<Button filledicon value="Backups" icon="Box" />
			</SidebarCategory>
			<SidebarCategory name="server">
				<Button filledicon value="Startup" icon="Start" />
				<Button filledicon value="Schedules" icon="Calendar" />
			</SidebarCategory>
			<SidebarCategory name="networking">
				<Button filledicon value="Allocations" icon="Tree" />
				<Button filledicon value="Subdomains" icon="Globe" />
			</SidebarCategory>
			<SidebarCategory name="management">
				<Button filledicon value="Settings" icon="Settings" />
				<Button filledicon value="Users" icon="Users" />
				<Button filledicon value="Logs" icon="Clock" />
			</SidebarCategory>
		</Sidebar>
	);
}
