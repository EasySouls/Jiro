import { Database, Tables } from '../lib/supabase/database.types';

export type Todo = Tables<'todos'>;

//export type Project = Tables<'projects'>;
export type Project = Tables<'projects'>;

export type Post = Tables<'posts'>;

export type Comment = Tables<'comments'>;

export type Profile = Tables<'profiles'>;

export type Organization = Tables<'organizations'>;

export type Task = Tables<'tasks'>;
