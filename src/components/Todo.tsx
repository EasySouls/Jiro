"use client";

type TodoParams = {
  title: string;
  description: string;
  completed: boolean;
};

const Todo = ({ title, description, completed }: TodoParams) => {
  return (
    <div>
      <p>{title}</p>
      <p>{description}</p>
      <input type='checkbox' checked={completed} />
      <input type='button' value='Delete' />
    </div>
  );
};

export default Todo;
