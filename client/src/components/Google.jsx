import React from "react";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc"; // Google icon
import { app } from "../firebase";

export default function Google() {
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);

      const result = await signInWithPopup(auth, provider);

   const res = await fetch("/server/auth/google", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    name: result.user.displayName,
    email: result.user.email,
  }),
});

// Check if response is OK first
if (!res.ok) {
  const text = await res.text();
  console.error("Server error:", text);
  return;
}

const data = await res.json();

if (data?.otherDetails) {
  console.log("Google login successful:", data);
  navigate("/main");
} else {
  console.error("Login failed:", data);
}
    } catch (error) {
      console.error("Google login failed:", error);
    }
  };

  return (
    <div>
      <button
        onClick={handleGoogleLogin}
        className="flex items-center justify-center gap-2 
                   bg-white text-black py-2 px-4 rounded-full font-medium 
                   hover:bg-gray-200 transition shadow-md"
      >
        <FcGoogle className="w-5 h-5" />
        Continue with Google
      </button>
    </div>
  );
}