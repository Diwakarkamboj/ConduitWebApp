"use strict";

const { User } = require("../models");

module.exports = {
  async up(queryInterface, Sequelize) {
    // 1. Fetch the 500 users you just created
    const users = await User.findAll();

    // 2. Generate 500 articles
    const articles = Array(500)
      .fill(null)
      .map((_, index) => ({
        slug: `automated-test-article-${index + 1}`,
        title: `Automated Test Article ${index + 1}`,
        description: `This article belongs to test user ${index + 1}.`,
        body: `Generating robust test data is critical for test automation. This is article number ${index + 1}. dolor sit amet, consectetur adipiscing elit. In nec ante lacinia magna ultricies cursus nec non lacus. Praesent blandit sodales semper. Mauris eget leo non erat molestie faucibus luctus sed ex. Duis sollicitudin tellus vitae aliquam cursus. Integer ultricies ultricies erat. Vivamus egestas ac augue nec mattis. Duis posuere bibendum ex vitae placerat. Duis in odio vestibulum, pellentesque odio vitae, egestas nibh.`,
        // 3. Assign Article 1 to User 1's actual DB ID, Article 2 to User 2's actual DB ID, etc.
        // If it runs out of matching users for some reason, it defaults to a random valid user
        userId: users[index] ? users[index].id : users[Math.floor(Math.random() * users.length)].id,
        createdAt: new Date(),
        updatedAt: new Date(),
      }));

    await queryInterface.bulkInsert("Articles", articles, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Articles", null, {});
  },
};