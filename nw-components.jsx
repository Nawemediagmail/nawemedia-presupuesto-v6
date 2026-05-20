
// NAWEMEDIA V7 — Base UI Components
// Requires: nw-tokens.js loaded first

const { TOKENS: T, fmt, fmtFx, RATES, CATALOG } = window.NW;

// ─── ICON SYSTEM ──────────────────────────────────────────────────────────────
const ICONS = {
  redes: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
    </svg>
  ),
  eventos: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
    </svg>
  ),
  led: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/>
    </svg>
  ),
  campana: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/>
    </svg>
  ),
  personalizado: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14"/>
    </svg>
  ),
  arrow: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
    </svg>
  ),
  back: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>
    </svg>
  ),
  check: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  ),
  plus: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
    </svg>
  ),
  minus: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <line x1="5" y1="12" x2="19" y2="12"/>
    </svg>
  ),
  close: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
    </svg>
  ),
  menu: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
    </svg>
  ),
  whatsapp: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.013.496 3.916 1.372 5.594L0 24l6.584-1.342A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.01-1.372l-.36-.213-3.906.796.816-3.784-.235-.378A9.818 9.818 0 012.182 12C2.182 6.57 6.57 2.182 12 2.182c5.43 0 9.818 4.388 9.818 9.818 0 5.43-4.388 9.818-9.818 9.818z"/>
    </svg>
  ),
  download: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
    </svg>
  ),
  pay: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/>
    </svg>
  ),
};

const NWIcon = ({ name, size = 20, color = 'currentColor', style = {} }) => (
  <span style={{ display:'inline-flex', alignItems:'center', justifyContent:'center', width: size, height: size, color, flexShrink: 0, ...style }}>
    {ICONS[name] || ICONS.close}
  </span>
);

// Icono con fondo cuadrado neon
const ServiceIcon = ({ icon, gradient, size = 44 }) => (
  <div style={{
    width: size, height: size, borderRadius: 12, flexShrink: 0,
    background: gradient || T.gradMain,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    boxShadow: `0 0 16px rgba(255,45,149,0.25)`,
    color: '#fff',
  }}>
    <NWIcon name={icon} size={size * 0.48} />
  </div>
);

// ─── WAVEFORM DECORATION ──────────────────────────────────────────────────────
const Waveform = ({ width = 120, height = 24 }) => {
  const bars = Array.from({ length: 24 }, (_, i) => {
    const h = 4 + Math.abs(Math.sin(i * 0.8 + 1.2)) * (height - 8);
    return h;
  });
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} style={{ opacity: 0.7 }}>
      <defs>
        <linearGradient id="waveGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#FF2D95"/>
          <stop offset="50%" stopColor="#7B61FF"/>
          <stop offset="100%" stopColor="#00E5FF"/>
        </linearGradient>
      </defs>
      {bars.map((h, i) => (
        <rect key={i} x={i * (width / 24)} y={(height - h) / 2} width={Math.max(2, width/24 - 1)} height={h} rx="1.5" fill="url(#waveGrad)" />
      ))}
    </svg>
  );
};

