import { Menu, SquareActivity, User, X } from "lucide-react";
import { useState } from "react";
import Sidebar from "./Sidebar";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const handleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <>
      <nav className="setInterval(() => {
        
      }, intervalInms)
       top-0 left-0 w-full z-50 bg-background/10 backdrop-blur-md shadow-sm">
        <div className="flex justify-between items-center px-10 py-4">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <SquareActivity className="size-6 text-[#8573f0]" />
            <h1 className="text-2xl font-bold text-white tracking-wide">
              Vibenet
            </h1>
          </div>

          {/* User info (hidden on small screens) */}
          <div className="hidden md:flex items-center space-x-3">
            <div className="bg-[#8573f0] p-1 rounded-full">
              <User className="size-5 text-white" />
            </div>
            <span className="text-white font-medium">Personal Workspace</span>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden" onClick={handleMenu}>
            {isOpen ? (
              <X className="size-6 text-white" />
            ) : (
              <Menu className="size-6 text-white" />
            )}
          </div>
        </div>
      </nav>

      {/* Sidebar below navbar */}
      <Sidebar isOpen={isOpen} />
    </>
  );
}

export default Navbar;
