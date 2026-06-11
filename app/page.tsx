import Sidebar from "./components/nav/sidebar";
import SidebarCategory from "./components/nav/sidebar_category";

export default function Home() {
  return (
    <Sidebar>
      <SidebarCategory name="overview">
        <p className="text-(--on-neutral-950)">Test</p>
      </SidebarCategory>
      <SidebarCategory name="files">
        <p className="text-(--on-neutral-950)">Test</p>
      </SidebarCategory>
      <SidebarCategory name="server">
        <p className="text-(--on-neutral-950)">Test</p>
      </SidebarCategory>
      <SidebarCategory name="networking">
        <p className="text-(--on-neutral-950)">Test</p>
      </SidebarCategory>
      <SidebarCategory name="management">
        <p className="text-(--on-neutral-950)">Test</p>
      </SidebarCategory>
    </Sidebar>
  );
}
