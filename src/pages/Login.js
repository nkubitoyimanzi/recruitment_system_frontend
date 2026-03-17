import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, Briefcase } from "lucide-react";

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {

    e.preventDefault();

    try {

      const response = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: email,
          password: password
        })
      });

      const data = await response.json();

      if (data.error) {
        alert(data.error);
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);
      localStorage.setItem("email", data.email);

      if (data.role === "ADMIN") {
        navigate("/admin");
      }
      else if (data.role === "HR") {
        navigate("/dashboard");
      }
      else if (data.role === "APPLICANT") {
        navigate("/jobs");
      }

    } catch (error) {

      console.error(error);
      alert("Login failed");

    }

  };

  return (

    <div className="min-h-screen flex">

      {/* LEFT SIDE */}
      <div className="hidden md:flex w-1/2 bg-gradient-to-br from-indigo-600 to-purple-700 text-white flex-col justify-center items-center p-10">

        <Briefcase size={60} />

        <h1 className="text-4xl font-bold mt-6">
          Recruitment System
        </h1>

        <p className="mt-4 text-lg text-center max-w-md">
          Manage job applications, track candidates, and streamline your hiring process with a powerful recruitment platform.
        </p>

      </div>


      {/* RIGHT SIDE */}
      <div className="flex w-full md:w-1/2 items-center justify-center bg-gray-100">

        <div className="bg-white shadow-2xl rounded-2xl p-10 w-96">

          <h2 className="text-2xl font-bold text-center mb-6">
            Welcome Back
          </h2>

          <form onSubmit={handleLogin} className="space-y-5">

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
              Sign In
            </button>

          </form>

        </div>

      </div>

    </div>

  );
}

export default Login;