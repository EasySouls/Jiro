"use client";

import { createProject } from "@/lib/actions/projectActions";
import { useFormState } from "react-dom";

// TODO: Set up authentication, so we can send the user's id with the request.

const CreateProjectForm = () => {
  const initialState = { message: null, error: {} };
  const [state, dispatch] = useFormState(createProject, initialState);

  return <form action={dispatch}></form>;
};

export default CreateProjectForm;
