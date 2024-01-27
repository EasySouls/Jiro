import { Project } from '@/definitions';
import { updateProject } from '@/lib/actions/projectActions';

const EditProjectForm = ({ project }: { project: Project }) => {
  const updateProjectWithId = updateProject.bind(null, project.id);

  return (
    <form action={updateProjectWithId}>
      <input type='hidden' name='id' value={project.id} />
      <input
        name='projectName'
        type='text'
        placeholder='Project name'
        defaultValue={project.name}
      />
      <input
        name='projectDescription'
        type='text'
        placeholder='Project description'
        defaultValue={project.description}
      />
      <button type='submit'>Update</button>
    </form>
  );
};

export default EditProjectForm;
