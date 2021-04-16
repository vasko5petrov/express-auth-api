import express from 'express';
const router = express.Router();
import * as UserController from '../controllers/UserController';

// User routes
router.get('/getUser', UserController.getUser);
router.post('/createUser', UserController.createUser);

export default router;