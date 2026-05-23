import React, { useState } from 'react'
import './gallery.css'

// Auto-load all media from src/assets/gallery/
const imageModules = import.meta.glob(
  './assets/gallery/*.{jpg,jpeg,JPG,JPEG,png,PNG,webp,WEBP,gif,GIF,avif,bmp,BMP}',
  { eager: true }
)
const videoModules = import.meta.glob(
  './assets/gallery/*.{mp4,MP4,webm,WEBM,mov,MOV,ogg,OGG}',
  { eager: true }
)

const images = Object.entries(imageModules).map(([path, mod]) => ({
  type: 'image',
  src: mod.default || mod,
  name: path.split('/').pop(),
})).filter(i => i.src)

const videos = Object.entries(videoModules).map(([path, mod]) => ({
  type: 'video',
  src: mod.default || mod,
  name: path.split('/').pop(),
})).filter(v => v.src)

const allMedia = [...images, ...videos]

export default function Gallery() {
  const [lightbox, setLightbox] = useState(null)

  return (
    <div className="gallery-app">

      {/* ── NAV ── */}
      <header className="gallery-nav">
        <a href="/" className="gallery-back">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="15 18 9 12 15 6" />
          </svg>
          BACK
        </a>
        <img src="/assets/neemus black logo.png" alt="Neemus" className="gallery-logo" />
        <div />
      </header>

      {/* ── HEADER ── */}
      <div className="gallery-header">
        <span className="gallery-eyebrow">NEEMUS · SAWS PROJECT</span>
        <h1 className="gallery-title">GALLERY</h1>
        <p className="gallery-count">{allMedia.length} ASSET{allMedia.length !== 1 ? 'S' : ''}</p>
      </div>

      {/* ── GRID ── */}
      {allMedia.length === 0 ? (
        <div className="gallery-empty">
          <div className="gallery-empty-icon">⬡</div>
          <p>NO ASSETS FOUND</p>
          <span>Place images or videos in <code>src/assets/gallery/</code></span>
        </div>
      ) : (
        <div className="gallery-grid">
          {allMedia.map((item, i) => (
            <div
              className="gallery-item"
              key={i}
              onClick={() => item.type === 'image' && setLightbox(item)}
            >
              {item.type === 'image' ? (
                <img src={item.src} alt={item.name} className="gallery-media" loading="lazy" />
              ) : (
                <video
                  src={item.src}
                  className="gallery-media"
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                />
              )}
              <div className="gallery-item-overlay">
                <span className="gallery-item-name">{item.name}</span>
                <span className="gallery-item-type">{item.type === 'video' ? '▶ VIDEO' : '⊞ IMAGE'}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── LIGHTBOX ── */}
      {lightbox && (
        <div className="lightbox" onClick={() => setLightbox(null)}>
          <button className="lightbox-close" onClick={() => setLightbox(null)}>✕</button>
          <img src={lightbox.src} alt={lightbox.name} className="lightbox-img" onClick={e => e.stopPropagation()} />
          <span className="lightbox-label">{lightbox.name}</span>
        </div>
      )}

    </div>
  )
}
