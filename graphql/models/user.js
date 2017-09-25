export default (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    username: { 
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  });

  User.associate = (models) => {
    User.hasMany(models.Post, { 
      onDelete: 'CASCADE', 
      hooks: true, 
    });
    User.hasMany(models.Comment, { 
      onDelete: 'CASCADE', 
      hooks: true, 
    });
    User.hasMany(models.Media, { 
      onDelete: 'CASCADE', 
      hooks: true, 
    });
  };

  return User;
};