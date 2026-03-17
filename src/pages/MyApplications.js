import { useEffect, useState } from "react";

function MyApplications() {

  const [applications, setApplications] = useState([]);

  const email = localStorage.getItem("email");

  useEffect(() => {

    fetch(`http://localhost:8080/applicant/my-applications/${email}`)
      .then(res => res.json())
      .then(data => setApplications(data));

  }, [email]);

  return (

    <div className="p-10">

      <h1 className="text-3xl font-bold mb-6">
        My Applications
      </h1>

      <table className="w-full border">

        <thead className="bg-gray-200">
          <tr>
            <th className="p-2">Job</th>
            <th className="p-2">Status</th>
            <th className="p-2">Rejection Reason</th>
          </tr>
        </thead>

        <tbody>

          {applications.map(app => (

            <tr key={app.id} className="border">

              <td className="p-2">
                {app.job ? app.job.title : "Unknown"}
              </td>

              <td className="p-2">
                {app.status}
              </td>

              <td className="p-2">
                {app.rejectionReason ? app.rejectionReason : "-"}
              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}

export default MyApplications;