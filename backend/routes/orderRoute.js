import express from 'express';
import authMiddleware from '../middleware/auth.js';
import { placeOrder, userOrders, orderList, updateStatus } from '../controller/orderController.js';

const orderRouter = express.Router();

orderRouter.post('/place', authMiddleware, placeOrder);
orderRouter.post('/userorders', authMiddleware, userOrders);
orderRouter.get('/list', orderList);
orderRouter.post('/status', updateStatus);

export default orderRouter;
