// All numbers on the page come from the paper (main.tex, commit 7be5841, 2026-10-07).

export const ACTION_NAMES: Record<string, string> = {
  exo: 'Passive physical events',
  perc: 'Camera motion',
  insp: 'Object inspection',
  navi: 'Navigation',
  mani: 'Object manipulation',
};

export const FAMILY_NAMES: Record<string, string> = {
  causal: 'causal dynamics',
  cf: 'counterfactual',
  physical: 'physical modeling',
  temporal: 'temporal',
};

export const subsetName = (code: string) => {
  const [a, f] = code.split('_');
  return `${ACTION_NAMES[a]} · ${FAMILY_NAMES[f]}`;
};

// Eight reasoning operations in four families (Table 1). `dist` is HTML.
export const FAMILIES = [
  {
    key: 'causal', name: 'Causal dynamics', color: '#2453c4',
    ops: [
      { name: 'Forward dynamics', dist: "P(s′ | s, a)", asks: 'What will the scene look like after the action?' },
      { name: 'Inverse dynamics', dist: "P(a | s, s′)", asks: 'Which action caused the change?' },
    ],
  },
  {
    key: 'cf', name: 'Counterfactual reasoning', color: '#8a4fbf',
    ops: [
      { name: 'Counterfactual removal', dist: "P(s | a, s′)", asks: 'What would the scene look like if the action had not happened?' },
      { name: 'Counterfactual substitution', dist: "P(s′<sub>a<sub>alt</sub></sub> | a, s′, a<sub>alt</sub>)", asks: 'What would the outcome be under a different action?' },
    ],
  },
  {
    key: 'physical', name: 'Physical modeling', color: '#c2660a',
    ops: [
      { name: 'Outcome prediction', dist: "P(s′ | s, a<sub>exo</sub>)", asks: 'How will a passive physical event end?' },
      { name: 'Cued prediction', dist: "P(s′ | s, a<sub>q</sub>)", asks: 'How will the event end, given a cue naming the physical principle?' },
    ],
  },
  {
    key: 'temporal', name: 'Temporal coherence', color: '#0f8a6a',
    ops: [
      { name: 'Temporal ordering', dist: "P(<b>s</b> | <b>s̃</b>, a)", asks: 'In what order did these states occur?' },
      { name: 'Temporal adjacency', dist: "P(s<sub>−</sub>, s<sub>+</sub> | s<sub>ref</sub>, <b>s̃</b>, a)", asks: 'Which states come right before and after a reference state?' },
    ],
  },
];

export const SPLITS = [
  { label: 'Training', n: '22,728' },
  { label: 'Validation', n: '2,508' },
  { label: 'In-distribution test', n: '6,228' },
  { label: 'Held-out-scene test', n: '3,496' },
  { label: 'State-perturbation test', n: '1,116' },
];

// Table: frontier MLLMs on the in-distribution and state-perturbation test sets.
export const DEFICIT_COLS = ['Overall', 'Exo', 'Perc', 'Insp', 'Navi', 'Mani', 'Fwd', 'Inv', 'Rmv', 'Sub', 'Otm', 'Cue', 'Ord', 'Adj', 'Geo', 'App'];
export const DEFICIT_ROWS = [
  { model: 'Human', v: [92.3, 92.8, 92.8, 92.6, 90.6, 92.8, 92.8, 92.8, 91.1, 92.2, 93.3, 91.1, 92.8, 91.7, 97.3, 98.7] },
  { model: 'GPT-5.4', v: [65.8, 62.4, 61.2, 58.3, 68.8, 81.2, 83.8, 81.7, 64.5, 76.0, 81.9, 85.8, 57.1, 27.0, 62.7, 95.5] },
  { model: 'Intern-S1-Pro', v: [63.2, 56.2, 52.8, 53.7, 70.1, 87.1, 77.6, 77.5, 66.7, 73.3, 61.5, 69.1, 63.4, 26.5, 33.3, 79.2] },
  { model: 'Qwen2.5-VL-72B', v: [58.9, 53.7, 47.7, 47.8, 66.4, 83.4, 74.7, 74.7, 54.8, 72.0, 59.4, 76.0, 49.4, 28.0, 38.5, 83.0] },
  { model: 'Gemma-4-31B', v: [57.8, 50.8, 49.4, 53.1, 61.2, 74.3, 76.3, 76.6, 63.6, 64.5, 64.9, 70.5, 30.8, 25.3, 59.0, 95.5] },
];

