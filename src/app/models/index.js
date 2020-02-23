import Sequelize from 'sequelize';
import DBConfig from '../../config/database';
import User from './User';

const models = [User];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(DBConfig);

    models.map(model => {
      return model.init(this.connection);
    });
  }
}

export default new Database();
