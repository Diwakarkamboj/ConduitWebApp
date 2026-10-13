"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    const users = Array(500)
      .fill(null)
      .map((_, index) => ({
        username: `exampleUser${index + 1}`,
        email: `example${index + 1}@mail.com`,
        password: `$2a$12$/ijeqgHBA84UBeToXwRhE.M0IRCgE90qvgl8knQA5g3wKiUTYmDva`,
        createdAt: new Date(),
        updatedAt: new Date(),
      }));

    await queryInterface.bulkInsert("Users", users, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
