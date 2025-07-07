import {
  Activity,
  CircleUserIcon,
  Home,
  LogOut,
  Podcast,
  Search,
  Users,
} from "lucide-react";
import { Button } from "./ui/button";
import { Link, useLocation } from "react-router-dom";
import { useAuthStore } from "@/Store/useAuthStore";

interface SidebarProps {
  isOpen: boolean;
}

function Sidebar({ isOpen }: SidebarProps) {
  const { logout }: any = useAuthStore();
  const location = useLocation();

  const handleSubmit = () => {
    logout();
  };

  const items = [
    { name: "Home", icon: Home, link: "/" },
    { name: "Search", icon: Search, link: "/search" },
    { name: "Activity", icon: Activity, link: "/activity" },
    { name: "Create Post", icon: Podcast, link: "/create-post" },
    { name: "Communities", icon: Users, link: "/communities" },
    { name: "Profile", icon: CircleUserIcon, link: "/profile" },
  ];

  return (
    <aside
      className={`fixed max-w-0 left-0 top-16 h-screen bg-background/10 px-4 py-6 flex flex-col justify-between min-w-[250px] z-40 transition-transform duration-300 ease-in-out
      ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
    >
      {/* Top Navigation */}
      <div className="space-y-2 flex flex-col">
        {items.map((item, index) => {
          const isActive =
            item.link === "/"
              ? location.pathname === "/"
              : location.pathname.startsWith(item.link);

          return (
            <Link to={item.link} key={index}>
              <Button
                className={`w-full flex items-center gap-3 text-start ${
                  isActive
                    ? "bg-[#8573f0] hover:text-white hover:bg-[#7b6dc9] text-white"
                    : "hover:bg-[#8573f0] active:bg-[#6855d3] text-white hover:text-white"
                }`}
                variant="ghost"
              >
                <item.icon className="size-5 text-white" />
                <span className="text-sm font-medium">{item.name}</span>
              </Button>
            </Link>
          );
        })}
      </div>

      {/* Logout Button */}
      <Button
        className="hover:bg-[#8573f0] active:bg-[#6855d3] text-start w-full flex items-center gap-3 sticky bottom-5"
        variant="ghost"
        onClick={handleSubmit}
      >
        <LogOut className="size-5 text-white" />
        <span className="text-white text-sm font-medium">Logout</span>
      </Button>
    </aside>
  );
}

export default Sidebar;
