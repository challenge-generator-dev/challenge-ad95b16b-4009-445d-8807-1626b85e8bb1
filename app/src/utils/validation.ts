import { body, param, ValidationChain, ValidationError } from 'express-validator';
import { OrderRequest, OrderStatus } from '../models/order';

export class ValidationRules {
    static createOrder(): ValidationChain[] {
        return [
            body('customerId')
                .isString()
                .withMessage('El customerId debe ser una cadena')
                .notEmpty()
                .withMessage('El customerId es obligatorio')
                .isLength({ min: 1, max: 100 })
                .withMessage('El customerId debe tener entre 1 y 100 caracteres'),
            body('items')
                .isArray({ min: 1 })
                .withMessage('Los items deben ser un array con al menos un elemento'),
            body('items.*.productId')
                .isString()
                .withMessage('El productId debe ser una cadena')
                .notEmpty()
                .withMessage('El productId es obligatorio'),
            body('items.*.quantity')
                .isInt({ min: 1 })
                .withMessage('La cantidad debe ser un número entero mayor a 0'),
            body('items.*.price')
                .isFloat({ min: 0 })
                .withMessage('El precio debe ser un número mayor o igual a 0'),
            body('status')
                .optional()
                .isIn(['pending', 'paid', 'shipped'])
                .withMessage('El status debe ser uno de: pending, paid, shipped')
        ];
    }

    static updateOrder(): ValidationChain[] {
        return [
            param('orderId')
                .isString()
                .withMessage('El orderId debe ser una cadena')
                .notEmpty()
                .withMessage('El orderId es obligatorio'),
            body('customerId')
                .isString()
                .withMessage('El customerId debe ser una cadena')
                .notEmpty()
                .withMessage('El customerId es obligatorio')
                .isLength({ min: 1, max: 100 })
                .withMessage('El customerId debe tener entre 1 y 100 caracteres'),
            body('items')
                .isArray({ min: 1 })
                .withMessage('Los items deben ser un array con al menos un elemento'),
            body('items.*.productId')
                .isString()
                .withMessage('El productId debe ser una cadena')
                .notEmpty()
                .withMessage('El productId es obligatorio'),
            body('items.*.quantity')
                .isInt({ min: 1 })
                .withMessage('La cantidad debe ser un número entero mayor a 0'),
            body('items.*.price')
                .isFloat({ min: 0 })
                .withMessage('El precio debe ser un número mayor o igual a 0'),
            body('status')
                .optional()
                .isIn(['pending', 'paid', 'shipped'])
                .withMessage('El status debe ser uno de: pending, paid, shipped')
        ];
    }

    static orderIdParam(): ValidationChain[] {
        return [
            param('orderId')
                .isString()
                .withMessage('El orderId debe ser una cadena')
                .notEmpty()
                .withMessage('El orderId es obligatorio')
        ];
    }
}

export class OrderValidator {
    static validateOrderRequest(request: OrderRequest): { valid: boolean; errors: string[] } {
        const errors: string[] = [];

        if (!request.customerId || request.customerId.trim().length === 0) {
            errors.push('El customerId es obligatorio');
        }

        if (!request.items || !Array.isArray(request.items) || request.items.length === 0) {
            errors.push('Los items son obligatorios y deben tener al menos un elemento');
        }

        if (request.items && Array.isArray(request.items)) {
            request.items.forEach((item, index) => {
                if (!item.productId || item.productId.trim().length === 0) {
                    errors.push(`El productId del item ${index} es obligatorio`);
                }
                if (!item.quantity || item.quantity < 1) {
                    errors.push(`La cantidad del item ${index} debe ser mayor a 0`);
                }
                if (item.price === undefined || item.price < 0) {
                    errors.push(`El precio del item ${index} debe ser mayor o igual a 0`);
                }
            });
        }

        const validStatuses: OrderStatus[] = ['pending', 'paid', 'shipped'];
        if (request.status && !validStatuses.includes(request.status)) {
            errors.push(`El status debe ser uno de: ${validStatuses.join(', ')}`);
        }

        return {
            valid: errors.length === 0,
            errors
        };
    }

    static validateStatusTransition(currentStatus: OrderStatus, newStatus: OrderStatus): boolean {
        const allowedTransitions: Record<OrderStatus, OrderStatus[]> = {
            'pending': ['paid', 'shipped'],
            'paid': ['shipped'],
            'shipped': []
        };

        return allowedTransitions[currentStatus]?.includes(newStatus) ?? false;
    }

    static sanitizeOrderRequest(request: any): OrderRequest {
        return {
            customerId: request.customerId?.trim() || '',
            items: (request.items || []).map((item: any) => ({
                productId: item.productId?.trim() || '',
                quantity: parseInt(item.quantity, 10) || 0,
                price: parseFloat(item.price) || 0
            })),
            status: request.status || 'pending'
        };
    }
}

export function formatValidationErrors(errors: ValidationError[]): string[] {
    return errors.map(error => {
        if (error.type === 'field') {
            return `${error.path}: ${error.msg}`;
        }
        return error.msg;
    });
}