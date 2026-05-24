import React, { Suspense, useState, Component } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, useGLTF, Html, Center } from '@react-three/drei'

const MODEL_URL = './assets/industrial machine 3d model_Clone1.glb'

/* WebGL ErrorBoundary — catches context loss crashes, shows reload button */
class CanvasErrorBoundary extends Component {
  constructor(props) { super(props); this.state = { failed: false } }
  static getDerivedStateFromError() { return { failed: true } }
  render() {
    if (this.state.failed) return (
      <div className="webgl-error">
        <p>3D viewer unavailable</p>
        <button onClick={() => window.location.reload()}>↺ Reload page</button>
      </div>
    )
    return this.props.children
  }
}

function Model() {
  const { scene } = useGLTF(MODEL_URL)
  return <primitive object={scene} />
}
useGLTF.preload && useGLTF.preload(MODEL_URL)

function Lights({ mode }) {
  if (mode === 'dramatic') return (<>
    <ambientLight intensity={0.15} />
    <directionalLight position={[5, 8, 4]} intensity={2.2} />
    <directionalLight position={[-6, 2, -4]} intensity={0.7} />
    <directionalLight position={[0, 2, -8]} intensity={0.5} />
  </>)
  if (mode === 'studio') return (<>
    <ambientLight intensity={0.9} />
    <directionalLight position={[3, 5, 4]} intensity={1.0} />
    <directionalLight position={[-4, 2, -2]} intensity={0.55} />
  </>)
  return (<>
    <ambientLight intensity={0.3} />
    <directionalLight position={[2, 6, 2]} intensity={1.0} />
    <directionalLight position={[-2, 6, -2]} intensity={1.0} />
  </>)
}

const SPECS = [
  { val: 'YOLO',    label: 'CV ENGINE',  sub: 'Real-time human detection' },
  { val: '180°',    label: 'PAN RANGE',  sub: 'Full horizontal sweep' },
  { val: '70°',     label: 'TILT RANGE', sub: 'Vertical axis control' },
  { val: '5 KG',    label: 'PAYLOAD',    sub: 'Supported weapon load' },
  { val: '100 M',   label: 'RANGE',      sub: 'Operational distance' },
  { val: '< 2 S',   label: 'LATENCY',    sub: 'End-to-end response' },
  { val: '< 5%',    label: 'DEVIATION',  sub: 'Max tracking error' },
  { val: 'STEPPER', label: 'MOTOR',      sub: 'Precision drive system' },
]

