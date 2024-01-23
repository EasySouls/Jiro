"use server";

import { z } from "zod";
import {
  collection,
  addDoc,
  getDoc,
  doc,
  Timestamp,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "@/lib/firebase/firebase";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { Project } from "../definitions/projects";

const ProjectSchema = z.object({
  id: z.string(),
  name: z.string({
    required_error: "Project name is required",
    invalid_type_error: "Project name must be a string",
  }),
  description: z.string({
    required_error: "Project description is required",
    invalid_type_error: "Project description must be a string",
  }),
  ownerId: z.string({
    invalid_type_error: "Please select a project owner",
  }),
  dateCreated: z.date(),
});

const CreateProject = ProjectSchema.omit({
  id: true,
  dateCreated: true,
});

// This is temporary until @types/react-dom is updated
export type State = {
  errors?: {
    customerId?: string[];
    amount?: string[];
    status?: string[];
  };
  message?: string | null;
};

export async function createProject(prevState: State, formData: FormData) {
  const validatedFields = CreateProject.safeParse({
    projectName: formData.get("projectName"),
    projectDescription: formData.get("projectDescription"),
    ownerId: formData.get("ownerId"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Validation error: Failed to create project.",
    };
  }

  const { name, description, ownerId } = validatedFields.data;
  const date = new Date();

  try {
    await addDoc(collection(db, "projects"), {
      name,
      description,
      ownerId,
      dateCreated: Timestamp.fromDate(date),
    });
    console.log(`Project ${name} created successfully`);
  } catch (e) {
    return {
      message: "Firestore error: Failed to create project.",
    };
  }

  revalidatePath("/projects");
  redirect("/projects");
}

const UpdateProject = ProjectSchema.pick({
  name: true,
  description: true,
});

export async function updateProject(id: string, formData: FormData) {
  const { name, description } = UpdateProject.parse({
    name: formData.get("projectName"),
    description: formData.get("projectDescription"),
  });

  const projectRef = doc(db, "projects", id);

  if (projectRef === null) {
    console.error(`Project with id ${id} does not exist`);
    return;
  }

  try {
    await updateDoc(projectRef, {
      name,
      description,
    });

    console.log(`Project ${name} updated successfully`);
  } catch (e) {
    return {
      message: "Firestore error: Failed to update project.",
    };
  } finally {
  }

  revalidatePath(`/projects/${id}`);
  redirect(`/projects/${id}`);
}

export async function deleteProject(id: string) {
  const projectRef = doc(db, "projects", id);

  if (projectRef === null) {
    console.error(`Project with id ${id} does not exist`);
    return;
  }

  await deleteDoc(projectRef);

  console.log(`Project ${id} deleted successfully`);

  revalidatePath("/projects");
  redirect("/projects");
}

export async function fetchProjectById(id: string) {
  const docRef = doc(db, "projects", id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data() as Project;
  } else {
    console.error(`Project with id ${id} does not exist`);
    return null;
  }
}
