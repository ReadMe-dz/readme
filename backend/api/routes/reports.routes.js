const express = require('express');
const tokenVerification = require('../middleware/token-verification');
const {
  postReport,
  getReports,
  patchReport,
  deleteReport,
} = require('../controllers/reports');

const reportsRouter = express.Router();

reportsRouter.get('/', tokenVerification, getReports);

reportsRouter.post('/', postReport);

reportsRouter.patch('/:id', tokenVerification, patchReport);

reportsRouter.delete('/:id', tokenVerification, deleteReport);

module.exports = reportsRouter;
