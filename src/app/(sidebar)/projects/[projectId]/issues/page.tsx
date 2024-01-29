import IssuePanel from "@/components/projects/IssuePanel";
import React from "react";

const Issues = async ({ params }: { params: { id: string } }) => {
  const issues = await fetchIssuesByProjectId(params.id);

  return (
    <div>
      <h1>Issues</h1>
      <ul>
        {issues.map((issue) => (
          <li key={issue.id}>
            <IssuePanel issue={issue} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Issues;

export type Issue = {
  id: string;
  title: string;
  description: string;
  projectId: string;
  completed: boolean;
  type: "bug" | "feature";
  priority: "low" | "medium" | "high";
};

async function fetchIssuesByProjectId(id: string) {
  const randomIssues: Issue[] = [];

  for (let i = 0; i < 3; i++) {
    const randomId = Math.random().toString(36).substring(7);
    const randomTitle = `Issue ${i + 1}`;
    const randomDescription = `Description for Issue ${i + 1}`;
    const randomProjectId = id;
    const randomCompleted = Math.random() < 0.5;
    const randomType = Math.random() < 0.5 ? "bug" : "feature";
    const randomPriority = ["low", "medium", "high"][
      Math.floor(Math.random() * 3)
    ] as "low" | "medium" | "high";

    const randomIssue: Issue = {
      id: randomId,
      title: randomTitle,
      description: randomDescription,
      projectId: randomProjectId,
      completed: randomCompleted,
      type: randomType,
      priority: randomPriority,
    };

    randomIssues.push(randomIssue);
  }

  return randomIssues;
}
