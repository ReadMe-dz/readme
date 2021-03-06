import * as Yup from 'yup';

const content: Yup.StringSchema = Yup.string()
  .min(5, 'Must be more then 5 characters.')
  .max(255, 'Must be less then 255 characters.')
  .required('The comment can not be empty.');

export default {
  content,
};
