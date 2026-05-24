import React, { useState, useEffect, useRef } from 'react'
import './gallery.css'

import galleryList from './gallery-list.json'

const videoExtensions = ['.mp4', '.webm', '.mov', '.ogg']

const processedMedia = galleryList.map(filename => {
  const ext = '.' + filename.split('.').pop().toLowerCase()
  const type = videoExtensions.includes(ext) ? 'video' : 'image'
  return {
    type,
    src: `./gallery/${filename}`,
    name: filename
  }
})

const videos = processedMedia.filter(m => m.type === 'video')
const images = processedMedia.filter(m => m.type === 'image')

// Videos first, then images
const allMedia = [...videos, ...images]

// Size classes cycling pattern — gives organic cluster feel
const SIZE_PATTERN = ['wide', 'small', 'large', 'tall', 'small', 'xlwide', 'small', 'tall']

function getSizeClass(index, type) {
  if (type === 'video') {
    // Videos are always large tiles
    return index % 2 === 0 ? 'large' : 'wide'
  }
  return SIZE_PATTERN[index % SIZE_PATTERN.length]
}

// Video component with IntersectionObserver autoplay (only plays when visible)
function VideoTile({ src, name, onClick }) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) el.play().catch(() => {})
        else { el.pause(); el.currentTime = 0 }
      },
      { threshold: 0.4 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <video
      ref={ref}
      src={src}
      className="gallery-media"
      muted loop playsInline preload="metadata"
    />
  )
}

export default function Gallery() {
  const [lightbox, setLightbox] = useState(null)

  return (
    <div className="gallery-app">

      {/* NAV */}
      <header className="gallery-nav">
        <a href="./" className="gallery-back">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="15 18 9 12 15 6" />
          </svg>
          BACK
        </a>
        <img src="./gallery/neemus black logo.png" alt="Neemus" className="gallery-logo" />
        <div />
      </header>

      {/* HEADER */}
      <div className="gallery-header">
        <span className="gallery-eyebrow">NEEMUS · SAWS PROJECT</span>
        <h1 className="gallery-title">GALLERY</h1>
        <p className="gallery-count">{allMedia.length} ASSET{allMedia.length !== 1 ? 'S' : ''}</p>
      </div>

      {/* CLUSTER GRID */}
      {allMedia.length === 0 ? (
        <div className="gallery-empty">
          <div className="gallery-empty-icon">⬡</div>
          <p>NO ASSETS FOUND</p>
          <span>Place images or videos in <code>src/assets/gallery/</code></span>
        </div>
      ) : (
        <div className="gallery-cluster">
          {allMedia.map((item, i) => {
            const size = getSizeClass(i, item.type)
            return (
              <div
                key={i}
                className={`gallery-cell gallery-cell--${size} ${item.type === 'video' ? 'gallery-cell--video' : ''}`}
                onClick={() => item.type === 'image' && setLightbox(item)}
              >
                {item.type === 'image' ? (
                  <img src={item.src} alt={item.name} className="gallery-media" loading="lazy" />
                ) : (
                  <VideoTile src={item.src} name={item.name} />
                )}
                <div className="gallery-cell-overlay">
                  <span className="gallery-cell-type">{item.type === 'video' ? '▶' : '⊞'}</span>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* LIGHTBOX */}
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
