import { Link } from "react-router-dom";
import Logo from "../components/Logo";

export default function Signup() {
  return (
    <div className="min-h-screen bg-[#6558F5] flex flex-col items-center justify-center text-white px-4">
      <h1 className="text-5xl font-bold mb-12 flex items-center gap-3">
        <Logo size={48} />
        Habitrix
      </h1>

      <div className="w-full max-w-md flex flex-col items-center gap-6">
        <input
          type="text"
          placeholder="User"
          className="w-full bg-white text-gray-700 py-4 rounded-xl shadow-md text-center"
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full bg-white text-gray-700 py-4 rounded-xl shadow-md text-center"
        />
        <input
          type="password"
          placeholder="Re-type Password"
          className="w-full bg-white text-gray-700 py-4 rounded-xl shadow-md text-center"
        />
        <button className="w-full bg-white text-gray-800 font-semibold py-4 rounded-xl shadow-md">
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