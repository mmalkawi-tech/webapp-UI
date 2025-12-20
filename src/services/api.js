import API_BASE_URL from "../config/api";

export async function postImage(path, file) {
  const form = new FormData();
  if (file) {
    form.append("image", file);
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10000); // 10s

  try {
    const res = await fetch(`${API_BASE_URL}${path}`, {
      method: "POST",
      body: form,
      signal: controller.signal,
    });

    const text = await res.text();

    if (!res.ok) {
      return {
        error: true,
        status: res.status,
        message: text || res.statusText,
      };
    }

    try {
      return JSON.parse(text);
    } catch {
      return { raw: text };
    }

  } catch (err) {
    return {
      error: true,
      message: err.name === "AbortError"
        ? "Request timed out"
        : err.message,
    };
  } finally {
    clearTimeout(timeout);
  }
}
