const { hashSync } = require("bcrypt");
("use strict");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Users",
      [
        { name: "Alex", email: "1@1", hashpass: hashSync("1", 10) },
        { name: "Bob", email: "2@2", hashpass: hashSync("2", 10) },
        { name: "Carl", email: "3@3", hashpass: hashSync("3", 10) },
      ],
      {}
    );
    await queryInterface.bulkInsert(
      "Evernotes",
      [
        { name: "Shopping", tag: "Shop", status: false, dop: "", userId: 1 },
        { name: "Clean", tag: "Clean", status: false, dop: "", userId: 1 },
        { name: "Wash the car", tag: "Todo", status: false, dop: "", userId: 2 },
        { name: "Cook fish", tag: "Cook", status: false, dop: "", userId: 3 },
        { name: "By apple", tag: "Shop", status: false, dop: "", userId: 3 },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
