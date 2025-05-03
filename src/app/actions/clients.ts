export async function fetchAllClients() {
  const res = await fetch(`${process.env.API_URL}/api/clients`);
  if (!res.ok) {
    throw new Error("Failed to fetch clients");
  }
  const data = await res.json();
  return data;
}

export async function createClient(clientData: any) {
  const res = await fetch(`${process.env.API_URL}/api/client`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(clientData),
  });
  if (!res.ok) {
    throw new Error("Failed to create client");
  }
  const data = await res.json();
  return data;
}

export async function fetchGstinDetails(gstin: string) {
  const res = await fetch(`${process.env.API_URL}/api/get-info?gstin=${gstin}`);
  if (!res.ok) {
    throw new Error("Failed to fetch client");
  }
  const data = await res.json();
  return data;
}

