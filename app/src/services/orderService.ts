// TODO(reto): Implementar la lógica de negocio para operaciones CRUD de órdenes
import 'reflect-metadata';
import { injectable } from 'tsyringe';
import { OrderRepository } from '../repositories/orderRepository';
import { Order, OrderRequest, OrderResponse, OrderStatus } from '../models/order';

@injectable()
export class OrderService {
    constructor(private orderRepository: OrderRepository) {}

    async createOrder(orderRequest: OrderRequest): Promise<OrderResponse> {
        // TODO(reto): Implementar la lógica para crear una orden
        throw new Error('Not implemented');
    }

    async getOrder(orderId: string): Promise<OrderResponse> {
        // TODO(reto): Implementar la lógica para obtener una orden
        throw new Error('Not implemented');
    }

    async updateOrder(orderId: string, orderRequest: OrderRequest): Promise<OrderResponse> {
        // TODO(reto): Implementar la lógica para actualizar una orden
        throw new Error('Not implemented');
    }

    async deleteOrder(orderId: string): Promise<void> {
        // TODO(reto): Implementar la lógica para eliminar una orden
        throw new Error('Not implemented');
    }
}