// ─── APP HEADER ───────────────────────────────────────────────────────────────
const AppHeader = ({ onMenuClick }) => (
  <div style={{
    position: 'sticky', top: 0, zIndex: 100,
    background: 'rgba(5,7,13,0.95)', backdropFilter: 'blur(20px)',
    borderBottom: `1px solid ${T.border}`,
    padding: '0 16px',
  }}>
    <div style={{ maxWidth: 480, margin: '0 auto', height: 56, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      {/* Logo */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{
          width: 36, height: 36, borderRadius: 10,
          background: T.gradMain,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 0 12px rgba(255,45,149,0.4)',
        }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
            <polygon points="5,3 19,12 5,21"/>
          </svg>
        </div>
        <div>
          <div style={{ fontSize: 14, fontWeight: 800, color: T.text, letterSpacing: '0.05em', lineHeight: 1 }}>NAWEMEDIA</div>
          <Waveform width={90} height={10} />
        </div>
      </div>
      {/* Menu */}
      <button onClick={onMenuClick} style={{ background: 'none', border: 'none', cursor: 'pointer', color: T.textMut, padding: 6 }}>
        <NWIcon name="menu" size={22} />
      </button>
    </div>
  </div>
);

// ─── STEPPER ─────────────────────────────────────────────────────────────────
const StepperProgress = ({ step }) => {
  const steps = ['Servicios', 'Cotización', 'Listo'];
  return (
    <div style={{ maxWidth: 480, margin: '0 auto', padding: '16px 20px 4px', display: 'flex', alignItems: 'center', gap: 0 }}>
      {steps.map((s, i) => (
        <React.Fragment key={s}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
            <div style={{
              width: 28, height: 28, borderRadius: '50%',
              background: i <= step ? T.gradMain : T.bgCard,
              border: i <= step ? 'none' : `1px solid ${T.borderMd}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 12, fontWeight: 700, color: i <= step ? '#fff' : T.textFnt,
              boxShadow: i === step ? '0 0 12px rgba(255,45,149,0.5)' : 'none',
              transition: 'all 0.3s',
            }}>
              {i < step ? <NWIcon name="check" size={13} /> : i + 1}
            </div>
            <div style={{ fontSize: 10, fontWeight: i === step ? 700 : 500, color: i === step ? T.text : T.textFnt, letterSpacing: '0.05em', whiteSpace: 'nowrap' }}>
              {s}
            </div>
          </div>
          {i < steps.length - 1 && (
            <div style={{ flex: 1, height: 1, background: i < step ? T.gradMain : T.border, margin: '0 6px', marginBottom: 20, transition: 'background 0.3s' }} />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

// ─── GRADIENT BUTTON ─────────────────────────────────────────────────────────
const GradientButton = ({ children, onClick, disabled, style = {}, variant = 'primary', size = 'md' }) => {
  const [hov, setHov] = React.useState(false);
  const sizes = { sm: { padding: '8px 14px', fontSize: 12, borderRadius: 10 }, md: { padding: '13px 22px', fontSize: 14, borderRadius: 14 }, lg: { padding: '16px 28px', fontSize: 15, borderRadius: 16 } };
  const s = sizes[size] || sizes.md;

  if (variant === 'secondary') return (
    <button onClick={onClick} disabled={disabled} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ background: hov ? T.bgCardHov : 'transparent', border: `1px solid ${T.borderHi}`, color: T.text, cursor: disabled ? 'not-allowed' : 'pointer', fontWeight: 600, fontFamily: 'inherit', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, opacity: disabled ? 0.4 : 1, transition: 'all 0.2s', ...s, ...style }}>
      {children}
    </button>
  );

  if (variant === 'success') return (
    <button onClick={onClick} disabled={disabled} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ background: hov ? 'rgba(34,197,94,0.2)' : 'rgba(34,197,94,0.1)', border: `1px solid rgba(34,197,94,0.4)`, color: T.green, cursor: disabled ? 'not-allowed' : 'pointer', fontWeight: 700, fontFamily: 'inherit', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, opacity: disabled ? 0.4 : 1, transition: 'all 0.2s', ...s, ...style }}>
      {children}
    </button>
  );

  if (variant === 'add') return (
    <button onClick={onClick} disabled={disabled} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ background: T.gradBtn, color: '#fff', border: 'none', cursor: disabled ? 'not-allowed' : 'pointer', fontWeight: 700, fontFamily: 'inherit', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, opacity: disabled ? 0.5 : 1, boxShadow: hov ? '0 0 16px rgba(255,45,149,0.4)' : '0 0 8px rgba(255,45,149,0.2)', transition: 'all 0.2s', ...s, ...style }}>
      {children}
    </button>
  );

  // primary
  return (
    <button onClick={onClick} disabled={disabled} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ background: disabled ? T.bgCard : T.gradBtn, color: disabled ? T.textFnt : '#fff', border: 'none', cursor: disabled ? 'not-allowed' : 'pointer', fontWeight: 700, fontFamily: 'inherit', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, boxShadow: !disabled && hov ? '0 0 24px rgba(255,45,149,0.5)' : !disabled ? '0 0 12px rgba(255,45,149,0.25)' : 'none', transition: 'all 0.2s', width: '100%', ...s, ...style }}>
      {children}
    </button>
  );
};

// ─── INPUT FIELD ─────────────────────────────────────────────────────────────
const InputField = ({ label, value, onChange, type = 'text', placeholder = '', multi = false, error = false }) => {
  const [focused, setFocused] = React.useState(false);
  const borderColor = error ? T.red : focused ? T.cyan : T.borderMd;
  const baseStyle = {
    width: '100%', background: T.bgInset, border: `1px solid ${borderColor}`, borderRadius: T.radiusSm,
    padding: '11px 14px', color: T.text, fontSize: 14, outline: 'none',
    fontFamily: 'inherit', transition: 'border-color 0.2s', boxSizing: 'border-box',
    boxShadow: focused ? `0 0 0 3px rgba(0,229,255,0.08)` : 'none',
  };
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      {label && <label style={{ fontSize: 10, fontWeight: 700, color: T.textFnt, textTransform: 'uppercase', letterSpacing: '0.15em' }}>{label}</label>}
      {multi
        ? <textarea value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} rows={3} onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} style={{ ...baseStyle, resize: 'vertical', lineHeight: 1.6 }} />
        : <input type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} style={baseStyle} />
      }
    </div>
  );
};

// ─── CATEGORY CARD (Pantalla 1) ───────────────────────────────────────────────
const CategoryCard = ({ cat, onClick }) => {
  const [hov, setHov] = React.useState(false);
  return (
    <button onClick={onClick} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        width: '100%', background: hov ? T.bgCardHov : T.bgCard,
        border: `1px solid ${hov ? T.borderHi : T.border}`,
        borderRadius: T.radiusLg, padding: '14px 16px',
        display: 'flex', alignItems: 'center', gap: 14,
        cursor: 'pointer', transition: 'all 0.2s', textAlign: 'left',
        boxShadow: hov ? `0 0 20px rgba(255,45,149,0.12)` : 'none',
      }}>
      <ServiceIcon icon={cat.icon} gradient={cat.gradient} size={48} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 15, fontWeight: 700, color: T.text, marginBottom: 3 }}>{cat.title}</div>
        <div style={{ fontSize: 12, color: T.textMut, lineHeight: 1.4 }}>{cat.desc}</div>
      </div>
      <NWIcon name="arrow" size={18} color={T.textFnt} />
    </button>
  );
};

// ─── SERVICE CARD (Pantalla de categoría) ────────────────────────────────────
const ServiceCard = ({ svc, catGradient, catIcon, isAdded, onAdd }) => {
  const [hov, setHov] = React.useState(false);
  return (
    <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        background: isAdded ? 'rgba(34,197,94,0.05)' : hov ? T.bgCardHov : T.bgCard,
        border: `1px solid ${isAdded ? 'rgba(34,197,94,0.3)' : hov ? T.borderHi : T.border}`,
        borderRadius: T.radius, padding: '14px 16px',
        display: 'flex', alignItems: 'center', gap: 14, transition: 'all 0.2s',
        boxShadow: isAdded ? '0 0 16px rgba(34,197,94,0.1)' : hov ? '0 0 16px rgba(255,45,149,0.1)' : 'none',
      }}>
      <ServiceIcon icon={catIcon} gradient={catGradient} size={44} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: isAdded ? T.green : T.text, marginBottom: 3 }}>{svc.nombre}</div>
        <div style={{ fontSize: 11, color: T.textMut, lineHeight: 1.4, marginBottom: 6 }}>{svc.desc}</div>
        <div style={{ fontSize: 14, fontWeight: 800, color: T.yellow }}>Desde {fmt(svc.precio)}</div>
      </div>
      {isAdded
        ? <GradientButton variant="success" size="sm" onClick={() => {}} style={{ flexShrink: 0, pointerEvents: 'none' }}>
            <NWIcon name="check" size={13} /> Listo
          </GradientButton>
        : <GradientButton variant="add" size="sm" onClick={onAdd} style={{ flexShrink: 0 }}>
            + Agregar
          </GradientButton>
      }
    </div>
  );
};

// ─── SELECTED SERVICE CARD (Cotización) ───────────────────────────────────────
const SelectedServiceCard = ({ item, onRemove, onQtyChange }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 0', borderBottom: `1px solid ${T.border}` }}>
    <div style={{ flex: 1, minWidth: 0 }}>
      <div style={{ fontSize: 13, fontWeight: 700, color: T.text, marginBottom: 2 }}>{item.nombre}</div>
      {item.desc && <div style={{ fontSize: 11, color: T.textFnt, lineHeight: 1.4 }}>{item.desc}</div>}
    </div>
    {/* Qty controls */}
    <div style={{ display: 'flex', alignItems: 'center', gap: 4, flexShrink: 0 }}>
      <button onClick={() => onQtyChange(Math.max(1, (item.qty||1) - 1))} style={{ width: 26, height: 26, borderRadius: 8, background: T.bgInset, border: `1px solid ${T.border}`, color: T.textMd, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <NWIcon name="minus" size={13} />
      </button>
      <span style={{ fontSize: 13, fontWeight: 700, minWidth: 18, textAlign: 'center', color: T.text }}>{item.qty||1}</span>
      <button onClick={() => onQtyChange((item.qty||1) + 1)} style={{ width: 26, height: 26, borderRadius: 8, background: T.bgInset, border: `1px solid ${T.border}`, color: T.textMd, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <NWIcon name="plus" size={13} />
      </button>
    </div>
    <div style={{ fontSize: 14, fontWeight: 800, color: T.yellow, minWidth: 72, textAlign: 'right', flexShrink: 0 }}>
      {fmt(item.precio * (item.qty||1))}
    </div>
    <button onClick={onRemove} style={{ background: 'none', border: 'none', cursor: 'pointer', color: T.textFnt, padding: 4, display: 'flex', alignItems: 'center' }}>
      <NWIcon name="close" size={16} />
    </button>
  </div>
);

// ─── CURRENCY CHIPS ───────────────────────────────────────────────────────────
const CurrencyChips = ({ totalCLP }) => (
  <div style={{ marginTop: 14, paddingTop: 12, borderTop: `1px solid ${T.border}` }}>
    <div style={{ fontSize: 10, fontWeight: 700, color: T.textFnt, textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: 8 }}>
      Equivalente aproximado
    </div>
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
      {Object.entries(RATES).map(([key, r]) => (
        <div key={key} style={{ background: T.bgInset, border: `1px solid ${T.border}`, borderRadius: 20, padding: '5px 10px', fontSize: 11, color: T.textMut, display: 'flex', alignItems: 'center', gap: 5, whiteSpace: 'nowrap' }}>
          <span style={{ fontSize: 13 }}>{r.flag}</span>
          <span style={{ fontWeight: 700, color: T.textMd }}>{fmtFx(totalCLP, key)}</span>
          <span style={{ color: T.textFnt }}>{key}</span>
        </div>
      ))}
    </div>
    <div style={{ fontSize: 10, color: T.textFnt, marginTop: 6 }}>* Tasas orientativas · Los valores reales pueden variar</div>
  </div>
);

// ─── PRICE SUMMARY ────────────────────────────────────────────────────────────
const PriceSummary = ({ subtotal, discount, discountLabel, total, showCurrency = false }) => (
  <div style={{ background: T.bgInset, borderRadius: T.radius, padding: '14px 16px' }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: T.textMut, marginBottom: 8 }}>
      <span>Subtotal</span>
      <span>{fmt(subtotal)}</span>
    </div>
    {discount > 0 && (
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: T.green, marginBottom: 8 }}>
        <span>{discountLabel}</span>
        <span>− {fmt(discount)}</span>
      </div>
    )}
    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 20, fontWeight: 900, borderTop: `1px solid ${T.borderMd}`, paddingTop: 12, marginTop: 4 }}>
      <span style={{ color: T.textMd }}>TOTAL</span>
      <span style={{ color: T.yellow, letterSpacing: '-0.02em' }}>{fmt(total)}</span>
    </div>
    {showCurrency && <CurrencyChips totalCLP={total} />}
  </div>
);

// ─── STICKY FOOTER ────────────────────────────────────────────────────────────
const StickyFooter = ({ total, btnLabel, onBtn, disabled }) => (
  <div style={{
    position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 50,
    background: 'rgba(5,7,13,0.97)', backdropFilter: 'blur(20px)',
    borderTop: `1px solid ${T.border}`, padding: '12px 16px',
  }}>
    <div style={{ maxWidth: 480, margin: '0 auto', display: 'flex', alignItems: 'center', gap: 14 }}>
      <div>
        <div style={{ fontSize: 10, fontWeight: 700, color: T.textFnt, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Total actual</div>
        <div style={{ fontSize: 20, fontWeight: 900, color: T.yellow }}>{fmt(total)}</div>
      </div>
      <GradientButton onClick={onBtn} disabled={disabled} style={{ flex: 1 }}>
        {btnLabel} <NWIcon name="arrow" size={16} />
      </GradientButton>
    </div>
  </div>
);

// ─── BANNER (card informativa) ────────────────────────────────────────────────
const InfoBanner = ({ icon, title, price, onClose }) => (
  <div style={{ background: 'rgba(123,97,255,0.1)', border: `1px solid rgba(123,97,255,0.3)`, borderRadius: T.radius, padding: '12px 14px', display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 16 }}>
    <ServiceIcon icon={icon} gradient="linear-gradient(135deg,#7B61FF,#00E5FF)" size={40} />
    <div style={{ flex: 1 }}>
      <div style={{ fontSize: 12, fontWeight: 700, color: T.text, marginBottom: 2 }}>{title}</div>
      <div style={{ fontSize: 11, color: T.textMut }}>Entrega expresa en un plazo de 24 horas para servicios urgentes.</div>
    </div>
    {price && <div style={{ fontSize: 13, fontWeight: 800, color: T.yellow, whiteSpace: 'nowrap' }}>{fmt(price)}</div>}
    {onClose && <button onClick={onClose} style={{ background:'none',border:'none',cursor:'pointer',color:T.textFnt,padding:2 }}><NWIcon name="close" size={15}/></button>}
  </div>
);

// ─── BADGE ────────────────────────────────────────────────────────────────────
const Badge = ({ children, variant = 'default' }) => {
  const variants = {
    default:   { bg: 'rgba(255,255,255,0.06)', color: T.textMut,  border: T.border },
    success:   { bg: 'rgba(34,197,94,0.15)',   color: T.green,    border: 'rgba(34,197,94,0.3)' },
    progress:  { bg: 'rgba(0,229,255,0.12)',   color: T.cyan,     border: 'rgba(0,229,255,0.3)' },
    warning:   { bg: 'rgba(255,195,0,0.12)',   color: T.yellow,   border: 'rgba(255,195,0,0.3)' },
    danger:    { bg: 'rgba(239,68,68,0.12)',   color: T.red,      border: 'rgba(239,68,68,0.3)' },
  };
  const v = variants[variant] || variants.default;
  return (
    <span style={{ background: v.bg, color: v.color, border: `1px solid ${v.border}`, borderRadius: 20, padding: '3px 10px', fontSize: 11, fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: 4 }}>
      {children}
    </span>
  );
};

// Export all to window
Object.assign(window, {
  NWIcon, ServiceIcon, Waveform, AppHeader, StepperProgress,
  GradientButton, InputField, CategoryCard, ServiceCard,
  SelectedServiceCard, CurrencyChips, PriceSummary, StickyFooter,
  InfoBanner, Badge,
});
