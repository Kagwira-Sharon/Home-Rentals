import express from 'express';
import { Register ,Login, Google} from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/register', Register);

router.post('/login', Login);
router.post('/google',Google);
export default router;