'use client';

import ProMotionStudio from '@/components/motion/ProMotionStudio';

/* ═══════════════════════════════════════════════════════
   TFG Motion — Tech Futures Group's motion graphics
   studio, ported from mysbdc-tools Motion Studio Pro.
   Brand tokens are baked in as defaults; the Brand panel
   stays available for one-off overrides.
   ═══════════════════════════════════════════════════════ */

export default function HomePage() {
  return (
    <div style={{ height: '100dvh', display: 'flex', flexDirection: 'column', background: '#0a0a0a' }}>

      {/* Header */}
      <header
        style={{
          flexShrink: 0,
          height: 48,
          padding: '0 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid rgba(78,255,0,0.12)',
          background: '#111111',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span className="tfg-ring" aria-hidden />
          <span
            style={{
              fontFamily: "'Michroma', sans-serif",
              fontSize: 11,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: '#ffffff',
            }}
          >
            TFG <span style={{ color: '#4EFF00' }}>Motion</span>
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <span
            style={{
              fontFamily: "'Roboto Mono', monospace",
              fontSize: 9,
              fontWeight: 500,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: '#6e7681',
            }}
          >
            storyboard · animate · export
          </span>
          <a
            href="https://techfuturesgroup.org"
            target="_blank"
            rel="noreferrer"
            style={{
              fontFamily: "'Roboto Mono', monospace",
              fontSize: 9,
              fontWeight: 700,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: '#4EFF00',
              textDecoration: 'none',
            }}
          >
            techfuturesgroup.org →
          </a>
        </div>
      </header>

      {/* Studio */}
      <main style={{ flex: 1, minHeight: 0 }}>
        <ProMotionStudio />
      </main>
    </div>
  );
}
