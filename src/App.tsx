import { useEffect, useState } from "react";
import AddTasks from "./components/AddTask";
import Tasks from "./components/Tasks";
import { v4 } from "uuid";
import { Task } from "./components/Tasks";

function App() {
  const data = localStorage.getItem("tasks");
  console.log(data);
  const [tasks, setTasks] = useState<Task[]>(
    data ? (JSON.parse(data) as Task[]) : []
  );

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // useEffect(() => {
  //   async function fetchTasks() {
  //     const response = await fetch(
  //       "https://jsonplaceholder.typicode.com/todos?_limit=10",
  //       {
  //         method: "GET",
  //       }
  //     );
  //     const data = await response.json();

  //     setTasks((state) => [...state, data]);
  //   }
  //   fetchTasks();
  // }, []);

  function onCompletedTaskClick(taskId: string) {
    const newTasks = tasks.map((task: Task) => {
      if (task.id === taskId) {
        return {
          ...task,
          isCompleted: !task.isCompleted,
        };
      }

      return task;
    });

    setTasks(newTasks);
  }

  function onDeleteTaskClick(taskId: string) {
    const newTasks = tasks.filter((task: Task) => task.id !== taskId);

    setTasks(newTasks);
  }

  function onAddTaskSubmit(title: string, description: string) {
    const newTask = {
      id: v4(),
      title,
      description,
      isCompleted: false,
    };

    setTasks((state: Task[]) => [...state, newTask]);
  }

  return (
    <div className="w-screen h-screen bg-slate-500 flex justify-center p-6">
      <div className="w-[500px] space-y-4">
        <h1 className="text-3xl text-slate-100 font-bold text-center">
          Gerenciador de Tarefas
        </h1>
        <AddTasks onAddTaskSubmit={onAddTaskSubmit} />
        <Tasks
          tasks={tasks}
          onCompletedTaskClick={onCompletedTaskClick}
          onDeleteTaskClick={onDeleteTaskClick}
        />
      </div>
    </div>
  );
}

export default App;
