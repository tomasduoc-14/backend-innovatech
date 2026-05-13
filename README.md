# Backend Innovatech

Backend Node.js + Express con PostgreSQL, contenedorizado con Docker y desplegado automáticamente en AWS EC2 mediante GitHub Actions.

## Arquitectura
- Backend: EC2 privada → Puerto 3000
- Base de datos: PostgreSQL con volumen persistente

## Cómo levantar localmente
```bash
cp .env.example .env
docker compose up --build
```

## Endpoints
| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | /health | Estado del servidor |
| GET | /api/productos | Lista de productos |

## Variables de entorno
| Variable | Descripción | Default |
|----------|-------------|---------|
| PORT | Puerto del servidor | 3000 |
| DB_HOST | Host de la base de datos | database |
| DB_NAME | Nombre de la BD | innovatech |
| DB_USER | Usuario de la BD | postgres |
| DB_PASSWORD | Contraseña de la BD | postgres123 |

## Pipeline CI/CD
Se activa automáticamente con push a la rama `deploy`:
1. Build de imagen Docker multi-stage
2. Push a Docker Hub
3. Deploy automático en EC2 via SSH