// Best controlled-subset gain (percentage points over the base model) for all 26 external benchmarks.
// The first 22 involve visual transitions; the last 4 are static perception and general video QA.
export const TRANSFER = [
  { b: 'SAT', d: 27.3, s: 'perc_causal' },
  { b: 'ActionEQA', d: 12.5, s: 'perc_causal' },
  { b: 'TemporalBench-long', d: 11.7, s: 'mani_cf' },
  { b: 'InPhyRe', d: 10.6, s: 'insp_cf' },
  { b: 'Robo2VLM', d: 8.9, s: 'insp_cf' },
  { b: 'WorldPrediction', d: 8.1, s: 'mani_causal' },
  { b: 'DSI-Bench', d: 6.0, s: 'perc_causal' },
  { b: 'MindCube', d: 5.9, s: 'perc_temporal' },
  { b: 'CLEVRER', d: 5.1, s: 'insp_cf' },
  { b: 'WM-ABench', d: 4.6, s: 'mani_cf' },
  { b: 'MVP', d: 4.5, s: 'perc_causal' },
  { b: 'ERQA', d: 4.5, s: 'mani_causal' },
  { b: 'SpatialViz', d: 4.5, s: 'navi_temporal' },
  { b: 'ViewSpatial', d: 4.3, s: 'mani_cf' },
  { b: 'PaiBench', d: 3.5, s: 'insp_causal' },
  { b: 'CV-Bench', d: 3.5, s: 'insp_causal' },
  { b: 'Cosmos', d: 3.3, s: 'insp_causal' },
  { b: 'BLINK', d: 3.3, s: 'exo_physical' },
  { b: 'TOMATO', d: 3.1, s: 'insp_temporal' },
  { b: 'TVBench', d: 2.8, s: 'perc_causal' },
  { b: 'BlackSwan', d: 2.5, s: 'mani_causal' },
  { b: 'TempCompass', d: 2.4, s: 'mani_causal' },
  { b: '3DSRBench', d: 1.4, s: 'navi_causal', static: true },
  { b: 'EgoTaskQA', d: 1.1, s: 'exo_physical', static: true },
  { b: 'PerceptionTest', d: 0.8, s: 'perc_causal', static: true },
  { b: 'CoreCognition', d: -1.0, s: 'exo_physical', static: true },
];

// WOVEN in-distribution gains after training on each controlled subset (Table: woven-train).
export const WOVEN_TRAIN_COLS = ['Exo', 'Perc', 'Insp', 'Navi', 'Mani'];
export const WOVEN_TRAIN = [
  { s: 'perc_causal', overall: 22.9, v: [5.1, 33.0, 13.4, 26.9, 39.8], adj: 0.2 },
  { s: 'insp_causal', overall: 25.3, v: [6.8, 8.9, 39.9, 27.2, 37.7], adj: 0.9 },
  { s: 'navi_causal', overall: 21.6, v: [7.6, 10.1, 12.7, 30.0, 50.9], adj: 4.9 },
  { s: 'mani_causal', overall: 19.9, v: [8.2, 3.9, 5.7, 26.2, 61.4], adj: 2.3 },
  { s: 'insp_cf', overall: 25.1, v: [6.6, 7.3, 38.5, 24.8, 42.7], adj: 1.3 },
  { s: 'mani_cf', overall: 21.3, v: [10.6, 5.2, 5.5, 27.2, 64.2], adj: 2.9 },
  { s: 'exo_physical', overall: 9.4, v: [27.4, -1.2, 5.7, 6.7, 9.6], adj: -1.5 },
  { s: 'perc_temporal', overall: 6.6, v: [8.4, 10.9, 4.9, 8.0, 1.3], adj: 29.9 },
  { s: 'insp_temporal', overall: 6.1, v: [9.2, 6.4, 3.4, 11.2, 1.2], adj: 33.1 },
  { s: 'navi_temporal', overall: 6.9, v: [8.1, 12.2, 4.0, 8.6, 2.9], adj: 32.0 },
  { s: 'exo_temporal', overall: 6.6, v: [8.4, 7.1, 5.5, 10.1, 2.3], adj: 30.6 },
];
// Dose-response across the 11 controlled subsets: WOVEN in-distribution gain after SFT (points over the
// base model) and the mean gain over the external benchmarks' per-configuration tables (points). Pearson r = 0.86.
export const DOSE = [
  { s: 'perc_causal', w: 21.90, e: 3.12 },
  { s: 'perc_temporal', w: 5.91, e: 1.93 },
  { s: 'insp_causal', w: 23.59, e: 2.82 },
  { s: 'insp_cf', w: 24.37, e: 2.95 },
  { s: 'insp_temporal', w: 5.65, e: 0.28 },
  { s: 'navi_causal', w: 20.18, e: 1.67 },
  { s: 'navi_temporal', w: 5.49, e: 0.85 },
  { s: 'mani_causal', w: 19.03, e: 2.39 },
  { s: 'mani_cf', w: 20.25, e: 3.28 },
  { s: 'exo_physical', w: 8.25, e: 1.12 },
  { s: 'exo_temporal', w: 5.81, e: 0.92 },
];

