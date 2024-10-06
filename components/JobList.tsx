'use client';

import { useState } from 'react';
import { Job } from '@/types/job';
import JobCard from '@/components/JobCard';
import ApplyModal from '@/components/ApplyModal';

interface JobListProps {
  location: string;
  skills: { name: string; years: number }[];
}

export default function JobList({ location, skills }: JobListProps) {
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  // Mock job data with predefined locations and skills
  const jobs: Job[] = [
    {
      id: 1,
      title: 'Frontend Developer',
      company: 'TechCorp',
      location: 'New York, NY',
      description: 'We are looking for a skilled frontend developer with experience in React and TypeScript.',
      applicants: 15,
      requiredSkills: ['React', 'TypeScript', 'CSS'],
    },
    {
      id: 2,
      title: 'Backend Engineer',
      company: 'DataSystems',
      location: 'San Francisco, CA',
      description: 'Seeking a backend engineer proficient in Node.js and database design.',
      applicants: 8,
      requiredSkills: ['Node.js', 'MongoDB', 'Express'],
    },
    {
      id: 3,
      title: 'Full Stack Developer',
      company: 'WebSolutions',
      location: 'London, UK',
      description: 'Looking for a full stack developer with experience in React, Node.js, and Python.',
      applicants: 12,
      requiredSkills: ['React', 'Node.js', 'Python', 'PostgreSQL'],
    },
    {
      id: 4,
      title: 'Data Scientist',
      company: 'AI Innovations',
      location: 'San Francisco, CA',
      description: 'Seeking a data scientist with strong skills in machine learning and Python.',
      applicants: 20,
      requiredSkills: ['Python', 'Machine Learning', 'TensorFlow'],
    },
    {
      id: 5,
      title: 'DevOps Engineer',
      company: 'CloudTech',
      location: 'New York, NY',
      description: 'Looking for a DevOps engineer with experience in AWS and Kubernetes.',
      applicants: 10,
      requiredSkills: ['AWS', 'Kubernetes', 'Docker'],
    },
  ];

  const filteredJobs = jobs.filter((job) => {
    const locationMatch = job.location.toLowerCase().includes(location.toLowerCase());
    const skillsMatch = skills.every((skill) =>
      job.requiredSkills.some((jobSkill) => jobSkill.toLowerCase() === skill.name.toLowerCase())
    );
    return locationMatch && (skillsMatch || skills.length === 0);
  });

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold mb-4">Matching Jobs</h2>
      {filteredJobs.length === 0 ? (
        <p>No matching jobs found. Try adjusting your search criteria.</p>
      ) : (
        filteredJobs.map((job) => (
          <JobCard key={job.id} job={job} onApply={() => setSelectedJob(job)} />
        ))
      )}
      {selectedJob && (
        <ApplyModal job={selectedJob} onClose={() => setSelectedJob(null)} />
      )}
    </div>
  );
}