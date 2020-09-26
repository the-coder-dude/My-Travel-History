const API_URL = "http://localhost:1880";

export async function listTravelHistories() {
  const response = await fetch(`${API_URL}/routes/history`);

  return response.json();
}
