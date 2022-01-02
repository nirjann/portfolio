import * as Yup from 'yup';
export const UserLoginValidationSchema = Yup.object().shape({
  email: Yup.string().min(3).max(255).email(),
  password: Yup.string().min(6).max(255),
});
