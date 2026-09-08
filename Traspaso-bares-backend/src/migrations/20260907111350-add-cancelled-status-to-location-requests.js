"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn(
      "location_requests",
      "status",
      {
        type: Sequelize.ENUM(
          "pending",
          "delivered",
          "cancelled"
        ),
        allowNull: false,
        defaultValue: "pending",
      }
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn(
      "location_requests",
      "status",
      {
        type: Sequelize.ENUM(
          "pending",
          "delivered"
        ),
        allowNull: false,
        defaultValue: "pending",
      }
    );
  },
};
