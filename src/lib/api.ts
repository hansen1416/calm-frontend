import { PUBLIC_API_BASE_URL } from "$env/static/public";


export const apiFetch = (path: string, init?: RequestInit) => {
    const p = path.startsWith("/") ? path : `/${path}`;
    return fetch(`${PUBLIC_API_BASE_URL}${p}`, init);
};