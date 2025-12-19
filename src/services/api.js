import API_BASE_URL from "../config/api";

export async function postImage(path, file) {
  const form = new FormData();
  form.append("image", file);

  const res = await fetch(`${API_BASE_URL}${path}`, {
    method: "POST",
    body: form,
  });

  // make errors readable
  const text = await res.text();
  try {
    return JSON.parse(text);
  } catch {
    return { raw: text };
  }
}
