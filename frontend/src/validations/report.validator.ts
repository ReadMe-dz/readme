import * as Yup from 'yup';
import reports from '../constants/reports';

const title: Yup.StringSchema = Yup.string()
  .matches(
    // eslint-disable-next-line
    new RegExp(/^[a-zA-Z0-9 ]+$/),
    'Invalid title, only a...z characters and spaces are allowed'
  )
  .min(3, 'Must be 4 characters or more')
  .max(50, 'Must be 50 characters or less')
  .required('Required');

const type: Yup.StringSchema = Yup.string()
  .oneOf(reports, 'Invalid report type')
  .required('Required');

const details: Yup.StringSchema = Yup.string()
  .min(20, 'Must be 20 characters or more')
  .required('Required');

export default {
  title,
  type,
  details,
};
