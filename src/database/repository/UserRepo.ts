import { User } from '../../entities';
import { IRead, IWrite } from '../../interfaces';
import UserModel, { UserBaseDocument } from '../model/User';

export default class UserRepo implements IRead<User>, IWrite<User> {

    /**
     * Returns a Created User Object Value
     * @param user Object on create the user object.
     */
    public async create(user: User): Promise<UserBaseDocument> {
        const now = new Date();
        user.updatedDate = now;
        const createdUser = await UserModel.create(user);
        return createdUser.toObject()
    }
    /**
     * Returns a Updated User Object Value
     * @param user Object on update the user object.
     */
    public async update(user: User): Promise<User> {
        const now = new Date();
        user.updatedDate = now; //last updated time
        const updateUser = await UserModel.findOneAndUpdate({
            email: user.email
        }, {
            $set: user
        });
         
        return updateUser.toObject()
    }
    public async findOne(query: Object): Promise<UserBaseDocument> {
        return await UserModel.findOne(query);
    }
    public delete(id: string): Promise<boolean> {
        throw new Error('Method not implemented.');
    }

    public find(item: User): Promise<User> {
        throw new Error('Method not implemented.');
    }

}
