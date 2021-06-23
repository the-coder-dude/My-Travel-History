const API_URL = "https://my-travel-history-api.herokuapp.com";  //REST API URL

export async function listTravelHistories() {
  const response = await fetch(`${API_URL}/routes/history`);

  return response.json();
}

export async function createTravelEntry(entry) {
  const response = await fetch(`${API_URL}/routes/history`,{

      method : 'POST',
      headers: {

        'content-type': 'application/json',

      },

      body: JSON.stringify(entry),
  });

  return response.json();
}