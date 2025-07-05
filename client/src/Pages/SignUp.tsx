import Robot from "@/Animation/Robot"
import { Button } from "@/Components/ui/button"
import { Input } from "@/Components/ui/input"
import { useAuthStore } from "@/Store/useAuthStore"
import { CircleUserRound, Eye, EyeOff, Loader, Lock, Mail } from "lucide-react"
import { useState } from "react"
import { Link } from "react-router-dom"

function SignUp() {
  const [eye, setEye] = useState(false)
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")


  const {signup, isPending}: any = useAuthStore()
  const handleSubmit = ()=>{
    const formData = {
      username,
      email,
      password
    }

    signup(formData)

  }

  return (
    <main className="flex items-center justify-center h-screen bg-black text-white">
      <div className="relative border-2 border-white rounded-2xl animate-border-glow min-w-[80vw] max-w-6xl h-[85vh] flex md:flex-row justify-between items-center px-6 py-10 shadow-xl overflow-hidden bg-black/80 backdrop-blur-md">
        
        <div className="absolute top-0 left-0 w-1/2 h-full bg-white/90 opacity-10 pointer-events-none" />

        <div className="absolute bottom-0 right-0 w-1/2 h-full bg-blue-500/10 blur-2xl opacity-20 pointer-events-none" />

        {/* Form Section */}
        <div className="w-full md:w-[50%] px-10 z-10 ">
          <h1 className="text-4xl font-bold text-center mb-10 text-white tracking-wide">
            Create Account
          </h1>

          {/* Username */}
          <div className="relative mb-6">
            <CircleUserRound className="size-6 absolute top-2 left-2 text-gray-300" />
            <Input
              placeholder="Username"
              type="text"
              className="pl-10 pr-3 py-5 w-full bg-transparent border border-gray-500 text-white placeholder-gray-400 rounded-md focus:ring-2 focus:ring-white"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          {/* Email */}
          <div className="relative mb-6">
            <Mail className="size-6 absolute top-2 left-2 text-gray-300" />
            <Input
              placeholder="Email"
              type="email"
              className="pl-10 pr-3 py-5 w-full bg-transparent border border-gray-500 text-white placeholder-gray-400 rounded-md focus:ring-2 focus:ring-white"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password */}
          <div className="relative mb-6">
            <Lock className="size-6 absolute top-2 left-2 text-gray-300" />
            <Input
              placeholder="Password"
              type={eye ? "text" : "password"}
              className="pl-10 pr-10 py-5 w-full bg-transparent border border-gray-500 text-white placeholder-gray-400 rounded-md focus:ring-2 focus:ring-white"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {eye ? (
              <Eye
                className="size-6 absolute top-2 right-2 cursor-pointer text-gray-300"
                onClick={() => setEye(false)}
              />
            ) : (
              <EyeOff
                className="size-6 absolute top-2 right-2 cursor-pointer text-gray-300"
                onClick={() => setEye(true)}
              />
            )}
          </div>

          {/* Button */}
          <Button variant='blue' className="w-full" onClick={handleSubmit}>
            {isPending ?(
              <>
              <Loader className="size-5 animate-spin transition-all" />
              </>
            ): ('Sign Up')}
          </Button>

          {/* Links */}
          <div className="flex justify-between mt-6 text-sm text-blue-400">
            <Link to="/signin" className="hover:underline">
              Already have an account?
            </Link>
            <Link to="/signin" className="hover:underline">
              Login
            </Link>
          </div>
        </div>

        {/* Robot Section */}
        <div className="hidden md:flex w-1/2 h-full justify-center items-center z-10">
          <Robot />
        </div>

        {/* Glowing Border Animation */}
        <style>
          {`
            @keyframes glow {
              0% { box-shadow: 0 0 10px #ffffff22, 0 0 20px #ffffff33; }
              50% { box-shadow: 0 0 25px #ffffff66, 0 0 40px #ffffffaa; }
              100% { box-shadow: 0 0 10px #ffffff22, 0 0 20px #ffffff33; }
            }

            .animate-border-glow {
              animation: glow 3s ease-in-out infinite;
            }
          `}
        </style>
      </div>
    </main>
  )
}

export default SignUp
