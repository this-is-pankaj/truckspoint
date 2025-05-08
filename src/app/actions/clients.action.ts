import { makeCall } from "@/lib/services/makeCall";

export async function fetchAllClientsAction() {
  const data = await makeCall({ action: 'getAllClients', options: {} });
  return data;
}

export async function createClientAction(clientData: any) {
  const data = await makeCall({ action: 'createClient', options: {} }, clientData);
  return data;
}

export async function fetchGstinDetailsAction(gstin: string) {
  const data = await makeCall({ action: 'getInfoFromGstin', params: { gstin } });
  return data;
}

