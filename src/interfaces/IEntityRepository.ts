export default interface IEntityRepository<T, U> {
    get(item: T): Promise<U>;
    getList(item: T): Promise<U>;
    add(item: T): Promise<U>;
    update(item: T): Promise<U>;
    delete(item: T): Promise<Number>;
}