interface DataType {
  id: number;
  title: string;
}

export const fetchTasks = async () => {
  const response = await fetch("https://my-json-server.typicode.com/typicode/demo/posts");
  if (!response.ok) {
    throw new Error("Tasks could not be loaded.");
  }
  const data = await response.json();
  return data as DataType[];
};