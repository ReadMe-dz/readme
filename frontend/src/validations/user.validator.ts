import * as Yup from 'yup';
import wilayas from '../utils/data/wilayas.json';

const name: Yup.StringSchema = Yup.string()
  .matches(
    // eslint-disable-next-line
    new RegExp(/([a-zA-Z]{3,45}\s*)+/),
    'Invalid name, only [a-z] characters are allowed'
  )
  .min(3, 'Must be 3 characters or more')
  .max(45, 'Must be 45 characters or less')
  .required('Required');

const username: Yup.StringSchema = Yup.string()
  .matches(
    // eslint-disable-next-line
    new RegExp(/^[a-zA-Z0-9_]+$/),
    'Invalid username'
  )
  .min(3, 'Must be 4 characters or more')
  .max(20, 'Must be 20 characters or less')
  .required('Required');

const password: Yup.StringSchema = Yup.string()
  .min(8, 'Must be 8 characters or more')
  .max(20, 'Must be 20 characters or less')
  .required('Required');

const email: Yup.StringSchema = Yup.string()
  .matches(
    // eslint-disable-next-line
    new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/),
    'Invalid email address'
  )
  .email('Invalid email address')
  .required('Required');

const wilaya: Yup.StringSchema = Yup.string()
  .oneOf(wilayas, 'Invalid wilaya name')
  .required('Required');

const terms: Yup.BooleanSchema = Yup.boolean().oneOf(
  [true],
  'Must accept Terms and Conditions'
);

export default { name, username, password, email, wilaya, terms };
