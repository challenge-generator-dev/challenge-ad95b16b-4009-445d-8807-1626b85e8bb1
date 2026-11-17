export type OrderStatus = 'pending' | 'paid' | 'shipped';

export interface OrderItem {
    productId: string;
    quantity: number;
    price: number;
}

export interface OrderRequest {
    customerId: string;
    items: OrderItem[];
    status?: OrderStatus;
}

export interface OrderResponse {
    orderId: string;
    customerId: string;
    items: OrderItem[];
    status: OrderStatus;
    createdAt: string;
    updatedAt: string;
}

export interface Order {
    orderId: string;
    customerId: string;
    items: OrderItem[];
    status: OrderStatus;
    createdAt: string;
    updatedAt: string;
}

export class OrderFactory {
    static createOrder(orderRequest: OrderRequest): Order {
        const now = new Date().toISOString();
        return {
            orderId: this.generateOrderId(),
            customerId: orderRequest.customerId,
            items: orderRequest.items,
            status: orderRequest.status || 'pending',
            createdAt: now,
            updatedAt: now
        };
    }

    static generateOrderId(): string {
        return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    }

    static toOrderResponse(order: Order): OrderResponse {
        return {
            orderId: order.orderId,
            customerId: order.customerId,
            items: order.items,
            status: order.status,
            createdAt: order.createdAt,
            updatedAt: order.updatedAt
        };
    }
}