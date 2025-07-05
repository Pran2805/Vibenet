import Background from "@/Animation/Background"
import { useAuthStore } from "@/Store/useAuthStore";
import { useLocation, useNavigate } from "react-router-dom";

export default function VerifyEmail() {
const location = useLocation();
const token = location.pathname.split('/')[2]
  
const navigate = useNavigate()
const {verifyEmail}: any = useAuthStore()
const handleSubmit = async() =>{
  try {
    verifyEmail(token)
    navigate('/')
  } catch (error) {
    
  }
}
  return (
    <main className="relative w-screen h-screen overflow-hidden text-white bg-black">

      {/* ✅ Full-screen animated 3D background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Background />
      </div>

      {/* ✅ Content Card */}
      <div className="flex items-center justify-center h-screen">

      <div className="relative z-10 flex flex-col md:flex-row items-center justify-center gap-10 p-8 rounded-2xl w-full max-w-5xl bg-black/80 border border-white/10 shadow-2xl backdrop-blur-md">
        
        <div className="w-full md:w-1/2 text-center">
          <h2 className="text-4xl font-bold mb-4">Check your inbox!</h2>
          <p className="text-gray-300 mb-8">
            We've sent a verification link to your email.
            <br /> Please click it and come back here.
          </p>
          <button onClick={handleSubmit} className="bg-white/10 border border-white/30 px-8 py-3 rounded-lg text-white font-semibold hover:bg-white/20 transition-all duration-300 shadow-lg">
            I've Verified – Continue
          </button>
        </div>
      </div>
      </div>
    </main>
  )
}
