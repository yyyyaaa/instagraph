export default (sequelize, DataTypes) => {
  const Media = sequelize.define("Media", {
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
    postId: {
      type: DataTypes.UUID,
      allowNull: false,
      onDelete: 'CASCADE',
      references: {
        model: 'Posts',
        key: 'id'
      }
    },
    mediaType: {
      type: DataTypes.ENUM,
      values: ['IMAGE', 'VIDEO'],
      allowNull: false,
    },
    src: {
      type: DataTypes.STRING(512),
      allowNull: false,
      validate: {
        isUrl: true,
        notEmpty: true,
      },
    }
  });

  Media.associate = (models) => {
    Media.belongsTo(models.User);
    Media.belongsTo(models.Post);
  };
  
  return Media;
};