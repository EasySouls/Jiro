import { Database, Tables } from "../lib/supabase/database.types";

export type Todo = Tables<"todos">;

export type Project = Tables<"projects">;
