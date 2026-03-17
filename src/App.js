import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

import Login from "./pages/Login";
import Register from "./pages/Register";
import ApplyJob from "./pages/ApplyJob";
import HRDashboard from "./pages/HRDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import Jobs from "./pages/Jobs";
import MyApplications from "./pages/MyApplications"; // NEW

function App() {

  return (

    <BrowserRouter>

      {/* Clean white layout */}
      <div className="min-h-screen bg-gray-100 text-black">

        <Navbar />

        <div className="p-6 pt-24">

          <Routes>

            {/* Public pages */}
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Applicant pages */}
            <Route
              path="/jobs"
              element={
                <ProtectedRoute allowedRole="APPLICANT">
                  <Jobs />
                </ProtectedRoute>
              }
            />

            <Route
              path="/apply/:jobId"
              element={
                <ProtectedRoute allowedRole="APPLICANT">
                  <ApplyJob />
                </ProtectedRoute>
              }
            />

            {/* NEW: Applicant can see their applications */}
            <Route
              path="/my-applications"
              element={
                <ProtectedRoute allowedRole="APPLICANT">
                  <MyApplications />
                </ProtectedRoute>
              }
            />

            {/* HR pages */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute allowedRole="HR">
                  <HRDashboard />
                </ProtectedRoute>
              }
            />

            {/* Admin pages */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute allowedRole="ADMIN">
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />

          </Routes>

        </div>

      </div>

    </BrowserRouter>

  );
}

export default App;