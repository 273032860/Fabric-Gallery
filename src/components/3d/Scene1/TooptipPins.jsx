import { Html } from "@react-three/drei";
import { useState, useRef } from "react";
import * as THREE from 'three/webgpu';

const UI = {
  bg: '#0a0a0a',
  bgPanel: '#0f0f0f',
  bgRow: '#141414',
  bgHover: '#161616',
  border: '#2a2a2a',
  borderAccent: '#c9a84c33',
  gold: '#c9a84c',
  goldDim: '#c9a84c77',
  goldFaint: '#c9a84c12',
  text: '#e8e8e8',
  textMid: '#999',
  textDim: '#555',
  red: '#c0392b',
  font: "'Inter', sans-serif",
  mono: "'Inter', monospace",
  // Bar-specific tokens — solid dark so they read against any bg
  barBg: '#0d0d0d',
  barBorder: '#222222',
  barText: '#c0c0c0',
  barTextDim: '#555',
};

const tooltipPins = [
    {
      id: 1,
      label: "Instrument Cluster",
      x: -0.959, y: 1.761, z: -0.001,
      hasCamera: true,
      description: "Full-colour TFT display with real-time ride data, navigation prompts, and ambient light adjustment.",
      details: [
        { key: "Resolution", value: "1920 × 1080" },
        { key: "Size", value: "5.0 inch" },
        { key: "Brightness", value: "1000 nit" },
        { key: "Type", value: "TFT LCD" },
      ],
    },
    {
      id: 2,
      label: "Rear Suspension",
      x: 0.497, y: 1.051, z: 0.012,
      hasCamera: true,
      description: "Piggyback monoshock with adjustable preload and rebound damping for a composed, planted ride.",
      details: [
        { key: "Type", value: "Monoshock" },
        { key: "Travel", value: "130 mm" },
        { key: "Preload", value: "Adjustable" },
        { key: "Damping", value: "Rebound Adj." },
      ],
    },
    {
      id: 3,
      label: "Rear Tyre",
      x: 1.653, y: 0.87, z: 0.016,
      hasCamera: true,
      description: "Wide-profile radial tyre engineered for maximum grip under hard acceleration and high-lean cornering.",
      details: [
        { key: "Size", value: "190/55 ZR17" },
        { key: "Type", value: "Radial" },
        { key: "Compound", value: "Dual Sport" },
        { key: "Rim", value: "17 inch" },
      ],
    },
    {
      id: 4,
      label: "Front Brakes",
      x: -0.974, y: 0.623, z: 0.187,
      hasCamera: true,
      description: "Radially mounted monoblock caliper with petal disc for short, progressive stopping power.",
      details: [
        { key: "Type", value: "Radial Monoblock" },
        { key: "Disc", value: "320 mm Petal" },
        { key: "Pistons", value: "4-Piston" },
        { key: "System", value: "ABS Ready" },
      ],
    },
    {
      id: 5,
      label: "Engine",
      x: 0.024, y: 0.83, z: 0.311,
      hasCamera: true,
      description: "Liquid-cooled parallel-twin with a 270° firing order delivering strong mid-range torque and a distinctive exhaust note.",
      details: [
        { key: "Layout", value: "Parallel Twin" },
        { key: "Displacement", value: "889 cc" },
        { key: "Power", value: "119 hp" },
        { key: "Torque", value: "93 Nm" },
      ],
    },
    {
      id: 6,
      label: "Drive Chain",
      x: 1.125, y: 0.401, z: 0.205,
      hasCamera: true,
      description: "Heavy-duty sealed O-ring chain transferring power from gearbox to rear wheel with minimal energy loss.",
      details: [
        { key: "Type", value: "O-Ring Sealed" },
        { key: "Pitch", value: "525" },
        { key: "Links", value: "116" },
        { key: "Sprocket", value: "17 / 45 T" },
      ],
    },
    {
      id: 7,
      label: "Seat",
      x: 0.781, y: 1.528, z: 0.007,
      hasCamera: true,
      description: "Ergonomically contoured split seat with high-density foam for all-day comfort on both rider and pillion.",
      details: [
        { key: "Height", value: "820 mm" },
        { key: "Material", value: "Alcantara" },
        { key: "Style", value: "Split Dual" },
        { key: "Heating", value: "Optional" },
      ],
    },
  ]

