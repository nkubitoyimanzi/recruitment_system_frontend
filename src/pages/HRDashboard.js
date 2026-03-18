import { useEffect, useState, useCallback } from "react";
import { Search, CheckCircle, XCircle, Trash2 } from "lucide-react";

function HRDashboard() {

  const [applications, setApplications] = useState([]);
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState("");
  const [totalPages, setTotalPages] = useState(0);

  // const fetchApplications = async () => {

  //   const response = await fetch(
  //     `http://localhost:8080/hr/applications?page=${page}&size=10&search=${search}`
  //   );

  //   const data = await response.json();

  //   setApplications(data.content || []);
  //   setTotalPages(data.totalPages || 0);
  // };
  const fetchApplications = useCallback(async () => {
    try {
      const response = await fetch(
        `https://recruit-be-zdtc.onrender.com/hr/applications?page=${page}&size=10&search=${search}`
      );

      const data = await response.json();

      setApplications(data.content || []);
      setTotalPages(data.totalPages || 0);
    } catch (error) {
      console.error("Error fetching applications:", error);
    }
  }, [page, search]);

  useEffect(() => {
    fetchApplications();
  }, [fetchApplications]);


  const acceptApplication = async (id) => {

    await fetch(`https://recruit-be-zdtc.onrender.com/hr/accept/${id}`, {
      method: "PUT"
    });

    fetchApplications();
  };


  const rejectApplication = async (id) => {

    const reason = prompt("Enter rejection reason:");

    if (!reason) {
      alert("Rejection reason is required");
      return;
    }

    await fetch(
      `https://recruit-be-zdtc.onrender.com/hr/reject/${id}?reason=${encodeURIComponent(reason)}`,
      { method: "PUT" }
    );

    fetchApplications();
  };


  const deleteApplication = async (id) => {

    await fetch(`https://recruit-be-zdtc.onrender.com/hr/delete/${id}`, {
      method: "DELETE"
    });

    fetchApplications();
  };


  const statusStyle = (status) => {

    if (status === "ACCEPTED")
      return "bg-green-100 text-green-700";

    if (status === "REJECTED")
      return "bg-red-100 text-red-700";

    return "bg-yellow-100 text-yellow-700";
  };


  return (

    <div className="min-h-screen bg-gray-100 py-10 px-6">

      <div className="max-w-7xl mx-auto">

        <h1 className="text-3xl font-bold mb-6">
          List of applicants
        </h1>


        
        <div className="mb-6 relative w-72">

          <Search className="absolute left-3 top-3 text-gray-400" size={18} />

          <input
            type="text"
            placeholder="Search by last name..."
            value={search}
            onChange={(e) => {
              setPage(0);
              setSearch(e.target.value);
            }}
            className="w-full pl-10 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

        </div>


       
        <div className="bg-white shadow-lg rounded-2xl overflow-hidden">

          <table className="w-full table-auto text-left">

            <thead className="bg-gray-50 border-b">

              <tr className="text-gray-600 text-sm">
                <th className="p-4">First Name</th>
                <th className="p-4">Last Name</th>
                <th className="p-4">Email</th>
                <th className="p-4">Phone</th>
                <th className="p-4">CV</th>
                <th className="p-4">Job</th>
                <th className="p-4">Status</th>
                <th className="p-4">Reason</th>
                <th className="p-4">Actions</th>
              </tr>

            </thead>

            <tbody>

              {applications.map(app => (

                <tr key={app.id} className="border-b hover:bg-gray-50">

                  <td className="p-4">{app.firstName}</td>
                  <td className="p-4">{app.lastName}</td>
                  <td className="p-4 truncate max-w-[180px]">{app.email}</td>
                  <td className="p-4">{app.phone}</td>

                  
                  <td className="p-4">
                    {app.cvUrl ? (
                      <a
                        href={app.cvUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-600 underline"
                      >
                        View CV
                      </a>
                    ) : (
                      <span className="text-gray-400">No CV</span>
                    )}
                  </td>

                  <td className="p-4">
                    {app.job ? app.job.title : "Not specified"}
                  </td>

                  <td className="p-4">
                    <span className={`px-3 py-1 text-sm rounded-full ${statusStyle(app.status)}`}>
                      {app.status}
                    </span>
                  </td>

                  <td className="p-4 text-sm text-gray-600 truncate max-w-[200px]">
                    {app.rejectionReason ? app.rejectionReason : "-"}
                  </td>

                  <td className="p-4 flex flex-wrap gap-2">

                    <button
                      onClick={() => acceptApplication(app.id)}
                      className="flex items-center gap-1 bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                    >
                      <CheckCircle size={16} />
                      Accept
                    </button>

                    <button
                      onClick={() => rejectApplication(app.id)}
                      className="flex items-center gap-1 bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                    >
                      <XCircle size={16} />
                      Reject
                    </button>

                    <button
                      onClick={() => deleteApplication(app.id)}
                      className="flex items-center gap-1 bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
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


        
        <div className="flex justify-center items-center mt-8 gap-6">

          <button
            onClick={() => setPage(page - 1)}
            disabled={page === 0}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 disabled:opacity-50"
          >
            Previous
          </button>

          <span>
            Page {page + 1} of {totalPages}
          </span>

          <button
            onClick={() => setPage(page + 1)}
            disabled={page + 1 >= totalPages}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 disabled:opacity-50"
          >
            Next
          </button>

        </div>

      </div>

    </div>
  );
}

export default HRDashboard;