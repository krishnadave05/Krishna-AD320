import React, { useState, useEffect } from "react"
import axios from "axios"
import jwt from "jwt-decode"
import { useNavigate } from "react-router-dom"

const AuthContext = React.createContext(null)

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (token) {
      const decoded = jwt(token)
      if (decoded.exp * 1000 < Date.now()) {
        localStorage.removeItem("token")
        setAuth(null)
      } else {
        setAuth({ token, user: decoded.user })
      }
    }
  }, [])

  const login = async (email, password, callback) => {
    console.log("[Login]")
    try {
      const authResponse = await axios.post(
        "http://localhost:8000/auth/login",
        { email: email, password: password },
        { "content-type": "application/json" }
      )
      const decoded = jwt(authResponse.data.token)
      localStorage.setItem("token", authResponse.data.token)
      setAuth({ token: authResponse.data.token, user: decoded.user })
      callback()
    } catch (err) {
      console.log(`Login error ${err}`)
      // Assignment: what should we do if this fails?
      //navigate back to login page
      navigate("/login")
    }
  }

  const register = (email, password, callback) => {
    // Assignment: how do we register someone?
    console.log("[Register]")
    try {
      const authResponse = axios.post(
        "http://localhost:8000/auth/register",
        { email: email, password: password },
        { "content-type": "application/json" }
      )
      callback()
    } catch (err) {
      console.log(`Register error ${err}`)
      navigate("/login")
    }
  }

  const authCtx = {
    auth: auth,
    login: login,
    register: register,
  }

  return <AuthContext.Provider value={authCtx}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const authContext = React.useContext(AuthContext)
  return authContext
}

export default AuthProvider
