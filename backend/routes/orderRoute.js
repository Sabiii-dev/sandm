import express from 'express';
import authMiddleware from '../middleware/auth.js';
import { placeOrder, userOrders, orderList, updateStatus } from '../controller/orderController.js';
import { loginuserOrders } from '../controller/orderController.js';

const orderRouter = express.Router();

orderRouter.post('/place', placeOrder);
orderRouter.post('/userorders', userOrders);
orderRouter.post('/loginuserorders', authMiddleware, loginuserOrders);
orderRouter.get('/list', orderList);
orderRouter.post('/status', updateStatus);

export default orderRouter;
