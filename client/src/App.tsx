import { Navigate, Route, Routes } from "react-router-dom"
import SignIn from "./Pages/SignIn"
import SignUp from "./Pages/SignUp"
import VerifyEmail from "./Pages/VerifyEmail"
import HomePage from "./Pages/HomePage"
import { useAuthStore } from "./Store/useAuthStore"
import { Toaster } from 'react-hot-toast';
import { useEffect } from "react"
import Search from "./Pages/Search"
import CreatePost from "./Pages/CreatePost"
import Profile from "./Pages/Profile"
import Communities from "./Pages/Communities"
import StarsBackground from "./Components/StarBackground"
import NoPageFound from "./Pages/NoPageFound"
import Loading from "./Pages/Loading"
import Activity from "./Pages/Activity"

function App() {
  const {authUser, checkAuth, isPending}: any = useAuthStore()

 useEffect(() => {
    if (!authUser) {
      checkAuth();
    }
  }, [authUser, checkAuth]);

  if (isPending) {
    return (
     
        <Loading />
    
    );
  }

  return (
   <div className=" min-h-screen text-white overflow-x-hidden">
    <StarsBackground />
      <Toaster />
      <Routes>
        <Route path="/" element={authUser && authUser.isVerified ? <HomePage /> : <Navigate to="/signin" />} />
        <Route path="/signup" element={!authUser ? <SignUp /> : <Navigate to="/" />} />
        <Route path="/signin" element={!authUser ? <SignIn /> : <Navigate to="/" />} />
        <Route path="/verify-email/:id" element={<VerifyEmail />} />

        {/* Authenticated Pages */}
        <Route path="/activity" element={authUser && authUser.isVerified ? <Activity /> : <Navigate to="/signin" />} />
        <Route path="/search" element={authUser && authUser.isVerified ? <Search /> : <Navigate to="/signin" />} />
        <Route path="/create-post" element={authUser && authUser.isVerified ? <CreatePost /> : <Navigate to="/signin" />} />
        <Route path="/profile" element={authUser && authUser.isVerified ? <Profile /> : <Navigate to="/signin" />} />
        <Route path="/communities" element={authUser && authUser.isVerified ? <Communities /> : <Navigate to="/signin" />} />

        {/* No Page Found */}
        <Route path="*" element={<NoPageFound />} />
      </Routes>
    </div>
  )
}

export default App
