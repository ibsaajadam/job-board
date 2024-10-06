export interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  description: string;
  applicants: number;
  requiredSkills: string[];
}