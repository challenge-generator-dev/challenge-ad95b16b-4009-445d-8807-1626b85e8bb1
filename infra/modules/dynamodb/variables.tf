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