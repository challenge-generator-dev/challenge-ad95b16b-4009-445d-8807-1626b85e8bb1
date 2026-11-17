# Prompt para Mejorar el Codigo Base

Copia y pega el contenido del bloque de abajo en un asistente de IA (Claude, ChatGPT)
para obtener el proyecto completo y arrancable. Guarda los archivos que te devuelva en la
carpeta del repo, respetando exactamente las rutas.

Si preferis trabajar en tu editor con un agente local (Claude Code, Cursor, Copilot), usa `AGENTS.md` en vez de este archivo: dice lo mismo pero para que escriba los archivos en disco.

## Las dos reglas que no se negocian

1. **Completa el boilerplate.** Todo lo que el proyecto necesita para compilar y arrancar: manifiesto de dependencias, punto de entrada, configuracion, capa de interfaz, y las capas del patron arquitectonico declarado. Eso es andamiaje y es tu trabajo.
2. **NO resuelvas el reto.** Los entregables de las fases son el trabajo de la persona. El hueco pedagogico se deja como esta: el proyecto arranca, pero lo que el reto pide implementar NO esta implementado.

Dicho de otra forma: si algo impide compilar, arreglalo. Si algo es logica de negocio incompleta, validaciones ausentes, un secreto hardcodeado o un patron mejorable, dejalo exactamente como esta — es lo que la persona tiene que encontrar.

## Superficie de practica — NO resuelvas

Estos archivos SON el ejercicio de la persona. No los implementes; deja stubs.

- `app/src/services/orderService.ts` — La fase "Configuración inicial y creación de la tabla DynamoDB" (f1) practica src/config/dynamodb.ts (configuración del cliente DynamoDB con AWS SDK v3) aqui: este archivo es el ejercicio (blueprint).
- `app/src/routes/orderRoutes.ts` — La fase "Implementación de la operación CREATE" (f2) practica src/routes/orderRoutes.ts (ruta POST /orders) aqui: este archivo es el ejercicio (blueprint).
- `app/src/repositories/orderRepository.ts` — La fase "Implementación de la operación CREATE" (f2) practica src/repositories/orderRepository.ts (método save) aqui: este archivo es el ejercicio (blueprint).

## Mapa de componentes

El repo tiene una carpeta por componente. Cada uno se instala y verifica dentro de la suya.

| Componente | Carpeta | Rol | Capa | Track | Tecnologias |
|---|---|---|---|---|---|
| `app` | `app/` | practice, chapter | server | Node | Express, DynamoDB |
| `infra` | `infra/` | support | infra | Terraform (AWS) | Terraform |
| `infra-local` | (raiz) | support | infra | Compose local | DynamoDB |

## Orden de arranque

1. `docker compose up -d` (en la raiz) — levanta la infraestructura local.
2. `cd infra && terraform init -backend=false && terraform -chdir=modules/dynamodb init -backend=false && terraform validate && terraform -chdir=modules/dynamodb validate` — componente `infra` (support).
3. `cd app && npm install --no-audit --no-fund && npm run build` — componente `app` (practice, chapter).

### Contratos entre componentes

