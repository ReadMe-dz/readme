import * as Yup from 'yup';
import genres from '../constants/genres';
import languages from '../constants/languages';
import states from '../constants/states';

const author: Yup.StringSchema = Yup.string()
  .matches(
    // eslint-disable-next-line
    new RegExp(/^[a-zA-Z ]+$/),
    'Invalid author name.'
  )
  .min(3, 'Must be 3 characters or more')
  .max(50, 'Must be 50 characters or less')
  .required('Required');

const title: Yup.StringSchema = Yup.string()
  .matches(
    // eslint-disable-next-line
    new RegExp(/^[a-zA-Z0-9_]+$/),
    'Invalid title, only ( a...z _ ) characters are allowed'
  )
  .min(3, 'Must be 4 characters or more')
  .max(50, 'Must be 50 characters or less')
  .required('Required');

const publisher: Yup.StringSchema = Yup.string()
  .matches(
    // eslint-disable-next-line
    new RegExp(/^[a-zA-Z0-9_]+$/),
    'Invalid publisher, only ( a...z _ ) characters are allowed'
  )
  .min(3, 'Must be 4 characters or more')
  .max(50, 'Must be 50 characters or less');

const genre: Yup.StringSchema = Yup.string()
  .oneOf(genres, 'Invalid book genre')
  .required('Required');

const state: Yup.StringSchema = Yup.string()
  .oneOf(states, 'Invalid book state')
  .required('Required');

const language: Yup.StringSchema = Yup.string()
  .oneOf(languages, 'Invalid book language')
  .required('Required');

const year: Yup.NumberSchema = Yup.number()
  .min(1900)
  .max(new Date().getFullYear())
  .required('Required');

const price: Yup.NumberSchema = Yup.number().min(0).required('Required');

const details: Yup.StringSchema = Yup.string();

export default {
  author,
  title,
  publisher,
  genre,
  state,
  language,
  year,
  price,
  details,
};
