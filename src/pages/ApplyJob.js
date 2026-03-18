import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function ApplyJob() {

const { jobId } = useParams();
const navigate = useNavigate();

const [firstName, setFirstName] = useState("");
const [lastName, setLastName] = useState("");
const [email, setEmail] = useState("");
const [phone, setPhone] = useState("");
const [cv, setCv] = useState(null);

const handleSubmit = async (e) => {


e.preventDefault();

const formData = new FormData();

formData.append("firstName", firstName);
formData.append("lastName", lastName);
formData.append("email", email);
formData.append("phone", phone);
formData.append("cv", cv);
formData.append("jobId", jobId);

try {

  const response = await fetch("https://recruit-be-zdtc.onrender.com/applicant/apply", {
    method: "POST",
    body: formData
  });

  const result = await response.text();

  if (response.ok) {

    alert(result);

    // store email for MyApplications page
    localStorage.setItem("email", email);

    // redirect user to see their applications
    navigate("/my-applications");

  } else {

    alert(result);

  }

} catch (error) {

  console.error("Error submitting application:", error);
  alert("Something went wrong");

}


};

return (


<div className="flex items-center justify-center min-h-[calc(100vh-80px)] px-6">

  <div className="flex bg-white rounded-2xl shadow-xl overflow-hidden max-w-4xl w-full">

    {/* LEFT INFO / IMAGE */}
    <div className="hidden md:flex flex-col justify-center bg-gray-50 p-10 w-1/2">

      <img
        src="https://illustrations.popsy.co/gray/work-from-home.svg"
        alt="Job application illustration"
        className="w-64 mb-6"
      />

      <h3 className="text-xl font-bold mb-3">
        Apply for this position
      </h3>

      <p className="text-gray-600">
        Fill in your details and upload your CV to apply for this job.
        Our recruitment team will review your application and contact
        you if you are shortlisted.
      </p>

    </div>

    {/* APPLICATION FORM */}
    <div className="p-10 w-full md:w-1/2">

      <h2 className="text-2xl font-bold mb-6 text-center">
        Job Application
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          type="text"
          placeholder="First Name"
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Last Name"
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />

        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Phone Number"
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />

        <input
          type="file"
          className="w-full p-3 border rounded-lg"
          onChange={(e) => setCv(e.target.files[0])}
          required
        />

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white p-3 rounded-lg hover:bg-indigo-700 transition"
        >
          Submit Application
        </button>

      </form>

    </div>

  </div>

</div>


);

}

export default ApplyJob;
