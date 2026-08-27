/**
 * Modelo IS-LM-BP (Mundell-Fleming) de libro de texto, con movilidad
 * IMPERFECTA de capitales y tipo de cambio flotante. Sin dependencias:
 * se importa tanto desde el frontmatter de Astro como desde el script
 * de cliente.
 *
 * Tercera versión de este archivo. La primera asumía movilidad PERFECTA
 * (BP horizontal, tasa local siempre atada a la mundial): un resultado
 * real de Mundell-Fleming, pero el gasto público y los impuestos no
 * movían nunca ni la producción ni la tasa, así que dos de los tres
 * controles se sentían rotos (feedback del usuario). La segunda pasó a
 * movilidad imperfecta pero dejó a BP como una referencia fija que
 * NUNCA se movía, con el tipo de cambio calculado como la distancia
 * entre esa referencia y el cruce real de IS-LM — y el usuario hizo la
 * pregunta correcta: bajo un tipo de cambio genuinamente flotante, ¿no
 * debería BP desplazarse también hasta que las tres curvas se crucen en
 * el mismo punto? Sí. Esta versión resuelve las tres ecuaciones de
 * manera simultánea: el tipo de cambio ya no es un diagnóstico de "qué
 * tan lejos quedó el equilibrio", es la variable que se ajusta hasta que
 * IS, LM y BP se crucen exactamente en un solo punto — que es lo que
 * "flotante" quiere decir.
 *
 * Mercado de bienes (IS):  Y = C0 + c(Y-T) + I0 - b·r + G + n·e
 * Mercado de dinero (LM):  M = k·Y - h·r                     (no depende de e)
 * Balanza de pagos (BP):   r = rWorld + pendiente·(Y-Y0) - sensibilidadFx·e
 *
 * Las tres son lineales en (Y, r, e), así que el sistema se resuelve en
 * forma cerrada, sin métodos numéricos: LM fija r en función de Y: se
 * sustituye en IS y en BP por separado, lo que da DOS rectas Y(e)
 * independientes (una desde IS-LM, otra desde LM-BP); se igualan para
 * despejar e, y de ahí salen Y y r. El tipo de cambio que se muestra es
 * el desvío de esa e respecto del escenario neutral (0 = neutral, +
 * depreciación, − apreciación) — no tiene unidad intuitiva propia, así
 * que se ancla al escenario neutral igual que los tres controles.
 */

export interface ISLMParams {
  C0: number;
  c: number;
  I0: number;
  b: number;
  k: number;
  h: number;
  /** Tasa de interés mundial — punto de referencia de BP. */
  rWorld: number;
  /** Pendiente de BP en puntos de tasa por unidad de producto — más
   *  chica que k/h (la pendiente de LM) a propósito, para que se
   *  distingan a simple vista. */
  bpSlope: number;
  /** Sensibilidad de BP al tipo de cambio: cuánto se desplaza la
   *  referencia externa cuando el tipo de cambio se mueve (una
   *  depreciación mejora la competitividad, así que relaja cuánta tasa
   *  hace falta para el mismo producto). */
  bpFx: number;
  /** Sensibilidad del mercado de bienes (IS) al tipo de cambio. */
  isFx: number;
  /** Escala de presentación del desvío de tipo de cambio — no cambia
   *  ninguna curva, sólo qué tan grande se ve el número. */
  fxScale: number;
}

// b, k, h calibrados para que, sobre la ventana de Y de DOMAIN, IS y LM
// recorran una pendiente moderada y legible; bpSlope deliberadamente
// más chica que k/h. isFx/bpFx calibrados para que el sistema converja
// a un único cruce dentro de esa misma ventana (ver check numérico en
// el historial de la sesión — no hay una fórmula corta para "elegilos
// bien", se ajustaron probando).
export const PARAMS: ISLMParams = {
  C0: 100, c: 0.6, I0: 150, b: 1200, k: 0.5, h: 1500,
  rWorld: 3,
  bpSlope: 0.015,
  bpFx: 1,
  isFx: 1,
  fxScale: 20,
};

