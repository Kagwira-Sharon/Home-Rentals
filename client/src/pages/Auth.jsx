import { useState } from "react";
import { User, Lock, Mail,Eye ,EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";


export default function Auth() {
  const [isRegister, setIsRegister] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [formData, setFormData] = useState({})
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

//Track changes made to input fields and update formData state accordingly
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  }
  
//push to db after sign up
const handleRegister = async(e) => {
    e.preventDefault();
    try{
    setLoading(true);

    const res=await fetch("/server/auth/register",{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify(formData)
    });
    const data = await res.json();
    if(data.success===false){
        setError(data.message);
         setLoading(false);
        return;
    }
   setLoading(false);
    setError(null);
    setIsRegister(false);
   
} catch(error){
    setLoading(false);
   setError(error.message);}
}
//handle login
const handleLogin = async(e) => {
  e.preventDefault();
    try{
    setLoading(true);

    const res=await fetch("/server/auth/login",{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify(formData)
    });
    const data = await res.json();
    if(data.success===false){
        setError(data.message);
         setLoading(false);
        return;
    }
   setLoading(false);
    setError(null);
    
   navigate("/main");
} catch(error){
    setLoading(false);
   setError(error.message);}
}
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0b0f19] p-4">
      
      {/* Main Card */}
      <div className="relative w-[850px] h-[600px] rounded-xl 
        bg-gradient-to-br from-teal-400 to-cyan-500
        border border-cyan-400/40 
        shadow-[0_0_40px_rgba(0,255,255,0.3)] 
        overflow-hidden">

        {/* Diagonal Background */}
        <div
          className={`absolute inset-0  transition-all duration-700 ease-in-out
          ${isRegister ? "clip-left" : "clip-right"}
          bg-[#0b0f19]
          `}
        />

        {/* Content Wrapper */}
        <div className="relative z-10 flex h-full">
            

          {/* LEFT PANEL */}
          <div className=" w-1/2 flex flex-col justify-center px-3 text-white">
            {!isRegister ? (
              <>
                <h2 className="text-3xl font-semibold text-center mb-8">Login</h2>

               
                {/* Username */}
                <div  onChange={handleChange} className="mb-6 border-b border-gray-600 flex items-center">
                  <User size={18} className="mr-2 text-gray-400" />
                  <input
                    type="email"
                    placeholder="Email"
                    id="email"
                    className="bg-transparent w-full py-2 outline-none"
                  />
                </div>

                {/* Password */}
                <div  onChange={handleChange} className="mb-2 border-b border-gray-600 flex items-center">
                  <Lock size={18} className="mr-2 text-gray-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    id="password"
                    className="bg-transparent w-full py-2 outline-none"
                  />
                  <span
                    onClick={() => setShowPassword(!showPassword)}
                    className="cursor-pointer text-gray-400"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </span>
                </div>

                {/* Forgot Password */}
                <div className="text-right text-sm mb-6">
                  <span className="text-cyan-400 cursor-pointer hover:underline">
                    Forgot password?
                  </span>
                </div>

                <button  onClick={handleLogin} className="bg-gradient-to-r from-cyan-400 to-teal-500 
                  text-black py-2 rounded-full font-semibold 
                  hover:scale-105 transition mb-4">
                  Login
                </button>

                {/* Google Login */}
                <button className="flex items-center justify-center gap-2 
                  bg-white text-black py-2 rounded-full font-medium 
                  hover:bg-gray-200 transition">
                  <img
                    src="https://www.svgrepo.com/show/475656/google-color.svg"
                    alt="google"
                    className="w-5 h-5"
                  />
                  Continue with Google
                </button>

                <p className="mt-6 text-sm text-gray-400">
                  Dont have an account?{" "}
                  <span
                    onClick={() => setIsRegister(true)}
                    className="text-cyan-400 cursor-pointer hover:underline"
                  >
                    Sign up
                  </span>
                </p> 
                {error&& <p className="text-red-500 mt-5">{error}</p>}
              </>
            ) : (
              <h1 className="text-left text-3xl font-bold">WELCOME!</h1>
            )}
          </div>


              {/* RIGHT SIDE */}
          <div className="w-1/2 flex flex-col justify-center px-2 py-1 text-white">
            {isRegister ? (
              <>
                <h2 className="text-3xl font-semibold mb-8 text-center ">Register</h2>

                {/* Username */}
                <div className="mb-6 border-b border-gray-600 flex items-center">
                  <User size={18} className="mr-2 text-gray-400" />
                  <input
                    type="text" id="name" onChange={handleChange}
                    placeholder="Username"
                    className="bg-transparent w-full py-2 outline-none"
                  />
                </div>

                {/* Email */}
                <div className="mb-6 border-b border-gray-600 flex items-center">
                  <Mail size={18} className="mr-2 text-gray-400" />
                  <input
                    type="email" id="email" onChange={handleChange}
                    placeholder="Email"
                    className="bg-transparent w-full py-2 outline-none"
                  />
                </div>

                {/* Password */}
                <div className="mb-6 border-b border-gray-600 flex items-center">
                  <Lock size={18} className="mr-2 text-gray-400" />
                  <input
                    type={showPassword ? "text" : "password"} id="password" onChange={handleChange}
                    placeholder="Password"
                    className="bg-transparent w-full py-2 outline-none"
                  />
                  <span
                    onClick={() => setShowPassword(!showPassword)}
                    className="cursor-pointer text-gray-400"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </span>
                </div>

                {/* Confirm Password */}
                <div className="mb-8 border-b border-gray-600 flex items-center">
                  <Lock size={18} className="mr-2 text-gray-400" />
                  <input
                    type={showConfirm ? "text" : "password"}
                    placeholder="Confirm Password"
                    className="bg-transparent w-full py-2 outline-none"
                  />
                  <span
                    onClick={() => setShowConfirm(!showConfirm)}
                    className="cursor-pointer text-gray-400"
                  >
                    {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                  </span>
                </div>

                <button onClick={handleRegister}  disabled={loading} className="bg-gradient-to-r from-cyan-400 to-teal-500 
                  text-black py-2 rounded-full font-semibold 
                  hover:scale-105 transition mb-4">
                  
                  {loading ? "loading..." : "Register"}
                </button>

                {/* Google Signup */}
                <button className="flex items-center justify-center gap-2 
                  bg-white text-black py-2 rounded-full font-medium 
                  hover:bg-gray-200 transition">
                  <img
                    src="https://www.svgrepo.com/show/475656/google-color.svg"
                    alt="google"
                    className="w-5 h-5"
                  />
                  Sign up with Google
                </button>

                <p className="mt-6 text-sm text-gray-400">
                  Already have an account?{" "}
                  <span
                    onClick={() => setIsRegister(false)}
                    className="text-cyan-400 cursor-pointer hover:underline"
                  >
                    Sign in
                  </span>
                </p>
                {error&& <p className="text-red-500 mt-5">{error}</p>}
              </>
            ) : (
              <h1 className="text-3xl font-bold text-right">
                WELCOME BACK!
              </h1>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}