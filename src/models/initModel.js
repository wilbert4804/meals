const User = require('./userModel');
const Orders = require('./ordersModel');
const Reviews = require('./reviewsModel');
const Restaurant = require('./restaurantsModels');
const Meals = require('./mealsModel');

const initModel = () => {
  User.hasMany(Orders, { foreignKey: 'userId' }); //un usuario puede tener de una a muchas ordenes
  Orders.belongsTo(User, { foreignKey: 'userId' }); //una orden puede tener un solo usuario

  Meals.hasOne(Orders, { foreignKey: 'mealid' });
  Orders.belongsTo(Meals, { foreignKey: 'mealid' });

  Restaurant.hasMany(Meals, { foreignKey: 'restauranId' });
  Meals.belongsTo(Restaurant, { foreignKey: 'restauranId' });

  User.hasMany(Reviews);
  Reviews.belongsTo(User);

  /*User.hasMany(Reviews);
  Reviews.belongsTo(User);

  Restaurant.hasMany(Reviews);
  Reviews.belongsTo(Restaurant);

  Restaurant.hasMany(Meals);
  Meals.belongsTo(Restaurant);

  */
};
module.exports = initModel;

/*
A.hasOne(B); tiene uno a muchos
A.belongsTo(B); pertenece a
A.hasMany(B);
A.belongsToMany (B, {through: 'C'});
*/
