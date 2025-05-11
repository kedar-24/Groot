"use client";

import React, { useState } from "react";

interface Job {
  id: string;
  title: string;
  location: string;
}

const RecruitmentPage: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [jobType, setJobType] = useState<string>("");
  const [workspace, setWorkspace] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSearch = () => {
    setLoading(true); // Start loading
    fetch(`/api/jobs?jobType=${jobType}&workspace=${workspace}`)
      .then((res) => res.json())
      .then((data) => {
        setJobs(data.jobs);
        setLoading(false); // Stop loading
      });
  };

  return (
    <div className="bg-gray-100 p-6">
      <div className="max-w-screen-xl mx-auto">
        <h1 className="text-3xl font-bold text-green-800 text-center mb-6">
          Recruitment Drives
        </h1>

        <div className="my-6">
          <h2 className="text-2xl font-semibold text-center mb-4">
            Job Listings
          </h2>
          <div className="flex justify-center space-x-6 mt-4">
            <select
              aria-label="Select Job Type"
              className="border border-gray-400 p-2 rounded-lg"
              value={jobType}
              onChange={(e) => setJobType(e.target.value)}
            >
              <option value="">Select Job Type</option>
              <option value="full-time">Full-Time</option>
              <option value="part-time">Part-Time</option>
              <option value="internship">Internship</option>
            </select>

            <select
              aria-label="Select Workspace"
              className="border border-gray-400 p-2 rounded-lg"
              value={workspace}
              onChange={(e) => setWorkspace(e.target.value)}
            >
              <option value="">Select Workspace</option>
              <option value="remote">Remote</option>
              <option value="on-site">On-Site</option>
            </select>

            <button
              onClick={handleSearch}
              className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-400 transition duration-200"
              disabled={loading}
            >
              {loading ? "Searching..." : "Search Jobs"}
            </button>
          </div>
        </div>

        <div className="my-6">
          {jobs.length === 0 && !loading ? (
            <h3 className="text-xl font-semibold text-center text-gray-600">
              No jobs found. Try adjusting your search filters.
            </h3>
          ) : (
            <h3 className="text-xl font-semibold text-center">
              {jobs.length} Job(s) Found
            </h3>
          )}
          <div className="space-y-4 mt-6">
            {loading ? (
              <div className="text-center text-lg text-gray-500">
                Loading jobs...
              </div>
            ) : (
              jobs.map((job) => (
                <div
                  className="bg-white p-6 shadow-md rounded-lg hover:shadow-xl transition duration-300"
                  key={job.id}
                >
                  <h4 className="text-xl font-semibold text-green-800">
                    {job.title}
                  </h4>
                  <p className="text-gray-600">{job.location}</p>
                  <button className="bg-blue-500 text-white py-2 px-4 rounded mt-4 hover:bg-blue-600 transition duration-200">
                    View Job
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecruitmentPage;
