"use client";

import Todo from "@/components/Todo";
import { useState } from "react";

type Todo = {
  id: number;
  title: string;
  description: string;
  completed: boolean;
};

function TodosPage() {
  const [todos, setTodos] = useState<Todo[]>([
    {
      id: 1,
      title: "Learn React",
      description: "Learn React and TypeScript",
      completed: false,
    },
    {
      id: 2,
      title: "Learn GraphQL",
      description: "Learn GraphQL and Apollo Client",
      completed: false,
    },
    {
      id: 3,
      title: "Learn Next.js",
      description: "Learn Next.js and SSR",
      completed: true,
    },
  ]);

  return (
    <main className='min-h-full flex flex-col items-center'>
      <h1>Todos</h1>
      <p>Here is a list of all your todos.</p>
      <form className='bg-black flex'>
        <input type='text' placeholder='Title' />
        <input type='text' placeholder='Description' />
        <button type='submit'>Add</button>
      </form>

      {/* A list of the current todos */}
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <Todo
              title={todo.title}
              description={todo.description}
              completed={todo.completed}
            />
          </li>
        ))}
      </ul>
    </main>
  );
}

export default TodosPage;
