'use client';

import { useState } from 'react';
import { Job } from '@/types/job';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

interface ApplyModalProps {
  job: Job;
  onClose: () => void;
}

export default function ApplyModal({ job, onClose }: ApplyModalProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [resume, setResume] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Application submitted:', { name, email, resume, jobId: job.id });
    onClose();
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Apply for {job.title}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="resume">Resume / Cover Letter</Label>
            <Textarea
              id="resume"
              value={resume}
              onChange={(e) => setResume(e.target.value)}
              required
            />
          </div>
          <DialogFooter>
            <Button type="submit" disabled={!name || !email || !resume}>
              Submit Application
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}