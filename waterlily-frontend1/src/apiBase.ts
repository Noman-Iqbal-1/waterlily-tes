type ApiMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

interface ApiRequestOptions {
  method: ApiMethod;
  path: string;
  body?: unknown;
  headers?: Record<string, string>;
}

export async function apiRequest<T = unknown>({ method, path, body, headers = {} }: ApiRequestOptions): Promise<T> {
  const res = await fetch(`http://localhost:3000${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    ...(body ? { body: JSON.stringify(body) } : {}),
    cache: "no-store",
  });
  if (!res.ok) {
    let errorMsg = "API request failed";
    try {
      const data = await res.json();
      errorMsg = data.message || errorMsg;
    } catch {}
    throw new Error(errorMsg);
  }
  return res.json();
}
