export default (sequelize, DataTypes) => {
  const Post = sequelize.define("Post", {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      onDelete: 'CASCADE',
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    caption: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: false
      }
    }
  });

  Post.associate = (models) => {
    Post.hasMany(models.Media, { 
      onDelete: 'CASCADE', 
      hooks: true, 
    });
    Post.hasMany(models.Comment, { 
      onDelete: 'CASCADE', 
      hooks: true, 
    });
    Post.belongsTo(models.User);
  };

  return Post;
};