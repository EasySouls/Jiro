"use client";

import { useState, useEffect } from "react";
import TodoItem from "@/components/todos/Todo";
import { createClient } from "@/lib/supabase/client";
import { Todo } from "@/definitions";

function TodosPage() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState<Todo>({
    id: 0,
    title: "",
    description: "",
    completed: false,
    created_at: "",
  });

  async function addTodo(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (newTodo.title === "") {
      return;
    }

    const supabase = createClient();

    const { data, error } = await supabase.from("todos").insert({
      title: newTodo.title.trim(),
      description: newTodo.description,
      completed: newTodo.completed,
    });

    if (error) {
      console.error(error);
      return;
    }

    setNewTodo({
      id: 0,
      title: "",
      description: "",
      completed: false,
      created_at: "",
    });
  }

  useEffect(() => {
    const supabase = createClient();

    // Fetch all todos
    supabase
      .from("todos")
      .select("*")
      .then(({ data, error }) => {
        if (error) {
          console.error(error);
          return;
        }

        setTodos(data as Todo[]);
      });

    const channel = supabase
      .channel("todos")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "todos",
        },
        (payload) => {
          setTodos([...todos, payload.new as Todo]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [todos]);

  async function deleteTodo(todoId: number) {
    const supabase = createClient();
    supabase.from("todos").delete().match({ id: todoId });
  }

  return (
    <main className='min-h-full flex flex-col items-center'>
      <h1 className='text-4xl mt-4 mb-1'>Todos</h1>
      <p className='text-xl'>Here is a list of all your todos.</p>
      <div className='bg-slate-600 p-4 mt-4 rounded-md w-1/3 min-w-fit'>
        <form className='flex gap-2' onSubmit={addTodo}>
          <input
            type='text'
            placeholder='Title'
            value={newTodo.title}
            onChange={(e) => {
              setNewTodo({
                ...newTodo,
                title: e.target.value,
              });
            }}
            className='text-black p-2'
          />
          <input
            type='text'
            placeholder='Description'
            value={newTodo.description!}
            onChange={(e) => {
              setNewTodo({
                ...newTodo,
                description: e.target.value,
              });
            }}
            className='text-black p-2'
          />
          <input
            type='checkbox'
            checked={newTodo.completed}
            onChange={(e) => {
              setNewTodo({
                ...newTodo,
                completed: e.target.checked,
              });
            }}
          />
          <button
            type='submit'
            className='bg-blue-600 rounded-lg p-2 hover:bg-blue-500 transition-colors duration-300'
          >
            Add
          </button>
        </form>

        {/* A list of the current todos */}
        <ul className='flex flex-col items-center w-full gap-4 mt-4'>
          {todos.map((todo, id) => (
            <li key={id}>
              <TodoItem todo={todo} deleteTodo={() => deleteTodo(todo.id)} />
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}

export default TodosPage;
