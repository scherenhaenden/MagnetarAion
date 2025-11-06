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

## Frontend (Completado) ✅

### 1. Resolución de Bloqueo de Compilación
- **Corrección de Nombres de Archivos:** Se renombraron los archivos de `LoginComponent` y `AuthService` para seguir las convenciones de Angular (`.component.ts`, `.service.ts`), lo que resolvió los errores de `Module not found`.
- **Corrección de Nombres de Clases:** Se actualizaron los nombres de las clases dentro de los archivos renombrados para que coincidieran con los nombres de los archivos.
- **Reinstalación de Dependencias:** Se eliminaron `node_modules` y `package-lock.json` y se ejecutó `npm install` para asegurar una instalación limpia y resolver problemas con el ejecutable de `ng`.

### 2. Implementación de Funcionalidades del MVP
- **Autenticación:**
    - Se implementó la UI para el formulario de inicio de sesión.
    - Se implementó la lógica para almacenar el token JWT en `localStorage` tras un inicio de sesión exitoso.
    - Se creó un `AuthGuard` para proteger las rutas que requieren autenticación.
    - Se redirige al usuario al dashboard después del inicio de sesión.
- **Seguimiento de Issues:**
    - Se implementó la funcionalidad de un modal para crear nuevos issues en `IssueListComponent`.
    - Se implementó la lógica de filtrado en `IssueListComponent` para que los usuarios puedan buscar issues.
    - Se añadió la capacidad de realizar transiciones básicas de flujo de trabajo (cambiar el estado de un issue).

### 3. Corrección de Pruebas Unitarias
- **`login.component.spec.ts`:** Se corrigió la importación del componente y se añadió el `HttpClientTestingModule` y `RouterTestingModule`.
- **`api.service.ts`:** Se añadió el método `patch` que faltaba y se corrigió el número de argumentos de tipo en el método `post`.
- **`auth.service.spec.ts`:** Se reescribió el archivo de pruebas para que se ajustara a la implementación actual del `AuthService`, utilizando un `HttpTestingController` para simular las peticiones HTTP y esperando las URLs completas.
- **`app.spec.ts`:** Se aseguró de que el `RouterTestingModule` estuviera correctamente configurado para evitar errores con `<router-outlet>`.
- **`app.ts`:** Se importó y añadió el `RouterModule` al componente principal de la aplicación.
