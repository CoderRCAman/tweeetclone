const { register, login, getUserById,tweet } = require('../controllers');


const router = require('express').Router() ; 


router.get('/', (req,res)=>{
    res.json("Hiii")
})

router.post('/register',register)
router.post('/login',login)
router.get('/user/:id',getUserById)
router.post('/tweet',tweet)

module.exports = router