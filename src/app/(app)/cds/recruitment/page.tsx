"use client";

import React, { useState } from "react";
import Button from "@/components/button";
import ValueCard from "@/components/ValueCard";
import Dropdown from "@/components/Dropdown";

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
    setLoading(true);
    fetch(`/api/jobs?jobType=${jobType}&workspace=${workspace}`)
      .then((res) => res.json())
      .then((data) => {
        setJobs(data.jobs);
        setLoading(false);
      });
  };

  return (
    <div className="bg-gray-50 py-12 px-4 min-h-screen">
      <div className="max-w-screen-xl mx-auto">
        <h1 className="text-3xl font-bold text-green-800 text-center mb-8">
          Recruitment Drives
        </h1>

        {/* Filters */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-center mb-4">
            Job Listings
          </h2>
          <div className="flex flex-col items-center gap-3">
            <div className="flex flex-row gap-x-3">
              <Dropdown
                aria-label="Select Job Type"
                value={jobType}
                onChange={(e) => setJobType(e.target.value)}
                options={[
                  { value: "", label: "Select Job Type" },
                  { value: "full-time", label: "Full-Time" },
                  { value: "part-time", label: "Part-Time" },
                  { value: "internship", label: "Internship" },
                ]}
              />
              <Dropdown
                aria-label="Select Workspace"
                value={workspace}
                onChange={(e) => setWorkspace(e.target.value)}
                options={[
                  { value: "", label: "Select Workspace" },
                  { value: "remote", label: "Remote" },
                  { value: "on-site", label: "On-Site" },
                ]}
              />
            </div>
            <Button
              variant="red"
              className="w-auto min-w-[120px] mt-2"
              onClick={handleSearch}
              disabled={loading}
              type="button"
            >
              {loading ? "Searching..." : "Search Jobs"}
            </Button>
          </div>
        </section>

        {/* Job Results */}
        <section>
          {jobs.length === 0 && !loading ? (
            <h3 className="text-xl font-semibold text-center text-gray-600">
              No jobs found. Try adjusting your search filters.
            </h3>
          ) : (
            <h3 className="text-xl font-semibold text-center">
              {jobs.length} Job(s) Found
            </h3>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {loading ? (
              <div className="col-span-full text-center text-lg text-gray-500">
                Loading jobs...
              </div>
            ) : (
              jobs.map((job) => (
                <ValueCard key={job.id} title={job.title}>
                  <p className="text-gray-600 mb-2">{job.location}</p>
                  <Button
                    as="a"
                    href={`/cds/recruitment/jobs/${job.id}`}
                    variant="primary"
                    className="mt-2"
                  >
                    View Job
                  </Button>
                </ValueCard>
              ))
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default RecruitmentPage;