// Niveles absolutos en el escenario neutral (los tres controles en 0) y
// amplitud de cada uno — internos, nunca se muestran así al usuario. Lo
// que el usuario ve y mueve es siempre el desvío -100..100.
const NEUTRAL = { G: 110, T: 110, M: 280 };
// G/T subidas de 20 a 70: con ±20, un swing completo del gasto apenas
// movía la producción ~50 unidades sobre una ventana de 500 — la curva
// IS se veía casi congelada al lado de LM (que M sí movía con fuerza).
// Con ±70 un swing completo de G mueve la producción ~170, visible sin
// tener que forzar la vista (feedback directo del usuario). T queda con
// la misma amplitud pero su efecto sobre Y sigue siendo menor que el de
// G — no por la amplitud, sino porque una parte del ingreso extra se
// ahorra (ver el coeficiente -c en autonomousSpending), tal como dice el
// texto de la pieza.
const AMPLITUDE = { G: 70, T: 70, M: 200 };

export interface PolicyStance {
  /** Postura fiscal vía gasto: -100 (contractiva) … 100 (expansiva) */
  gStance: number;
  /** Postura fiscal vía impuestos: -100 (contractiva) … 100 (expansiva) */
  tStance: number;
  /** Postura monetaria: -100 (contractiva) … 100 (expansiva) */
  mStance: number;
}

export interface Levels {
  G: number;
  T: number;
  M: number;
}

/** Traduce el desvío -100..100 de cada control a su nivel absoluto
 *  interno. Impuestos se invierte a propósito: subir la postura fiscal
 *  (más expansiva) baja los impuestos, no los sube — la misma
 *  convención de dirección que ya usa el gasto público (subir = más
 *  expansiva), aplicada del lado de los impuestos donde "más expansiva"
 *  significa recortarlos, no subirlos. */
export function policyToLevels(stance: PolicyStance): Levels {
  return {
    G: NEUTRAL.G + (stance.gStance / 100) * AMPLITUDE.G,
    T: NEUTRAL.T - (stance.tStance / 100) * AMPLITUDE.T,
    M: NEUTRAL.M + (stance.mStance / 100) * AMPLITUDE.M,
  };
}

function autonomousSpending(levels: Pick<Levels, "G" | "T">, p: ISLMParams): number {
  return p.C0 - p.c * levels.T + p.I0 + levels.G;
}

const RATE_SCALE = 100;

/** r a lo largo de la curva IS, para un nivel de producto Y y un tipo
 *  de cambio e dados (e en su valor absoluto interno, no el desvío que
 *  se muestra). */
export function isR(Y: number, e: number, levels: Pick<Levels, "G" | "T">, p: ISLMParams = PARAMS): number {
  const A = autonomousSpending(levels, p);
  return ((A + p.isFx * e - Y * (1 - p.c)) / p.b) * RATE_SCALE;
}

/** r a lo largo de la curva LM — no depende del tipo de cambio. */
export function lmR(Y: number, M: number, p: ISLMParams = PARAMS): number {
  return ((p.k * Y - M) / p.h) * RATE_SCALE;
}

/** r a lo largo de la referencia BP, para un nivel de producto Y y un
 *  tipo de cambio e dados — a diferencia de la versión anterior de este
 *  archivo, BP SÍ se desplaza con el tipo de cambio (una depreciación
 *  la corre hacia abajo/derecha: hace falta menos tasa para sostener el
 *  mismo producto porque el resultado comercial mejoró). */
export function bpR(Y: number, e: number, p: ISLMParams = PARAMS): number {
  return p.rWorld + p.bpSlope * (Y - NEUTRAL_Y0) - p.bpFx * e;
}

