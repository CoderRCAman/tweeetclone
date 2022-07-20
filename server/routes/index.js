const { register, login, getUserById,tweet, getUser, updateProfile, getPostById, deletePost, addComment, deleteComment, updateLikes, followRequest, unfollow, getFollowings, getFollowers, getNotification, acceptFollowRequest } = require('../controllers');


const router = require('express').Router() ; 


router.get('/', (req,res)=>{
    res.json("Hiii")
})

router.post('/register',register)
router.post('/login',login)
router.get('/user/:id',getUserById)
router.post('/tweet',tweet)
router.get('/users/:username',getUser) 
router.patch('/user',updateProfile) 
router.get('/post/:id',getPostById)
router.delete('/post/:id',deletePost) 
router.post('/comment/:id',addComment) 
router.delete('/comment/:id/:postid',deleteComment)  
router.post('/like/:postId',updateLikes)  
router.post('/follow/:id',followRequest) ; 
router.patch('/follow/:id',acceptFollowRequest)
router.post('/unfollow/:id',unfollow) ;  

router.get('/followings',getFollowings) ;
router.get('/followers',getFollowers) ;
router.get('/notification',getNotification) ; 

// router.post('/unfollow/:id',)


module.exports = router