import * as Yup from 'yup';
export const userCreationValidationSchema = Yup.object().shape({
  username: Yup.string().min(3).max(50),
  email: Yup.string().min(3).max(255).email(),
  password: Yup.string().min(6).max(255),
});
