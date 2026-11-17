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