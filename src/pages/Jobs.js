import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MapPin, Building2, CalendarDays, Search } from "lucide-react";

function Jobs() {

  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");

  const fetchJobs = async () => {

    try {

      const response = await fetch("https://recruit-be-production-dc35.up.railway.app/api/jobs");
      const data = await response.json();

      if (Array.isArray(data)) {
        setJobs(data);
      } else {
        console.error("Expected array but got:", data);
        setJobs([]);
      }

    } catch (error) {
      console.error("Error fetching jobs:", error);
      setJobs([]);
    }

  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const filteredJobs = jobs.filter(job =>
    job.title.toLowerCase().includes(search.toLowerCase())
  );

  return (

    <div className="min-h-screen bg-gray-100 p-10">

      {/* HEADER */}
      <div className="mb-10">

        <h1 className="text-4xl font-bold mb-4">
          Available Opportunities
        </h1>

        <p className="text-gray-600 mb-6">
          Find your next career opportunity and apply in minutes.
        </p>

        {/* SEARCH BAR */}
        <div className="relative max-w-md">

          <Search className="absolute left-3 top-3 text-gray-400" size={18} />

          <input
            type="text"
            placeholder="Search job titles..."
            className="w-full pl-10 p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

        </div>

      </div>


      {/* JOB LIST */}
      {filteredJobs.length === 0 ? (

        <div className="text-center text-gray-500 mt-20">
          No jobs available right now.
        </div>

      ) : (

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

          {filteredJobs.map(job => (

            <div
              key={job.id}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition p-6 flex flex-col justify-between"
            >

              <div>

                <h2 className="text-xl font-bold mb-3">
                  {job.title}
                </h2>

                <div className="space-y-2 text-gray-600 text-sm">

                  <div className="flex items-center gap-2">
                    <Building2 size={16} />
                    {job.department}
                  </div>

                  <div className="flex items-center gap-2">
                    <MapPin size={16} />
                    {job.location}
                  </div>

                  <div className="flex items-center gap-2">
                    <CalendarDays size={16} />
                    Deadline: {job.deadline}
                  </div>

                </div>

                <p className="mt-4 text-gray-700 text-sm line-clamp-3">
                  {job.description}
                </p>

              </div>


              <Link
                to={`/apply/${job.id}`}
                className="mt-6 inline-block text-center bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700 transition"
              >
                Apply Now
              </Link>

            </div>

          ))}

        </div>

      )}

    </div>

  );
}

export default Jobs;