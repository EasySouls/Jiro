import { Project } from '@/definitions';
import React from 'react';

const ProjectPanel = ({ project }: { project: Project }) => {
  return (
    <div className='bg-white shadow-md rounded-md px-8 pt-6 pb-8'>
      <h4 className='font-semibold'>{project.name}</h4>
      <p>{project.description}</p>
      <p>Created: {Date.parse(project.created_at)}</p>
    </div>
  );
};

export default ProjectPanel;
