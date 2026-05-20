
// NAWEMEDIA V7 — Screens: Servicios, Categoría, Cotización
// Requires: nw-tokens.js, nw-components.jsx

const { TOKENS: T, CATALOG, COUPONS, fmt } = window.NW;

// ─── SCREEN 1: SERVICIOS (categorías) ────────────────────────────────────────
const ServiciosScreen = ({ selectedItems, onCatSelect }) => {
  return (
    <div style={{ maxWidth: 480, margin: '0 auto', padding: '20px 16px 110px' }}>
      {/* Header text */}
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 24, fontWeight: 800, color: T.text, margin: '0 0 6px', lineHeight: 1.2 }}>
          ¿Qué necesitás hoy?
        </h1>
        <p style={{ fontSize: 13, color: T.textMut, margin: 0, lineHeight: 1.5 }}>
          Armá tu presupuesto en menos de 2 minutos.
        </p>
      </div>

      {/* Banner urgente */}
      <InfoBanner
        icon="led"
        title="Lo necesitás para mañana"
        price={50000}
      />

      {/* Category cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {CATALOG.map(cat => (
          <CategoryCard
            key={cat.id}
            cat={cat}
            onClick={() => onCatSelect(cat)}
          />
        ))}
      </div>
    </div>
  );
};

// ─── SCREEN 1b: CATEGORÍA (servicios dentro) ─────────────────────────────────
const CategoriaScreen = ({ cat, selectedItems, onAdd, onBack }) => {
  const isAdded = (id) => selectedItems.some(i => i.id === id);

  // Personalizado: formulario libre
  if (cat.id === 'personalizado') {
    return (
      <div style={{ maxWidth: 480, margin: '0 auto', padding: '16px 16px 110px' }}>
        <button onClick={onBack} style={{ background:'none', border:'none', cursor:'pointer', color:T.textMut, display:'flex', alignItems:'center', gap:6, fontSize:13, marginBottom:20, padding:0 }}>
          <NWIcon name="back" size={16} /> Volver
        </button>
        <div style={{ marginBottom: 24 }}>
          <div style={{ display:'flex', alignItems:'center', gap: 12, marginBottom: 12 }}>
            <ServiceIcon icon={cat.icon} gradient={cat.gradient} size={48} />
            <div>
              <h2 style={{ fontSize: 20, fontWeight: 800, color: T.text, margin: '0 0 4px' }}>{cat.title}</h2>
              <p style={{ fontSize: 12, color: T.textMut, margin: 0 }}>{cat.desc}</p>
            </div>
          </div>
        </div>
        <CustomServiceFormScreen cat={cat} onAdd={onAdd} onBack={onBack} />
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 480, margin: '0 auto', padding: '16px 16px 110px' }}>
      <button onClick={onBack} style={{ background:'none', border:'none', cursor:'pointer', color:T.textMut, display:'flex', alignItems:'center', gap:6, fontSize:13, marginBottom:20, padding:0 }}>
        <NWIcon name="back" size={16} /> Volver
      </button>

      {/* Cat header */}
      <div style={{ display:'flex', alignItems:'center', gap: 12, marginBottom: 6 }}>
        <ServiceIcon icon={cat.icon} gradient={cat.gradient} size={48} />
        <div>
          <h2 style={{ fontSize: 20, fontWeight: 800, color: T.text, margin: '0 0 4px' }}>{cat.title}</h2>
          <p style={{ fontSize: 12, color: T.textMut, margin: 0 }}>{cat.desc}</p>
        </div>
      </div>
      <p style={{ fontSize: 13, color: T.textFnt, marginBottom: 20 }}>
        Elegí el servicio que mejor se adapte a vos.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {cat.services.map(svc => (
          <ServiceCard
            key={svc.id}
            svc={svc}
            catGradient={cat.gradient}
            catIcon={cat.icon}
            isAdded={isAdded(svc.id)}
            onAdd={() => onAdd({ ...svc, catId: cat.id, catTitle: cat.title })}
          />
        ))}
      </div>
    </div>
  );
};

