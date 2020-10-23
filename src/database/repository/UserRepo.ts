import { User } from '../../entities';
import { UserModel } from '../model/User';
import { IDataBase } from '../../types';
import { Types } from 'mongoose';

export default class UserRepo implements IDataBase {

    public async create(user: User): Promise<{ user: User }> {
        const now = new Date();
        user.updatedDate = now;
        const createdUser = await UserModel.create(user);
        return { user: createdUser.toObject() }
    }
    public async update(user: User): Promise<{ user: User }> {
        const now = new Date();
        user.updatedDate = now; //last updated time
        const updateUser = await UserModel.updateOne({
            _id: user._id
        }, {
            $set: user,
        })
        return { user: updateUser.toObject() }
    }

    public async findOneByEmail() {
        //To do list
    }

    public async findOneById() {
        //To do list
    }
}

// function dataGet(database: IDataBase) {
//     const user = {};
//     database.create(user)
// }
// dataGet(new UserRepo());