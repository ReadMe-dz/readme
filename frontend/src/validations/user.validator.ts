import * as Yup from 'yup';
import wilayas from '../constants/wilayas';

const name: Yup.StringSchema = Yup.string()
  .matches(
    // eslint-disable-next-line
    new RegExp(/^[a-zA-Z ]+$/),
    'Invalid name, only ( a...z ) characters are allowed'
  )
  .min(3, 'Must be 3 characters or more')
  .max(15, 'Must be 15 characters or less')
  .required('Required');

const username: Yup.StringSchema = Yup.string()
  .matches(
    // eslint-disable-next-line
    new RegExp(/^[a-zA-Z0-9_]+$/),
    'Invalid username, only ( a...z _ ) characters are allowed'
  )
  .min(3, 'Must be 4 characters or more')
  .max(9, 'Must be 9 characters or less')
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

const phone: Yup.StringSchema = Yup.string().matches(
  new RegExp(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/),
  'Invalid phone number'
);

const twitter: Yup.StringSchema = Yup.string().matches(
  // eslint-disable-next-line
  new RegExp(/http(?:s)?:\/\/(?:www\.)?twitter\.com\/([a-zA-Z0-9_]+)/i),
  'Invalid twitter profile link'
);

const facebook: Yup.StringSchema = Yup.string().matches(
  // eslint-disable-next-line
  new RegExp(
    /(?:https?:\/\/)?(?:www\.)?(mbasic.facebook|m\.facebook|facebook|fb)\.(com|me)\/(?:(?:\w\.)*#!\/)?(?:pages\/)?(?:[\w\-\.]*\/)*([\w\-\.]*)/gi
  ),
  'Invalid facebook profile link'
);

export default {
  name,
  username,
  password,
  email,
  wilaya,
  phone,
  twitter,
  facebook,
  terms,
};