export interface Equilibrium {
  Y: number;
  r: number;
  /** Tipo de cambio absoluto (no tiene unidad intuitiva propia). */
  eAbs: number;
  /** Desvío del tipo de cambio respecto del escenario neutral — 0 =
   *  neutral, positivo = depreciación, negativo = apreciación. Esto es
   *  lo que se muestra al usuario. */
  fx: number;
  levels: Levels;
}

/**
 * Resuelve el sistema IS=LM=BP para (Y, r, e) de forma simultánea, sin
 * el desvío de tipo de cambio (ver `equilibrium` más abajo, que le suma
 * eso) — separado en su propia función porque `NEUTRAL_E` (el "0" del
 * desvío) se calcula llamando a esto mismo, y no puede depender de un
 * valor (`fx`) que todavía no existe en ese momento.
 *
 * Sustituyendo LM (r en función de Y) en IS y en BP por separado se
 * obtienen dos rectas independientes Y(e) — `Y = i1 + s1·e` desde
 * IS-LM, `Y = i2 + s2·e` desde LM-BP. Se igualan para despejar e, y de
 * ahí salen Y y r. Ver la nota al principio del archivo para la
 * derivación completa.
 */
function solveCore(stance: PolicyStance, p: ISLMParams): { Y: number; r: number; eAbs: number; levels: Levels } {
  const levels = policyToLevels(stance);
  const A = autonomousSpending(levels, p);
  const D = p.b * p.k + p.h * (1 - p.c);

  // IS = LM ⇒ Y = i1 + s1·e
  const i1 = (p.h * A + p.b * levels.M) / D;
  const s1 = (p.h * p.isFx) / D;

  // LM = BP ⇒ Y = i2 + s2·e
  const khRate = (p.k / p.h) * RATE_SCALE;
  const denom2 = khRate - p.bpSlope;
  const i2 = (p.rWorld - p.bpSlope * NEUTRAL_Y0 + (RATE_SCALE * levels.M) / p.h) / denom2;
  const s2 = -p.bpFx / denom2;

  const eAbs = (i2 - i1) / (s1 - s2);
  const Y = i1 + s1 * eAbs;
  const r = ((p.k * Y - levels.M) / p.h) * RATE_SCALE;

  return { Y, r, eAbs, levels };
}

export function equilibrium(stance: PolicyStance, p: ISLMParams = PARAMS): Equilibrium {
  const core = solveCore(stance, p);
  const fx = (core.eAbs - NEUTRAL_E) * p.fxScale;
  return { ...core, fx };
}

// Y de equilibrio de la economía CERRADA (sin tipo de cambio) en el
// escenario neutral — es el punto sobre el que se centra la referencia
// BP (Yref = Y0). Calculado antes de NEUTRAL_E porque éste lo usa.
const NEUTRAL_EQ_LEVELS = policyToLevels({ gStance: 0, tStance: 0, mStance: 0 });
const NEUTRAL_D = PARAMS.b * PARAMS.k + PARAMS.h * (1 - PARAMS.c);
const NEUTRAL_Y0 = (PARAMS.h * autonomousSpending(NEUTRAL_EQ_LEVELS, PARAMS) + PARAMS.b * NEUTRAL_EQ_LEVELS.M) / NEUTRAL_D;

// Tipo de cambio absoluto en el escenario neutral — el "0" contra el
// que se mide el desvío que se muestra.
const NEUTRAL_E = solveCore({ gStance: 0, tStance: 0, mStance: 0 }, PARAMS).eAbs;

export interface CurvePoint {
  Y: number;
  r: number;
}

/** Ventana fija del gráfico — no se reescala con los controles: si el
 *  marco se moviera con cada cambio, el usuario vería "todo se mueve"
 *  en vez de "las curvas se mueven". Cubre con margen el rango de
 *  equilibrios alcanzable con los rangos de los controles. */
