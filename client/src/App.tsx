import { Navigate, Route, Routes } from "react-router-dom"
import SignIn from "./Pages/SignIn"
import SignUp from "./Pages/SignUp"
import VerifyEmail from "./Pages/VerifyEmail"
import HomePage from "./Pages/HomePage"
import { useAuthStore } from "./Store/useAuthStore"
import { Toaster } from 'react-hot-toast';
import { useEffect } from "react"

function App() {
  const {authUser, checkAuth}: any = useAuthStore()

  useEffect(() => {
  if (!authUser) {
    checkAuth();
  }
}, [checkAuth]);
  return (
   <div className="bg-black min-h-screen text-white">
      <Toaster />
      <Routes>
        <Route path="/signup" element={!authUser ? <SignUp /> : <Navigate to="/" />} />
        <Route path="/signin" element={!authUser ? <SignIn /> : <Navigate to="/" />} />
        <Route path="/verify-email/:id" element={<VerifyEmail />} />
        <Route path="/" element={authUser && authUser.isVerified ? <HomePage /> : <Navigate to="/signin" />} />
      </Routes>
    </div>
  )
}

export default App
