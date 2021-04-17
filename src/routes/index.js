import express from 'express';
import * as UserController from '../controllers/UserController';
import { IsAuthenticated } from '../middlewares';

const router = express.Router();

// User routes
router.post('/createUser', UserController.createUser);
router.post('/authenticate', UserController.authenticate);
router.get('/getUser', IsAuthenticated, UserController.getUser);

export default router;