# Frontend Technical Challenge 

Este proyecto es una solución al desafío técnico para la posición de Technical Lead Frontend. La aplicación simula un flujo de autenticación y muestra una lista paginada de personajes usando una API pública real.

---

## 🧪 Requisitos cumplidos

- ✅ Login simulado (fake login) con almacenamiento de token en memoria
- ✅ Separación de rutas públicas (Login) y privadas (Home)
- ✅ Arquitectura escalable basada en contextos
- ✅ Axios configurado con token en headers
- ✅ Consumo de API pública real: Rick and Morty API (https://rickandmortyapi.com/)
- ✅ Renderizado de +800 personajes paginados (20 por página)
- ✅ Filtro por nombre (con debounce), estado y género
- ✅ Selects estilizados y paginación moderna
- ✅ Diseño responsivo (mobile y desktop)
- ✅ Uso de React Query v5 con caché y control de datos
- ✅ Logout que limpia sesión y redirige al login

---

## 🚀 Tecnologías usadas

- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [React Router](https://reactrouter.com/)
- [Axios](https://axios-http.com/)
- [React Query v5](https://tanstack.com/query/latest/)
- Custom hook `useDebounce` para mejorar UX en búsqueda


---

## 📦 Instalación

1. Clonar el repositorio:

``` bash
git clone https://github.com/tu-usuario/frontend-lead-challenge.git
cd frontend-lead-challenge
npm install
npm run dev 
```

Abrí http://localhost:5173 para ver la app en el navegador.

## 🔐 Lógica de autenticación

El login simula una autenticación y guarda un token fake (fake-token-123) en memoria.
El contexto AuthContext provee funciones login() y logout() disponibles globalmente.
Al iniciar sesión correctamente, se redirige al /home.

## 🧠 Arquitectura pública/privada

Se usan rutas protegidas (PrivateRoute) para acceder al área privada (/home).
El token se pasa por Context API, lo cual facilita escalar con nuevos módulos privados o públicos (ej. cambio de contraseña, perfil de usuario, etc.).
El token se mantiene en memoria (con posibilidad de extender a almacenamiento persistente).
Separación clara entre contextos públicos y privados para facilitar crecimiento futuro (ej. perfil, recuperación de contraseña, etc).

##  📈 API Pública: Rick and Morty

- ✅ Se consumen datos reales desde la API:
 GET /character?page={n}&name={query}&status={filter}&gender={filter}

- ✅ Se renderiza una grilla moderna con:
    - Avatar
    - Nombre
    - Especie

- ✅ Búsqueda por nombre con useDebounce

- ✅ Se implementa paginación real con indicadores

Filtros aplicados:
🔍 Búsqueda por nombre
⚡ Estado (Vive, Muerto, Desconocido)
⚧️ Género (Femenino, Masculino, Sin genero, Desconocido)

##  Diseño moderno

Pantalla de Login con gradiente, tarjeta centrada y focus styles
Home con:
Header fijo con título, buscador y logout
Filtros con select estilizados
Tarjetas limpias y responsivas
Paginación moderna con feedback visual

## ⚡️ Optimización de rendimiento

✅ Debounce de búsqueda: evita múltiples requests mientras el usuario tipea
✅ React Query v5:
Cacheo automático de datos
keepPreviousData para evitar flickering
Control de estados (loading, error, etc)
Posibilidad futura de usar infinite scroll (no implementado por simplicidad UX)

## 🧼 Logout

El botón de logout:

Elimina el token de memoria (y localStorage en caso de persistencia futura).
Redirige automáticamente al login.