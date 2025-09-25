import Navbar from "@/Components/Navbar"
import { Input } from "@/Components/ui/input"
import { UserRoundSearch } from "lucide-react"


function Search() {
  return (
    <div className="w-screen">
     <Navbar />
     <div className="mx-4 md:ml-[300px] mt-20">
      <div className="relative">
        <UserRoundSearch className="text-background/40 top-2 left-3 absolute size-6" />
      <Input className="py-3 pl-12" type="search" />

      </div>
      </div> 
    </div>
  )
}

export default Search
