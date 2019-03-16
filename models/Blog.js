const Sequelize = require('sequelize');
const db = require('../config/database');

const Blog = db.define('blog', {
    author: {
        type: Sequelize.STRING
    },
    title: {
        type: Sequelize.STRING
    },
    description: {
        type: Sequelize.STRING
    },
    contact_email: {
        type: Sequelize.STRING
    },
})

module.exports = Blog;