// ─── CUSTOM SERVICE FORM (dentro de Personalizado) ───────────────────────────
const CustomServiceFormScreen = ({ cat, onAdd }) => {
  const [nombre, setNombre] = React.useState('');
  const [precio, setPrecio] = React.useState('');
  const [desc, setDesc]   = React.useState('');
  const [added, setAdded] = React.useState(false);

  const handleAdd = () => {
    if (!nombre.trim() || !precio) return;
    onAdd({ id: 'custom_' + Date.now(), nombre, desc, precio: parseFloat(precio)||0, catId: 'personalizado', catTitle: 'Personalizado' });
    setNombre(''); setPrecio(''); setDesc('');
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div style={{ background: T.bgCard, border: `1px solid ${T.border}`, borderRadius: T.radiusLg, padding: 20 }}>
      <div style={{ fontSize: 12, fontWeight: 700, color: T.textFnt, textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 16 }}>
        Algo a medida
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
        <InputField label="Nombre del servicio" value={nombre} onChange={setNombre} placeholder="Pack especial" />
        <InputField label="Precio (CLP)" type="number" value={precio} onChange={setPrecio} placeholder="0" />
      </div>
      <div style={{ marginBottom: 16 }}>
        <InputField label="Descripción (opcional)" value={desc} onChange={setDesc} placeholder="Detalle del servicio..." />
      </div>
      {added
        ? <GradientButton variant="success" style={{ width:'100%' }}><NWIcon name="check" size={16}/> Servicio agregado</GradientButton>
        : <GradientButton variant="add" onClick={handleAdd} disabled={!nombre.trim() || !precio} style={{ width:'100%' }}>
            <NWIcon name="plus" size={16}/> Agregar servicio
          </GradientButton>
      }
    </div>
  );
};