export const DOMAIN = { yMin: 290, yMax: 1000, rMin: -8, rMax: 14 };

export const PLOT = { x0: 190, x1: 930, y0: 40, y1: 520 };

export function xOf(Y: number): number {
  return PLOT.x0 + ((Y - DOMAIN.yMin) / (DOMAIN.yMax - DOMAIN.yMin)) * (PLOT.x1 - PLOT.x0);
}

export function yOf(r: number): number {
  return PLOT.y1 - ((r - DOMAIN.rMin) / (DOMAIN.rMax - DOMAIN.rMin)) * (PLOT.y1 - PLOT.y0);
}

function sample(fn: (Y: number) => number, steps = 48): CurvePoint[] {
  const pts: CurvePoint[] = [];
  for (let i = 0; i <= steps; i++) {
    const Y = DOMAIN.yMin + (DOMAIN.yMax - DOMAIN.yMin) * (i / steps);
    pts.push({ Y, r: fn(Y) });
  }
  return pts;
}

/** Curva IS completa, sosteniendo el tipo de cambio en su valor de
 *  equilibrio actual (la convención estándar para dibujar una curva
 *  cuando una de sus variables es, en rigor, endógena). */
export function isCurve(stance: PolicyStance, p: ISLMParams = PARAMS, steps = 48): CurvePoint[] {
  const eq = equilibrium(stance, p);
  const { G, T } = eq.levels;
  return sample((Y) => isR(Y, eq.eAbs, { G, T }, p), steps);
}

export function lmCurve(stance: PolicyStance, p: ISLMParams = PARAMS, steps = 48): CurvePoint[] {
  const { M } = policyToLevels(stance);
  return sample((Y) => lmR(Y, M, p), steps);
}

/** BP, sosteniendo el tipo de cambio en su valor de equilibrio actual —
 *  a diferencia de la versión anterior de este archivo, esta curva SÍ
 *  se recalcula con cada cambio de política, porque genuinamente se
 *  desplaza. */
export function bpCurve(stance: PolicyStance, p: ISLMParams = PARAMS, steps = 48): CurvePoint[] {
  const eq = equilibrium(stance, p);
  return sample((Y) => bpR(Y, eq.eAbs, p), steps);
}

/** Separa las tres etiquetas de fin de curva (IS/LM/BP, cada una con su
 *  glosa 15px debajo) cuando quedan demasiado cerca — en combinaciones
 *  extremas de sliders las tres curvas pueden terminar casi al mismo
 *  nivel de r y las etiquetas se pisaban entre sí. Barrido simple de
 *  abajo hacia arriba: cada etiqueta se empuja hacia arriba lo justo
 *  para respetar `minGap` respecto de la que tiene debajo — nunca se
 *  mueve la que ya está más abajo, así el orden visual (quién está
 *  arriba de quién) nunca se invierte. */
export function resolveLabelYs(
  labels: { key: string; y: number }[],
  minGap = 32,
): Record<string, number> {
  const sorted = [...labels].sort((a, b) => a.y - b.y);
  for (let i = sorted.length - 2; i >= 0; i--) {
    if (sorted[i + 1].y - sorted[i].y < minGap) {
      sorted[i].y = sorted[i + 1].y - minGap;
    }
  }
  const out: Record<string, number> = {};
  sorted.forEach((l) => { out[l.key] = l.y; });
  return out;
}

/** Convierte una curva en un atributo `d` de polilínea recta (sin
 *  Bézier) — cada vértice es un valor efectivamente calculado. */
export function curvePath(points: CurvePoint[]): string {
  return points
    .map((pt, i) => `${i === 0 ? "M" : "L"} ${xOf(pt.Y).toFixed(1)} ${yOf(pt.r).toFixed(1)}`)
    .join(" ");
}

export function project(pt: { Y: number; r: number }): { x: number; y: number } {
  return { x: xOf(pt.Y), y: yOf(pt.r) };
}