- `app` expone http (api: http://localhost:3000):
  - `POST /orders`
  - `GET /orders/:orderId`
  - `PUT /orders/:orderId`
  - `DELETE /orders/:orderId`

## Como saber que terminaste

```bash
(cd app && npm install --no-audit --no-fund && npm run build) && (cd infra && terraform init -backend=false && terraform -chdir=modules/dynamodb init -backend=false && terraform validate && terraform -chdir=modules/dynamodb validate) && docker compose config -q
```

Ese comando corriendo sin errores es la definicion de "listo".

---

```
## Briefing del reto (autoridad)
Este bloque manda sobre los archivos adjuntos. El stack y el rol salen de AQUÍ, no de un topic genérico ni de markdown placeholder.

### Perfil
Chapter Backend, Especialidad Desarrollador, Tecnología Node, Advanced L2

### Brecha de conocimiento
CRUD de ordenes en DynamoDB expuesto por una API REST

### Misión / candidato
Persistir y consultar ordenes

### Reto
- Tema: CRUD de ordenes sobre DynamoDB
- Seniority: advanced-l2
- Tipo: practical
- Título: Implementación de operaciones CRUD de ordenes en DynamoDB
- Tiempo estimado: 10 horas

### Fases (trabajo del HUMANO — PROHIBIDO completarlas)
No implementes estos entregables. Dejalos como hueco pedagógico. El asistente solo materializa el proyecto arrancable para que el participante pueda trabajar.
- Fase 1: Configuración inicial y creación de la tabla DynamoDB — objetivo: Configurar el entorno de desarrollo y crear la tabla DynamoDB para almacenar las ordenes. — entregable (NO resolver): Proyecto configurado con Express y AWS SDK v3, y tabla DynamoDB creada.
- Fase 2: Implementación de la operación CREATE — objetivo: Implementar la operación para crear una nueva orden en DynamoDB. — entregable (NO resolver): Ruta API para crear ordenes implementada y funcionando.
- Fase 3: Implementación de las operaciones READ, UPDATE y DELETE — objetivo: Implementar las operaciones para leer, actualizar y eliminar ordenes en DynamoDB. — entregable (NO resolver): Rutas API para leer, actualizar y eliminar ordenes implementadas y funcionando.

Eres un asistente experto en análisis, corrección y generación de archivos de cualquier tipo:
código fuente, documentación, hojas de cálculo, documentos Word, configuraciones, entre otros.
Voy a enviarte una cadena de texto que contiene uno o más archivos. Cada archivo está delimitado por un marcador con el siguiente formato:
// === ARCHIVO: ruta/del/archivo.extension ===
o también puede aparecer como:
## === ARCHIVO: ruta/del/archivo.extension ===
Lo que sigue al marcador puede ser:

El contenido real del archivo (código, texto, YAML, etc.)
Una descripción en lenguaje natural de lo que debe contener el archivo


TU TAREA
PASO 0 — ¿Esto es un proyecto o una carcasa?
Antes de extraer archivos, leé el Briefing (si está) y diagnosticá el adjunto.

Es CARCASA si ocurre CUALQUIERA de estas:
- No hay manifiesto de dependencias del stack del briefing (manifest.json de VTEX IO / package.json / pom.xml / build.gradle / requirements.txt / go.mod / *.tf / *.csproj, según corresponda)
- Hay un "binario" que en realidad es un comentario ("no puede ser mostrado como texto plano", placeholder .fig/.docx vacío)
- Los markdowns ya completan entregables de fases posteriores ("se implementó fade-in", lista de áreas ya resuelta)

Si es CARCASA:
- MATERIALIZÁ un proyecto que arranca en el stack del briefing (VTEX IO Store Framework, Angular, Terraform, pytest, Nest, etc.). Incluí manifiesto, punto de entrada y capa de interfaz reales.
- NO copies los markdowns de "solución" como si fueran el producto. Son ruido de generación.
- NO resuelvas las fases del briefing (están marcadas PROHIBIDO). Dejá el hueco pedagógico: el flujo existe, las microinteracciones/calidad/infra que el reto pide NO están hechas.
- Después seguí al PASO 5 (entrega de archivos).

Si es un proyecto REAL (manifiesto + código que compila o arranca):
- Seguí PASO 1 en adelante. 🔴 compilación sí. 🟡 pedagógico no.

PASO 1 — Detección y extracción
Identifica todos los archivos presentes en la cadena. Para cada archivo extrae:

Su ruta completa (ej: src/main/java/com/pragma/Service.java)
Su contenido o descripción

PASO 2 — Clasificación por tipo
Clasifica cada archivo en una de estas categorías:
A) Código fuente (Java, Python, TypeScript, JavaScript, Kotlin, etc.)
B) Configuración / documentación (YAML, properties, Markdown, JSON, txt, etc.)
C) Excel (.xlsx, .xls, .csv)
D) Word (.docx, .doc)
E) Otro tipo de archivo binario o especial
PASO 3 — Clasificación de errores en código fuente

Objetivo prioritario: que el proyecto compile. No corrijas flujo de negocio ni lógica funcional.

Antes de modificar cualquier archivo de código fuente, clasifica cada problema encontrado en una de estas dos categorías:
🔴 ERROR DE COMPILACIÓN — corregir siempre
Son errores que impiden que el proyecto arranque, sin valor pedagógico:

Import faltante o incorrecto
Clase, método o variable referenciada que no existe en ningún archivo del proyecto
Error de sintaxis
Anotación con atributos inválidos
Dependencia ausente en pom.xml, package.json, etc.
Archivo referenciado que no existe y debe ser creado con implementación mínima

→ CORREGIR estos errores.
🟡 PROBLEMA FUNCIONAL O DE CALIDAD — preservar siempre
Son problemas que no impiden compilar. Pueden ser intencionales para el aprendizaje:

Clave secreta hardcodeada ("secret", "password123")
API deprecada que funciona pero tiene reemplazo moderno
Lógica de negocio incorrecta o incompleta
Código redundante o de baja legibilidad
Falta de validaciones en flujo de negocio
Patrones de diseño incorrectos pero funcionales
Concurrencia no segura
Configuración funcional pero no óptima

→ PRESERVAR tal cual. No corregir, no mejorar, no comentar.
PASO 4 — Procesamiento según tipo de archivo
Tipo A — Código fuente
Aplica únicamente las correcciones clasificadas como 🔴 ERROR DE COMPILACIÓN.
No alteres ningún elemento clasificado como 🟡 PROBLEMA FUNCIONAL O DE CALIDAD.
Si falta un archivo referenciado, créalo con la implementación mínima necesaria para compilar.
Tipo B — Configuración / documentación
Extrae el contenido tal cual, sin modificaciones salvo errores evidentes de sintaxis
(ej: YAML mal indentado).
Tipo C — Excel (.xlsx)
Si viene con contenido real, genera el archivo respetando ese contenido.
Si viene con descripción en lenguaje natural, genera un archivo Excel funcional con:

Fila de encabezados en negrita con color de fondo distintivo
Columnas con ancho ajustado al contenido
Tipos de dato correctos por columna
Validaciones si la descripción lo indica
Hojas nombradas descriptivamente si hay más de una
Filas de ejemplo si no hay datos reales

Tipo D — Word (.docx)
Si viene con contenido real, genera el archivo respetando ese contenido.
Si viene con descripción en lenguaje natural, genera un documento Word funcional con:

Estilos de título (Título 1, Título 2) para jerarquía de secciones
Fuente legible (Calibri o equivalente), tamaño 11-12pt para cuerpo
Márgenes estándar
Tabla de contenido si tiene múltiples secciones
Tablas con encabezados en negrita si aplica

Tipo E — Otro
Genera el archivo con el contenido o estructura más apropiada según la descripción.
PASO 5 — Entrega de archivos
Entregá cada archivo con su ruta completa, respetando exactamente la estructura de rutas
indicada por los marcadores: un bloque por archivo, precedido por su ruta. No generes ZIPs
ni archivos adjuntos.
La entrega debe incluir:

Archivos de código con únicamente los errores de compilación corregidos
Archivos de configuración y documentación sin cambios
Archivos nuevos creados para resolver dependencias de compilación faltantes
Archivos Excel y Word generados desde descripción

IMPORTANTE: Entregá los archivos completos al finalizar. No preguntes si el usuario
quiere recibirlos. Simplemente entregalos; No debes desplegar en el chat el resumen de lo que arreglaste, solo entregá los archivos.

REGLAS IMPORTANTES

No omitas ningún archivo aunque no tenga errores ni modificaciones
Respeta los nombres y rutas exactas indicadas por los marcadores
Si un archivo no tiene marcador claro, infiere el nombre desde su contenido
Si la cadena contiene solo documentación, placeholders o binarios fake, NO la reproduzcas:
aplicá PASO 0 (materializar el proyecto del briefing). Reproducir la carcasa es un fallo.
No agregues texto después del último archivo entregado
No preguntes si el usuario quiere los archivos: simplemente entregalos siempre
Si detectas que falta un archivo de configuración necesario para compilar
(pom.xml, package.json, requirements.txt, build.gradle, etc.), créalo e inclúyelo
inferiendo su contenido desde los imports y frameworks detectados en el código
Nunca corrijas problemas 🟡 aunque parezcan obvios o fáciles de mejorar.
El participante que recibirá este proyecto los debe encontrar y resolver él mismo.


INPUT
Aquí está la cadena con los archivos:

// === ARCHIVO: app/package.json ===
{
  "name": "reto-express",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "build": "tsc -p tsconfig.json"
  },
  "dependencies": {
    "@aws-sdk/client-dynamodb": "3.1170.0",
    "@aws-sdk/lib-dynamodb": "3.1170.0",
    "cors": "2.8.6",
    "express": "4.22.3",
    "express-validator": "7.3.2",
    "nodemon": "3.1.14",
    "reflect-metadata": "0.2.2",
    "ts-node": "10.9.2",
    "tsyringe": "4.10.0"
  },
  "devDependencies": {
    "@types/express": "4.17.25",
    "@types/node": "22.20.5",
    "typescript": "5.7.3"
  }
}

// === ARCHIVO: app/tsconfig.json ===
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "commonjs",
    "moduleResolution": "node",
    "outDir": "dist",
    "strict": true,
    "strictPropertyInitialization": false,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "resolveJsonModule": true,
    "forceConsistentCasingInFileNames": true,
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true,
    "types": [
      "node"
    ]
  },
  "include": [
    "src"
  ],
  "exclude": [
    "node_modules",
    "dist",
    "_pendiente",
    "tests",
    "test",
    "src/**/*.test.ts",
    "src/**/*.spec.ts"
  ]
}

// === ARCHIVO: app/src/config/dynamodb.ts ===
import 'reflect-metadata';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, PutCommand, GetCommand, UpdateCommand, DeleteCommand, ScanCommand } from '@aws-sdk/lib-dynamodb';
import { injectable } from 'tsyringe';

@injectable()
export class DynamoDBConfig {
    private readonly client: DynamoDBClient;
    private readonly docClient: DynamoDBDocumentClient;
    private readonly tableName: string;

    constructor() {
        this.tableName = process.env.DYNAMODB_TABLE_NAME || 'Orders';
        this.client = new DynamoDBClient({
            region: process.env.AWS_REGION || 'us-east-1',
            endpoint: process.env.DYNAMODB_ENDPOINT || undefined,
            credentials: {
                accessKeyId: process.env.AWS_ACCESS_KEY_ID || 'fakeAccessKeyId',
                secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || 'fakeSecretAccessKey'
            }
        });
        this.docClient = DynamoDBDocumentClient.from(this.client);
    }

    getTableName(): string {
        return this.tableName;
    }

    getDocClient(): DynamoDBDocumentClient {
        return this.docClient;
    }

    async putItem(item: any): Promise<any> {
        const command = new PutCommand({
            TableName: this.tableName,
            Item: item
        });
        try {
            const response = await this.docClient.send(command);
            return response;
        } catch (error) {
            console.error('Error putting item in DynamoDB:', error);
            throw new Error('Failed to create order in DynamoDB');
        }
    }

    async getItem(key: { [key: string]: any }): Promise<any> {
        const command = new GetCommand({
            TableName: this.tableName,
            Key: key
        });
        try {
            const response = await this.docClient.send(command);
            return response.Item;
        } catch (error) {
            console.error('Error getting item from DynamoDB:', error);
            throw new Error('Failed to retrieve order from DynamoDB');
        }
    }

    async updateItem(key: { [key: string]: any }, updateExpression: string, expressionAttributeValues: { [key: string]: any }): Promise<any> {
        const command = new UpdateCommand({
            TableName: this.tableName,
            Key: key,
            UpdateExpression: updateExpression,
            ExpressionAttributeValues: expressionAttributeValues,
            ReturnValues: 'ALL_NEW'
        });
        try {
            const response = await this.docClient.send(command);
            return response.Attributes;
        } catch (error) {
            console.error('Error updating item in DynamoDB:', error);
            throw new Error('Failed to update order in DynamoDB');
        }
    }

    async deleteItem(key: { [key: string]: any }): Promise<any> {
        const command = new DeleteCommand({
            TableName: this.tableName,
            Key: key
        });
        try {
            const response = await this.docClient.send(command);
            return response;
        } catch (error) {
            console.error('Error deleting item from DynamoDB:', error);
            throw new Error('Failed to delete order from DynamoDB');
        }
    }

    async scanItems(): Promise<any[]> {
        const command = new ScanCommand({
            TableName: this.tableName
        });
        try {
            const response = await this.docClient.send(command);
            return response.Items || [];
        } catch (error) {
            console.error('Error scanning items in DynamoDB:', error);
            throw new Error('Failed to scan orders from DynamoDB');
        }
    }
}

// === ARCHIVO: app/src/routes/orderRoutes.ts ===
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

// === ARCHIVO: app/src/services/orderService.ts ===
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

// === ARCHIVO: app/src/repositories/orderRepository.ts ===
// TODO(reto): Implementar el acceso a datos para operaciones en DynamoDB
import 'reflect-metadata';
import { injectable } from 'tsyringe';
import { DynamoDBConfig } from '../config/dynamodb';
import { Order, OrderItem, OrderStatus } from '../models/order';

@injectable()
export class OrderRepository {
    constructor(private dynamoDBConfig: DynamoDBConfig) {}

    async createOrder(order: Order): Promise<Order> {
        // TODO(reto): Implementar la lógica para crear una orden en DynamoDB
        throw new Error('Not implemented');
    }

    async getOrder(orderId: string): Promise<Order | null> {
        // TODO(reto): Implementar la lógica para obtener una orden de DynamoDB
        throw new Error('Not implemented');
    }

    async updateOrder(orderId: string, order: Partial<Order>): Promise<Order> {
        // TODO(reto): Implementar la lógica para actualizar una orden en DynamoDB
        throw new Error('Not implemented');
    }

    async deleteOrder(orderId: string): Promise<void> {
        // TODO(reto): Implementar la lógica para eliminar una orden de DynamoDB
        throw new Error('Not implemented');
    }
}

// === ARCHIVO: app/src/models/order.ts ===
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

// === ARCHIVO: app/src/utils/validation.ts ===
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

// === ARCHIVO: app/src/main.ts ===
import 'reflect-metadata';
import { app } from './app';

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en el puerto ${PORT}`);
  console.log(`Entorno: ${process.env.NODE_ENV || 'development'}`);
});

