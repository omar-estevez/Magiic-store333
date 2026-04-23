🛍️ Magic Store 333

Aplicación web e-commerce desarrollada con React + Vite + TypeScript, enfocada en la venta de ropa y calzado moderno. El proyecto sigue una arquitectura escalable y modular para facilitar el mantenimiento y crecimiento.

🚀 Características
🧩 Arquitectura modular y escalable
⚛️ Componentes reutilizables
🌐 Sistema de rutas (SPA)
🛒 Base para carrito de compras
🎨 Estilos organizados y personalizables
🔌 Separación de lógica (hooks, services, store)
📦 Instalación
# Clonar repositorio
git clone <URL_DEL_REPO>

# Entrar al proyecto
cd magic-store-333

# Instalar dependencias
pnpm install
▶️ Scripts
# Desarrollo
pnpm dev
# Build producción
pnpm build
# Preview build
pnpm preview
📁 Estructura del proyecto
src/
│
├── assets/        # Recursos estáticos (imágenes, íconos)
├── components/    # Componentes reutilizables
├── data/          # Datos mock o constantes
├── hooks/         # Custom hooks
├── layouts/       # Layouts globales
├── pages/         # Vistas principales
├── router/        # Configuración de rutas
├── services/      # Lógica de API / peticiones
├── store/         # Estado global (context, Zustand, etc.)
├── styles/        # Estilos globales
├── types/         # Tipos TypeScript
├── utils/         # Funciones auxiliares
│
├── main.tsx       # Entry point
└── index.css      # Estilos base
🧠 Arquitectura

El proyecto sigue una separación clara de responsabilidades:

UI (components/pages) → Renderizado
Lógica (hooks/services) → Manejo de datos
Estado (store) → Estado global
Infraestructura (router/layouts) → Navegación y estructura
🎨 Diseño

La UI está inspirada en una tienda moderna con estética oscura y minimalista, enfocada en destacar productos como sneakers y streetwear.

🌐 Rutas principales
/ → Inicio
/catalogo → Productos
/contacto → Contacto
🔧 Tecnologías
React
Vite
TypeScript
ESLint
PNPM
🚀 Deploy

Puedes desplegar fácilmente en:

Vercel
Netlify
📌 Próximas mejoras
🛒 Implementación completa de carrito
🔐 Autenticación de usuarios
💳 Pasarela de pagos
📦 Backend integrado
🤝 Contribución
Fork del proyecto
Crear rama (feature/nueva-funcionalidad)
Commit de cambios
Pull Request
📄 Licencia

MIT

✨ Autor

Magic Store 333