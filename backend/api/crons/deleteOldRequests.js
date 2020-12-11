const cron = require('node-cron');
const Request = require('../models/request.model');

const deleteOldRequests = () => {
  cron.schedule('0 2 * * *', () => {
    Request.find()
      .then((requests) => {
        const today = new Date().getTime();
        const month = 2592000;
        for (let i = 0; i < requests.length; i += 1) {
          const createdAt = new Date(requests[i].createdAt).getTime();
          if (createdAt + month < today) {
            Request.deleteOne({ _id: requests[i]._id });
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
  });
};

module.exports = deleteOldRequests;
