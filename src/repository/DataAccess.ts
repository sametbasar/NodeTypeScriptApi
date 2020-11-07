import { Model } from "mongoose";
import { IEntityRepository } from "../interfaces";

class IDataAccess<T, U> implements IEntityRepository<T, U> {

    private Model: Model<any>;

    constructor(Model: Model<any>) {
        this.Model = Model;
    }
    public async get(item: T): Promise<U> {
        const response = await this.Model.findOne(item)
        return response;
    }
    public async getList(filter?: T): Promise<U> {
        let response;
        if (filter) {
            response = await this.Model.find(filter);
        } else {
            response = await this.Model.find({});
        }
        return response;
    }
    public async add(item: T): Promise<U> {
        const response = await this.Model.create(item);
        return response;
    }
    public async update(item: T, query?: Object): Promise<U> {
        const response = await this.Model.findOneAndUpdate(query, {
            $set: item
        });
        return response;
    }
    public async delete(item: T): Promise<Number> {
        const response = await this.Model.deleteOne(item);
        const result = response.ok;
        return result;
    }
}
export default IDataAccess;