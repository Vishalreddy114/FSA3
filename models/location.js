/**
 *  Location model
 *  It describes each attribute.
 
 * 
 */
module.exports = (db, DataTypes) => {
  db.define('Location', {
    locationId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
      
    },
    locationName:{
      type: DataTypes.STRING(30),
      unique: true,
      allowNull: false,
      required: true
      
    },
    locationLatitude: {
      type: DataTypes.DECIMAL(10, 8),
      allowNull: false
    },
    locationLongitude: {
      type: DataTypes.DECIMAL(11, 8),
      allowNull: false
    },

  });

};
