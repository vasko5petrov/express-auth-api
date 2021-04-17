import express from 'express';
import * as UserController from '../controllers/UserController';

const router = express.Router();

// User routes
router.get('/getUser', UserController.getUser);
router.post('/createUser', UserController.createUser);

export default router;