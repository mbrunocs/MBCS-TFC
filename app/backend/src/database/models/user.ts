import { Model, STRING } from 'sequelize';
import db from '.';

class User extends Model {
  id: number;
  username: string;
  role: string;
  email: string;
  password: string;
}

User.init({
  username: STRING,
  role: STRING,
  email: STRING,
  password: STRING,
}, {
  underscored: true,
  sequelize: db,
  modelName: 'user',
  timestamps: false,
});

export default User;
