export type Response<T> = {
    success: boolean,
    count?: number,
    results: T
}