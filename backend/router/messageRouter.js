import express from 'express'
import { getAllMessages, sendmessage } from '../controller/messageController.js'
import { isAdminAuthenticated } from '../middlewares/auth.js'


const router=express.Router()

router.post('/send',sendmessage)
router.get('/getall',getAllMessages)

export default router;