const router = require('express').Router();

router.get('/', (req,res) => {
  res.send('Welcome to the livecode-2 website!')
})

module.exports = router;