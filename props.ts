import Task from "./interface";


interface Props{
    tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

export default Props;