import { Router } from "express";
import { 
    createPost, getAllPost, getPost, updatePost, deletePost,
    createComment, deleteComment, getComment,updateComment, 
    toggleLikePost,
    getPostLikes, 
    } from "../controller/post.controller";
import { upload } from "../middleware/multer.middleware";
import { verifyUser } from "../middleware/auth.middleware";

const router = Router()

router.use(verifyUser)

router.route('/create').post(upload.fields([{ name: 'files[]', maxCount: 9 }]),createPost)
router.route('/').get(getAllPost)
router.route('/:id').get(getPost)
router.route('/:id').put(updatePost)
router.route('/:id').delete(deletePost)

// // post related other routes
// // like
router.route('/like/:id').put(toggleLikePost)
router.route('/like/:id').get(getPostLikes)

// // comment
router.route('/comment/:id').post(createComment)
router.route('/:id').get(getComment)
router.route('/comment/delete/:id').delete(deleteComment)
router.route('/comment/update/:id').put(updateComment)


export default router;