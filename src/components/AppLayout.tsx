import { useLocation } from "react-router-dom";
import SideBar from "./SideBar";
import { Outlet } from "react-router-dom";

// The app layout will show us the SideBar Component only when
// it is relevant (The Stock Managment System)
const AppLayout = () => {
  const location = useLocation();
  const hideSidebarRoutes = ["/", "/trivia"]; // Routes where sidebar should not be shown
  const showSidebar = !hideSidebarRoutes.includes(location.pathname);

  return (
    <div className="app-container">
      {showSidebar && <SideBar />} {/* Show Sidebar only for certain routes */}
      <Outlet /> {/* Render the child routes */}
    </div>
  );
};

export default AppLayout;
