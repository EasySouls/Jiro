"use client";

export type Todo = {
  id: string;
  title: string;
  description: string;
  completed: boolean;
};

type TodoParams = {
  todo: Todo;
  deleteTodo: (todoId: string) => void;
};

const TodoItem = ({ todo, deleteTodo }: TodoParams) => {
  return (
    <div className='flex flex-col justify-center items-center w-[30rem] bg-blue-900 text-white p-2 rounded-lg'>
      <p className='capitalize text-lg'>{todo.title}</p>
      <p>{todo.description}</p>
      <div className='flex mt-2 items-center w-full justify-around'>
        <div className='flex gap-1'>
          <p>Completed: </p>
          <input
            type='checkbox'
            checked={todo.completed}
            className='hover:cursor-pointer'
          />
        </div>
        <input
          type='button'
          value='Delete'
          onClick={() => deleteTodo(todo.id!)}
          className='p-1 bg-red-600 rounded-lg hover:bg-red-700 hover:cursor-pointer transition-colors duration-300'
        />
      </div>
    </div>
  );
};

export default TodoItem;
