import DeleteProject from '@/components/projects/DeleteProject';
import EditProjectForm from '@/components/projects/EditProjectForm';
import { getProjectById } from '@/lib/actions/projectActions';
import { notFound } from 'next/navigation';
import React from 'react';

const EditProjectPage = async ({ params }: { params: { id: string } }) => {
  const id = params.id;
  const project = await getProjectById(id);

  if (!project) {
    notFound();
  }

  return (
    <div>
      <h1>Edit Project</h1>
      <EditProjectForm project={project} />
      <DeleteProject id={project.id} />
    </div>
  );
};

export default EditProjectPage;
