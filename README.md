# 🙏 Monte Sion App

<div align="center">

![Version](https://img.shields.io/badge/version-0.0.0-blue.svg)
![Next.js](https://img.shields.io/badge/Next.js-16.0-black.svg?logo=next.js)
![React](https://img.shields.io/badge/React-19.2-61DAFB.svg?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6.svg?logo=typescript)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)

Una plataforma web moderna y completa para la comunidad cristiana, construida con Next.js 16 y Supabase. Esta aplicación facilita el crecimiento espiritual, la conexión comunitaria y la administración de actividades eclesiásticas.

[Características](#-características-principales) • [Instalación](#️-instalación) • [Documentación](#-estructura-del-proyecto) • [Contribuir](#-contribuir) • [Licencia](#-licencia)

</div>

---

## ✨ Características Principales

### 📖 Estudio Bíblico
- **Lecciones Interactivas**: Biblioteca de lecciones bíblicas organizadas y accesibles
- **Biblia en Línea**: Lectura de la Biblia con interfaz amigable
- **Progreso de Usuario**: Sistema de seguimiento del avance en estudios bíblicos
- **Reacciones y Comentarios**: Interacción con el contenido de las lecciones

### 🙏 Comunidad y Oración
- **Peticiones de Oración**: Los usuarios pueden compartir y administrar sus peticiones
- **Chat Comunitario**: Espacio de comunicación en tiempo real
- **Avisos y Notificaciones**: Sistema de anuncios para la comunidad
- **Eventos**: Calendario de eventos y actividades de la iglesia

### 👥 Panel de Administración
- **Gestión de Usuarios**: Administración completa de miembros
- **Sistema de Auditoría**: Registro de acciones administrativas
- **Gestión de Contenido**: Control de lecciones, avisos y recursos
- **Exportación de Datos**: Herramientas para exportar información en múltiples formatos
- **Estadísticas**: Dashboard con métricas de la plataforma

### 🔐 Autenticación y Seguridad
- **Autenticación con Supabase**: Sistema seguro de inicio de sesión
- **Roles y Permisos**: Control de acceso basado en roles (Admin, Usuario)
- **Recuperación de Contraseña**: Sistema de restablecimiento seguro
- **Gestión de Cuenta**: Edición de perfil y configuración personal

### 🎨 Experiencia de Usuario
- **Diseño Responsivo**: Optimizado para todos los dispositivos
- **Modo Oscuro**: Soporte de temas claro/oscuro
- **UI Moderna**: Interfaz construida con Radix UI y Tailwind CSS
- **PWA**: Funcionalidad de aplicación web progresiva

## 🚀 Tecnologías

### Frontend
- **[Next.js 16](https://nextjs.org/)**: Framework React con App Router
- **[React 19](https://react.dev/)**: Biblioteca de UI
- **[TypeScript](https://www.typescriptlang.org/)**: Tipado estático
- **[Tailwind CSS](https://tailwindcss.com/)**: Framework de CSS utility-first
- **[Radix UI](https://www.radix-ui.com/)**: Componentes accesibles y sin estilos
- **[Lucide React](https://lucide.dev/)**: Iconos modernos

### Backend y Base de Datos
- **[Supabase](https://supabase.com/)**: Backend as a Service (BaaS)
  - Autenticación
  - Base de datos PostgreSQL
  - Almacenamiento de archivos
  - Realtime subscriptions

### Herramientas y Utilidades
- **[React Hook Form](https://react-hook-form.com/)**: Gestión de formularios
- **[Zod](https://zod.dev/)**: Validación de esquemas
- **[SWR](https://swr.vercel.app/)**: Data fetching y caché
- **[OpenAI](https://openai.com/)**: Integración de IA para chat
- **[Recharts](https://recharts.org/)**: Gráficos y visualización de datos
- **[date-fns](https://date-fns.org/)**: Manipulación de fechas
- **[ExcelJS](https://github.com/exceljs/exceljs)**: Exportación a Excel

## 📋 Prerequisitos

- **Node.js**: versión 18.0 o superior
- **npm**, **yarn**, **pnpm** o **bun**
- **Cuenta de Supabase**: Para configuración del backend

## ⚙️ Instalación

1. **Clonar el repositorio**
```bash
git clone https://github.com/tu-usuario/montesion-app.git
cd montesion-app
```

2. **Instalar dependencias**
```bash
npm install
# o
yarn install
# o
pnpm install
```

> 💡 **¿Primera vez configurando el proyecto?** Sigue nuestra [Guía de Inicio Rápido](QUICKSTART.md) para una configuración paso a paso.

3. **Configurar variables de entorno**

Crea un archivo `.env.local` en la raíz del proyecto con las siguientes variables:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=tu_url_de_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_clave_anonima
SUPABASE_SERVICE_ROLE_KEY=tu_clave_de_servicio

# OpenAI (opcional)
OPENAI_API_KEY=tu_clave_de_openai

# Otros
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

Consulta [.env.example](.env.example) para más detalles.

4. **Configurar la base de datos**

Ejecuta los scripts SQL en la carpeta `supabase/` en tu proyecto de Supabase:
- `hero.sql`
- `features.sql`
- `lessons.sql`
- `community-groups.sql`
- Y demás archivos SQL necesarios

## 🏃 Uso

### Desarrollo
```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

### Construcción para Producción
```bash
npm run build
npm run start
```

### Linting
```bash
npm run lint
```

## 📁 Estructura del Proyecto

```
montesion-app/
├── app/                      # App Router de Next.js
│   ├── (auth)/              # Rutas de autenticación
│   ├── admin/               # Panel de administración
│   ├── api/                 # API Routes
│   ├── avisos/              # Avisos y notificaciones
│   ├── bible/               # Biblia en línea
│   ├── chat/                # Chat comunitario
│   ├── dashboard/           # Dashboard de usuario
│   ├── lecciones/           # Lecciones bíblicas
│   └── components/          # Componentes específicos de rutas
├── components/              # Componentes reutilizables
├── lib/                     # Utilidades y acciones del servidor
├── supabase/               # Scripts SQL de la base de datos
├── types/                  # Definiciones de tipos TypeScript
└── public/                 # Archivos estáticos

```

## 🔑 Funcionalidades Clave

### Para Usuarios
- Registro e inicio de sesión seguro
- Acceso a lecciones bíblicas interactivas
- Creación y gestión de peticiones de oración
- Participación en chat comunitario
- Seguimiento de progreso personal
- Notificaciones de avisos importantes

### Para Administradores
- Gestión completa de usuarios
- Creación y edición de contenido
- Visualización de estadísticas
- Sistema de auditoría
- Exportación de datos
- Configuración de la plataforma

## 🤝 Contribuir

¡Las contribuciones son bienvenidas! Por favor, lee [CONTRIBUTING.md](CONTRIBUTING.md) para detalles sobre el proceso de contribución.

1. Fork el proyecto
2. Crea tu rama de característica (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo [LICENSE](LICENSE) para más detalles.

## 👨‍💻 Autores

- **Monte Sion Team** - *Desarrollo inicial*

## � Documentación Completa

Este README es solo una introducción. Para documentación detallada, consulta:

- 📖 [Índice de Documentación](DOCS_INDEX.md) - Guía completa de toda la documentación
- ⚡ [Inicio Rápido](QUICKSTART.md) - Configuración en 5 minutos
- 🏗️ [Arquitectura](ARCHITECTURE.md) - Detalles técnicos del proyecto
- ❓ [FAQ](FAQ.md) - Preguntas frecuentes
- 🗺️ [Roadmap](ROADMAP.md) - Planes futuros
- 🤝 [Guía de Contribución](CONTRIBUTING.md) - Cómo contribuir

## 🙏 Agradecimientos

- A la comunidad de Next.js
- Al equipo de Supabase
- A todos los contribuidores del proyecto
- A la comunidad cristiana que inspira este trabajo

## 📞 Contacto

Para preguntas o sugerencias, por favor abre un issue o contacta a través de:
- **Email**: rootmontesion@gmail.com
- **GitHub**: Abre un issue en el repositorio

---

Hecho con ❤️ para la comunidad cristiana
