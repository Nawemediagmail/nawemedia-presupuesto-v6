
// NAWEMEDIA V7 — Screens: Datos, Firma, Confirmación final
// Requires: nw-tokens.js, nw-components.jsx

const { TOKENS: T, CONDITIONS, fmt, generarWhatsApp } = window.NW;

// ─── SCREEN 3: DATOS DEL CLIENTE ─────────────────────────────────────────────
const DatosScreen = ({ state, setState, onContinue, onBack }) => {
  const subtotal = state.items.reduce((s,i) => s + i.precio*(i.qty||1), 0);
  const discAmt  = state.descuento.valor > 0 ? subtotal*(state.descuento.valor/100) : 0;
  const total    = subtotal - discAmt;

  const canContinue = state.cliente.nombre.trim() && state.cliente.fecha;

  return (
    <div style={{ maxWidth: 480, margin: '0 auto', padding: '16px 16px 110px' }}>
      <button onClick={onBack} style={{ background:'none', border:'none', cursor:'pointer', color:T.textMut, display:'flex', alignItems:'center', gap:6, fontSize:13, marginBottom:20, padding:0 }}>
        <NWIcon name="back" size={16} /> Volver
      </button>

      <div style={{ marginBottom: 20 }}>
        <h2 style={{ fontSize: 22, fontWeight: 800, color: T.text, margin:'0 0 6px' }}>Tus datos</h2>
        <p style={{ fontSize: 13, color: T.textMut, margin: 0 }}>Completá la información para continuar.</p>
      </div>

      <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
        {/* Nombre */}
        <div style={{ background: T.bgCard, border:`1px solid ${T.border}`, borderRadius: T.radiusLg, padding: 16 }}>
          <InputField
            label="Nombre"
            value={state.cliente.nombre}
            onChange={v => setState(p => ({ ...p, cliente:{ ...p.cliente, nombre:v } }))}
            placeholder="Tu nombre completo"
          />
        </div>

        {/* Empresa / Proyecto */}
        <div style={{ background: T.bgCard, border:`1px solid ${T.border}`, borderRadius: T.radiusLg, padding: 16 }}>
          <InputField
            label="¿De dónde venís?"
            value={state.cliente.empresa}
            onChange={v => setState(p => ({ ...p, cliente:{ ...p.cliente, empresa:v } }))}
            placeholder="Tu marca o proyecto"
          />
        </div>

        {/* Fecha */}
        <div style={{ background: T.bgCard, border:`1px solid ${T.border}`, borderRadius: T.radiusLg, padding: 16 }}>
          <InputField
            label="Fecha"
            type="date"
            value={state.cliente.fecha}
            onChange={v => setState(p => ({ ...p, cliente:{ ...p.cliente, fecha:v } }))}
          />
        </div>

        {/* Email */}
        <div style={{ background: T.bgCard, border:`1px solid ${T.border}`, borderRadius: T.radiusLg, padding: 16 }}>
          <InputField
            label="Correo electrónico"
            type="email"
            value={state.cliente.email}
            onChange={v => setState(p => ({ ...p, cliente:{ ...p.cliente, email:v } }))}
            placeholder="tu@email.com"
          />
        </div>

        {/* Notas */}
        <div style={{ background: T.bgCard, border:`1px solid ${T.border}`, borderRadius: T.radiusLg, padding: 16 }}>
          <InputField
            label="Notas adicionales (opcional)"
            value={state.nota}
            onChange={v => setState(p => ({ ...p, nota:v }))}
            placeholder="Fecha de entrega, condiciones especiales..."
            multi
          />
        </div>

        {/* Resumen */}
        <div style={{ background: T.bgCard, border:`1px solid ${T.border}`, borderRadius: T.radiusLg, padding: 16 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: T.textFnt, textTransform:'uppercase', letterSpacing:'0.12em', marginBottom: 12 }}>
            Resumen de tu presupuesto
          </div>
          <div style={{ display:'flex', justifyContent:'space-between', fontSize:13, color:T.textMut, marginBottom:6 }}>
            <span>Servicios seleccionados</span>
            <span>{state.items.length}</span>
          </div>
          <div style={{ display:'flex', justifyContent:'space-between', fontSize:13, color:T.textMut, marginBottom:10 }}>
            <span>Total estimado</span>
            <span style={{ fontWeight:800, color:T.yellow }}>{fmt(total)}</span>
          </div>
          <GradientButton onClick={onContinue} disabled={!canContinue} style={{ width:'100%' }}>
            Continuar a firma <NWIcon name="arrow" size={16}/>
          </GradientButton>
        </div>
      </div>
    </div>
  );
};

