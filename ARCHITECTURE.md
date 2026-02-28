# 🏗️ Arquitectura del Proyecto

Documentación técnica sobre la arquitectura y estructura de Monte Sion App.

## 📐 Arquitectura General

```
┌─────────────────────────────────────────────┐
│           Cliente (Next.js 16)              │
│  ┌──────────────────────────────────────┐   │
│  │     App Router (React 19)            │   │
│  │  ┌────────────────────────────────┐  │   │
│  │  │   Páginas y Componentes        │  │   │
│  │  └────────────────────────────────┘  │   │
│  │  ┌────────────────────────────────┐  │   │
│  │  │   Server Actions (lib/)       │  │   │
│  │  └────────────────────────────────┘  │   │
│  └──────────────────────────────────────┘   │
└─────────────────┬───────────────────────────┘
                  │
                  │ API Calls
                  ↓
┌─────────────────────────────────────────────┐
│          Supabase (Backend)                 │
│  ┌──────────────────────────────────────┐   │
│  │   Authentication (Auth.js)           │   │
│  ├──────────────────────────────────────┤   │
│  │   PostgreSQL Database                │   │
│  ├──────────────────────────────────────┤   │
│  │   Storage (Avatares, Archivos)       │   │
│  ├──────────────────────────────────────┤   │
│  │   Realtime (Chat, Notificaciones)    │   │
│  └──────────────────────────────────────┘   │
└─────────────────────────────────────────────┘
                  │
                  │ External APIs
                  ↓
┌─────────────────────────────────────────────┐
│         APIs Externas                       │
│  • OpenAI (Chat con IA)                     │
│  • Spotify (Música de adoración)            │
│  • YouVersion (Biblia)                      │
└─────────────────────────────────────────────┘
```

## 🗂️ Estructura de Carpetas

### `/app` - App Router de Next.js

```
app/
├── (auth)/              # Grupo de rutas de autenticación
│   ├── login/           # Página de inicio de sesión
│   ├── registro/        # Página de registro
│   ├── forgot-password/ # Recuperación de contraseña
│   └── reset-password/  # Restablecer contraseña
│
├── account/             # Gestión de cuenta de usuario
│
├── admin/               # Panel de administración
│   ├── users/           # Gestión de usuarios
│   ├── audit/           # Registros de auditoría
│   ├── avisos/          # Gestión de avisos
│   ├── bible/           # Gestión de contenido bíblico
│   └── config/          # Configuración de la app
│
├── api/                 # API Routes
│   ├── lessons/         # Endpoints de lecciones
│   ├── notify/          # Sistema de notificaciones
│   ├── progress/        # Progreso de usuario
│   └── spotify/         # Integración de Spotify
│
├── avisos/              # Avisos y notificaciones
├── bible/               # Biblia en línea
├── chat/                # Chat comunitario
├── dashboard/           # Dashboard de usuario
├── estudio/             # Material de estudio
├── eventos/             # Eventos de la iglesia
├── lecciones/           # Lecciones bíblicas
├── orar/                # Peticiones de oración
│
├── components/          # Componentes específicos de rutas
├── hooks/               # Custom React Hooks
│
├── layout.tsx           # Layout principal
├── page.tsx             # Página de inicio
└── providers.tsx        # Context Providers
```

### `/components` - Componentes Reutilizables

```
components/
├── ui/                  # Componentes de UI base (Radix UI)
│   ├── button.tsx
│   ├── input.tsx
│   ├── dialog.tsx
│   └── ...
│
├── auth-modal.tsx       # Modal de autenticación
├── lesson-card.tsx      # Tarjeta de lección
├── site-header.tsx      # Header del sitio
├── site-footer.tsx      # Footer del sitio
└── sections/            # Secciones reutilizables
```

### `/lib` - Lógica de Negocio

```
lib/
├── *-actions.ts         # Server Actions (autenticación, datos)
├── *-types.ts           # Tipos TypeScript
├── supabase-*.ts        # Clientes de Supabase
├── utils.ts             # Utilidades generales
└── rate-limit.ts        # Rate limiting
```

### `/supabase` - Scripts SQL

```
supabase/
├── lessons.sql          # Tablas de lecciones
├── users.sql            # Tablas de usuarios
├── community-groups.sql # Grupos comunitarios
└── ...                  # Otros scripts de DB
```

## 🔄 Flujo de Datos

### 1. Autenticación

```
Usuario → Form → Server Action → Supabase Auth → Cookie → Redirect
                     ↓
                  Validación (Zod)
```