const TooltipPins = ({ orbitRef, editMode = false }) => {
  const [tooltips] = useState(tooltipPins);

  const [panelOpen, setPanelOpen] = useState(false);
  const [draggingId, setDraggingId] = useState(null);
  const [expandedPinId, setExpandedPinId] = useState(null);
  const [activeFlyId, setActiveFlyId] = useState(null);

  const DEFAULT_CAMERA = { position: [-2.4, 1.25, 3.1], target: [0, 1.1, 0] };

  const useCameraFlyTo = (orbitRef) => {
    const animRef = useRef(null);

    const flyTo = (position, target, duration = 1000) => {
      if (!orbitRef.current) return;
      const controls = orbitRef.current;
      const cam = controls.object;

      const startPos = cam.position.clone();
      const startTarget = controls.target.clone();
      const endPos = new THREE.Vector3(...position);
      const endTarget = new THREE.Vector3(...target);

      const startTime = performance.now();
      if (animRef.current) cancelAnimationFrame(animRef.current);

      const tick = (now) => {
        const t = Math.min((now - startTime) / duration, 1);
        const e = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
        cam.position.lerpVectors(startPos, endPos, e);
        controls.target.lerpVectors(startTarget, endTarget, e);
        controls.update();
        if (t < 1) animRef.current = requestAnimationFrame(tick);
      };
      animRef.current = requestAnimationFrame(tick);
    };

    const flyToTarget = (targetArr, zoomDistance = 2.0, duration = 1000) => {
      if (!orbitRef.current) return;
      const controls = orbitRef.current;
      const cam = controls.object;

      const endTarget = new THREE.Vector3(...targetArr);
      const currentDir = cam.position.clone().sub(controls.target).normalize();
      const endPos = endTarget.clone().add(currentDir.multiplyScalar(zoomDistance));

      flyTo(endPos.toArray(), targetArr, duration);
    };

    return { flyTo, flyToTarget };
  };

  const { flyTo, flyToTarget } = useCameraFlyTo(orbitRef);

  const handleFlyTo = (tooltip) => {
    if (!tooltip.hasCamera) return;
    if (activeFlyId === tooltip.id) {
      setActiveFlyId(null);
      setExpandedPinId(null);
      if (orbitRef.current) {
        const controls = orbitRef.current;
        const cam = controls.object;
        const currentDir = cam.position.clone().sub(controls.target).normalize();
        const endTarget = new THREE.Vector3(...DEFAULT_CAMERA.target);
        const defaultDist = new THREE.Vector3(...DEFAULT_CAMERA.position)
          .distanceTo(new THREE.Vector3(...DEFAULT_CAMERA.target));
        const endPos = endTarget.clone().add(currentDir.multiplyScalar(defaultDist));
        flyTo(endPos.toArray(), DEFAULT_CAMERA.target, 1000);
      }
    } else {
      setActiveFlyId(tooltip.id);
      setExpandedPinId(tooltip.id);
      flyToTarget([tooltip.x, tooltip.y, tooltip.z], 2.0, 1000);
    }
  };

  const handleSelectTooltip = (id) => {
    const wasOpen = panelOpen;
    const next = draggingId === id ? null : id;
    setDraggingId(next);
    if (next !== null) {
      setPanelOpen(true);
    } else if (!wasOpen) {
      setPanelOpen(false);
    }
  };

  return tooltips.map((t) => {
    const isSelected = draggingId === t.id;
    const hasCam = !!t.hasCamera;
    const isExpanded = expandedPinId === t.id;
    const hasDesc = !!t.description;
    const hasDetails = t.details?.length > 0;
    const hasContent = hasDesc || hasDetails;

    return (
      <Html key={t.id} position={[t.x, t.y, t.z]} zIndexRange={[15, 0]} style={{ overflow: 'visible' }}>
        <div style={{ position: 'relative', pointerEvents: 'auto' }}>
          {/* Circle marker */}
          <div
            onPointerDown={(e) => {
              e.stopPropagation();
              if (editMode) {
                handleSelectTooltip(t.id);
              } else {
                if (isExpanded) {
                  handleFlyTo(t);
                } else {
                  if (hasCam) handleFlyTo(t);
                }
              }
            }}
            style={{
              width: '22px', height: '22px', borderRadius: '50%',
              background: isSelected ? '#c0392b' : '#ffffffee',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transform: 'translate(-50%, -50%)',
              cursor: editMode ? 'pointer' : ((hasCam || hasContent) ? 'pointer' : 'default'),
              boxShadow: isSelected
                ? '0 2px 12px rgba(192,57,43,0.45), 0 0 0 2.5px #ffffff'
                : hasCam && !editMode
                  ? `0 2px 12px rgba(0,0,0,0.4), 0 0 0 2px ${UI.gold}`
                  : '0 2px 12px rgba(0,0,0,0.4)',
              transition: 'all 0.15s ease',
              flexShrink: 0,
              position: 'relative',
              zIndex: 2,
            }}
          >
            <svg width="10" height="10" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <line x1="6" y1="1" x2="6" y2="11" stroke={isSelected ? '#ffffff' : '#111111'} strokeWidth="1.5" strokeLinecap="round"/>
              <line x1="1" y1="6" x2="11" y2="6" stroke={isSelected ? '#ffffff' : '#111111'} strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </div>

          {/* Tooltip bubble — label + optional expanded content */}
          {!isSelected && (
            <div
              style={{
                position: 'absolute',
                left: '18px',
                top: '-22px',
                background: '#0f0f0ff5',
                border: `1px solid ${isExpanded ? UI.gold + '55' : '#2e2e2e'}`,
                fontFamily: UI.font,
                userSelect: 'none',
                transition: 'border-color 0.2s, width 0.22s ease',
                width: isExpanded && hasContent ? '220px' : 'max-content',
                maxWidth: '220px',
                pointerEvents: 'none',
                overflow: 'hidden',
              }}
            >
              {/* Label row */}
              <div style={{
                padding: '5px 10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '8px',
                whiteSpace: 'nowrap',
              }}>
                <span style={{
                  fontSize: '15px',
                  color: '#e0e0e0',
                  letterSpacing: '0.08em',
                }}>
                  {t.label}
                </span>
              </div>

              {/* Expanded content */}
              {isExpanded && hasContent && (
                <div style={{
                  borderTop: `1px solid #2e2e2e`,
                  padding: '8px 10px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '6px',
                  animation: 'tooltipExpand 0.18s ease',
                }}>
                  <style>{`
                    @keyframes tooltipExpand {
                      from { opacity: 0; transform: translateY(-4px); }
                      to   { opacity: 1; transform: translateY(0); }
                    }
                  `}</style>

                  {hasDesc && (
                    <p style={{
                      margin: 0,
                      fontSize: '13px',
                      color: UI.textMid,
                      lineHeight: '1.65',
                      letterSpacing: '0.03em',
                      whiteSpace: 'normal',
                    }}>
                      {t.description}
                    </p>
                  )}

                  {hasDetails && (
                    <div style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0',
                      marginTop: hasDesc ? '4px' : '0',
                    }}>
                      {t.details.map((d, i) => (
                        <div key={i} style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'baseline',
                          gap: '10px',
                          padding: '4px 0',
                          borderBottom: i < t.details.length - 1 ? `1px solid #1e1e1e` : 'none',
                        }}>
                          <span style={{
                            fontSize: '10px',
                            letterSpacing: '0.15em',
                            color: UI.textDim,
                            textTransform: 'uppercase',
                            flexShrink: 0,
                          }}>
                            {d.key}
                          </span>
                          <span style={{
                            fontSize: '13px',
                            color: UI.text,
                            letterSpacing: '0.04em',
                            textAlign: 'right',
                          }}>
                            {d.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </Html>
    );
  });
};

export default TooltipPins