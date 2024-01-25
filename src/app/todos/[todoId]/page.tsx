import { createClient } from "@/lib/supabase/client";
import { notFound } from "next/navigation";

export const revalidate = 0;

const TodoPage = async ({
  params: { todoId },
}: {
  params: { todoId: string };
}) => {
  const supabase = createClient();
  const { data: todo } = await supabase
    .from("todos")
    .select()
    .match({ id: todoId })
    .single();

  if (!todo) {
    notFound();
  }

  return (
    <div>
      <h3>{todo.title}</h3>
      <p>{todo.description}</p>
      <p>{todo.created_at}</p>
    </div>
  );
};
export default TodoPage;
