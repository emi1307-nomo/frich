# Frich 'n Fries — sitio web

Sitio estático (un `index.html` + `assets/`), sin build ni dependencias.

## Deploy en Vercel
1. *Add New → Project* e importar este repositorio.
2. **Framework Preset:** `Other`. Sin *Build Command* ni *Output Directory* (se sirve la raíz).
3. *Deploy*.

## Notas
- Es una **versión de muestra**: tiene `<meta name="robots" content="noindex, nofollow">` para que Google no la indexe.
  Borrar esa línea de `index.html` cuando Frich la apruebe y se publique oficialmente.
- Las imágenes están en WebP con varios tamaños (`nombre-ancho.webp`); los originales en alta no se suben (ver `.gitignore`).
