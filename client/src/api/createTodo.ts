import { API_URL } from "./config";

export async function createTodo(title: string) {
  const response = await fetch(`${API_URL}/todotasks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title,
    }),
  });
  return response.json();
}
