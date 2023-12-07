import { API_URL } from "./config";

export async function deleteTodoTask(taskId: string) {
  await fetch(`${API_URL}/todotasks/${taskId}`, {
    method: "DELETE",
  });
}
