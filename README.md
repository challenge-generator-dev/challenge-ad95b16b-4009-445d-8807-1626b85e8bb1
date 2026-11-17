# Implementación de operaciones CRUD de ordenes en DynamoDB

El sistema debe permitir la creación, lectura, actualización y eliminación de ordenes en una tabla DynamoDB. Cada orden debe tener un campo status con los valores 'pending', 'paid' y'shipped'. El sistema está expuesto a través de una API REST.

## Informacion General

| Campo | Valor |
|-------|-------|
| **Tema** | CRUD de ordenes sobre DynamoDB |
| **Nivel** | advanced-l2 |
| **Tipo** | practical |
| **Tiempo estimado** | 10 horas |

## Fases del Reto

### Fase 0: Configuración del Proyecto

**Objetivo:** Tener el proyecto base del reto funcionando en tu máquina: clonar el repositorio, instalar las herramientas y verificar que compila y arranca antes de empezar a practicar.

**Tiempo estimado:** 15-30 minutos

**Instrucciones:**

- Instala las herramientas para ejecutar el proyecto: Node.js 18+ y npm · Terraform 1.5+.
- Clona el repositorio del reto (el enlace viene en la entrega del reto y en la sección "Repositorio del Proyecto" del PDF) y ábrelo en tu IDE.
- Instala las dependencias y compila ejecutando `(cd app && npm install --no-audit --no-fund && npm run build) && (cd infra && terraform init -backend=false && terraform -chdir=modules/dynamodb init -backend=false && terraform validate && terraform -chdir=modules/dynamodb validate) && docker compose config -q` en la raíz del repositorio.
- Confirma que el comando termina sin errores: el proyecto arranca y sus pruebas corren.
- Ubica los archivos de práctica: son los que contienen `TODO(reto)` (búscalos en el repositorio). Lee el README.md y el AGENTS.md antes de empezar.

**Entregable:** El proyecto compila/arranca sin errores con `(cd app && npm install --no-audit --no-fund && npm run build) && (cd infra && terraform init -backend=false && terraform -chdir=modules/dynamodb init -backend=false && terraform validate && terraform -chdir=modules/dynamodb validate) && docker compose config -q`.

<details>
<summary>Pistas de conocimiento</summary>

- Los archivos con `TODO(reto)` son el ejercicio: el resto del repositorio ya está resuelto y no hace falta tocarlo.
- Si el comando de verificación falla, revisa la versión de las herramientas instaladas antes de modificar código.
- AGENTS.md describe el reto, el comando de verificación y las reglas del repositorio.

</details>

### Fase 1: Configuración inicial y creación de la tabla DynamoDB

**Objetivo:** Configurar el entorno de desarrollo y crear la tabla DynamoDB para almacenar las ordenes.

**Tiempo estimado:** 2 horas

**Instrucciones:**

- Configurar el proyecto con Express y AWS SDK v3.
- Crear la tabla DynamoDB con los campos necesarios para almacenar las ordenes.
- Asegurar que la tabla DynamoDB esté correctamente configurada y accesible.

**Entregable:** Proyecto configurado con Express y AWS SDK v3, y tabla DynamoDB creada.

<details>
<summary>Pistas de conocimiento</summary>

- Utilizar Terraform para la configuración de la infraestructura.
- Consultar la documentación de AWS SDK v3 para interactuar con DynamoDB.

</details>

### Fase 2: Implementación de la operación CREATE

**Objetivo:** Implementar la operación para crear una nueva orden en DynamoDB.

**Tiempo estimado:** 3 horas

**Instrucciones:**

- Crear una nueva ruta en la API REST para manejar la creación de ordenes.
- Validar los datos de entrada para asegurar que el campo status tenga uno de los valores permitidos ('pending', 'paid','shipped').
- Guardar la nueva orden en DynamoDB y devolver una respuesta con los detalles de la orden creada.

**Entregable:** Ruta API para crear ordenes implementada y funcionando.

<details>
<summary>Pistas de conocimiento</summary>

- Utilizar AWS SDK v3 para interactuar con DynamoDB.
- Manejar los errores de validación y devolver respuestas adecuadas.

</details>

### Fase 3: Implementación de las operaciones READ, UPDATE y DELETE

**Objetivo:** Implementar las operaciones para leer, actualizar y eliminar ordenes en DynamoDB.

**Tiempo estimado:** 5 horas

**Instrucciones:**

- Crear rutas en la API REST para manejar las operaciones READ, UPDATE y DELETE de ordenes.
- Validar los datos de entrada para asegurar que el campo status tenga uno de los valores permitidos ('pending', 'paid','shipped') en las operaciones UPDATE.
- Consultar, actualizar y eliminar ordenes en DynamoDB y devolver respuestas adecuadas.

**Entregable:** Rutas API para leer, actualizar y eliminar ordenes implementadas y funcionando.

<details>
<summary>Pistas de conocimiento</summary>

- Utilizar AWS SDK v3 para interactuar con DynamoDB.
- Manejar los errores de validación y devolver respuestas adecuadas.

</details>

## Dimensiones Evaluadas

- **queEs**: ¿Qué es una operación CRUD y cómo se implementa en una API REST?
- **paraQueSirve**: ¿Para qué sirve cada operación CRUD en el contexto de una aplicación que maneja ordenes?
- **comoSeUsa**: ¿Cómo se usa AWS SDK v3 para interactuar con DynamoDB en las operaciones CRUD?
- **erroresComunes**: ¿Cuáles son los errores comunes que pueden ocurrir al implementar operaciones CRUD en DynamoDB y cómo se manejan?
- **queDecisionesImplica**: ¿Qué decisiones implica la implementación de operaciones CRUD en DynamoDB, especialmente en relación al campo status?

## Criterios de Evaluacion

- Configuración correcta del proyecto con Express y AWS SDK v3.
- Creación correcta de la tabla DynamoDB con los campos necesarios.
- Implementación correcta de la operación CREATE con validación del campo status.
- Implementación correcta de las operaciones READ, UPDATE y DELETE con validación del campo status en las operaciones UPDATE.

## Como trabajar con un asistente de IA

Hay dos caminos, elegi uno:

- **AGENTS.md** (recomendado) — instrucciones nativas del repo. Abri esta carpeta con tu agente local (Claude Code, Cursor, Codex, Copilot, Gemini) y las carga solo. Sabe que archivos faltan y con que comando se verifica, y completa el scaffold escribiendo en disco.
- **PROMPT_MEJORA.md** — para copiar y pegar en un chat (claude.ai, ChatGPT) si no tenes un agente en el IDE. Declara lo mismo que AGENTS.md; los archivos que te devuelva el chat los guardas en esta carpeta respetando las rutas.

Ninguno de los dos resuelve las fases del reto: eso es tu trabajo.

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

## Verificacion

El proyecto esta listo para trabajar cuando este comando corre sin errores:

```bash
(cd app && npm install --no-audit --no-fund && npm run build) && (cd infra && terraform init -backend=false && terraform -chdir=modules/dynamodb init -backend=false && terraform validate && terraform -chdir=modules/dynamodb validate) && docker compose config -q
```

---

*Reto generado automaticamente por Challenge Generator - Pragma*
