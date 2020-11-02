import IDataAccess from '../repository/IDataAccess'
import UserModel, { UserBaseDocument } from '../database/model/User'; //IDataAccess'e gönderilecek....
import { ObjectId } from 'mongodb';
import { User } from '../entities';

class UserDal {
    /**
     * Returns one user information.
     * @param email type string for user email address
     */
    public static async get(email: String): Promise<UserBaseDocument> {
        const db = new IDataAccess<Object, UserBaseDocument>(UserModel);
        const query = { email: email };
        const response = await db.get(query);
        const data = await response.toObject();
        return data;
    }
    /**
    * Returns user list
    * @param filter <Optional> type object for user filter
    */
    public static async getList(filter?: Object): Promise<UserBaseDocument> {
        const db = new IDataAccess<Object, UserBaseDocument>(UserModel);
        let response: UserBaseDocument;
        if (filter) {
            response = await db.getList(filter);
        } else {
            response = await db.getList();
        }
        const data = await response.toObject();
        return data;
    }
    /**
     * Returns created user information.
     * @param user type object for user create
     */
    public static async add(user: User): Promise<UserBaseDocument> {
        const db = new IDataAccess<User, UserBaseDocument>(UserModel);
        const response = await db.add(user);
        const data = await response.toObject();
        return data;
    }
    /**
     * Returns a Updated User Object Value
     * @param user Object on update the user object.
     */
    public static async update(user: User): Promise<boolean> {
        const db = new IDataAccess<Object, UserBaseDocument>(UserModel);
        const query = { email: user.email };
        const response = await db.update(user, query);
        const data = await response.toObject();
        return data;
    }
    /**
    * Returns a Deleted User Object Value
    * @param user Object on update the user object.
    */
    public static async delete(id: ObjectId): Promise<boolean> {
        const db = new IDataAccess<Object, Number>(UserModel)
        const query = { _id: id }
        const response = await db.delete(query);
        const result = response === 1;
        return result;
    }
}

export default UserDal;