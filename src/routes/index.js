import express from 'express';
import * as UserController from '../controllers/UserController';
import { IsAuthenticated, quest } from '../middlewares';

const router = express.Router();

// User routes
router.post('/createUser', quest, UserController.createUser);
router.post('/authenticate', UserController.authenticate);
router.get('/getUser', IsAuthenticated, UserController.getUser);

export default router;