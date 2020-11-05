import * as Yup from 'yup';

const firstName: Yup.StringSchema = Yup.string()
  .min(4, 'Must be 4 characters or more')
  .max(15, 'Must be 15 characters or less')
  .required('Required');
const lastName: Yup.StringSchema = Yup.string()
  .min(4, 'Must be 4 characters or more')
  .max(20, 'Must be 20 characters or less')
  .required('Required');
const userName: Yup.StringSchema = Yup.string()
  .min(4, 'Must be 4 characters or more')
  .max(20, 'Must be 20 characters or less')
  .required('Required');
const password: Yup.StringSchema = Yup.string()
  .min(8, 'Must be 8 characters or more')
  .max(20, 'Must be 20 characters or less')
  .required('Required');
const email: Yup.StringSchema = Yup.string()
  .email('Invalid email address')
  .required('Required');

export default { firstName, lastName, userName, password, email };
