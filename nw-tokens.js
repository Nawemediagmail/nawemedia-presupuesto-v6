
// NAWEMEDIA V7 — Design Tokens & Shared Data
window.NW = window.NW || {};

window.NW.TOKENS = {
  bg:        '#05070D',
  bgSurf:    '#0B0E18',
  bgCard:    '#101322',
  bgCardHov: '#141827',
  bgGlass:   'rgba(16,19,34,0.85)',
  bgInset:   'rgba(0,0,0,0.45)',
  border:    'rgba(255,255,255,0.06)',
  borderMd:  'rgba(255,255,255,0.10)',
  borderHi:  'rgba(255,255,255,0.18)',
  gradMain:  'linear-gradient(90deg, #FF2D95 0%, #FF5C39 45%, #FFC300 100%)',
  gradSec:   'linear-gradient(90deg, #FF2D95 0%, #7B61FF 50%, #00E5FF 100%)',
  gradBtn:   'linear-gradient(90deg, #FF2D95 0%, #FF5C39 50%, #FFC300 100%)',
  magenta:   '#FF2D95',
  violet:    '#7B61FF',
  cyan:      '#00E5FF',
  orange:    '#FF7A00',
  yellow:    '#FFC300',
  green:     '#22C55E',
  red:       '#EF4444',
  text:      '#F1F5F9',
  textMd:    '#CBD5E1',
  textMut:   '#8B95AA',
  textFnt:   '#475569',
  radius:    16,
  radiusSm:  10,
  radiusLg:  20,
};

window.NW.RATES = {
  USD: { code: 'USD', flag: '🇺🇸', rate: 0.00115 },
  EUR: { code: 'EUR', flag: '🇪🇺', rate: 0.00106 },
  BRL: { code: 'BRL', flag: '🇧🇷', rate: 0.00588 },
  COP: { code: 'COP', flag: '🇨🇴', rate: 4.6    },
  PEN: { code: 'PEN', flag: '🇵🇪', rate: 0.00426 },
  ARS: { code: 'ARS', flag: '🇦🇷', rate: 1.15   },
};

window.NW.COUPONS = {
  'NUEVO10':      { label: 'Nuevo cliente',      discount: 10 },
  'RECURRENTE15': { label: 'Cliente recurrente',  discount: 15 },
  'GRANDE20':     { label: 'Pedido grande',       discount: 20 },
  'ADELANT10':    { label: 'Pago anticipado',     discount: 10 },
};

window.NW.CONDITIONS = `1. ALCANCE DEL TRABAJO
Los servicios detallados en este presupuesto son los únicos incluidos. Cualquier entregable adicional será presupuestado por separado.

2. REVISIONES
Se incluye una (1) revisión por cada pieza o animación. Revisiones adicionales o cambios fuera del alcance podrán presupuestarse aparte.

3. FORMA DE PAGO
El pago se realiza en su totalidad al inicio del trabajo. Métodos aceptados: Vita Wallet · PayPal · Prex · Transferencia bancaria · Efectivo.

4. ENTREGA DE MATERIAL
El material del cliente (fotos, videos, logos, textos) debe entregarse antes de iniciar la producción. Demoras en la entrega pueden afectar los plazos acordados.

5. CALIDAD Y ESTILO
NAWEMEDIA se compromete a entregar piezas de calidad cinematográfica con animaciones de alto impacto y un look único.

6. PROPIEDAD Y USO
Una vez abonado el total, el cliente recibe los archivos finales en los formatos acordados. NAWEMEDIA podrá usar las piezas en su portafolio y redes sociales, salvo acuerdo de confidencialidad expreso.

7. CANCELACIONES
En caso de cancelación una vez iniciado el trabajo, no se realizan devoluciones por trabajo ya ejecutado.

8. ACEPTACIÓN
La firma digital de este documento implica la aceptación plena de los servicios, valores, condiciones y forma de pago aquí detallados.`;

