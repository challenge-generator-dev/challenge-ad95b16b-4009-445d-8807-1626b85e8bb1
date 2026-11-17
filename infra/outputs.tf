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