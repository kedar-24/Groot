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

  const handleSearch = () => {
    // Fetch jobs based on the selected filters
    fetch(`/api/jobs?jobType=${jobType}&workspace=${workspace}`)
      .then((res) => res.json())
      .then((data) => setJobs(data.jobs));
  };

  return (
    <div className="bg-gray-100 p-6">
      <div className="max-w-screen-xl mx-auto">
        <h1 className="text-3xl font-bold text-green-800 text-center">
          Recruitment Drives
        </h1>

        <div className="my-6">
          <h2 className="text-2xl font-semibold text-center">Job Listings</h2>
          <div className="flex justify-center space-x-6 mt-4">
            <select
              className="border border-gray-400 p-2 rounded"
              value={jobType}
              onChange={(e) => setJobType(e.target.value)}
            >
              <option value="">Select Job Type</option>
              <option value="full-time">Full-Time</option>
              <option value="part-time">Part-Time</option>
              <option value="internship">Internship</option>
            </select>

            <select
              className="border border-gray-400 p-2 rounded"
              value={workspace}
              onChange={(e) => setWorkspace(e.target.value)}
            >
              <option value="">Select Workspace</option>
              <option value="remote">Remote</option>
              <option value="on-site">On-Site</option>
            </select>

            <button
              onClick={handleSearch}
              className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-400"
            >
              Search Jobs
            </button>
          </div>
        </div>

        <div className="my-6">
          <h3 className="text-xl font-semibold text-center">
            Number of jobs found: {jobs.length}
          </h3>
          <div className="space-y-4 mt-6">
            {jobs.map((job) => (
              <div
                className="bg-white p-4 shadow-md rounded-lg max-w-full"
                key={job.id}
              >
                <h4 className="text-xl font-semibold">{job.title}</h4>
                <p className="text-gray-600">{job.location}</p>
                <button className="bg-blue-500 text-white py-1 px-4 rounded mt-2">
                  View Job
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecruitmentPage;