// === ARCHIVO: app/src/app.ts ===
import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { orderRouter } from './routes/orderRoutes';

export const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/health', (_req: Request, res: Response) => {
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.use('/orders', orderRouter);

app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error('Error no manejado:', err);
  res.status(500).json({
    error: 'Error interno del servidor',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

app.use((_req: Request, res: Response) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

// === ARCHIVO: app/src/types/cors.d.ts ===
declare module 'cors';


// === ARCHIVO: infra/versions.tf ===
terraform {
  required_version = ">= 1.9.0, < 2.0.0"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "= 5.100.0"
    }
  }
}

// === ARCHIVO: infra/providers.tf ===
provider "aws" {
  region = "us-east-1"
}

// === ARCHIVO: infra/main.tf ===
# Configuración principal de Terraform para la infraestructura de órdenes en DynamoDB

# Módulo para la tabla DynamoDB de órdenes
module "orders_table" {
  source = "./modules/dynamodb"

  table_name           = "orders"
  hash_key             = "orderId"
  billing_mode         = "PAY_PER_REQUEST"
  stream_enabled       = true
  stream_view_type     = "NEW_AND_OLD_IMAGES"
  ttl_attribute_name   = "expirationTime"

  attributes = [
    {
      name = "orderId"
      type = "S"
    },
    {
      name = "customerId"
      type = "S"
    },
    {
      name = "status"
      type = "S"
    }
  ]

  global_secondary_indexes = [
    {
      name            = "CustomerIndex"
      hash_key        = "customerId"
      range_key       = "orderId"
      projection_type = "ALL"
      read_capacity   = 5
      write_capacity  = 5
    },
    {
      name            = "StatusIndex"
      hash_key        = "status"
      range_key       = "orderId"
      projection_type = "ALL"
      read_capacity   = 5
      write_capacity  = 5
    }
  ]

  tags = {
    Environment = var.environment
    Application = "order-management"
    Terraform   = "true"
  }
}

# Política IAM para acceso a DynamoDB
resource "aws_iam_policy" "dynamodb_access" {
  name        = "DynamoDBAccessPolicy-${var.environment}"
  description = "Política para acceso a la tabla DynamoDB de órdenes"

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Action = [
          "dynamodb:PutItem",
          "dynamodb:GetItem",
          "dynamodb:UpdateItem",
          "dynamodb:DeleteItem",
          "dynamodb:Query",
          "dynamodb:Scan",
          "dynamodb:BatchWriteItem"
        ]
        Resource = module.orders_table.table_arn
      },
      {
        Effect = "Allow"
        Action = [
          "dynamodb:Query"
        ]
        Resource = "${module.orders_table.table_arn}/index/*"
      }
    ]
  })
}

