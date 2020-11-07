import DataAccess from '../repository/DataAccess'
import { UserBaseDocument } from '../database/model/User';


class AuthDal extends DataAccess<Object, UserBaseDocument>  {
}

export default AuthDal;