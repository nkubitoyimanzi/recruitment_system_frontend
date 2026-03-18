import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Mail, Lock, User, Briefcase } from "lucide-react";

function Register() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "https://recruit-be-zdtc.onrender.com/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            password,
            role: "APPLICANT",
          }),
        }
      );

      // Handle server errors properly
      if (!response.ok) {
        const text = await response.text(); // safer than json()
        throw new Error(text || "Server error");
      }

      const data = await response.json();

      alert(data.message || "Registered successfully");

      navigate("/");

    } catch (error) {
      console.error("ERROR:", error);
      alert("Registration failed");
    }
  };

  return (

    <div className="min-h-screen flex">

      {/* LEFT SIDE */}
      <div className="hidden md:flex w-1/2 bg-gradient-to-br from-purple-600 to-indigo-700 text-white flex-col justify-center items-center p-10">

        <Briefcase size={60} />

        <h1 className="text-4xl font-bold mt-6">
          Join Our Platform
        </h1>

        <p className="mt-4 text-lg text-center max-w-md">
          Create your account and start applying for jobs, track your applications,
          and build your professional career.
        </p>

      </div>


      {/* RIGHT SIDE */}
      <div className="flex w-full md:w-1/2 items-center justify-center bg-gray-100">

        <div className="bg-white shadow-2xl rounded-2xl p-10 w-96">

          <h2 className="text-2xl font-bold text-center mb-6">
            Create Account
          </h2>

          <form onSubmit={handleRegister} className="space-y-5">

            {/* NAME */}
            <div className="relative">

              <User className="absolute left-3 top-3 text-gray-400" size={18} />

              <input
                type="text"
                placeholder="Full name"
                className="w-full pl-10 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />

            </div>


            {/* EMAIL */}
            <div className="relative">

              <Mail className="absolute left-3 top-3 text-gray-400" size={18} />

              <input
                type="email"
                placeholder="Email address"
                className="w-full pl-10 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

            </div>


            {/* PASSWORD */}
            <div className="relative">

              <Lock className="absolute left-3 top-3 text-gray-400" size={18} />

              <input
                type="password"
                placeholder="Password"
                className="w-full pl-10 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

            </div>


            {/* BUTTON */}
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white p-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
            >
              Create Account
            </button>

          </form>


          {/* LOGIN LINK */}
          <p className="text-center text-sm text-gray-500 mt-6">
            Already have an account?{" "}
            <Link to="/" className="text-indigo-600 font-semibold hover:underline">
              Sign in
            </Link>
          </p>

        </div>

      </div>

    </div>

  );
}

export default Register;