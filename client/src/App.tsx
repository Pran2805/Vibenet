import { Navigate, Route, Routes } from "react-router-dom"
import { useEffect, useMemo } from "react"

import SignIn from "./Pages/SignIn"
import SignUp from "./Pages/SignUp"
import VerifyEmail from "./Pages/VerifyEmail"
import HomePage from "./Pages/HomePage"
import Search from "./Pages/Search"
import CreatePost from "./Pages/CreatePost"
import Profile from "./Pages/Profile"
import Communities from "./Pages/Communities"
import Activity from "./Pages/Activity"
import NoPageFound from "./Pages/NoPageFound"
import Loading from "./Pages/Loading"

import StarsBackground from "./Components/StarBackground"
import { Toaster } from "react-hot-toast"
import { useAuthStore } from "./Store/useAuthStore"

function App() {
  const { authUser, checkAuth, isPending } : any= useAuthStore()

  useEffect(() => {
    if (!authUser) {
      checkAuth()
    }
  }, [authUser, checkAuth])


  const isVerified = useMemo(() => authUser && authUser.isVerified, [authUser])

  if (isPending) return <Loading />

  return (
    <div className="min-h-screen text-white overflow-x-hidden">
      <StarsBackground />
      <Toaster />
      <Routes>
        <Route
          path="/"
          element={isVerified ? <HomePage /> : <Navigate to="/signin" />}
        />
        <Route
          path="/signup"
          element={!authUser ? <SignUp /> : <Navigate to="/" />}
        />
        <Route
          path="/signin"
          element={!authUser ? <SignIn /> : <Navigate to="/" />}
        />
        <Route path="/verify-email/:id" element={<VerifyEmail />} />

        {/* Authenticated Routes */}
        <Route
          path="/activity"
          element={isVerified ? <Activity /> : <Navigate to="/signin" />}
        />
        <Route
          path="/search"
          element={isVerified ? <Search /> : <Navigate to="/signin" />}
        />
        <Route
          path="/create-post"
          element={isVerified ? <CreatePost /> : <Navigate to="/signin" />}
        />
        <Route
          path="/profile"
          element={isVerified ? <Profile /> : <Navigate to="/signin" />}
        />
        <Route
          path="/communities"
          element={isVerified ? <Communities /> : <Navigate to="/signin" />}
        />

        {/* Catch-all */}
        <Route path="*" element={<NoPageFound />} />
      </Routes>
    </div>
  )
}

export default App
