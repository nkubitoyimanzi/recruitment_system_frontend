import { Link } from "react-router-dom";

function Navbar() {

  return (

    <nav className="fixed top-0 left-0 w-full bg-white border-b shadow-sm z-50">

      <div className="flex justify-between items-center px-10 py-4">

        <h1 className="text-xl font-bold font-serif text-black">
          Recruitment System
        </h1>

        <div className="space-x-6 text-gray-700">

          <Link to="/" className="hover:text-black">
            Login
          </Link>

          <Link to="/register" className="hover:text-black">
            Register
          </Link>

          <Link to="/jobs" className="hover:text-black">
            Jobs
          </Link>

          <Link to="/dashboard" className="hover:text-black">
            HR Dashboard
          </Link>

          <Link to="/admin" className="hover:text-black">
            Admin Dashboard
          </Link>

        </div>

      </div>

    </nav>

  );
}

export default Navbar;