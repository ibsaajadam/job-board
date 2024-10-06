'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import JobList from '@/components/JobList';
import { Job } from '@/types/job';

export default function JobBoard() {
  const [location, setLocation] = useState('');
  const [skills, setSkills] = useState<{ name: string; years: number }[]>([]);
  const [currentSkill, setCurrentSkill] = useState('');
  const [currentYears, setCurrentYears] = useState(1);
  const [showJobs, setShowJobs] = useState(false);

  const addSkill = () => {
    if (currentSkill.trim() !== '') {
      setSkills([...skills, { name: currentSkill.trim(), years: currentYears }]);
      setCurrentSkill('');
      setCurrentYears(1);
    }
  };

  const editSkill = (index: number, newName: string) => {
    const updatedSkills = [...skills];
    updatedSkills[index].name = newName;
    setSkills(updatedSkills);
  };

  const deleteSkill = (index: number) => {
    const updatedSkills = skills.filter((_, i) => i !== index);
    setSkills(updatedSkills);
  };

  const handleSearch = () => {
    setShowJobs(true);
  };

  return (
    <div className="space-y-6">
      <div>
        <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
          Desired Work Location
        </label>
        <Input
          id="location"
          type="text"
          placeholder="Enter desired location (e.g., New York, San Francisco, London)"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="skill" className="block text-sm font-medium text-gray-700 mb-1">
          Skills (e.g., React, Node.js, Python)
        </label>
        <div className="flex space-x-2">
          <Input
            id="skill"
            type="text"
            placeholder="Enter a skill"
            value={currentSkill}
            onChange={(e) => setCurrentSkill(e.target.value)}
          />
          <Button onClick={addSkill}>Add Skill</Button>
        </div>
      </div>
      {currentSkill && (
        <div>
          <label htmlFor="years" className="block text-sm font-medium text-gray-700 mb-1">
            Years of Experience: {currentYears}
          </label>
          <Slider
            id="years"
            min={1}
            max={5}
            step={1}
            value={[currentYears]}
            onValueChange={(value) => setCurrentYears(value[0])}
          />
        </div>
      )}
      <div className="space-y-2">
        {skills.map((skill, index) => (
          <div key={index} className="flex items-center space-x-2">
            <Input
              value={skill.name}
              onChange={(e) => editSkill(index, e.target.value)}
              className="w-1/2"
            />
            <span>{skill.years} years</span>
            <Button onClick={() => deleteSkill(index)} variant="destructive" size="sm">
              Delete
            </Button>
          </div>
        ))}
      </div>
      <Button onClick={handleSearch} className="w-full">
        Search Jobs
      </Button>
      {showJobs && <JobList location={location} skills={skills} />}
    </div>
  );
}