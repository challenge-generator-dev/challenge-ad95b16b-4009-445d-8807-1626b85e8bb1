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