### 2. Lectura de Datos

```
Componente → useSWR → API Route → Supabase Query → Cache → Render
              ↓
         Revalidación automática
```

### 3. Escritura de Datos

```
Usuario → Form → Server Action → Validación → Supabase → Revalidate → UI Update
                     ↓                           ↓
                  Zod Schema                   RLS Check
```

### 4. Realtime

```
Supabase Realtime → WebSocket → Client → State Update → Re-render
```

## 🛡️ Seguridad

### Row Level Security (RLS)

Todas las tablas de Supabase usan RLS para asegurar que los usuarios solo puedan acceder a sus propios datos:

```sql
-- Ejemplo: Tabla de peticiones
CREATE POLICY "Users can view their own peticiones"
ON peticiones FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all peticiones"
ON peticiones FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid()
    AND profiles.role = 'admin'
  )
);
```

### Server Actions

- Todas las acciones del servidor validan la sesión
- Se usa Zod para validación de inputs
- Rate limiting en endpoints críticos
- Sanitización de inputs para prevenir XSS

### Variables de Entorno

- `NEXT_PUBLIC_*`: Expuestas al cliente (URLs públicas)
- Sin prefijo: Solo disponibles en el servidor (API keys)

## 🎨 Sistema de Diseño

### Colores

```typescript
// Tailwind config con modo oscuro
colors: {
  primary: "hsl(var(--primary))",
  secondary: "hsl(var(--secondary))",
  background: "hsl(var(--background))",
  foreground: "hsl(var(--foreground))",
  // ... más colores
}
```

### Componentes

- **Base**: Radix UI (accesibilidad integrada)
- **Estilos**: Tailwind CSS con variantes
- **Iconos**: Lucide React
- **Animaciones**: tailwindcss-animate

## 📊 Estado y Cache

### Estado del Cliente

- **Local State**: `useState`, `useReducer`
- **Cache**: SWR para data fetching
- **Context**: React Context para temas, auth status

### Cache de Servidor

- **Next.js Cache**: Automático en Server Components
- **Revalidación**: 
  - On-demand con `revalidatePath()`
  - Time-based con `revalidate`
  - Tag-based con `revalidateTag()`

## 🚀 Optimizaciones

### Rendimiento

1. **Code Splitting**: Automático por ruta
2. **Lazy Loading**: Componentes pesados con `dynamic()`
3. **Image Optimization**: `next/image` para todas las imágenes
4. **Font Optimization**: `next/font` para fuentes

### SEO

1. **Metadata API**: Metadatos dinámicos por página
2. **Sitemap**: Generado automáticamente
3. **Robots.txt**: Configurado para bots
4. **Schema.org**: Structured data para contenido

### Build

```bash
# Análisis de bundle
ANALYZE=true npm run build

# Build para producción
npm run build
```

## 📱 PWA (Progressive Web App)

### Service Worker

```javascript
// public/sw.js
self.addEventListener('push', (event) => {
  // Manejo de notificaciones push
});
```

### Manifest

```json
{
  "name": "Monte Sion App",
  "short_name": "Monte Sion",
  "icons": [...],
  "theme_color": "#...",
  "background_color": "#...",
  "display": "standalone"
}
```

## 🧪 Testing (Futuro)

### Estructura Propuesta

```
__tests__/
├── unit/                # Tests unitarios
│   ├── components/
│   ├── lib/
│   └── utils/
├── integration/         # Tests de integración
│   ├── auth/
│   └── api/
└── e2e/                # Tests end-to-end
    ├── login.spec.ts
    └── lessons.spec.ts
```

### Stack de Testing

- **Unit**: Jest + React Testing Library
- **Integration**: Jest + MSW (Mock Service Worker)
- **E2E**: Playwright

## 🔧 Herramientas de Desarrollo

### Scripts Útiles

```bash
npm run dev          # Servidor de desarrollo
npm run build        # Build de producción
npm run start        # Servidor de producción
npm run lint         # Linter
npm run type-check   # Verificación de tipos
```

### VS Code Extensions Recomendadas

- ESLint
- Prettier
- Tailwind CSS IntelliSense
- TypeScript Hero
- GitLens

## 📚 Recursos Adicionales

- [Next.js Docs](https://nextjs.org/docs)
- [Supabase Docs](https://supabase.com/docs)
- [Radix UI Docs](https://www.radix-ui.com/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)

---

**Última actualización**: Febrero 2026
