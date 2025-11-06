# Bitácora de Trabajo: Implementación del MVP

## Resumen
El objetivo de esta rama es implementar las características del Producto Mínimo Viable (MVP) según se define en los documentos de requisitos y especificaciones. Se ha completado una parte significativa del backend, pero la implementación del frontend está actualmente bloqueada por problemas de compilación persistentes.

---

## Backend (Completado y Funcional) ✅

### 1. Autenticación de Usuarios
- **Registro:** Se implementó el endpoint `POST /api/users/` para registrar nuevos usuarios.
- **Hashing de Contraseñas:** Se utiliza `passlib` con `bcrypt` para asegurar las contraseñas antes de guardarlas en la base de datos.
- **Inicio de Sesión y JWT:** Se implementó el endpoint `POST /api/token` que autentica a los usuarios y devuelve un JSON Web Token (JWT) para la gestión de sesiones.
- **Esquemas y Configuración:** Se añadieron los esquemas `Token` y `TokenData` en `schemas.py` y se configuraron las claves secretas y el algoritmo en `settings.py`.
- **Pruebas:** Se escribieron y pasaron pruebas unitarias y de integración para el registro y el inicio de sesión, cubriendo tanto casos de éxito como de credenciales no válidas.

### 2. Gestión de Roles
- **Modelo de Datos:** Se añadió el modelo `Role` y una tabla de asociación `user_roles` en `models.py` para establecer una relación muchos a muchos entre usuarios y roles.
- **Migración de Base de Datos:** Se creó una migración de Alembic para aplicar los nuevos modelos a la base de datos.
- **API Endpoints:**
    - `POST /api/roles/`: Para crear nuevos roles.
    - `GET /api/roles/`: Para listar los roles existentes.
    - `POST /api/users/{user_id}/roles/{role_id}`: Para asignar un rol a un usuario.
- **Pruebas:** Todas las funcionalidades de la API de roles están cubiertas por pruebas que actualmente pasan.

### 3. Gestión de Proyectos y Equipos
- **Modelo de Datos:** Se añadió una tabla de asociación `project_users` para vincular usuarios a proyectos.
- **Migración de Base de Datos:** Se generó y aplicó una migración de Alembic para actualizar el esquema de la base de datos.
- **API Endpoints:** Se implementó el endpoint `POST /projects/{project_id}/users/{user_id}` para asignar usuarios a un equipo de proyecto.
- **Esquemas:** Se actualizaron los esquemas Pydantic `Project` y `User` para reflejar la nueva relación, resolviendo una dependencia circular mediante el uso de `UserBase` y `ProjectBase`.
- **Pruebas:** Se añadieron pruebas para la asignación de usuarios a proyectos, y todas pasan correctamente.

### 4. Mejoras en el Entorno de Pruebas
- **Resolución de `PendingRollbackError`:** Se refactorizaron los archivos de prueba (`test_users.py`, `test_roles.py`, `test_projects.py`) para eliminar la configuración de base de datos local y utilizar la configuración centralizada de `conftest.py`. Esto solucionó errores de transacción persistentes y aseguró el aislamiento de las pruebas.
- **Gestión de Dependencias:** Se instalaron las dependencias que faltaban en el entorno de pruebas, como `python-jose` y `python-multipart`.

---

## Frontend (En Progreso - Bloqueado) ⚠️

### 1. Tareas Realizadas
- **Configuración Inicial:** Se instaló `@angular/cli` como una dependencia de desarrollo local.
- **Páginas de Autenticación:**
    - Se generaron los componentes `LoginComponent` y `RegisterComponent`.
    - Se creó un `AuthService` para gestionar las llamadas a la API de backend para el inicio de sesión y el registro.
    - Se añadieron las rutas `/login` y `/register` al archivo de enrutamiento principal (`app.routes.ts`).
- **UI de Seguimiento de Issues:**
    - Se mejoró la plantilla de `IssueListComponent` para mostrar más detalles de los issues en una tabla.
    - Se generó un `IssueFormComponent` para ser utilizado como un modal para la creación de nuevos issues.

### 2. Problema Actual (Bloqueo)
- **Errores de Compilación Persistentes:** La aplicación de Angular no compila, lo que impide ejecutar el script de Playwright para la verificación visual y continuar con el desarrollo.
- **Errores encontrados:** `Module not found`, `cannot find module`, `ENOENT: no such file or directory`. Estos errores persisten incluso después de múltiples intentos de corrección.
- **Pasos de Troubleshooting Realizados (Sin Éxito):**
    1.  **Corrección de Nombres y Rutas:** Se verificaron y corrigieron inconsistencias en los nombres de archivos (añadiendo `.component.ts`), nombres de clases e importaciones.
    2.  **Reinicio del Servidor:** Se reinició el servidor de desarrollo de Angular (`npm start`) varias veces.
    3.  **Limpieza de Caché:** Se eliminó el directorio de caché de Angular (`.angular/cache`).
    4.  **Reinstalación de Dependencias:** Se eliminaron `node_modules` y `package-lock.json` y se ejecutó `npm install` para asegurar una instalación limpia.
    5.  **Reversión de Cambios:** Se revirtieron todos los cambios en el frontend a su estado original. Sin embargo, tras la reversión, comenzaron a aparecer errores en archivos que no habían sido modificados (`http-token.interceptor.ts`), lo que sugiere un problema más profundo en la configuración del proyecto.

---

## Tareas Pendientes del MVP en el Frontend

Una vez resuelto el problema de compilación, las siguientes tareas deben completarse para finalizar el MVP del frontend:

### 1. Autenticación
-   [ ] **Resolver el bloqueo de compilación.**
-   [ ] Implementar la UI final para los formularios de inicio de sesión y registro.
-   [ ] Implementar el almacenamiento del token JWT en `localStorage` tras un inicio de sesión exitoso.
-   [ ] Crear un `AuthGuard` para proteger las rutas que requieren autenticación.
-   [ ] Redirigir al usuario al dashboard después del inicio de sesión.

### 2. Seguimiento de Issues
-   [ ] Re-implementar y finalizar la funcionalidad del modal para crear nuevos issues en `IssueListComponent`.
-   [ ] Implementar la lógica de filtrado en `IssueListComponent` para que los usuarios puedan buscar issues por proyecto, asignado, estado, etc.
-   [ ] Añadir la capacidad de realizar transiciones básicas de flujo de trabajo (por ejemplo, cambiar el estado de un issue).

### 3. Gestión de Proyectos
-   [ ] Crear una página para mostrar una lista de todos los proyectos.
-   [ ] Crear una vista de detalle para un proyecto, donde se pueda ver a los miembros del equipo.
-   [ ] Implementar la interfaz de usuario para crear nuevos proyectos y asignarles usuarios.
