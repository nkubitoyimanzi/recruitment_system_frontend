
import { useEffect, useState } from "react";
import { PlusCircle, Briefcase, Trash2 } from "lucide-react";

function AdminDashboard() {

  const [jobs, setJobs] = useState([]);
  const [activePage, setActivePage] = useState("create");

  const [title, setTitle] = useState("");
  const [department, setDepartment] = useState("");
  const [location, setLocation] = useState("");
  const [deadline, setDeadline] = useState("");
  const [description, setDescription] = useState("");

  const fetchJobs = async () => {
    const response = await fetch("https://recruit-be-zdtc.onrender.com/admin/jobs");
    const data = await response.json();
    setJobs(data || []);
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const createJob = async (e) => {

    e.preventDefault();

    await fetch("https://recruit-be-zdtc.onrender.com/admin/jobs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        title,
        department,
        location,
        deadline,
        description
      })
    });

    setTitle("");
    setDepartment("");
    setLocation("");
    setDeadline("");
    setDescription("");

    fetchJobs();
    setActivePage("jobs");
  };

  const deleteJob = async (id) => {

    await fetch(`https://recruit-be-zdtc.onrender.com/admin/jobs/${id}`, {
      method: "DELETE"
    });

    fetchJobs();
  };

  return (

    <div className="flex min-h-screen bg-gray-100">

      {/* SIDEBAR */}
      <div className="w-64 bg-white shadow-lg p-6">

        <h2 className="text-2xl font-bold mb-10 text-center">
          Admin Panel
        </h2>

        <button
          onClick={() => setActivePage("create")}
          className={`flex items-center gap-2 w-full p-3 rounded-lg mb-3 
          ${activePage === "create" ? "bg-indigo-600 text-white" : "hover:bg-gray-200"}`}
        >
          <PlusCircle size={18} />
          Create Job
        </button>

        <button
          onClick={() => setActivePage("jobs")}
          className={`flex items-center gap-2 w-full p-3 rounded-lg 
          ${activePage === "jobs" ? "bg-indigo-600 text-white" : "hover:bg-gray-200"}`}
        >
          <Briefcase size={18} />
          Jobs List
        </button>

      </div>


      {/* MAIN CONTENT */}
      <div className="flex-1 p-10">

        {/* CREATE JOB PAGE */}
        {activePage === "create" && (

          <div className="flex justify-center items-center min-h-[80vh] gap-10">

            {/* LEFT INFO + IMAGE */}
            <div className="hidden lg:flex flex-col justify-center max-w-md">

              <img
                src="https://illustrations.popsy.co/gray/work-from-home.svg"
                alt="job creation"
                className="w-80 mb-6"
              />

              <h3 className="text-xl font-bold mb-3">
                Create New Job Opportunities
              </h3>

              <p className="text-gray-600">
                Add a new job posting to your recruitment system. Applicants
                will be able to view this position and submit their
                applications.
              </p>

              <ul className="mt-4 text-gray-600 list-disc list-inside space-y-1">
                <li>Provide a clear job title</li>
                <li>Specify department and location</li>
                <li>Set an application deadline</li>
                <li>Add a detailed job description</li>
              </ul>

            </div>


            {/* CREATE JOB FORM */}
            <div className="bg-white p-10 rounded-2xl shadow-xl w-[600px]">

              <h2 className="text-3xl font-bold mb-8 text-center">
                Create Job
              </h2>

              <form onSubmit={createJob} className="space-y-5">

                <input
                  type="text"
                  placeholder="Job Title"
                  className="w-full p-3 border rounded-lg"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />

                <input
                  type="text"
                  placeholder="Department"
                  className="w-full p-3 border rounded-lg"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  required
                />

                <input
                  type="text"
                  placeholder="Location"
                  className="w-full p-3 border rounded-lg"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  required
                />

                <input
                  type="date"
                  className="w-full p-3 border rounded-lg"
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                  required
                />

                <textarea
                  placeholder="Job Description"
                  className="w-full p-3 border rounded-lg"
                  rows="4"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />

                <button className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700">
                  Create Job
                </button>

              </form>

            </div>

          </div>

        )}


        {/* JOB LIST PAGE */}
        {activePage === "jobs" && (

          <div className="bg-white p-8 rounded-2xl shadow-lg">

            <h2 className="text-2xl font-bold mb-6">
              Jobs List
            </h2>

            <div className="overflow-y-auto max-h-[500px]">

              <table className="w-full table-auto">

                <thead className="bg-gray-50 border-b">

                  <tr>

                    <th className="p-3 text-left">Title</th>
                    <th className="p-3 text-left">Department</th>
                    <th className="p-3 text-left">Location</th>
                    <th className="p-3 text-left">Deadline</th>
                    <th className="p-3 text-center">Action</th>

                  </tr>

                </thead>

                <tbody>

                  {jobs.map(job => (

                    <tr key={job.id} className="border-b hover:bg-gray-50">

                      <td className="p-3">{job.title}</td>
                      <td className="p-3">{job.department}</td>
                      <td className="p-3">{job.location}</td>
                      <td className="p-3">{job.deadline}</td>

                      <td className="p-3 text-center">

                        <button
                          onClick={() => deleteJob(job.id)}
                          className="flex items-center gap-1 bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 mx-auto"
                        >
                          <Trash2 size={16} />
                          Delete
                        </button>

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          </div>

        )}

      </div>

    </div>

  );
}

export default AdminDashboard;

