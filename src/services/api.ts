// ==========================================
// PUBLIC API SERVICE CLIENT — CAFÉ NOIR WEBSITE
// Connects website to system (testsys.cafenoir.tn)
// ==========================================

import { PublicMenuResponse, OrderSubmitPayload, OrderSubmitResponse } from '../types';

export const getApiBaseUrl = (): string => {
  // In Vite, use VITE_API_URL or fallback
  const envUrl = (import.meta as any).env?.VITE_API_URL;
  if (envUrl && envUrl.trim() !== '') {
    return envUrl.replace(/\/$/, '');
  }

  // If in browser on production domain:
  if (typeof window !== 'undefined') {
    if (window.location.hostname === 'test.cafenoir.tn') {
      return 'https://testsys.cafenoir.tn';
    }
    if (window.location.hostname === 'cafenoir.tn' || window.location.hostname === 'www.cafenoir.tn') {
      return 'https://system.cafenoir.tn';
    }
  }

  // Local development default (backend server runs on port 3000)
  return 'http://localhost:3000';
};

/**
 * Fetch dynamic public menu catalog from system API
 */
export async function fetchPublicMenu(): Promise<PublicMenuResponse> {
  const baseUrl = getApiBaseUrl();
  const url = `${baseUrl}/api/public/menu`;

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Échec de récupération de la carte (${response.status})`);
  }

  const data: PublicMenuResponse = await response.json();
  return data;
}

/**
 * Submit Table QR Order to system backend with automatic 1-time retry on network glitch
 */
export async function submitTableOrder(
  payload: OrderSubmitPayload,
  retryCount = 1
): Promise<OrderSubmitResponse> {
  const baseUrl = getApiBaseUrl();
  const url = `${baseUrl}/api/public/orders`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || `Erreur lors de l'envoi de la commande (${response.status})`);
    }

    return data as OrderSubmitResponse;
  } catch (err: any) {
    if (retryCount > 0 && err.name !== 'AbortError' && !err.message.includes('403') && !err.message.includes('400')) {
      console.warn('Network issue detected, retrying order submission...', err);
      await new Promise(resolve => setTimeout(resolve, 1000));
      return submitTableOrder(payload, retryCount - 1);
    }
    throw err;
  }
}