# Rol IAM para la aplicación
resource "aws_iam_role" "app_role" {
  name = "OrderAppRole-${var.environment}"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Principal = {
          Service = "lambda.amazonaws.com"
        }
        Action = "sts:AssumeRole"
      }
    ]
  })
}

# Adjuntar política al rol
resource "aws_iam_role_policy_attachment" "dynamodb_access_attachment" {
  role       = aws_iam_role.app_role.name
  policy_arn = aws_iam_policy.dynamodb_access.arn
}

# Outputs para otros módulos
output "orders_table_name" {
  value = module.orders_table.table_name
}

output "orders_table_arn" {
  value = module.orders_table.table_arn
}

output "app_role_arn" {
  value = aws_iam_role.app_role.arn
}

// === ARCHIVO: infra/variables.tf ===
# Variables de entrada para la infraestructura de órdenes

variable "environment" {
  description = "Entorno de despliegue (dev, staging, prod)"
  type        = string
  default     = "dev"

  validation {
    condition     = contains(["dev", "staging", "prod"], var.environment)
    error_message = "El entorno debe ser uno de: dev, staging, prod."
  }
}

variable "region" {
  description = "Región de AWS donde se desplegarán los recursos"
  type        = string
  default     = "us-east-1"
}

variable "table_name" {
  description = "Nombre de la tabla DynamoDB para órdenes"
  type        = string
  default     = "orders"
}

