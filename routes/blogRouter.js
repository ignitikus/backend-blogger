const express = require('express');
const router = express.Router();


/* GET home page. */
router.get('/', (req, res, next)=> {
  res.json('All blogs')
});

router.get('/singleblog', (req, res, next)=> {
  res.json('Single blog')
});

router.post('/createblog', (req,res,next) => {
  res.json('create a blog')
})

router.put('/updateblog', (req,res,next) => {
  res.json('update a blog')
})

router.delete('/deleteblog', (req,res,next) => {
  res.json('delete a blog')
}
)



module.exports = router;
