import Button from "./components/interactions/button";
import Sidebar from "./components/nav/sidebar";
import SidebarCategory from "./components/nav/sidebar_category";

export default function Home() {
return (
	<Sidebar>
		<SidebarCategory name="overview">
			<Button primary value="Dashboard" icon="Console"/>
		</SidebarCategory>
		<SidebarCategory name="files">
			<Button value="Files" icon="Folder"/>
			<Button value="Databases" icon="Database"/>
			<Button value="Backups" icon="Box"/>
		</SidebarCategory>
		<SidebarCategory name="server">
			<Button value="Startup" icon="Start"/>
			<Button value="Schedules" icon="Calendar"/>
		</SidebarCategory>
		<SidebarCategory name="networking">
			<Button value="Allocations" icon="Tree"/>
			<Button value="Subdomains" icon="Globe"/>
		</SidebarCategory>
		<SidebarCategory name="management">
			<Button value="Settings" icon="Settings"/>
			<Button value="Users" icon="Users"/>
			<Button value="Logs" icon="Clock"/>
		</SidebarCategory>
	</Sidebar>
);
}
