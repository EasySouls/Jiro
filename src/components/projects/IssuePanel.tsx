import { Issue } from "@/app/projects/[id]/issues/page";

const IssuePanel = ({ issue }: { issue: Issue }) => {
  return (
    <div
      className='flex flex-col justify-center items-center gap-2 
                  border-black text-black dark:border-white dark:text-white'
    >
      <h3>{issue.title}</h3>
      <p>{issue.description}</p>
      <p className='text-green-500'>{issue.type}</p>
      <p className='text-red-500'>{issue.priority}</p>
      {/** This is defaultChecked until changing the issues are implemented */}
      <input type='checkbox' defaultChecked={issue.completed} />
    </div>
  );
};

export default IssuePanel;
