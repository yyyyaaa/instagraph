'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
    return queryInterface.createTable('Media', {
      id: {
        type: Sequelize.UUID,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      userId: {
        type: Sequelize.UUID,
        onDelete: 'CASCADE',
        references: {
          model: 'Users',
          key: 'id'
        }
      },
      postId: {
        type: Sequelize.UUID,
        onDelete: 'CASCADE',
        references: {
          model: 'Posts',
          key: 'id'
        }
      },
      mediaType: {
        type: Sequelize.ENUM,
        values: ['image', 'video'],
        allowNull: false,
      },
      src: {
        type: Sequelize.STRING(512),
        allowNull: false,
        validate: {
          isUrl: true,
        },
      }
    });
  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
    return queryInterface.dropTable('Media');
  }
};
