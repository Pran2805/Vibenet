import { SquareActivity, User } from "lucide-react";

function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-background/10 backdrop-blur-md shadow-sm ">
      <div className="flex justify-between items-center px-10 py-4">
    
        <div className="flex items-center space-x-3">
          <SquareActivity className="size-6 text-[#8573f0]" />
          <h1 className="text-2xl font-bold text-white tracking-wide">Vibenet</h1>
        </div>

        <div className="flex items-center space-x-3">
          <div className="bg-[#8573f0] p-1 rounded-full">
            <User className="size-6 text-white" />
          </div>
          <span className="text-white font-medium">Personal Workspace</span>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
