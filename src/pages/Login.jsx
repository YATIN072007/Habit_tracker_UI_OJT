import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../components/Logo";

const USERS_KEY = "habitrix_users";
const ACTIVE_USER_KEY = "habitrix_activeUser";

export default function Login() {
  const navigate = useNavigate();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (!identifier || !password) {
      alert("Please enter your email/username and password.");
      return;
    }

    const raw = window.localStorage.getItem(USERS_KEY);
    const users = raw ? JSON.parse(raw) : {};
    const search = identifier.trim().toLowerCase();

    let matchedUsername = null;
    let matchedRecord = null;

    Object.entries(users).some(([key, user]) => {
      if (!user) return false;
      const userUsername = (user.username || key).toLowerCase();
      const userEmail = user.email ? user.email.toLowerCase() : null;
      if (userUsername === search || userEmail === search) {
        matchedUsername = user.username || key;
        matchedRecord = user;
        return true;
      }
      return false;
    });

    if (!matchedRecord || matchedRecord.password !== password) {
      alert("Invalid email/username or password.");
      return;
    }

    window.localStorage.setItem(ACTIVE_USER_KEY, matchedUsername);
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-[#6558F5] flex flex-col items-center justify-center text-white px-4">
      <h1 className="text-5xl font-bold mb-12 flex items-center gap-3">
        <Logo size={48} />
        Habitrix
      </h1>

      <div className="w-full max-w-md flex flex-col items-center gap-6">
        <input
          type="text"
          placeholder="Email or username"
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
          className="w-full bg-white text-gray-700 py-4 rounded-xl shadow-md text-center"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full bg-white text-gray-700 py-4 rounded-xl shadow-md text-center"
        />

        <button
          className="w-full bg-white text-gray-800 font-semibold py-4 rounded-xl shadow-md"
          onClick={handleLogin}
        >
          Login
        </button>

        <p className="text-sm mt-2 text-white/90">
          Dont have an account?{" "}
          <Link to="/signup" className="underline">
            Sign Up Here
          </Link>
        </p>
      </div>
    </div>
  );
}