variable "billing_mode" {
  description = "Modo de facturación para la tabla DynamoDB"
  type        = string
  default     = "PAY_PER_REQUEST"

  validation {
    condition     = contains(["PROVISIONED", "PAY_PER_REQUEST"], var.billing_mode)
    error_message = "El modo de facturación debe ser PROVISIONED o PAY_PER_REQUEST."
  }
}

// === ARCHIVO: infra/outputs.tf ===
# Outputs de la infraestructura de órdenes

output "dynamodb_table_name" {
  description = "Nombre de la tabla DynamoDB creada"
  value       = module.orders_table.table_name
}

output "dynamodb_table_arn" {
  description = "ARN de la tabla DynamoDB creada"
  value       = module.orders_table.table_arn
}

output "dynamodb_table_stream_arn" {
  description = "ARN del stream de la tabla DynamoDB"
  value       = module.orders_table.table_stream_arn
}

output "iam_role_arn" {
  description = "ARN del rol IAM creado para la aplicación"
  value       = aws_iam_role.app_role.arn
}

output "iam_policy_arn" {
  description = "ARN de la política IAM para acceso a DynamoDB"
  value       = aws_iam_policy.dynamodb_access.arn
}

// === ARCHIVO: infra/modules/dynamodb/main.tf ===
# Módulo reutilizable para creación de tablas DynamoDB

