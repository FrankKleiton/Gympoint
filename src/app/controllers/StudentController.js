import * as yup from 'yup';
import Student from '../models/Student';

class StudentController {
  async store(req, res) {
    const schema = yup.object().shape({
      name: yup.string().required(),
      email: yup
        .string()
        .email()
        .required(),
      age: yup
        .number()
        .min(0)
        .required(),
      weight: yup
        .number()
        .min(0)
        .required(),
      height: yup
        .number()
        .min(0)
        .required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(422).json('Fields validation failed...');
    }

    const student = await Student.create(req.body);

    return res.json(student);
  }
}

export default new StudentController();
