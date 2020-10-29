export default interface IWrite<T> {
    create(item: T): Promise<T>;
    update(item: T): Promise<T>;
    delete(id: string): Promise<boolean>;
}