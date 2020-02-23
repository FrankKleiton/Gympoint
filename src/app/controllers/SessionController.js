import jwt from 'jsonwebtoken';
import * as yup from 'yup';
import authConfig from '../../config/auth';
import User from '../models/User';

class SessionController {
  async store(req, res) {
    const schema = yup.object().shape({
      email: yup
        .string()
        .email()
        .required(),
      password: yup.string().min(6),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(422).json('Fields validation failed...');
    }

    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!(await user.checkPassword(password))) {
      return res.status(401).json('Invalid data provided...');
    }

    const { id, name } = user;

    try {
      const token = await jwt.sign(
        { id },
        authConfig.secret,
        authConfig.expiration
      );

      return res.json({
        user: {
          id,
          name,
          email,
        },
        token,
      });
    } catch (err) {
      return res.status(400).json('Internal server error');
    }
  }
}

export default new SessionController();
