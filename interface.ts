interface Task {
 id: number;
 name: string;
 description: string;
 priority: "Low" | "Medium" | "High";
 isComplete: boolean;
}

export default Task