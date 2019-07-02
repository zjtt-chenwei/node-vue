var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  // res.send('respond with a resource');
  res.json({code:1})
});

//允许可访问的域名以get方式访问 localhost:3000/user/register，并返回{code:1} 
router.get('/register', function(req, res, next){
  console.log(req)
  res.json({code:1})
})

//post方式访问/user/register
router.post('/register', function(req, res, next){
  console.log(req.body)
  res.json({
    code:1
  })
})

router.get('/login', function(req, res, next){
  console.log(req.url.split('?'))
  res.json({
    code:1,
    id:'100000',
    account:'18100171883',
    identity:'0'
  })
})

router.post('/login', function(req, res, next){
  console.log(req.url.split('?'))
  console.log(req.body)
  res.json({
    code: 0,
    msg:'账号不存在'
  })
})

router.post('/logout', function(req, res, next){
  console.log(req.body)
  res.json({code:1})
})

module.exports = router;
