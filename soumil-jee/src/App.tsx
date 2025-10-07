import React, { useMemo } from "react";
<button onClick={onClose} className="text-neutral-400 hover:text-white">Close</button>
</div>
<div className="mt-4 space-y-4 max-h-[60vh] overflow-auto pr-1">
{questions.map((q: any, idx: number) => (
<div key={idx} className="rounded-xl border border-neutral-800 p-4">
<div className="font-medium">Q{idx + 1}. {q.text}</div>
<div className="mt-2 grid grid-cols-1 gap-2">
{q.options.map((op: any) => (
<label key={op.key} className={`cursor-pointer rounded-lg border ${((answers[idx] || '') === op.key) ? 'border-sky-500' : 'border-neutral-800'} p-2 flex items-center gap-2`}>
<input type="radio" name={`q-${idx}`} value={op.key} checked={(answers[idx] || '') === op.key} onChange={() => setAnswers((prev) => ({ ...prev, [idx]: op.key }))} />
<span className="text-sm">{op.key}. {op.label}</span>
</label>
))}
</div>
</div>
))}
</div>
<div className="mt-4 flex items-center justify-between">
<p className="text-sm text-neutral-400">Score ≥ 60% to unlock this chapter's SD Questions.</p>
<button onClick={handleSubmit} className="px-4 py-2 rounded-xl bg-white text-neutral-900 font-medium">Submit Test</button>
</div>
</div>
</div>
);
}


function makeMockQuestions(chapter: any) {
const base = [
`A block of mass m on a smooth surface is pulled by a constant force F. Find acceleration (symbolic).`,
`A particle moves in a circle of radius R with angular speed ω. What is its centripetal acceleration?`,
`Two capacitors C and 2C in series across V. Charge on each is?`,
`A body of mass m is dropped from height h. Ignore air resistance. Speed just before hitting?`,
`A light ray incident at small angle θ on a plane mirror. Find deviation.`,
];
const opts = [
{ key: 'A', label: 'F/m' },
{ key: 'B', label: 'm/F' },
{ key: 'C', label: 'F·m' },
{ key: 'D', label: '0' },
];
const qs = [
{ text: base[0], options: opts, correct: 'A' },
{ text: base[1], options: [ { key: 'A', label: 'ω²R' }, { key: 'B', label: 'ωR' }, { key: 'C', label: 'R/ω' }, { key: 'D', label: '1/ω²R' }, ], correct: 'A' },
{ text: base[2], options: [ { key: 'A', label: '2CV' }, { key: 'B', label: 'CV/2' }, { key: 'C', label: '2C·V/3' }, { key: 'D', label: 'Same Q on both: Q = 2C·V/3' }, ], correct: 'B' },
{ text: base[3], options: [ { key: 'A', label: '√(2gh)' }, { key: 'B', label: 'gh' }, { key: 'C', label: '2gh' }, { key: 'D', label: 'h/2g' }, ], correct: 'A' },
{ text: base[4], options: [ { key: 'A', label: '2θ' }, { key: 'B', label: 'θ' }, { key: 'C', label: '90°' }, { key: 'D', label: '0' }, ], correct: 'A' },
];
return qs.sort(() => Math.random() - 0.5);
}


function DevTestPanel() {
const tests = [
{ name: 'No progress', input: { solved: false, testScore: 0 }, expect: 0 },
{ name: 'Solved only', input: { solved: true, testScore: 0 }, expect: 49 },
{ name: 'Solved + pass threshold', input: { solved: true, testScore: 60 }, expect: 79 },
{ name: 'Solved + perfect', input: { solved: true, testScore: 100 }, expect: 99 },
{ name: 'Test only (should be half)', input: { solved: false, testScore: 100 }, expect: 50 },
{ name: 'Solved + 30%', input: { solved: true, testScore: 30 }, expect: 64 },
{ name: 'Solved + 1% rounds to 50', input: { solved: true, testScore: 1 }, expect: 50 }
];
const results = tests.map((t) => { const got = computeChapterProgress((t as any).input.solved, (t as any).input.testScore); return { ...t, got, pass: got === (t as any).expect }; });
return (
<section className="mx-auto max-w-3xl rounded-2xl border border-neutral-800 bg-neutral-900/60 p-4">
<h4 className="font-semibold">Dev Tests — Progress Calculator & Students Helped</h4>
<ul className="mt-2 text-sm">
{results.map((r, idx) => (
<li key={idx} className={r.pass ? 'text-emerald-400' : 'text-rose-400'}>
{r.pass ? 'PASS' : 'FAIL'} — {r.name}: expected {(r as any).expect}, got {(r as any).got}
</li>
))}
</ul>
<div className="mt-4 text-sm text-neutral-300">
<button className="px-3 py-1 rounded-lg bg-white text-neutral-900" onClick={() => { const before = readStudentsHelped(); const after = bumpStudentsHelped(1); alert(`Students helped incremented: ${before} → ${after}`); }}>
Simulate Helped Click (dev)
</button>
</div>
</section>
);
}
