import { createProject } from "@/lib/actions/projectActions";
import React from "react";

const CreateProjectPage = () => {
  return (
    <div>
      <h1>Create your project</h1>
      <form action={createProject}>
        <input type='text' placeholder='Project name' />
        <input type='text' placeholder='Project description' />
        <button type='submit'>Create</button>
      </form>
    </div>
  );
};

export default CreateProjectPage;
