import 'reflect-metadata';
import { Router } from 'express';
import { container } from 'tsyringe';
import { OrderService } from '../services/orderService';

const router = Router();
const orderService = container.resolve(OrderService);

router.post('/', async (req, res, next) => {
  throw new Error('TODO(reto): post');
});

router.get('/:orderId', async (req, res, next) => {
  throw new Error('TODO(reto): get');
});

router.put('/:orderId', async (req, res, next) => {
  throw new Error('TODO(reto): put');
});

router.delete('/:orderId', async (req, res, next) => {
  throw new Error('TODO(reto): delete');
});

export default router;
export const orderRouter = router;