// ─── SCREEN 2: COTIZACIÓN ─────────────────────────────────────────────────────
const CotizacionScreen = ({ state, setState, onContinue, onBack }) => {
  const [couponCode, setCouponCode]   = React.useState(state.descuento.codigo || '');
  const [couponError, setCouponError] = React.useState(false);
  const [showCustom, setShowCustom]   = React.useState(false);
  const [custom, setCustom]           = React.useState({ nombre:'', precio:'', desc:'' });

  const subtotal = state.items.reduce((s,i) => s + i.precio * (i.qty||1), 0);
  const discAmt  = state.descuento.valor > 0 ? subtotal * (state.descuento.valor / 100) : 0;
  const total    = subtotal - discAmt;

  const applyCoupon = () => {
    const code = couponCode.toUpperCase().trim();
    if (COUPONS[code]) {
      setState(p => ({ ...p, descuento: { label: `${COUPONS[code].label} (${COUPONS[code].discount}%)`, valor: COUPONS[code].discount, codigo: code } }));
      setCouponError(false);
    } else {
      setCouponError(true);
    }
  };

  const removeCoupon = () => {
    setCouponCode('');
    setCouponError(false);
    setState(p => ({ ...p, descuento: { label:'', valor:0, codigo:'' } }));
  };

  const removeItem = (id) => setState(p => ({ ...p, items: p.items.filter(i => i.id !== id) }));
  const setQty    = (id, v) => setState(p => ({ ...p, items: p.items.map(i => i.id === id ? { ...i, qty: Math.max(1, v) } : i) }));

  const addCustom = () => {
    if (!custom.nombre.trim() || !custom.precio) return;
    setState(p => ({ ...p, items: [...p.items, { id:'c_'+Date.now(), nombre:custom.nombre, desc:custom.desc, precio:parseFloat(custom.precio)||0, qty:1, catId:'personalizado' }] }));
    setCustom({ nombre:'', precio:'', desc:'' });
    setShowCustom(false);
  };

  return (
    <div style={{ maxWidth: 480, margin: '0 auto', padding: '16px 16px 110px' }}>
      <button onClick={onBack} style={{ background:'none', border:'none', cursor:'pointer', color:T.textMut, display:'flex', alignItems:'center', gap:6, fontSize:13, marginBottom:20, padding:0 }}>
        <NWIcon name="back" size={16} /> Volver
      </button>

      <div style={{ marginBottom: 20 }}>
        <h2 style={{ fontSize: 22, fontWeight: 800, color: T.text, margin: '0 0 6px' }}>Lo que hacemos juntos</h2>
        <p style={{ fontSize: 13, color: T.textMut, margin: 0 }}>Revisá y personalizá tu presupuesto.</p>
      </div>

      {/* Servicios seleccionados */}
      <div style={{ background: T.bgCard, border: `1px solid ${T.border}`, borderRadius: T.radiusLg, padding: '16px 16px 0', marginBottom: 12 }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: T.textFnt, textTransform: 'uppercase', letterSpacing:'0.12em', marginBottom: 4 }}>
          Servicios seleccionados
        </div>
        {state.items.length === 0
          ? <div style={{ padding:'20px 0', textAlign:'center', color: T.textFnt, fontSize:13 }}>No hay servicios agregados aún.</div>
          : state.items.map(item => (
              <SelectedServiceCard
                key={item.id}
                item={item}
                onRemove={() => removeItem(item.id)}
                onQtyChange={(v) => setQty(item.id, v)}
              />
            ))
        }
        {/* Agregar a medida */}
        <div style={{ padding: '12px 0' }}>
          {!showCustom
            ? <button onClick={() => setShowCustom(true)} style={{ background:'none', border:`1px dashed ${T.borderHi}`, borderRadius: T.radiusSm, padding:'10px 16px', color: T.magenta, cursor:'pointer', fontSize:13, fontWeight:700, width:'100%', display:'flex', alignItems:'center', justifyContent:'center', gap:6 }}>
                <NWIcon name="plus" size={15} color={T.magenta} /> Agregar servicio personalizado
              </button>
            : <div style={{ background: T.bgInset, borderRadius: T.radiusSm, padding: 14, display:'flex', flexDirection:'column', gap:10 }}>
                <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10 }}>
                  <InputField label="Nombre" value={custom.nombre} onChange={v=>setCustom(p=>({...p,nombre:v}))} placeholder="Pack especial"/>
                  <InputField label="Precio CLP" type="number" value={custom.precio} onChange={v=>setCustom(p=>({...p,precio:v}))} placeholder="0"/>
                </div>
                <InputField label="Descripción (opcional)" value={custom.desc} onChange={v=>setCustom(p=>({...p,desc:v}))} placeholder="Detalle del servicio..."/>
                <div style={{ display:'flex', gap:8 }}>
                  <GradientButton variant="add" onClick={addCustom} disabled={!custom.nombre||!custom.precio} style={{ flex:1 }}>
                    <NWIcon name="plus" size={14}/> Agregar
                  </GradientButton>
                  <GradientButton variant="secondary" onClick={()=>setShowCustom(false)} style={{ padding:'10px 14px' }}>
                    Cancelar
                  </GradientButton>
                </div>
              </div>
          }
        </div>
      </div>

      {/* Código de descuento */}
      <div style={{ background: T.bgCard, border: `1px solid ${T.border}`, borderRadius: T.radiusLg, padding: 16, marginBottom: 12 }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: T.textFnt, textTransform: 'uppercase', letterSpacing:'0.12em', marginBottom: 12 }}>
          Código de descuento
        </div>
        {state.descuento.valor > 0
          ? <div style={{ display:'flex', alignItems:'center', gap:8 }}>
              <Badge variant="success"><NWIcon name="check" size={12}/> {state.descuento.label}</Badge>
              <button onClick={removeCoupon} style={{ background:'none', border:'none', cursor:'pointer', color:T.textFnt, display:'flex', alignItems:'center' }}><NWIcon name="close" size={15}/></button>
            </div>
          : <>
              <div style={{ display:'flex', gap:8 }}>
                <input value={couponCode} onChange={e=>{ setCouponCode(e.target.value); setCouponError(false); }} placeholder="Ingresá el código" style={{ flex:1, background:T.bgInset, border:`1px solid ${couponError ? T.red : T.borderMd}`, borderRadius:T.radiusSm, padding:'10px 14px', color:T.text, fontSize:13, outline:'none', fontFamily:'inherit' }}/>
                <GradientButton variant="secondary" onClick={applyCoupon} style={{ padding:'10px 16px', flexShrink:0 }}>Aplicar</GradientButton>
              </div>
              {couponError && <div style={{ fontSize:11, color:T.red, marginTop:6 }}>Código no válido. Intentá con otro.</div>}
            </>
        }
      </div>

      {/* Resumen */}
      <div style={{ background: T.bgCard, border: `1px solid ${T.border}`, borderRadius: T.radiusLg, padding: 16, marginBottom: 12 }}>
        <PriceSummary
          subtotal={subtotal}
          discount={discAmt}
          discountLabel={state.descuento.label}
          total={total}
          showCurrency={true}
        />
      </div>
    </div>
  );
};

// Export
Object.assign(window, {
  ServiciosScreen,
  CategoriaScreen,
  CustomServiceFormScreen,
  CotizacionScreen,
});
