
module.exports = (db, DataTypes) => {
  db.define('Location', {
    locationId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    locationName: {
      type: DataTypes.STRING(30),
      unique: true,
      required: true,
      allowNull: false,
      validate: {
        is: {
          args: /^[a-zA-Z ]*$/  ,
          msg:
            'It only accepts alphabets not numbers and special characters.',
        },
       
      },
    },
    locationLatitude: {
      type: DataTypes.DECIMAL(7,5),
      allowNull: false,
      validate: { min: {
        args: -90,
        msg: 'Latitude must be -90 degrees or more.',
      },
      max: {
        args: 90,
        msg: 'Latitude must be 90 degrees or less.'
      },
    },
  },
    locationLongitude: {
      type: DataTypes.DECIMAL(8,5),
      allowNull: false,
      unique: true,
      validate: {
        min: {
          args: -180,
          msg: 'Latitude must be -180 degrees or more.',
        },
        max: {
          args: 180,
          msg: 'Latitude must be 180 degrees or less.',
        },

      }
    }
  });

};