resource "aws_dynamodb_table" "this" {
  name           = var.table_name
  billing_mode   = var.billing_mode
  hash_key       = var.hash_key
  range_key      = var.range_key

  dynamic "attribute" {
    for_each = var.attributes
    content {
      name = attribute.value.name
      type = attribute.value.type
    }
  }

  dynamic "global_secondary_index" {
    for_each = var.global_secondary_indexes
    content {
      name            = global_secondary_index.value.name
      hash_key        = global_secondary_index.value.hash_key
      range_key       = global_secondary_index.value.range_key
      projection_type = global_secondary_index.value.projection_type
      read_capacity   = var.billing_mode == "PROVISIONED" ? global_secondary_index.value.read_capacity : null
      write_capacity  = var.billing_mode == "PROVISIONED" ? global_secondary_index.value.write_capacity : null
    }
  }

  ttl {
    attribute_name = var.ttl_attribute_name
    enabled        = var.ttl_attribute_name != null
  }

  stream_enabled   = var.stream_enabled
  stream_view_type = var.stream_enabled ? var.stream_view_type : null

  tags = var.tags
}



// === ARCHIVO: infra/modules/dynamodb/variables.tf ===
# Variables para el módulo DynamoDB

variable "table_name" {
  description = "Nombre de la tabla DynamoDB"
  type        = string
}

variable "hash_key" {
  description = "Clave hash de la tabla DynamoDB"
  type        = string
}

variable "range_key" {
  description = "Clave de rango de la tabla DynamoDB (opcional)"
  type        = string
  default     = null
}

variable "billing_mode" {
  description = "Modo de facturación para la tabla DynamoDB"
  type        = string
  default     = "PAY_PER_REQUEST"
}

variable "read_capacity" {
  description = "Capacidad de lectura provisionada (solo para PROVISIONED)"
  type        = number
  default     = 5
}

variable "write_capacity" {
  description = "Capacidad de escritura provisionada (solo para PROVISIONED)"
  type        = number
  default     = 5
}

variable "stream_enabled" {
  description = "Habilitar stream para la tabla"
  type        = bool
  default     = false
}

variable "stream_view_type" {
  description = "Tipo de vista para el stream"
  type        = string
  default     = null
  validation {
    condition     = var.stream_view_type == null || contains(["KEYS_ONLY", "NEW_IMAGE", "OLD_IMAGE", "NEW_AND_OLD_IMAGES"], var.stream_view_type)
    error_message = "El tipo de vista del stream debe ser uno de: KEYS_ONLY, NEW_IMAGE, OLD_IMAGE, NEW_AND_OLD_IMAGES."
  }
}

variable "ttl_attribute_name" {
  description = "Nombre del atributo para TTL"
  type        = string
  default     = null
}