// ─── SCREEN 4: FIRMA ──────────────────────────────────────────────────────────
const FirmaScreen = ({ state, setState, onConfirm, onBack }) => {
  const canvasRef = React.useRef(null);
  const [drawing, setDrawing]       = React.useState(false);
  const [hasSig, setHasSig]         = React.useState(false);
  const [showConds, setShowConds]   = React.useState(false);
  const [sigName, setSigName]       = React.useState(state.cliente.nombre || '');

  const subtotal = state.items.reduce((s,i) => s + i.precio*(i.qty||1), 0);
  const discAmt  = state.descuento.valor > 0 ? subtotal*(state.descuento.valor/100) : 0;
  const total    = subtotal - discAmt;

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.strokeStyle = '#FFC300';
    ctx.lineWidth   = 2.5;
    ctx.lineCap     = 'round';
    ctx.lineJoin    = 'round';

    const getPos = (e) => {
      const r = canvas.getBoundingClientRect();
      const scX = canvas.width / r.width;
      const scY = canvas.height / r.height;
      const src = e.touches ? e.touches[0] : e;
      return { x: (src.clientX - r.left)*scX, y:(src.clientY - r.top)*scY };
    };

    const start = (e) => { e.preventDefault(); setDrawing(true); const p=getPos(e); ctx.beginPath(); ctx.moveTo(p.x,p.y); };
    const move  = (e) => { e.preventDefault(); if(!drawing) return; const p=getPos(e); ctx.lineTo(p.x,p.y); ctx.stroke(); setHasSig(true); };
    const end   = (e) => { e.preventDefault(); setDrawing(false); };

    canvas.addEventListener('mousedown', start);
    canvas.addEventListener('mousemove', move);
    canvas.addEventListener('mouseup', end);
    canvas.addEventListener('touchstart', start, { passive:false });
    canvas.addEventListener('touchmove', move, { passive:false });
    canvas.addEventListener('touchend', end, { passive:false });
    return () => {
      canvas.removeEventListener('mousedown', start);
      canvas.removeEventListener('mousemove', move);
      canvas.removeEventListener('mouseup', end);
      canvas.removeEventListener('touchstart', start);
      canvas.removeEventListener('touchmove', move);
      canvas.removeEventListener('touchend', end);
    };
  }, [drawing]);

  const clearSig = () => {
    const canvas = canvasRef.current;
    if (canvas) canvas.getContext('2d').clearRect(0,0,canvas.width,canvas.height);
    setHasSig(false);
  };

  const handleConfirm = () => {
    if (!sigName.trim()) { alert('Por favor ingresá tu nombre completo.'); return; }
    if (!hasSig) { alert('Por favor firmá en el recuadro.'); return; }
    const sig = canvasRef.current?.toDataURL('image/png') || '';
    const timestamp = new Date().toLocaleString('es-AR', { dateStyle:'long', timeStyle:'short' });
    onConfirm({ sig, name: sigName, timestamp });
  };

  return (
    <div style={{ maxWidth: 480, margin: '0 auto', padding: '16px 16px 110px' }}>
      <button onClick={onBack} style={{ background:'none', border:'none', cursor:'pointer', color:T.textMut, display:'flex', alignItems:'center', gap:6, fontSize:13, marginBottom:20, padding:0 }}>
        <NWIcon name="back" size={16} /> Volver
      </button>

      <div style={{ marginBottom: 20 }}>
        <h2 style={{ fontSize: 22, fontWeight: 800, color: T.text, margin:'0 0 6px' }}>Confirmá tu presupuesto</h2>
        <p style={{ fontSize: 13, color: T.textMut, margin: 0 }}>Revisá los detalles y confirmá para avanzar.</p>
      </div>

      {/* Servicios */}
      <div style={{ background: T.bgCard, border:`1px solid ${T.border}`, borderRadius: T.radiusLg, padding: 16, marginBottom: 12 }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: T.textFnt, textTransform:'uppercase', letterSpacing:'0.12em', marginBottom: 12 }}>
          Servicios seleccionados
        </div>
        {state.items.map(item => (
          <div key={item.id} style={{ display:'flex', justifyContent:'space-between', padding:'8px 0', borderBottom:`1px solid ${T.border}`, fontSize:13 }}>
            <span style={{ color:T.textMd }}>{item.nombre}{(item.qty||1) > 1 ? ` ×${item.qty}` : ''}</span>
            <span style={{ fontWeight:700, color:T.yellow }}>{fmt(item.precio*(item.qty||1))}</span>
          </div>
        ))}
        <div style={{ marginTop: 12 }}>
          <div style={{ display:'flex', justifyContent:'space-between', fontSize:13, color:T.textMut, marginBottom:6 }}>
            <span>Subtotal</span><span>{fmt(subtotal)}</span>
          </div>
          {discAmt > 0 && (
            <div style={{ display:'flex', justifyContent:'space-between', fontSize:13, color:T.green, marginBottom:6 }}>
              <span>{state.descuento.label}</span><span>− {fmt(discAmt)}</span>
            </div>
          )}
          <div style={{ display:'flex', justifyContent:'space-between', fontSize:20, fontWeight:900, borderTop:`1px solid ${T.borderMd}`, paddingTop:10, marginTop:4 }}>
            <span style={{ color:T.textMd }}>TOTAL</span>
            <span style={{ color:T.yellow }}>{fmt(total)}</span>
          </div>
        </div>
      </div>

      {/* Condiciones */}
      <div style={{ background: T.bgCard, border:`1px solid ${T.border}`, borderRadius: T.radiusLg, padding: 16, marginBottom: 12 }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: T.textFnt, textTransform:'uppercase', letterSpacing:'0.12em', marginBottom: 12 }}>
          Condiciones principales
        </div>
        {[
          'Entrega en los plazos acordados.',
          'Incluye revisiones según el plan.',
          'Pago 50% para iniciar el proyecto.',
          'Material final en formatos acordados.',
        ].map((c,i) => (
          <div key={i} style={{ display:'flex', alignItems:'flex-start', gap:8, marginBottom:8 }}>
            <NWIcon name="check" size={14} color={T.green} style={{ marginTop:1, flexShrink:0 }}/>
            <span style={{ fontSize:13, color:T.textMd }}>{c}</span>
          </div>
        ))}
        <button onClick={() => setShowConds(!showConds)} style={{ background:'none', border:'none', cursor:'pointer', color:T.cyan, fontSize:12, fontWeight:700, padding:0, marginTop:4 }}>
          {showConds ? '▲ Ocultar condiciones completas' : '▼ Ver condiciones completas'}
        </button>
        {showConds && (
          <pre style={{ fontSize:11, color:T.textFnt, lineHeight:1.7, whiteSpace:'pre-wrap', fontFamily:'inherit', margin:'12px 0 0', padding:'12px', background:T.bgInset, borderRadius:T.radiusSm }}>
            {CONDITIONS}
          </pre>
        )}
      </div>

      {/* Nombre para firma */}
      <div style={{ background: T.bgCard, border:`1px solid ${T.border}`, borderRadius: T.radiusLg, padding: 16, marginBottom: 12 }}>
        <InputField
          label="Nombre completo para la firma"
          value={sigName}
          onChange={setSigName}
          placeholder="Tu nombre y apellido"
        />
      </div>

      {/* Firma digital */}
      <div style={{ background: T.bgCard, border:`1px solid ${T.border}`, borderRadius: T.radiusLg, padding: 16, marginBottom: 12 }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: T.textFnt, textTransform:'uppercase', letterSpacing:'0.12em', marginBottom: 12 }}>
          Firma digital (dibujá con el dedo)
        </div>
        <div style={{ border:`1px solid ${hasSig ? 'rgba(255,195,0,0.4)' : T.borderMd}`, borderRadius: T.radiusSm, overflow:'hidden', background:'rgba(0,0,0,0.5)', position:'relative' }}>
          <canvas ref={canvasRef} width={680} height={160} style={{ width:'100%', height:140, display:'block', cursor:'crosshair' }}/>
          {!hasSig && (
            <div style={{ position:'absolute', inset:0, display:'flex', alignItems:'center', justifyContent:'center', pointerEvents:'none' }}>
              <span style={{ fontSize:13, color:T.textFnt, opacity:0.6 }}>Firmá aquí →</span>
            </div>
          )}
        </div>
        <button onClick={clearSig} style={{ background:'none', border:`1px solid ${T.border}`, borderRadius:8, padding:'6px 12px', color:T.textMut, cursor:'pointer', fontSize:11, fontFamily:'inherit', marginTop:8 }}>
          Limpiar firma
        </button>
      </div>

      {/* Acciones secundarias */}
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:8, marginBottom:12 }}>
        <button onClick={() => window.open(generarWhatsApp(state), '_blank')}
          style={{ background:T.bgCard, border:`1px solid rgba(37,211,102,0.3)`, borderRadius:T.radiusSm, padding:'10px 8px', color:'#25D366', cursor:'pointer', fontSize:11, fontWeight:700, display:'flex', flexDirection:'column', alignItems:'center', gap:4, fontFamily:'inherit' }}>
          <NWIcon name="whatsapp" size={18} color="#25D366"/>
          WhatsApp
        </button>
        <button onClick={() => {
          const sub = state.items.reduce((s,i)=>s+i.precio*(i.qty||1),0);
          const d   = state.descuento.valor>0?sub*(state.descuento.valor/100):0;
          const tot = sub-d;
          alert(`Adelanto requerido: ${fmt(Math.round(tot*0.5))}\n\nTe enviamos los datos de pago por WhatsApp.`);
          window.open(generarWhatsApp(state),'_blank');
        }}
          style={{ background:T.bgCard, border:`1px solid rgba(123,97,255,0.3)`, borderRadius:T.radiusSm, padding:'10px 8px', color:T.violet, cursor:'pointer', fontSize:11, fontWeight:700, display:'flex', flexDirection:'column', alignItems:'center', gap:4, fontFamily:'inherit' }}>
          <NWIcon name="pay" size={18} color={T.violet}/>
          Pagar 50%
        </button>
        <button onClick={() => alert('La descarga de PDF estará disponible en la versión web completa.')}
          style={{ background:T.bgCard, border:`1px solid rgba(0,229,255,0.3)`, borderRadius:T.radiusSm, padding:'10px 8px', color:T.cyan, cursor:'pointer', fontSize:11, fontWeight:700, display:'flex', flexDirection:'column', alignItems:'center', gap:4, fontFamily:'inherit' }}>
          <NWIcon name="download" size={18} color={T.cyan}/>
          Descargar PDF
        </button>
      </div>

      {/* Confirmar */}
      <GradientButton onClick={handleConfirm} style={{ width:'100%' }}>
        <NWIcon name="check" size={18}/> Confirmar presupuesto
      </GradientButton>
    </div>
  );
};

