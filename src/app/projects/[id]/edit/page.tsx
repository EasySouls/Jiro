import DeleteProject from "@/components/projects/DeleteProject";
import EditProjectForm from "@/components/projects/EditProjectForm";
import { fetchProjectById } from "@/lib/actions/projectActions";
import React from "react";

const EditProjectPage = async ({ params }: { params: { id: string } }) => {
  const id = params.id;
  const project = await fetchProjectById(id);

  if (!project) {
    return <div>Project not found</div>;
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
