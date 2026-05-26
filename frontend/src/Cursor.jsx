import React, { useEffect, useRef } from 'react'

export default function Cursor() {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const onMove = (e) => {
      el.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`
      el.style.opacity = '1'
    }
    const onLeave = () => { el.style.opacity = '0' }
    const onEnter = () => { el.style.opacity = '1' }
    const onDown  = () => el.classList.add('cursor--click')
    const onUp    = () => el.classList.remove('cursor--click')

    const onOver = (e) => {
      if (e.target.closest('a, button, select, [role="button"]'))
        el.classList.add('cursor--hover')
    }
    const onOut = () => el.classList.remove('cursor--hover')

    window.addEventListener('mousemove',   onMove, { passive: true })
    document.addEventListener('mouseleave', onLeave)
    document.addEventListener('mouseenter', onEnter)
    window.addEventListener('mousedown',   onDown)
    window.addEventListener('mouseup',     onUp)
    document.addEventListener('mouseover', onOver)
    document.addEventListener('mouseout',  onOut)

    return () => {
      window.removeEventListener('mousemove',   onMove)
      document.removeEventListener('mouseleave', onLeave)
      document.removeEventListener('mouseenter', onEnter)
      window.removeEventListener('mousedown',   onDown)
      window.removeEventListener('mouseup',     onUp)
      document.removeEventListener('mouseover', onOver)
      document.removeEventListener('mouseout',  onOut)
    }
  }, [])

  return (
    <div ref={ref} className="saws-cursor" aria-hidden="true">
      <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">

        {/* ── CORNER BRACKETS (outer targeting frame) ── */}
        {/* Top-left */}
        <path d="M 8 20 L 8 8 L 20 8"   stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
        {/* Top-right */}
        <path d="M 36 8 L 48 8 L 48 20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
        {/* Bottom-right */}
        <path d="M 48 36 L 48 48 L 36 48" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
        {/* Bottom-left */}
        <path d="M 20 48 L 8 48 L 8 36"  stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />

        {/* ── INNER CIRCLE ── */}
        <circle cx="28" cy="28" r="8" stroke="currentColor" strokeWidth="0.75" opacity="0.6" />

        {/* ── CENTER CROSSHAIR (fine, with gap) ── */}
        {/* Top */}
        <line x1="28" y1="16" x2="28" y2="23" stroke="currentColor" strokeWidth="0.75" />
        {/* Bottom */}
        <line x1="28" y1="33" x2="28" y2="40" stroke="currentColor" strokeWidth="0.75" />
        {/* Left */}
        <line x1="16" y1="28" x2="23" y2="28" stroke="currentColor" strokeWidth="0.75" />
        {/* Right */}
        <line x1="33" y1="28" x2="40" y2="28" stroke="currentColor" strokeWidth="0.75" />

        {/* ── CENTER DOT ── */}
        <circle cx="28" cy="28" r="1.5" fill="currentColor" />

        {/* ── DIAGONAL TICK MARKS at 45° (mil-dots) ── */}
        <line x1="20" y1="20" x2="22" y2="22" stroke="currentColor" strokeWidth="0.75" opacity="0.5" />
        <line x1="36" y1="20" x2="34" y2="22" stroke="currentColor" strokeWidth="0.75" opacity="0.5" />
        <line x1="36" y1="36" x2="34" y2="34" stroke="currentColor" strokeWidth="0.75" opacity="0.5" />
        <line x1="20" y1="36" x2="22" y2="34" stroke="currentColor" strokeWidth="0.75" opacity="0.5" />

      </svg>
    </div>
  )
}
