export interface CollectionMeta {
    nmHits: number;
    page: string;
    prev: string | null;
    next: string | null;
    links: Record<number, string>;
}