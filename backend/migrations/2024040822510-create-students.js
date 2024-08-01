"use strict";
/** @type {import('sequelize-cli').Migration} */
// eslint-disable-next-line no-undef
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("students", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      first_name: {
        type: Sequelize.STRING,
        allowNull:true
      },
      last_name: {
        type: Sequelize.STRING,
        allowNull:true
      },

      email: {
        type: Sequelize.STRING,
        allowNull:true
      },
      age: {
        type: Sequelize.STRING,
        allowNull:true
      },
      grade: {
        type: Sequelize.STRING,
        allowNull:true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("NOW"),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("NOW"),
      },
      deletedAt: {
        allowNull: true,
        type: Sequelize.DATE,
        defaultValue: null,
      },
   
    });
  },
  async down(queryInterface, Sequelize) {
    
    await queryInterface.dropTable("students");
  },
};