// ─── SCREEN 5: LISTO PARA ENVIAR ─────────────────────────────────────────────
const ListoScreen = ({ state, signed, onReset }) => {
  const subtotal = state.items.reduce((s,i) => s+i.precio*(i.qty||1), 0);
  const discAmt  = state.descuento.valor>0 ? subtotal*(state.descuento.valor/100) : 0;
  const total    = subtotal - discAmt;
  const today    = state.cliente.fecha || new Date().toISOString().split('T')[0];

  return (
    <div style={{ maxWidth: 480, margin: '0 auto', padding: '20px 16px 60px' }}>
      {/* Logo hero */}
      <div style={{
        background: T.bgCard, border:`1px solid ${T.border}`, borderRadius: T.radiusLg,
        padding: '32px 20px', textAlign:'center', marginBottom: 16,
        position:'relative', overflow:'hidden',
      }}>
        {/* Glow decoration */}
        <div style={{ position:'absolute', top:-60, left:'50%', transform:'translateX(-50%)', width:200, height:200, borderRadius:'50%', background:'radial-gradient(circle, rgba(255,45,149,0.15) 0%, transparent 70%)', pointerEvents:'none' }}/>

        <div style={{ width:80, height:80, borderRadius:20, background:T.gradMain, display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 16px', boxShadow:'0 0 32px rgba(255,45,149,0.4)' }}>
          <svg width="44" height="44" viewBox="0 0 24 24" fill="white"><polygon points="5,3 19,12 5,21"/></svg>
        </div>

        <div style={{ fontSize:28, fontWeight:900, color:T.text, letterSpacing:'0.08em', marginBottom:4 }}>NAWEMEDIA</div>
        <div style={{ fontSize:13, color:T.textMut, marginBottom:16 }}>Producción y Diseño Audiovisual</div>

        <Badge variant="success">
          <NWIcon name="check" size={13}/> Listo para enviar
        </Badge>
      </div>

      {/* Datos del cliente */}
      <div style={{ background: T.bgCard, border:`1px solid ${T.border}`, borderRadius: T.radiusLg, padding: 16, marginBottom: 12 }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start' }}>
          <div>
            <div style={{ fontSize:10, fontWeight:700, color:T.textFnt, textTransform:'uppercase', letterSpacing:'0.12em', marginBottom:4 }}>Para</div>
            <div style={{ fontSize:18, fontWeight:800, color:T.text }}>{state.cliente.nombre || '—'}</div>
            {state.cliente.empresa && <div style={{ fontSize:13, color:T.textMut, marginTop:2 }}>{state.cliente.empresa}</div>}
          </div>
          <div style={{ textAlign:'right' }}>
            <div style={{ fontSize:10, fontWeight:700, color:T.textFnt, textTransform:'uppercase', letterSpacing:'0.12em', marginBottom:4 }}>Fecha</div>
            <div style={{ fontSize:13, color:T.textMd }}>{today}</div>
            <div style={{ fontSize:11, color:T.textFnt, marginTop:2 }}>{signed?.timestamp?.split(',')[0] || ''}</div>
          </div>
        </div>
      </div>

      {/* Servicios y total */}
      <div style={{ background: T.bgCard, border:`1px solid ${T.border}`, borderRadius: T.radiusLg, padding: 16, marginBottom: 12 }}>
        <div style={{ fontSize:11, fontWeight:700, color:T.textFnt, textTransform:'uppercase', letterSpacing:'0.12em', marginBottom:12 }}>
          Servicios seleccionados
        </div>
        {state.items.map(item => (
          <div key={item.id} style={{ display:'flex', justifyContent:'space-between', padding:'7px 0', borderBottom:`1px solid ${T.border}`, fontSize:13 }}>
            <span style={{ color:T.textMd }}>{item.nombre}</span>
            <span style={{ fontWeight:700, color:T.textMd }}>{fmt(item.precio*(item.qty||1))}</span>
          </div>
        ))}
        <div style={{ marginTop:12 }}>
          <div style={{ display:'flex', justifyContent:'space-between', fontSize:13, color:T.textMut, marginBottom:6 }}>
            <span>Subtotal</span><span>{fmt(subtotal)}</span>
          </div>
          {discAmt > 0 && (
            <div style={{ display:'flex', justifyContent:'space-between', fontSize:13, color:T.green, marginBottom:6 }}>
              <span>{state.descuento.label}</span><span>− {fmt(discAmt)}</span>
            </div>
          )}
          <div style={{ display:'flex', justifyContent:'space-between', fontSize:24, fontWeight:900, borderTop:`1px solid ${T.borderMd}`, paddingTop:12, marginTop:4 }}>
            <span style={{ color:T.textMd }}>TOTAL</span>
            <span style={{ color:T.yellow }}>{fmt(total)}</span>
          </div>
        </div>
      </div>

      {/* Acciones */}
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:8, marginBottom:16 }}>
        <button onClick={() => {
          const sub = state.items.reduce((s,i)=>s+i.precio*(i.qty||1),0);
          const d   = state.descuento.valor>0?sub*(state.descuento.valor/100):0;
          const tot = sub-d;
          alert(`Adelanto: ${fmt(Math.round(tot*0.5))}\n\nTe enviamos los datos por WhatsApp.`);
          window.open(generarWhatsApp(state),'_blank');
        }}
          style={{ background: `linear-gradient(135deg, rgba(123,97,255,0.15), rgba(0,229,255,0.15))`, border:`1px solid rgba(123,97,255,0.35)`, borderRadius:T.radiusSm, padding:'12px 8px', color:T.text, cursor:'pointer', fontSize:11, fontWeight:700, display:'flex', flexDirection:'column', alignItems:'center', gap:5, fontFamily:'inherit' }}>
          <NWIcon name="pay" size={20} color={T.violet}/>
          Pagar reserva
        </button>
        <button onClick={() => window.open(generarWhatsApp(state), '_blank')}
          style={{ background:'rgba(37,211,102,0.1)', border:`1px solid rgba(37,211,102,0.3)`, borderRadius:T.radiusSm, padding:'12px 8px', color:'#25D366', cursor:'pointer', fontSize:11, fontWeight:700, display:'flex', flexDirection:'column', alignItems:'center', gap:5, fontFamily:'inherit' }}>
          <NWIcon name="whatsapp" size={20} color="#25D366"/>
          WhatsApp
        </button>
        <button onClick={() => alert('Descarga de PDF disponible en la versión completa.')}
          style={{ background:'rgba(0,229,255,0.08)', border:`1px solid rgba(0,229,255,0.25)`, borderRadius:T.radiusSm, padding:'12px 8px', color:T.cyan, cursor:'pointer', fontSize:11, fontWeight:700, display:'flex', flexDirection:'column', alignItems:'center', gap:5, fontFamily:'inherit' }}>
          <NWIcon name="download" size={20} color={T.cyan}/>
          Descargar PDF
        </button>
      </div>

      {/* Nuevo presupuesto */}
      <GradientButton variant="secondary" onClick={onReset} style={{ width:'100%' }}>
        Crear nuevo presupuesto
      </GradientButton>
    </div>
  );
};

// Export
Object.assign(window, {
  DatosScreen,
  FirmaScreen,
  ListoScreen,
});
