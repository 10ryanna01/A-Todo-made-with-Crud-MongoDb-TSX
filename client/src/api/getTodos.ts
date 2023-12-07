import { API_URL } from "./config";

export type TodoCards = {
  title: string;
  _id: string;
};

export async function getTodosTask(): Promise<TodoCards[]> {
  const response = await fetch(`${API_URL}/todotasks`);
  return response.json();
}
