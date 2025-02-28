import { LuPanelLeftClose, LuPanelRightClose } from "react-icons/lu";

const Sidebar = ({ isSidebarOpen, toggleSidebar }) => {
    return (
        <div>
            {/* Icon to toggle sidebar */}
            <div className="text-2xl flex items-center justify-end px-2 mt-2 ">
                <button onClick={toggleSidebar}>
                    {isSidebarOpen ? <LuPanelLeftClose className="cursor-pointer" /> : <LuPanelRightClose className="mx-2 cursor-pointer" /> }
                </button>
            </div>

            {/* Sidebar content (only visible when sidebar is open) */}
            {isSidebarOpen && (
                <div>
                    <h1>hey</h1>
                </div>
            )}
        </div>
    );
}

export default Sidebar;