import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

import Login from "./pages/Login";
import Register from "./pages/Register";
import ApplyJob from "./pages/ApplyJob";
import HRDashboard from "./pages/HRDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import Jobs from "./pages/Jobs";
import MyApplications from "./pages/MyApplications"; 

function App() {

  return (

    <BrowserRouter>

      
      <div className="min-h-screen bg-gray-100 text-black">

        <Navbar />

        <div className="p-6 pt-24">

          <Routes>

            
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />

           
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

            
            <Route
              path="/my-applications"
              element={
                <ProtectedRoute allowedRole="APPLICANT">
                  <MyApplications />
                </ProtectedRoute>
              }
            />

            
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute allowedRole="HR">
                  <HRDashboard />
                </ProtectedRoute>
              }
            />

          
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