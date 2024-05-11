const mongoose = require('mongoose');

const mongoDbValidation = (values) => {
  values.forEach(({ value, type }) => {
    switch (type) {
      case 'id':
        if (!mongoose.Types.ObjectId.isValid(value)) {
          throw new Error('Invalid MongoDB ObjectId');
        }
        break;
      case 'email':
        // Perform email validation logic here if needed
        break;
      case 'password':
        // Perform password validation logic here if needed
        break;
      default:
        throw new Error('Invalid validation type');
    }
  });
};

module.exports = mongoDbValidation;
