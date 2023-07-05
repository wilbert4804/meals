const User = require('./userModel');
const Repair = require('./repairsModel');

const initModel = () => {
  User.hasMany(Repair);
  Repair.belongsTo(User);
};
module.exports = initModel;
