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