variable "attributes" {
  description = "Lista de atributos para la tabla"
  type = list(object({
    name = string
    type = string
  }))
  default = []
}

variable "global_secondary_indexes" {
  description = "Lista de índices secundarios globales"
  type = list(object({
    name            = string
    hash_key        = string
    range_key       = optional(string)
    projection_type = string
    read_capacity   = optional(number)
    write_capacity  = optional(number)
  }))
  default = []
}

variable "tags" {
  description = "Tags para la tabla DynamoDB"
  type        = map(string)
  default     = {}
}

// === ARCHIVO: infra/modules/dynamodb/outputs.tf ===
# Outputs del módulo DynamoDB

output "table_name" {
  description = "Nombre de la tabla DynamoDB creada"
  value       = aws_dynamodb_table.this.name
}

output "table_arn" {
  description = "ARN de la tabla DynamoDB creada"
  value       = aws_dynamodb_table.this.arn
}

output "table_stream_arn" {
  description = "ARN del stream de la tabla DynamoDB"
  value       = aws_dynamodb_table.this.stream_arn
}

// === ARCHIVO: infra/README.md ===
# Componente de Infraestructura - Terraform

Este componente contiene la configuración de infraestructura como código para el sistema de gestión de órdenes sobre DynamoDB.

## Propósito

Proporcionar la infraestructura necesaria para el despliegue y operación del sistema CRUD de órdenes, incluyendo:

- Tabla DynamoDB para almacenamiento de órdenes
- Roles y políticas IAM para acceso a recursos AWS
- Configuración de red y seguridad
- Logging y monitoreo

## Estructura del Proyecto

```
infra/
├── environments/
│   └── dev/
│       └── terraform.tfvars    # Valores específicos del entorno dev
├── modules/
│   └── dynamodb/
│       ├── main.tf             # Definición del módulo DynamoDB
│       ├── variables.tf        # Variables de entrada del módulo
│       └── outputs.tf          # Variables de salida del módulo
├── main.tf                     # Configuración principal de recursos
├── variables.tf                # Variables globales del proyecto
├── outputs.tf                  # Outputs globales del proyecto
├── providers.tf                # Configuración de providers (fijo)
└── versions.tf                 # Versiones de Terraform y providers (fijo)
```

## Requisitos

- Terraform >= 1.9.0
- AWS Provider 5.100.0
- Credenciales AWS configuradas (variables de entorno, perfil o IAM role)

## Uso

### Inicialización

```bash
cd infra
terraform init
```

### Plan de cambios

```bash
cd infra
terraform plan -var-file=environments/dev/terraform.tfvars
```

### Aplicar infraestructura

```bash
cd infra
terraform apply -var-file=environments/dev/terraform.tfvars
```

### Destruir infraestructura

```bash
cd infra
terraform destroy -var-file=environments/dev/terraform.tfvars
```

## Variables Principales

| Variable | Descripción | Valor por defecto |
|----------|-------------|-------------------|
| `environment` | Entorno de despliegue | `dev` |
| `region` | Región AWS | `us-east-1` |
| `table_name` | Nombre de la tabla DynamoDB | `orders` |
| `billing_mode` | Modo de facturación | `PAY_PER_REQUEST` |
| `stream_enabled` | Habilitar streams de DynamoDB | `false` |

## Outputs Disponibles

Después de aplicar la infraestructura, los siguientes valores están disponibles:

- `dynamodb_table_name`: Nombre de la tabla creada
- `dynamodb_table_arn`: ARN de la tabla
- `dynamodb_table_stream_arn`: ARN del stream (si está habilitado)
- `iam_role_arn`: ARN del rol de aplicación
- `iam_policy_arn`: ARN de la política de acceso

## Módulos

### Módulo DynamoDB

El módulo `modules/dynamodb` crea una tabla DynamoDB configurable con las siguientes características:

- Clave de partición (hash key) configurable
- Clave de ordenación (range key) opcional
- Modo de facturación PAY_PER_REQUEST o PROVISIONED
- Índices secundarios globales (GSI)
- Streams para captura de cambios
- TTL para expiración automática de registros
- Etiquetado consistente

## Consideraciones de Seguridad

- Los roles IAM siguen el principio de mínimo privilegio
- Las políticas se limitan a las operaciones necesarias sobre la tabla
- Los logs se almacenan en CloudWatch con retención configurable
- No se exponen credenciales en el código

## Desarrollo

Para agregar un nuevo entorno:

1. Crear `environments/<nombre>/terraform.tfvars`
2. Ajustar los valores según las necesidades del entorno
3. Ejecutar terraform plan/apply con el nuevo archivo de variables

