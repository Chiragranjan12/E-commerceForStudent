type ApiErrorResponse = {
  error?: string;
  message?: string;
  [key: string]: unknown;
};

class ApiError extends Error {
  response?: {
    status: number;
    data: ApiErrorResponse;
  };

  constructor(message: string, response?: { status: number; data: ApiErrorResponse }) {
    super(message);
    this.response = response;
  }
}

type RequestOptions = {
  params?: Record<string, string | number | boolean | undefined>;
  body?: unknown;
};

const baseURL = "http://localhost:8080/api";

function withAuthHeaders(headers: HeadersInit): HeadersInit {
  const token = localStorage.getItem("token");
  if (!token) return headers;
  return {
    ...headers,
    Authorization: `Bearer ${token}`,
  };
}

function buildUrl(path: string, params?: RequestOptions["params"]): string {
  if (!params) return `${baseURL}${path}`;

  const searchParams = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value === undefined) continue;
    searchParams.set(key, String(value));
  }

  const query = searchParams.toString();
  return query ? `${baseURL}${path}?${query}` : `${baseURL}${path}`;
}

async function request<T>(method: string, path: string, options?: RequestOptions) {
  const url = buildUrl(path, options?.params);

  const headers = withAuthHeaders({
    "Content-Type": "application/json",
  });

  const res = await fetch(url, {
    method,
    headers,
    body: options?.body !== undefined ? JSON.stringify(options.body) : undefined,
  });

  if (res.ok) {
    // Axios returns `response.data` already parsed; preserve that shape here.
    // Some endpoints (e.g. DELETE) may not return JSON. Cast `undefined` to `T`.
    let json: T;
    try {
      json = (await res.json()) as T;
    } catch {
      json = undefined as unknown as T;
    }
    return { data: json, status: res.status };
  }

  const parsed = (await res.json().catch(() => ({}))) as ApiErrorResponse;
  throw new ApiError(`Request failed with status ${res.status}`, {
    status: res.status,
    data: parsed,
  });
}

const api = {
  get: async <T>(
    path: string,
    options?: { params?: RequestOptions["params"] }
  ): Promise<{ data: T; status: number }> => request<T>("GET", path, options),

  post: async <T,>(path: string, body?: unknown): Promise<{ data: T; status: number }> =>
    request<T>("POST", path, { body }),

  put: async <T,>(path: string, body?: unknown): Promise<{ data: T; status: number }> =>
    request<T>("PUT", path, { body }),

  delete: async <T,>(path: string): Promise<{ data: T; status: number }> =>
    request<T>("DELETE", path),
};

export default api;
