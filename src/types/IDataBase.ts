import { User } from "../entities";

export default interface IDataBase {
    create(user: User): Promise<{ user: User }>;
    update(user: User): Promise<{ user: User }>;
    findOneByEmail();
    findOneById();
}