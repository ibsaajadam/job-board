import { Job } from '@/types/job';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';

interface JobCardProps {
  job: Job;
  onApply: () => void;
}

export default function JobCard({ job, onApply }: JobCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{job.title}</CardTitle>
        <CardDescription>{job.company} - {job.location}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="mb-2">{job.description}</p>
        <p className="text-sm text-gray-500">Required Skills: {job.requiredSkills.join(', ')}</p>
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <span className="text-sm text-gray-500">{job.applicants} applicants</span>
        <Button onClick={onApply}>Apply Now</Button>
      </CardFooter>
    </Card>
  );
}