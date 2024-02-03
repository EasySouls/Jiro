import { Database, Tables } from '../lib/supabase/database.types';

export type Todo = Tables<'todos'>;

//export type Project = Tables<'projects'>;
export type Project = any;

export type Post = Tables<'posts'>;

export type Comment = Tables<'comments'>;
