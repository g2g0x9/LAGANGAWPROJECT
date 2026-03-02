# La Ganga – Fan Page de Westcol

Fan-page dashboard para **La Ganga**, el grupo de amigos del streamer Westcol, alojada en [lagangaw.com](https://lagangaw.com).

## 🎨 Design System

| Token | Valor | Uso |
|-------|-------|-----|
| Primary | `#7C3AED` | Botones, acentos principales |
| Secondary | `#A855F7` | Gradientes, textos destacados |
| Accent | `#F59E0B` | MVP, stars, métricas positivas |
| Success | `#10B981` | Cambios positivos |
| Danger | `#EF4444` | Badge "En vivo", cambios negativos |
| Background | `#0A0A14` | Fondo base |
| Surface | `#12121E` | Tarjetas |
| Surface-2 | `#1A1A2E` | Tarjetas elevadas |

**Tipografía:**
- Títulos: `Bebas Neue` — impacto visual, estilo gaming
- Cuerpo / UI: `Inter` — legibilidad en dashboards
- Métricas / Estadísticas: `JetBrains Mono` — precisión numérica

## 🗂️ Estructura

```
LAGANGAWPROJECT/
├── index.html       # SPA — Home, Rankings, Clips, Comunidad
├── css/
│   └── styles.css   # Design tokens (CSS variables) + todos los componentes
└── js/
    └── main.js      # Navegación, tabs, contadores, animaciones, tooltips
```

## 🚀 Secciones

- **Hero** — Presentación con mini-cards de métricas en tiempo real y contador animado
- **Stats Bar** — Barra global: seguidores, clips, miembros, horas en vivo
- **Rankings / MVPs** — Podio top 3, tabla ordenable, barras de progreso por categoría y gráfico semanal (CSS)
- **Clips** — Galería filtrable por categoría (Funny, Pro, Fails, Reacciones) con hover de reproducción
- **Comunidad** — Feed de actividad + leaderboard de fans + gráfico de espectadores

## ▶️ Uso

Abre `index.html` directamente en el navegador (sin servidor necesario).

```bash
open index.html          # macOS
xdg-open index.html      # Linux
start index.html         # Windows
```

O sirve con cualquier servidor estático:

```bash
npx serve .
# o
python -m http.server 8080
```
