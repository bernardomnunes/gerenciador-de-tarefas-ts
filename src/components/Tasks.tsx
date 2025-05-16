import { ChevronRightIcon, Trash2Icon } from "lucide-react";
import { useNavigate } from "react-router-dom";

export interface Task {
  id: string;
  title: string;
  description: string;
  isCompleted: boolean;
}

function Tasks({
  tasks,
  onCompletedTaskClick,
  onDeleteTaskClick,
}: {
  tasks: Task[];
  onCompletedTaskClick: (itemId: string) => void;
  onDeleteTaskClick: (itemId: string) => void;
}) {
  const navigate = useNavigate();

  function onSeeDetailsClick(task: Task) {
    const query = new URLSearchParams();
    query.set("title", task.title);
    query.set("description", task.description);

    navigate(`/task?${query.toString()}`);
  }
  return (
    <ul className="space-y-4 p-6 bg-slate-200 rounded-md shadow">
      {tasks.map((task) => (
        <li key={task.id} className="flex gap-2">
          <button
            onClick={() => onCompletedTaskClick(task.id)}
            className={`bg-slate-400 w-full text-left text-white p-2 rounded-md ${
              task.isCompleted && "line-through"
            }`}
          >
            {task.title}
          </button>
          <button
            onClick={() => onSeeDetailsClick(task)}
            className="bg-slate-400 text-white p-2 rounded-md"
          >
            <ChevronRightIcon />
          </button>
          <button
            className="bg-slate-400 text-white p-2 rounded-md"
            onClick={() => onDeleteTaskClick(task.id)}
          >
            <Trash2Icon />
          </button>
        </li>
      ))}
    </ul>
  );
}

export default Tasks;
