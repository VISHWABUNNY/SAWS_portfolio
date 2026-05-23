import React, { lazy, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'

const isGallery = window.location.pathname.startsWith('/gallery')

// Lazy: Gallery (+ 54 eager media files) only loads on /gallery
// App + Three.js only loads on main page — no cross-contamination
const App     = lazy(() => import('./App'))
const Gallery = lazy(() => import('./Gallery'))

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Suspense fallback={<div style={{ minHeight: '100vh', background: '#0b0c0a' }} />}>
      {isGallery ? <Gallery /> : <App />}
    </Suspense>
  </React.StrictMode>
)
