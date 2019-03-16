const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

router.get('/', (req, res) =>
    Blog.findAll()
        .then(blogs => res.render('blogs', {
            blogs
        }))
        .catch(err => console.log(err))
);
//Display add blog form
router.get('/add', (req, res) => res.render('add'));

//Add a blog
router.post('/add', (req, res) => {
    let { author, title, description, contact_email } = req.body;
    let errors = []
    //validations
    if (!author) {
        errors.push({ text: 'Please add author' })
    }
    if (!title) {
        errors.push({ text: 'Please add a title' })
    }
    if (!description) {
        errors.push({ text: 'Please add some description' })
    }
    if (!contact_email) {
        errors.push({ text: 'Please add a contact email' })
    }

    //Check for errors
    if (errors.length > 0) {
        res.render('add', {
            errors,
            author,
            title,
            description,
            contact_email
        })
    } else {
        Blog.create({
            author,
            title,
            description,
            contact_email
        })
            .then(blog => res.redirect('/blogs'))
            .catch(err => console.log(err));
    }
})
//Search for blogs
router.get('/search', (req, res) => {
    console.log(req.query);
    let { term } = req.query;
    term = term.toLowerCase();

    Blog.findAll({ where: { title: { [Op.like]: '%' + term + '%' } } })
        .then(blogs => res.render('blogs', { blogs }))
        .catch(err => console.log(err))
});

//delete a blog
router.get('/delete', (req, res) => {
    let { id } = req.query;

    Blog.destroy({ where: { id: id } })
        .then(res.redirect('/blogs'))
        .catch(err => console.log(err))
});

//open edit blog page
router.get('/edit', (req, res) => {
    let { id } = req.query;
    Blog.findById(id)
        .then(blog => {
            let { id, author, title, description, contact_email } = blog.dataValues;
            res.render('edit', {
                id,
                author,
                title,
                description,
                contact_email
            })
        })
        .catch(err => console.log(err));
})

//edit blog
router.post('/:id', (req, res) => {
    let { title, description, contact_email } = req.body;
    let errors = []
    //validations
    if (!author) {
        errors.push({ text: 'Please add author' })
    }
    if (!title) {
        errors.push({ text: 'Please add a title' })
    }
    if (!description) {
        errors.push({ text: 'Please add some description' })
    }
    if (!contact_email) {
        errors.push({ text: 'Please add a contact email' })
    }

    if (errors.length > 0) {
        res.render('edit', {
            errors,
            author,
            title,
            description,
            contact_email
        })
    } else {
        Blog.update({
            author,
            title,
            description,
            contact_email
        }, {
                where: { id: req.params.id }
            })
            .then(res.redirect('/blogs'))
            .catch(err => console.log(err));
    }
})

module.exports = router;
