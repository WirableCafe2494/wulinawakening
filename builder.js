// ============================================================
// CHARACTER BUILDER
// ============================================================
const STANDARD_ARRAY = [15, 14, 13, 12, 10, 8];

function modOf(score) { return Math.floor((score - 10) / 2); }
function fmtMod(m) { return m >= 0 ? `+${m}` : `${m}`; }

function emptyCharacter() {
  return {
    name: "",
    raceId: null,
    qiElement: null,
    statAssign: { str: null, dex: null, con: null, int: null, wis: null, cha: null },
    backgroundId: null,
    backgroundSkills: [],
    classId: null,
  };
}

const STEPS = [
  { id: "race", label: "Race" },
  { id: "stats", label: "Stats" },
  { id: "background", label: "Background" },
  { id: "class", label: "Class" },
  { id: "sheet", label: "Character Sheet" },
];

function BuilderPage() {
  const [char, setChar] = useState(emptyCharacter());
  const [step, setStep] = useState(0);

  const update = (patch) => setChar(prev => ({ ...prev, ...patch }));

  const race = RACES.find(r => r.id === char.raceId);
  const background = BACKGROUNDS.find(b => b.id === char.backgroundId);
  const charClass = CLASSES.find(c => c.id === char.classId);

  // Racial bonuses applied to base stats
  const racialBonus = useMemo(() => {
    const bonus = { str: 0, dex: 0, con: 0, int: 0, wis: 0, cha: 0 };
    if (!race) return bonus;
    if (race.id === "human") {
      if (char.qiElement) {
        // Qi body variant: no flat stat bonus
      } else {
        Object.keys(bonus).forEach(k => bonus[k] += 1);
      }
    } else if (race.id === "death_touched") {
      Object.keys(bonus).forEach(k => bonus[k] += 1);
    }
    // yaoren, tianren, huli_jing require manual stat-choice bonuses; simplified to display note in UI
    return bonus;
  }, [race, char.qiElement]);

  const finalScores = useMemo(() => {
    const out = {};
    STATS.forEach(s => {
      const base = char.statAssign[s.id] || 0;
      out[s.id] = base + (racialBonus[s.id] || 0);
    });
    return out;
  }, [char.statAssign, racialBonus]);

  const usedValues = Object.values(char.statAssign).filter(v => v !== null);
  const availableValues = STANDARD_ARRAY.filter(v => {
    const usedCount = usedValues.filter(u => u === v).length;
    const totalCount = STANDARD_ARRAY.filter(x => x === v).length;
    return usedCount < totalCount;
  });

  const canProceed = [
    !!char.raceId,
    Object.values(char.statAssign).every(v => v !== null),
    !!char.backgroundId && char.backgroundSkills.length === (background?.pick || 2),
    !!char.classId,
    true
  ];

  return (
    <div>
      <PageHead
        eyebrow="Chapter VIII — Character Creation"
        title="Forge a Character"
        lede="Follow the steps in order: race, stats, background, class. Your sheet builds itself as you go."
      />

      <div className="builder-steps">
        {STEPS.map((s, i) => (
          <button
            key={s.id}
            className={`builder-step-pill ${step === i ? "active" : ""} ${i < step ? "done" : ""}`}
            onClick={() => setStep(i)}
          >
            <span className="stepnum">{i < step ? "✓" : i + 1}</span>
            {s.label}
          </button>
        ))}
      </div>

      {step === 0 && <StepRace char={char} update={update} />}
      {step === 1 && <StepStats char={char} update={update} availableValues={availableValues} finalScores={finalScores} racialBonus={racialBonus} race={race} />}
      {step === 2 && <StepBackground char={char} update={update} background={background} />}
      {step === 3 && <StepClass char={char} update={update} finalScores={finalScores} />}
      {step === 4 && <StepSheet char={char} update={update} race={race} background={background} charClass={charClass} finalScores={finalScores} />}

      <div className="builder-summary">
        <div className="sumline">
          {race ? <span>Race: <b>{race.name}</b></span> : <span style={{color: "var(--ash)"}}>Choose a race to begin</span>}
          {background && <span> &nbsp;·&nbsp; Background: <b>{background.name}</b></span>}
          {charClass && <span> &nbsp;·&nbsp; Class: <b>{charClass.name}</b></span>}
        </div>
        <div style={{display: "flex", gap: 10}}>
          <button className="btn" disabled={step === 0} onClick={() => setStep(s => Math.max(0, s - 1))}>Back</button>
          <button
            className="btn primary"
            disabled={!canProceed[step] || step === STEPS.length - 1}
            onClick={() => setStep(s => Math.min(STEPS.length - 1, s + 1))}
          >
            {step === STEPS.length - 2 ? "View Sheet" : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
}

function StepRace({ char, update }) {
  return (
    <div>
      <div className="section-title"><span className="roman">Step 1</span> Choose your race</div>
      <div className="card-grid two">
        {RACES.map(r => (
          <button
            key={r.id}
            className="entry-card"
            style={{
              textAlign: "left", width: "100%", cursor: "pointer",
              borderColor: char.raceId === r.id ? "var(--gold)" : "var(--ink-border)",
              boxShadow: char.raceId === r.id ? "0 0 0 1px var(--gold)" : "none"
            }}
            onClick={() => update({ raceId: r.id, qiElement: null })}
          >
            <h4>{r.name}</h4>
            <p className="blurb">{r.blurb}</p>
            <div className="row"><span className="k">Bonus</span>{r.bonus}</div>
            {r.penalty && <div className="row"><span className="k" style={{color: "var(--seal-bright)"}}>Penalty</span>{r.penalty}</div>}
            <div className="row"><span className="k">Trait</span>{r.extra}</div>
          </button>
        ))}
      </div>
      {char.raceId === "human" && (
        <div className="card" style={{marginTop: 20}}>
          <h4 style={{fontFamily: "var(--font-display)", fontSize: 16, margin: "0 0 10px", color: "var(--gold-bright)"}}>Qi Body Variant</h4>
          <p style={{fontSize: 13, color: "var(--parchment-dim)", marginBottom: 14}}>Instead of +1 to all stats, choose one elemental Qi affinity.</p>
          <div className="choice-pill-row">
            <button className={`choice-pill ${!char.qiElement ? "selected" : ""}`} onClick={() => update({ qiElement: null })}>Standard (+1 all stats)</button>
            {RACES[0].variant.elements.map(el => (
              <button key={el} className={`choice-pill ${char.qiElement === el ? "selected" : ""}`} onClick={() => update({ qiElement: el })}>{el}</button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function StepStats({ char, update, availableValues, finalScores, racialBonus, race }) {
  const assign = (statId, value) => {
    update({ statAssign: { ...char.statAssign, [statId]: value === "" ? null : Number(value) } });
  };
  return (
    <div>
      <div className="section-title"><span className="roman">Step 2</span> Assign stats</div>
      <p style={{fontSize: 13, color: "var(--parchment-dim)", marginBottom: 22, maxWidth: 640}}>
        Standard Array: 15, 14, 13, 12, 10, 8. Assign one value to each stat. Racial bonuses are applied automatically where flat.
      </p>
      <div className="stat-array-grid">
        {STATS.map(s => {
          const base = char.statAssign[s.id];
          const bonus = racialBonus[s.id] || 0;
          const final = finalScores[s.id];
          const options = base !== null ? [base, ...availableValues] : availableValues;
          const uniqueOptions = [...new Set(options)].sort((a, b) => b - a);
          return (
            <div className="stat-assign-card" key={s.id}>
              <div className="abbr">{s.abbr}</div>
              <select value={base ?? ""} onChange={e => assign(s.id, e.target.value)}>
                <option value="">—</option>
                {uniqueOptions.map(v => <option key={v} value={v}>{v}</option>)}
              </select>
              <div className="mod">
                {base !== null ? (
                  <>Final: <b>{final}</b> ({fmtMod(modOf(final))}){bonus > 0 && <> · +{bonus} racial</>}</>
                ) : "unassigned"}
              </div>
            </div>
          );
        })}
      </div>
      {race && (race.id === "yaoren" || race.id === "tianren") && (
        <p style={{fontSize: 12.5, color: "var(--gold-bright)", marginTop: 16}}>
          {race.name} grants +2 to one stat and +1 to another of your choice — apply these manually on top of your assigned array.
        </p>
      )}
      {race && race.id === "huli_jing" && (
        <p style={{fontSize: 12.5, color: "var(--gold-bright)", marginTop: 16}}>
          Huli Jing: apply +2 Charisma, +1 Dexterity, −1 Strength, −1 Constitution manually on top of your assigned array.
        </p>
      )}
    </div>
  );
}

function StepBackground({ char, update, background }) {
  const toggleSkill = (skill) => {
    const pick = background?.pick || 2;
    const has = char.backgroundSkills.includes(skill);
    if (has) {
      update({ backgroundSkills: char.backgroundSkills.filter(s => s !== skill) });
    } else if (char.backgroundSkills.length < pick) {
      update({ backgroundSkills: [...char.backgroundSkills, skill] });
    }
  };
  return (
    <div>
      <div className="section-title"><span className="roman">Step 3</span> Choose your background</div>
      <div className="card-grid two" style={{marginBottom: 28}}>
        {BACKGROUNDS.map(b => (
          <button
            key={b.id}
            className="entry-card"
            style={{
              textAlign: "left", width: "100%", cursor: "pointer",
              borderColor: char.backgroundId === b.id ? "var(--gold)" : "var(--ink-border)",
              boxShadow: char.backgroundId === b.id ? "0 0 0 1px var(--gold)" : "none"
            }}
            onClick={() => update({ backgroundId: b.id, backgroundSkills: [] })}
          >
            <h4>{b.name}</h4>
            <div className="feature-box" style={{marginTop: 0}}>
              <div className="fname">{b.featureName}</div>
              <p>{b.feature}</p>
            </div>
          </button>
        ))}
      </div>

      {background && (
        <div className="card">
          <h4 style={{fontFamily: "var(--font-display)", fontSize: 16, margin: "0 0 10px", color: "var(--gold-bright)"}}>
            Choose {background.pick} skills ({char.backgroundSkills.length}/{background.pick} selected)
          </h4>
          <div className="choice-pill-row">
            {background.skills.map(s => (
              <button
                key={s}
                className={`choice-pill ${char.backgroundSkills.includes(s) ? "selected" : ""}`}
                disabled={!char.backgroundSkills.includes(s) && char.backgroundSkills.length >= background.pick}
                onClick={() => toggleSkill(s)}
              >
                {s}
              </button>
            ))}
          </div>
          <div className="row" style={{marginTop: 14}}><span className="k">Tool</span>{background.tool}</div>
          <div className="row"><span className="k">Equipment</span>{background.equipment}</div>
        </div>
      )}
    </div>
  );
}

function StepClass({ char, update, finalScores }) {
  return (
    <div>
      <div className="section-title"><span className="roman">Step 4</span> Choose your class</div>
      <div className="class-picker">
        {CLASSES.filter(c => c.id !== "general").map(c => (
          <button
            key={c.id}
            className={`class-tile ${char.classId === c.id ? "active" : ""}`}
            style={{"--tile-color": c.color}}
            onClick={() => update({ classId: c.id })}
          >
            <h4>{c.name}</h4>
            <div className="req">{c.requirement}</div>
            <p>{c.flavor}</p>
          </button>
        ))}
      </div>
      <p style={{fontSize: 12.5, color: "var(--ash)", marginTop: 18}}>
        Every character also has access to the <b style={{color: "var(--gold-bright)"}}>General</b> skill tree
        regardless of class — see Chapter VI in the Classes &amp; Skill Trees page.
      </p>
    </div>
  );
}

function StepSheet({ char, race, background, charClass, finalScores }) {
  const str = finalScores.str || 10, dex = finalScores.dex || 10, con = finalScores.con || 10;
  const strMod = modOf(str), dexMod = modOf(dex), conMod = modOf(con);
  const posture = 8 + strMod + dexMod + 1; // assume level 1, half rounded up = 1
  const wounds = conMod + 3;
  const stance = 10 + dexMod + 1;
  const qiPool = str + dex + con;

  return (
    <div>
      <div className="section-title"><span className="roman">Step 5</span> Character sheet</div>
      <div className="card-grid two" style={{marginBottom: 24}}>
        <div className="sheet-block">
          <h4>Identity</h4>
          <div className="row"><span className="k">Race</span>{race ? race.name : "—"}{char.qiElement ? ` (${char.qiElement} Qi Body)` : ""}</div>
          <div className="row"><span className="k">Background</span>{background ? background.name : "—"}</div>
          <div className="row"><span className="k">Class</span>{charClass ? charClass.name : "—"}</div>
          <div className="row"><span className="k">Level</span>1 — Third Rate</div>
        </div>
        <div className="sheet-block">
          <h4>Stats</h4>
          {STATS.map(s => (
            <div className="row" key={s.id}>
              <span className="k">{s.abbr}</span>{finalScores[s.id] || "—"} ({fmtMod(modOf(finalScores[s.id] || 10))})
            </div>
          ))}
        </div>
      </div>
      <div className="card-grid">
        <div className="derived-card card"><h4>Posture</h4><span className="formula">{posture}</span><p>8 + STR mod + DEX mod + half level (round up)</p></div>
        <div className="derived-card card"><h4>Wounds</h4><span className="formula">{wounds}</span><p>CON mod + 3</p></div>
        <div className="derived-card card"><h4>Stance Score</h4><span className="formula">{stance}</span><p>10 + DEX mod + Realm Level</p></div>
        <div className="derived-card card"><h4>Qi Pool</h4><span className="formula">{qiPool}</span><p>STR + DEX + CON scores</p></div>
      </div>
      {background && (
        <div className="sheet-block" style={{marginTop: 20}}>
          <h4>Background Feature — {background.featureName}</h4>
          <p style={{fontSize: 13, color: "var(--parchment-dim)", lineHeight: 1.6, margin: 0}}>{background.feature}</p>
        </div>
      )}
      {charClass && (
        <div className="sheet-block" style={{marginTop: 20}}>
          <h4>Starting Equipment — {charClass.name}</h4>
          <ul style={{margin: 0, paddingLeft: 18, fontSize: 13, color: "var(--parchment-dim)", lineHeight: 1.8}}>
            {charClass.equipment.map((e, i) => <li key={i}>{e}</li>)}
          </ul>
        </div>
      )}
    </div>
  );
}
