const mongoose = require('mongoose');
const mongoodbValidation= (id)=>{
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new Error ("this is not a valid ")
};

module.exports = mongoodbValidation