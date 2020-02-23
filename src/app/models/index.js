import Sequelize from 'sequelize';
import DBConfig from '../../config/database';
import Student from './Student';
import User from './User';

const models = [User, Student];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(DBConfig);

    models.map(model => model.init(this.connection));
  }
}

export default new Database();