export const TRAINED_COL: Record<string, number> = { exo: 0, perc: 1, insp: 2, navi: 3, mani: 4 };

// Robustness: gain on the state-perturbation test set after training on each subset.
export const ROBUSTNESS = [
  { s: 'perc_causal', d: 1.7 },
  { s: 'insp_causal', d: 3.0 },
  { s: 'navi_causal', d: 13.6 },
  { s: 'mani_causal', d: 23.2 },
  { s: 'exo_physical', d: 29.9 },
];

// Prospective test of the recipe on held-out benchmarks (Qwen2.5-VL-3B-Instruct, 8 seeds per mixture).
export const PROSPECTIVE = [
  { comp: 'Temporal-heavy', item: '(1)', set: 'Agent-action questions', d: 3.5, lo: 2.03, hi: 4.92, p: '0.0002' },
  { comp: 'Uniform', item: '(1)', set: 'Agent-action questions', d: 1.5, lo: 0.18, hi: 2.81, p: '0.03' },
  { comp: 'Camera-heavy', item: '(1)', set: 'Camera-motion questions', d: 0.6, lo: 0.02, hi: 1.14, p: '0.04' },
  { comp: 'Exogenous-heavy', item: '(3)', set: 'Agent-action questions', d: 4.7, lo: 3.19, hi: 6.17, p: '0.0002' },
  { comp: 'Exogenous-heavy', item: '(3)', set: 'Passive-physics questions', d: -0.5, lo: -1.05, hi: -0.02, p: '0.04' },
];

// Transfer by domain: Qwen2.5-VL-3B-Instruct before training (base) and after training on the best
// controlled subset for that benchmark (best = larger of SFT and GRPO); d = the paper's gain row.
export const DOMAINS = [
  { key: 'spatial', name: 'Spatial', items: [
    { b: 'SAT', base: 37.3, best: 64.7, d: 27.3 },
    { b: 'DSI-Bench', base: 34.9, best: 40.9, d: 6.0 },
    { b: 'MindCube', base: 37.2, best: 43.1, d: 5.9 },
    { b: 'SpatialViz', base: 27.7, best: 32.2, d: 4.5 },
    { b: 'ViewSpatial', base: 35.3, best: 39.6, d: 4.3 },
    { b: 'CV-Bench', base: 69.3, best: 72.9, d: 3.5 },
    { b: 'BLINK', base: 46.2, best: 49.5, d: 3.3 },
  ] },
  { key: 'embodied', name: 'Embodied', items: [
    { b: 'ActionEQA', base: 43.4, best: 55.9, d: 12.5 },
    { b: 'Robo2VLM', base: 33.5, best: 42.4, d: 8.9 },
    { b: 'WorldPrediction', base: 34.8, best: 42.9, d: 8.1 },
    { b: 'ERQA', base: 33.8, best: 38.3, d: 4.5 },
    { b: 'PaiBench', base: 48.3, best: 51.8, d: 3.5 },
    { b: 'Cosmos', base: 76.7, best: 80.0, d: 3.3 },
  ] },
  { key: 'physical', name: 'Physical', items: [
    { b: 'InPhyRe', base: 22.0, best: 32.6, d: 10.6 },
    { b: 'CLEVRER', base: 58.2, best: 63.3, d: 5.1 },
    { b: 'WM-ABench', base: 31.0, best: 35.6, d: 4.6 },
    { b: 'MVP', base: 24.4, best: 29.0, d: 4.5 },
    { b: 'BlackSwan', base: 61.8, best: 64.3, d: 2.5 },
  ] },
  { key: 'temporal', name: 'Temporal', items: [
    { b: 'TemporalBench-L', base: 16.6, best: 28.2, d: 11.7 },
    { b: 'TOMATO', base: 31.6, best: 34.7, d: 3.1 },
    { b: 'TVBench', base: 36.5, best: 39.4, d: 2.8 },
    { b: 'TempCompass', base: 67.7, best: 70.2, d: 2.4 },
  ] },
];
