import express, { Router, Request, Response, NextFunction, response } from 'express';
import Joi from 'joi';
import UserController from '../controllers/user.controller';
import UserMiddleware from '../middleware/UserMiddleware';

const route: Router = express.Router();


route.post('/user', UserMiddleware.validateData ,UserController.createLogin);
route.get('/verify', UserController.verifyEmail);

export default route;
