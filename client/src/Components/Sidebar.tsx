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
import { Link } from "react-router-dom";
import { useAuthStore } from "@/Store/useAuthStore";

function Sidebar() {
    const {logout}: any = useAuthStore()
    const handleSubmit = () =>{
        logout()
    }
  const items = [
    { name: "Home", icon: Home, link: "/" },
    { name: "Search", icon: Search, link: "/search" },
    { name: "Activity", icon: Activity, link: "/activity" },
    { name: "Create Post", icon: Podcast, link: "/create-post" },
    { name: "Communities", icon: Users, link: "/communities" },
    { name: "Profile", icon: CircleUserIcon, link: "/profile" },
  ];

  return (
    <aside className="fixed left-0 top-[7.6%] h-[94%] bg-background/10  px-4 py-6 flex flex-col justify-between min-w-[250px]">
      {/* Top Section */}
      <div className="space-y-2 flex flex-col">
        {items.map((item, index) => (
          <Link to={item.link} key={index}>
            <Button
              className="hover:bg-[#8573f0] active:bg-[#6855d3] text-start w-full flex items-center gap-3"
              variant="ghost"
            >
              <item.icon className="size-5 text-white" />
              <span className="text-white text-sm font-medium">
                {item.name}
              </span>
            </Button>
          </Link>
        ))}
      </div>

      {/* Bottom Logout */}
      <Button
        className="hover:bg-[#8573f0] active:bg-[#6855d3] text-start w-full flex items-center gap-3"
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
