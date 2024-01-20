"use client";

import { useState, useEffect } from "react";
import TodoItem, { Todo } from "@/components/Todo";
import {
  collection,
  addDoc,
  query,
  onSnapshot,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { getAnalytics, logEvent } from "firebase/analytics";
import { db, analytics } from "@/lib/firebase/firebase";

function TodosPage() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState<Todo>({
    id: "",
    title: "",
    description: "",
    completed: false,
  });

  /**
   * @description
   * Uploads the new todo to Firestore, then resets the newTodo state.
   * @param e React.FormEvent<HTMLFormElement>
   */
  async function addTodo(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (newTodo.title === "") {
      return;
    }

    await addDoc(collection(db, "todos"), {
      title: newTodo.title.trim(),
      description: newTodo.description,
      completed: newTodo.completed,
    });

    setNewTodo({ id: "", title: "", description: "", completed: false });
  }

  /**
   * @description
   * Fetches all the todos from Firestore and sets the todos state.
   */
  useEffect(() => {
    // async function logAnalytics() {
    //   analytics.then((analytics) => {
    //     if (analytics) {
    //       analytics &&
    //         logEvent(analytics, "page_view", {
    //           page_title: "Todos",
    //           page_location: window.location.href,
    //           page_path: window.location.pathname,
    //         });
    //     } else {
    //       console.log("Analytics not available");
    //     }
    //   });
    // }
    // logAnalytics();
    const _analytics = getAnalytics();
    logEvent(_analytics, "page_view", {
      page_title: "Todos",
      page_location: window.location.href,
      page_path: window.location.pathname,
    });

    const q = query(collection(db, "todos"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const todos: Todo[] = [];
      querySnapshot.forEach((doc) => {
        todos.push({ ...doc.data(), id: doc.id } as Todo);
      });
      setTodos(todos);
    });

    return () => unsubscribe();
  }, []);

  /**
   * @description
   * Deletes a todo from Firestore.
   * @param todoId string
   */
  async function deleteTodo(todoId: string) {
    await deleteDoc(doc(db, "todos", todoId));
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
            value={newTodo.description}
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
              <TodoItem todo={todo} deleteTodo={() => deleteTodo(todo.id!)} />
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}

export default TodosPage;
