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