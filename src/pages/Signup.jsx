import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../components/Logo";

const USERS_KEY = "habitrix_users";
const ACTIVE_USER_KEY = "habitrix_activeUser";

export default function Signup() {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignup = () => {
    if (!fullName || !email || !username || !password || !confirmPassword) {
      alert("Please fill in all fields.");
      return;
    }

    const trimmedEmail = email.trim();
    const trimmedUsername = username.trim();

    if (!trimmedEmail.includes("@")) {
      alert("Please enter a valid email address.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    const raw = window.localStorage.getItem(USERS_KEY);
    const users = raw ? JSON.parse(raw) : {};

    if (users[trimmedUsername]) {
      alert("An account with that username already exists.");
      return;
    }

    const lowerEmail = trimmedEmail.toLowerCase();
    const emailTaken = Object.values(users).some(
      (user) => user.email && user.email.toLowerCase() === lowerEmail
    );
    if (emailTaken) {
      alert("An account with that email already exists.");
      return;
    }

    users[trimmedUsername] = {
      username: trimmedUsername,
      name: fullName.trim(),
      email: trimmedEmail,
      password,
      habits: [],
      notes: [],
      dob: "",
      gender: "",
      bio: "",
      avatarDataUrl: "",
    };

    window.localStorage.setItem(USERS_KEY, JSON.stringify(users));
    window.localStorage.setItem(ACTIVE_USER_KEY, trimmedUsername);

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
          placeholder="Full name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className="w-full bg-white text-gray-700 py-4 rounded-xl shadow-md text-center"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full bg-white text-gray-700 py-4 rounded-xl shadow-md text-center"
        />
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full bg-white text-gray-700 py-4 rounded-xl shadow-md text-center"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full bg-white text-gray-700 py-4 rounded-xl shadow-md text-center"
        />
        <input
          type="password"
          placeholder="Confirm password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full bg-white text-gray-700 py-4 rounded-xl shadow-md text-center"
        />
        <button
          className="w-full bg-white text-gray-800 font-semibold py-4 rounded-xl shadow-md"
          onClick={handleSignup}
        >
          Sign Up
        </button>

        <p className="text-sm mt-2 text-white/90">
          Already have an account?{" "}
          <Link to="/login" className="underline">
            Login Here
          </Link>
        </p>
      </div>
    </div>
  );
}
