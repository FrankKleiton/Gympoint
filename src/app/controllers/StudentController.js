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

  async update(req, res) {
    const schema = yup.object().shape({
      id: yup
        .number()
        .integer()
        .required(),
      name: yup.string(),
      email: yup.string().email(),
      age: yup
        .number()
        .moreThan(0)
        .integer(),
      weight: yup.number().moreThan(0),
      height: yup.number().moreThan(0),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(422).json('Fields validation failed...');
    }

    const { id } = req.body;

    let student = await Student.findByPk(id);

    if (!student) {
      return res.status(404).json('Student not found...');
    }

    student = await student.update(req.body);

    return res.json(student);
  }
}

export default new StudentController();