## Troubleshooting

### Error de autenticación AWS

Verificar que las credenciales estén configuradas correctamente:

```bash
aws configure
# o
export AWS_ACCESS_KEY_ID=<clave>
export AWS_SECRET_ACCESS_KEY=<secreto>
```

### Error de estado bloqueado

Si el estado de Terraform está bloqueado:

```bash
terraform force-unlock <lock-id>
```

### Validar sintaxis

```bash
terraform validate
terraform fmt -recursive
```

// === ARCHIVO: infra/environments/dev/terraform.tfvars ===
# Configuración específica para el entorno de desarrollo
# Valores utilizados por las variables definidas en variables.tf y los módulos de Terraform

# Entorno y región
environment = "dev"
region      = "us-east-1"

# Configuración de la tabla DynamoDB
table_name    = "orders-dev"
billing_mode  = "PAY_PER_REQUEST"

# Capacidades de la tabla (para modo PROVISIONED)
read_capacity  = 5
write_capacity = 5

# Configuración de streams para captura de cambios
stream_enabled   = true
stream_view_type = "NEW_AND_OLD_IMAGES"

# TTL para limpieza automática de registros (opcional)
# ttl_attribute_name = "expires_at"

# Etiquetas consistentes para todos los recursos
tags = {
  Environment = "dev"
  Project     = "orders-api"
  ManagedBy   = "terraform"
  Owner       = "devops-team"
}

# Configuración de IAM
iam_role_name = "orders-api-dev-role"

# Nombre del bucket S3 para logs (si aplica)
# logs_bucket_name = "orders-api-logs-dev"

# Habilitar características adicionales en desarrollo
enable_deletion_protection = false
enable_point_in_time_recovery = false

// === ARCHIVO: docker-compose.yml ===
# Infraestructura local del reto. SOLO desarrollo: credenciales de ejemplo (local-dev-only), puertos en loopback.
# Levantar: docker compose up -d --wait
name: infra-local
services:
  dynamodb-local:
    image: "amazon/dynamodb-local:2.5.2"
    command: ["-jar","DynamoDBLocal.jar","-sharedDb","-inMemory"]
    ports:
      - "127.0.0.1:8000:8000"
    healthcheck:
      test: ["CMD-SHELL","bash -c ':> /dev/tcp/127.0.0.1/8000' || exit 1"]
      interval: 10s
      timeout: 5s
      retries: 10
      start_period: 5s


// === ARCHIVO: infra-local/README.md ===
# Infraestructura local

Servicios de soporte para el reto, definidos en `docker-compose.yml` (raiz del repo).

```bash
docker compose up -d --wait
```

| Servicio | Imagen | Puertos (host) |
|---|---|---|
| DynamoDB Local | `amazon/dynamodb-local:2.5.2` | 8000 |

Credenciales: solo de desarrollo local (`local-dev-only`, `local`). No son secretos ni deben reutilizarse.
Los scripts de `infra-local/` (tablas, topics) se ejecutan con el compose en estado healthy.

Tablas de DynamoDB: `Orders` (pk `id`).


// === ARCHIVO: infra-local/dynamodb/create-tables.sh ===
#!/usr/bin/env bash
# Crea las tablas en DynamoDB Local (idempotente). Credenciales dummy: DynamoDB Local no valida firmas.
set -euo pipefail

export AWS_ACCESS_KEY_ID=local
export AWS_SECRET_ACCESS_KEY=local
export AWS_REGION=us-east-1
ENDPOINT="${DYNAMODB_ENDPOINT:-http://localhost:8000}"

create_table() {
  local name="$1" pk="$2" sk="${3:-}"
  if aws dynamodb describe-table --table-name "$name" --endpoint-url "$ENDPOINT" >/dev/null 2>&1; then
    echo "Tabla $name ya existe"
    return
  fi
  local attrs="AttributeName=$pk,AttributeType=S"
  local keys="AttributeName=$pk,KeyType=HASH"
  if [ -n "$sk" ]; then
    attrs="$attrs AttributeName=$sk,AttributeType=S"
    keys="$keys AttributeName=$sk,KeyType=RANGE"
  fi
  # shellcheck disable=SC2086
  aws dynamodb create-table --table-name "$name" --attribute-definitions $attrs --key-schema $keys \
    --billing-mode PAY_PER_REQUEST --endpoint-url "$ENDPOINT" >/dev/null
  echo "Tabla $name creada"
}

create_table "Orders" "id"

```
