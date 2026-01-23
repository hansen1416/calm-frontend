// src/lib/types.ts

/* ---------- primitives ---------- */

export type ID = number;
export type ISODateString = string; // e.g., "2026-01-23T12:34:56Z"
export type EmailAddress = string;

/* ---------- API envelope ---------- */

export interface ApiError {
    message: string;
    code?: string;
    details?: unknown;
}

export type ApiResponse<T> =
    | { ok: true; data: T }
    | { ok: false; error: ApiError };


/* ---------- core entities ---------- */

export interface Tag {
    id: ID;
    name: string;
    createdAt?: ISODateString;
    updatedAt?: ISODateString;
}

export interface Contact {
    id: ID;
    name: string;
    email: EmailAddress;
    description?: string;
    tags?: Tag[];
    createdAt?: ISODateString;
    updatedAt?: ISODateString;
}


export type PaginatedContactsResponse = {
    current_page: number;
    data: Contact[];
    // first_page_url: string;
    from: number | null;
    last_page: number;
    // last_page_url: string;
    // links: PaginationLink[];
    // next_page_url: string | null;
    // path: string;
    per_page: number;
    // prev_page_url: string | null;
    to: number | null;
    total: number;
};


