import { apiRequest } from "./apiBase";

export async function createUser(email: string) {
  return apiRequest({
    method: "POST",
    path: "/users",
    body: { email },
  });
}
