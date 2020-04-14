const express = require('express');
const mongoose = require('mongoose')
const Blog = require('./models/Blog')
const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next)=> {
  Blog.find({}).then((blogs) => {
    res.json(blogs)
  })
});

router.get('/singleblog/:id', (req, res, next)=> {
  Blog.findOne({_id: req.params.id}).then((blog) => {
    res.json(blog)
  }).catch((err) => {
    return res.json('Not found')
  })
});

router.post('/createblog', (req,res,next) => {
  const newBlog = new Blog()

  newBlog.title = req.body.title
  newBlog.author = req.body.author
  newBlog.subject = req.body.subject
  newBlog.article = req.body.article

  newBlog.save().then((blog) => {
    return res.json(blog.title + ' added to database')
  })
})


router.put('/updateblog/:id', (req,res,next) => {
  Blog.findOne({_id: req.params.id}).then((blog) => {
    blog.title = req.body.title ? req.body.title : blog.title
    blog.author = req.body.author ? req.body.author : blog.author
    blog.subject = req.body.subject ? req.body.subject : blog.subject
    blog.article = req.body.article ? req.body.article : blog.article

    blog.save().then((updated) => {
      return res.status(200).json({message: 'The blog was updated: ', blog})
    }).catch(err=> console.log(err))
  })
})

router.delete('/deleteblog/:id', (req,res,next) => {
  Blog.findById(req.params.id).then((blog) => {
    Blog.deleteOne({_id: blog._id}).then((params) => {
      return res.status(200).json({message: 'The blog was deleted: ', blog})
    }).catch(err=> res.json('Couldn\'t delete'))
  }).catch(err=>res.json('Not found'))
})




module.exports = router;
