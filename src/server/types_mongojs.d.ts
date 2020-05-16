declare module 'mongojs' {
    function mongojs(connectionString: string, collections?: string[]): DB

    interface DB {
        [collectionName: string]: Collection
    }

    type QueryResponse = (
        err: Error | undefined,
        result: any
    ) => void;

    class Collection {
        find(query: any, cb?: QueryResponse): Collection
        findOne(query: any, cb?: QueryResponse): Collection
        remove(query: any, cb: QueryResponse): Collection
        save(query: any, cb?: QueryResponse): Collection
        sort(query: any, cb?: QueryResponse): Collection
        limit(query: number, cb?: QueryResponse): Collection
        update(query: any, data: any, cb: QueryResponse): Collection;
        update(query: any, data: any, options: any, cb: QueryResponse): Collection;
    }

    namespace mongojs {
        interface db {
            [collectionName: string]: Collection
        }
    }

    export = mongojs;
}