window.NW.CATALOG = [
  {
    id: 'redes',
    title: 'Redes',
    desc: 'Crecé y dominá tus redes',
    icon: 'redes',
    gradient: 'linear-gradient(135deg, #FF2D95, #7B61FF)',
    services: [
      { id: 'r1', nombre: 'Diagnóstico Instagram',     desc: 'Análisis y optimización del perfil.',                       precio: 50000  },
      { id: 'r2', nombre: 'Gestión inicial de redes',  desc: 'Configuración y piezas listas para publicar.',              precio: 80000  },
      { id: 'r3', nombre: 'Gestión completa',          desc: 'Campaña, contenido y seguimiento mensual.',                 precio: 120000 },
      { id: 'r4', nombre: 'Imagen + Presencia',        desc: 'Identidad visual unificada en todas las plataformas.',      precio: 130000 },
      { id: 'r5', nombre: 'Salís al mundo con todo',   desc: 'Campaña de 7 días con 7 piezas de contenido.',             precio: 110000 },
    ],
  },
  {
    id: 'eventos',
    title: 'Eventos',
    desc: 'Diseños y videos para eventos',
    icon: 'eventos',
    gradient: 'linear-gradient(135deg, #FF5C39, #FFC300)',
    services: [
      { id: 'e1', nombre: 'Flyer estático',             desc: 'Diseño de flyer con identidad visual.',                    precio: 30000  },
      { id: 'e2', nombre: 'Flyer animado / Reel',       desc: 'Video corto de alto impacto para redes.',                 precio: 60000  },
      { id: 'e3', nombre: 'Campaña completa evento',    desc: 'Flyer + reel + historias.',                               precio: 120000 },
      { id: 'e4', nombre: 'Versión adicional',          desc: 'Variante de diseño o video existente.',                   precio: 25000  },
    ],
  },
  {
    id: 'led',
    title: 'Visuales LED',
    desc: 'Visuales impactantes en pantallas',
    icon: 'led',
    gradient: 'linear-gradient(135deg, #7B61FF, #00E5FF)',
    services: [
      { id: 'l1', nombre: 'Logo o título animado',      desc: 'Animación de logo o título 3D.',                          precio: 40000  },
      { id: 'l2', nombre: 'Pack visual LED',            desc: 'Pack de animaciones LED totales.',                        precio: 80000  },
      { id: 'l3', nombre: 'Experiencia visual full',    desc: 'Contenido visual completo para pantallas LED.',           precio: 150000 },
      { id: 'l4', nombre: 'Entrega urgente 24h',        desc: 'Producción y entrega en 24 horas para servicios urgentes.',precio: 50000 },
    ],
  },
  {
    id: 'campana',
    title: 'Campaña completa',
    desc: 'Solución integral para tu marca',
    icon: 'campana',
    gradient: 'linear-gradient(135deg, #FF2D95, #FF7A00)',
    services: [
      { id: 'c1', nombre: 'Diagnóstico + Plan',         desc: 'Análisis de negocio y plan de acción personalizado.',     precio: 75000  },
      { id: 'c2', nombre: 'Campaña Starter',            desc: 'Diseño + gestión inicial 30 días.',                      precio: 180000 },
      { id: 'c3', nombre: 'Campaña Full',               desc: 'Gestión completa, contenido y seguimiento mensual.',     precio: 250000 },
    ],
  },
  {
    id: 'personalizado',
    title: 'Personalizado',
    desc: 'Contanos tu idea, lo hacemos real',
    icon: 'personalizado',
    gradient: 'linear-gradient(135deg, #00E5FF, #7B61FF)',
    services: [],
  },
];

window.NW.fmt = (n) => `CLP$${Number(n).toLocaleString('es-CL')}`;
window.NW.fmtFx = (clp, key) => {
  const r = window.NW.RATES[key];
  const val = clp * r.rate;
  return `${val.toLocaleString('es-CL', { maximumFractionDigits: val < 10 ? 2 : 0 })}`;
};

window.NW.LS_KEY = 'nw_budget_v7';
window.NW.loadState = () => {
  try { return JSON.parse(localStorage.getItem(window.NW.LS_KEY) || 'null'); } catch { return null; }
};
window.NW.saveState = (s) => {
  try { localStorage.setItem(window.NW.LS_KEY, JSON.stringify(s)); } catch {}
};

window.NW.generarWhatsApp = (state) => {
  const sub = state.items.reduce((s, i) => s + i.precio * (i.qty || 1), 0);
  const disc = state.descuento.valor > 0 ? sub * (state.descuento.valor / 100) : 0;
  const total = sub - disc;
  const items = state.items.map(i => `• ${i.nombre}: ${window.NW.fmt(i.precio * (i.qty || 1))}`).join('\n');
  const msg = `Hola NAWEMEDIA 👋\n\nAcabo de generar mi presupuesto:\n\nCliente: ${state.cliente.nombre}\n\nServicios:\n${items}\n\nTOTAL: ${window.NW.fmt(total)}\n\n¿Podemos hablar?`;
  return `https://wa.me/56959985061?text=${encodeURIComponent(msg)}`;
};
