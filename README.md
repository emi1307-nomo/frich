# Frich 'n Fries — sitio web

Sitio estático de 4 páginas, sin build ni dependencias:

| Archivo | Página |
|---|---|
| `index.html` | Inicio: hero, menú, papas, el local ilustrado, reseñas, locales (resumen), aviso de franquicias y pedido |
| `nosotros.html` | Nosotros: el equipo, el neón y el ambiente |
| `sucursales.html` | Los 3 locales con foto, teléfono, horarios, cómo llegar y mapa |
| `franquicias.html` | Franquicias: proceso, qué pregunta el formulario y link al formulario oficial |

El diseño y el código son compartidos: `assets/sitio.css` y `assets/sitio.js` (incluye el dibujo de Tony, la mascota).
La cabecera, el pie y la sección "Pedí y pasá a buscar" se repiten en cada página: si se cambian, cambiarlas en las 4.

## Deploy en Vercel
1. *Add New → Project* e importar este repositorio.
2. **Framework Preset:** `Other`. Sin *Build Command* ni *Output Directory* (se sirve la raíz).
3. *Deploy*.

## Notas
- Es una **versión de muestra**: tiene `<meta name="robots" content="noindex, nofollow">` para que Google no la indexe.
  Borrar esa línea de `index.html` cuando Frich la apruebe y se publique oficialmente.
- Las imágenes están en WebP con varios tamaños (`nombre-ancho.webp`); los originales en alta no se suben (ver `.gitignore`).
