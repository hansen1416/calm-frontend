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

export interface PaginationMeta {
    currentPage: number;
    perPage: number;
    total: number;
    lastPage: number;
}

export interface Paginated<T> {
    data: T[];
    meta: PaginationMeta;
}

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

/* ---------- input (client -> server) ---------- */

export interface ContactCreateInput {
    name: string;
    email: EmailAddress;
    description?: string;
    tagIds?: ID[];
}

export interface ContactUpdateInput {
    name?: string;
    email?: EmailAddress;
    description?: string;
    tagIds?: ID[];
}

/* ---------- optional: common list/query types ---------- */

export interface ListQuery {
    page?: number;
    perPage?: number;
    q?: string; // free-text search
    tagId?: ID; // filter by one tag
    sort?: string; // e.g., "createdAt:desc"
}
