import express from 'express';
import * as UserController from '../controllers/UserController';
import { auth, quest } from '../middlewares';

const router = express.Router();

// User routes
router.post('/createUser', quest, UserController.createUser);
router.post('/authenticate', quest, UserController.authenticate);
router.post('/logout', auth, UserController.logout);
router.get('/getUser', auth, UserController.getUser);

export default router;