export default function App() {
  const [autoRotate, setAutoRotate] = useState(true)
  const [lighting, setLighting] = useState('dramatic')

  return (
    <div className="app">

      {/* ── NAVBAR ── */}
      <header className="navbar">
        <img src="./assets/neemus black logo.png" alt="Neemus" className="nav-logo" />
        <nav className="nav-links">
          <a href="#specs"   className="nav-link">SPECS</a>
          <a href="./gallery" className="nav-link">GALLERY</a>
          <a href="#contact" className="nav-link">CONTACT</a>
        </nav>
      </header>

      {/* ── SECTION 1: HERO ── */}
      <section className="hero-section" id="hero">
        <div className="hero-bg-text" aria-hidden="true">SAWS</div>

        {/* 3D Canvas — inside hero only */}
        <div className="hero-canvas">
          <CanvasErrorBoundary>
            <Canvas
              gl={{ alpha: true, antialias: true }}
              camera={{ position: [0, 1.0, 2.2], fov: 52 }}
              frameloop="demand"
            >
              <Lights mode={lighting} />
              <Suspense fallback={<Html center><div className="spinner" /></Html>}>
                <Center><Model /></Center>
              </Suspense>
              <OrbitControls
                autoRotate={autoRotate} autoRotateSpeed={1.0}
                enablePan={false} enableZoom={false}
                minPolarAngle={Math.PI / 4} maxPolarAngle={Math.PI / 1.6}
              />
            </Canvas>
          </CanvasErrorBoundary>
        </div>

        {/* Hero overlays */}
        <div className="badge-tl">
          <span className="badge-title">SAWS-2026 ®</span>
          <span className="badge-sensor">SENSOR TO SHOOT</span>
          <span className="badge-chip">SEMI AUTOMATED WEAPON SYSTEM</span>
        </div>

        <div className="badge-tr">VISUAL DESIGN BY<br />NEEMUS SYSTEMS</div>
        <div className="vert-text">INDUSTRIAL · TACTICAL · PRECISION · AI-DRIVEN</div>

        <div className="bottom-left">
          <a href="https://neemus.com/" target="_blank" rel="noopener noreferrer" className="qr-block">
            <img
              src="https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=https://neemus.com/&color=111111&bgcolor=e4e4e2&qzone=1"
              alt="QR — neemus.com" className="qr-img"
            />
          </a>
          <span className="qr-label">NEEMUS.COM ↗</span>
        </div>

        <div className="bottom-center-controls">
          <button className="ctrl-btn" onClick={() => setAutoRotate(s => !s)}>
            {autoRotate
              ? <><svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg> PAUSE</>
              : <><svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><polygon points="5,3 19,12 5,21"/></svg> ROTATE</>
            }
          </button>
          <div className="ctrl-divider" />
          <select className="ctrl-select" value={lighting} onChange={e => setLighting(e.target.value)}>
            <option value="studio">STUDIO</option>
            <option value="dramatic">DRAMATIC</option>
            <option value="rim">RIM</option>
          </select>
        </div>

        <div className="specs-strip">
          {[['100M','RANGE'],['<2S','LATENCY'],['180°','PAN'],['70°','TILT'],['5KG','PAYLOAD']].map(([v,k],i,a) => (
            <React.Fragment key={k}>
              <div className="spec-item">
                <span className="spec-val">{v}</span>
                <span className="spec-key">{k}</span>
              </div>
              {i < a.length - 1 && <div className="spec-sep" />}
            </React.Fragment>
          ))}
        </div>

        <div className="scroll-hint">
          <span>SCROLL</span>
          <div className="scroll-line" />
        </div>
      </section>

      {/* ── SECTION 2: SPECS ── */}
      <section className="specs-section" id="specs">
        <div className="specs-content">
          <div className="specs-header">
            <span className="specs-eyebrow">TECHNICAL SPECIFICATIONS</span>
            <h2 className="specs-title">SYSTEM<br />OVERVIEW</h2>
            <p className="specs-desc">
              The SAWS platform integrates AI-based computer vision with precision
              electromechanical systems for real-time autonomous target acquisition.
            </p>
          </div>
          <div className="specs-grid">
            {SPECS.map(s => (
              <div className="spec-card" key={s.label}>
                <span className="spec-card-val">{s.val}</span>
                <span className="spec-card-label">{s.label}</span>
                <span className="spec-card-sub">{s.sub}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="site-footer" id="contact">
        <div className="footer-top">
          <span className="footer-brand">Neemus</span>
          <img src="./assets/neemus-eagle.png" alt="" className="footer-eagle-img" aria-hidden="true" />
        </div>
        <div className="footer-bottom">
          <div className="footer-col">
            <p className="footer-col-head">Neemus Software Solutions Pvt. Ltd.</p>
            <p>Plot #2 R.R Nagar, Old Bowenpally,</p>
            <p>Hyderabad, 500011</p>
          </div>
          <div className="footer-col">
            <p className="footer-col-head">Neemus Software Solutions Pvt. Ltd.</p>
            <p>8-7-1S2 16A 16B First Floor</p>
            <p>Hyderabad, 500011</p>
          </div>
          <div className="footer-col">
            <p>+91-7799 153000, 88010 00801</p>
            <p>corporate@neemus.com</p>
          </div>
        </div>
        <div className="footer-copy">© 2026 Neemus Software Solutions Pvt. Ltd. All rights reserved.</div>
      </footer>

    </div>
  )
}
