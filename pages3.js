// ============================================================
// CLASSES PAGE
// ============================================================
function ClassesPage() {
  const [activeId, setActiveId] = useState(CLASSES[0].id);
  // allocated points per class, kept separately so switching classes doesn't lose progress
  const [allocations, setAllocations] = useState({});

  const activeClass = CLASSES.find(c => c.id === activeId);
  const allocated = allocations[activeId] || {};
  const setAllocatedForActive = (updater) => {
    setAllocations(prev => {
      const current = prev[activeId] || {};
      const next = typeof updater === "function" ? updater(current) : updater;
      return { ...prev, [activeId]: next };
    });
  };

  return (
    <div>
      <PageHead
        eyebrow="Chapter VI — Class"
        title="Classes & Skill Trees"
        lede="Choose your defining identity. Every realm breakthrough unlocks another feature, so long as you meet its requirements. Click a node to spend a point, then hover it to add another rank or refund the point."
      />

      <div className="class-picker">
        {CLASSES.map(c => (
          <button
            key={c.id}
            className={`class-tile ${activeId === c.id ? "active" : ""}`}
            style={{"--tile-color": c.color}}
            onClick={() => setActiveId(c.id)}
          >
            <h4>{c.name}</h4>
            <div className="req">{c.requirement}</div>
            <p>{c.flavor}</p>
          </button>
        ))}
      </div>

      <div className="divider-orn"><span>{activeClass.name.toUpperCase()} — STARTING KIT</span></div>

      {(activeClass.equipment.length > 0 || activeClass.proficiencies.length > 0) && (
        <div className="card-grid two" style={{marginBottom: 36}}>
          {activeClass.equipment.length > 0 && (
            <div className="card">
              <h4 style={{fontFamily: "var(--font-display)", fontSize: 16, margin: "0 0 10px", color: "var(--gold-bright)"}}>Starting Equipment</h4>
              <ul style={{margin: 0, paddingLeft: 18, fontSize: 13, color: "var(--parchment-dim)", lineHeight: 1.8}}>
                {activeClass.equipment.map((e, i) => <li key={i}>{e}</li>)}
              </ul>
            </div>
          )}
          {activeClass.proficiencies.length > 0 && (
            <div className="card">
              <h4 style={{fontFamily: "var(--font-display)", fontSize: 16, margin: "0 0 10px", color: "var(--gold-bright)"}}>Proficiencies</h4>
              <ul style={{margin: 0, paddingLeft: 18, fontSize: 13, color: "var(--parchment-dim)", lineHeight: 1.8}}>
                {activeClass.proficiencies.map((e, i) => <li key={i}>{e}</li>)}
              </ul>
              {activeClass.note && (
                <p style={{fontSize: 12.5, color: "var(--jade-bright)", marginTop: 10, marginBottom: 0}}>{activeClass.note}</p>
              )}
            </div>
          )}
        </div>
      )}

      <div className="divider-orn"><span>SKILL TREE</span></div>

      <SkillTree classData={activeClass} allocated={allocated} setAllocated={setAllocatedForActive} />
    </div>
  );
}

// ============================================================
// CULTIVATION PAGE
// ============================================================
function CultivationPage() {
  const [showXp, setShowXp] = useState(true);
  return (
    <div>
      <PageHead
        eyebrow="Chapter VII — Cultivation Ranks & Levelling"
        title="Cultivation Ranks"
        lede="Fifteen levels from Third Rate to Void Realm. The GM may use XP thresholds or simple Milestone advancement."
      />
      <div style={{marginBottom: 20}}>
        <button className={`choice-pill ${showXp ? "selected" : ""}`} onClick={() => setShowXp(true)} style={{marginRight: 8}}>XP Thresholds</button>
        <button className={`choice-pill ${!showXp ? "selected" : ""}`} onClick={() => setShowXp(false)}>Hide XP (Milestone)</button>
      </div>
      <div className="rank-table">
        {RANKS.map(r => (
          <div className="rank-row" key={r.level}>
            <div className="lv">Lv {r.level}</div>
            <div className="name">
              {r.name}
              <span className="desc-sm">{r.desc}</span>
            </div>
            {showXp ? <div className="xp">{r.xp !== null ? `${r.xp.toLocaleString()} XP` : "—"}</div> : <div className="xp" />}
            <div className="age">{r.age}</div>
            <div className="unlock-line"><span className="k">Unlocks</span>{r.unlock}</div>
          </div>
        ))}
      </div>

      <div className="divider-orn"><span>MYTHICAL TREASURES — NATURE REALM REQUIREMENT</span></div>
      <p style={{fontSize: 13.5, color: "var(--parchment-dim)", lineHeight: 1.7, maxWidth: 720, marginBottom: 24}}>
        All five must be refined together into a single elixir and consumed at Grandmaster Peak cultivation.
        The body must survive it — most who attempt it die. The Immortal Peach tree blooms once every millennium,
        and the Four Divine Beasts are not resources but living myths: getting their blood requires finding them,
        earning their recognition, or defeating them. Each is a campaign-defining arc.
      </p>
      <div className="card-grid">
        {MYTHICAL_TREASURES.map(t => (
          <div className="card" key={t.name}>
            <div style={{fontSize: 10.5, color: "var(--seal-bright)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 6, fontWeight: 700}}>{t.dir}</div>
            <h4 style={{fontFamily: "var(--font-display)", fontSize: 16, margin: "0 0 6px", color: "var(--parchment)"}}>{t.name}</h4>
            <p style={{fontSize: 12.5, color: "var(--parchment-dim)", margin: 0}}>{t.essence}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ============================================================
// MASTERY PAGE
// ============================================================
function MasteryPage() {
  return (
    <div>
      <PageHead
        eyebrow="Chapter IX — Proficiency, Mastery & Stars"
        title="Mastery & Skills"
        lede="Every level you gain 1 Star (Qi or Martial Art, hard cap 10 per track), 1 Mastery rank advance, features at thresholds, and an ASI every realm breakthrough."
      />

      <div className="section-title"><span className="roman">9.1</span> Qi Stars</div>
      <div className="card-grid two" style={{marginBottom: 40}}>
        {[
          ["1 Star", "Movement is unaffected by difficult terrain."],
          ["2 Star", "+10 feet of movement."],
          ["3 Star", "+2 attack roll."],
          ["4 Star", "+20 feet movement. May move through occupied spaces as difficult terrain."],
          ["5 Star", "Reduce all Qi costs of Martial Arts by 1. Recover 1 Qi every turn."],
          ["6 Star", "Attacks can bypass Posture. On hit, choose: deal normal damage or inflict Internal Injury."],
          ["7 Star", "Remove one Internal Injury on short rest."],
          ["8 Star", "+30 ft movement. Movement unaffected by difficult terrain."],
          ["9 Star", "Once per combat, treat a failed Martial Arts roll as a success."],
          ["10 Star", "Once per long rest, when you spend Qi, choose: reduce incoming Wounds by 2, recover all lost Posture, or move up to your speed as a free action."],
        ].map(([t, d]) => (
          <div className="card" key={t}>
            <div style={{fontFamily: "var(--font-mono)", color: "var(--gold-bright)", fontSize: 12.5, marginBottom: 6}}>{t}</div>
            <p style={{fontSize: 13, color: "var(--parchment-dim)", margin: 0, lineHeight: 1.6}}>{d}</p>
          </div>
        ))}
      </div>

      <div className="section-title"><span className="roman">9.2</span> Mastery Ranks</div>
      <div className="outcome-table" style={{marginBottom: 40}}>
        {MASTERY_RANKS.map(m => (
          <div className="outcome-row" key={m.name}>
            <div className="res">{m.name} <span style={{color: "var(--jade-bright)", fontFamily: "var(--font-mono)", fontSize: 12}}>+{m.bonus}</span></div>
            <div className="eff">{m.desc}</div>
          </div>
        ))}
      </div>

      <div className="section-title"><span className="roman">9.3</span> Skill List</div>
      <div className="card-grid" style={{marginBottom: 40}}>
        {SKILLS.map(s => (
          <div className="card" key={s.name}>
            <h4 style={{fontFamily: "var(--font-display)", fontSize: 15.5, margin: "0 0 6px", color: "var(--parchment)"}}>{s.name}</h4>
            <p style={{fontSize: 12.5, color: "var(--parchment-dim)", margin: 0, lineHeight: 1.55}}>{s.desc}</p>
          </div>
        ))}
      </div>

      <div className="section-title"><span className="roman">9.4</span> Weapon Proficiency Categories</div>
      <div className="card-grid two">
        {WEAPON_CATEGORIES.map(w => (
          <div className="card" key={w.name}>
            <h4 style={{fontFamily: "var(--font-display)", fontSize: 15.5, margin: "0 0 6px", color: "var(--parchment)"}}>{w.name}</h4>
            <p style={{fontSize: 12.5, color: "var(--parchment-dim)", margin: 0, lineHeight: 1.55}}>{w.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ============================================================
// COMBAT PAGE
// ============================================================
function CombatPage() {
  return (
    <div>
      <PageHead
        eyebrow="Chapter X — Martial Arts & Techniques"
        title="Combat Rules"
        lede="How techniques work, what the dice decide, and the cost of attacking more than once a turn."
      />

      <div className="section-title"><span className="roman">10.1</span> Technique Roll</div>
      <div className="card" style={{marginBottom: 30}}>
        <div className="formula" style={{fontSize: 14, marginBottom: 0}}>{TECHNIQUE_RULES.roll}</div>
      </div>

      <div className="outcome-table" style={{marginBottom: 40}}>
        {TECHNIQUE_RULES.outcomes.map(o => (
          <div className="outcome-row" key={o.result}>
            <div className="res">{o.result}</div>
            <div className="eff">{o.effect}</div>
          </div>
        ))}
      </div>

      <div className="section-title"><span className="roman">10.2</span> Multiple Attack Penalty (MAP)</div>
      <div className="card" style={{borderColor: "var(--seal)", background: "rgba(155,34,38,0.06)"}}>
        <p style={{fontSize: 14, color: "var(--parchment-dim)", lineHeight: 1.7, margin: 0}}>{TECHNIQUE_RULES.map}</p>
      </div>

      <div className="divider-orn"><span>HOW TECHNIQUES WORK</span></div>
      <p style={{fontSize: 14, color: "var(--parchment-dim)", lineHeight: 1.7, maxWidth: 720}}>
        Every Martial Art has forms unlocked by star investment. Higher forms require higher Posture to execute
        safely. Using a technique below its Posture requirement results in success, but your Posture breaks
        completely for the entire round.
      </p>
    </div>
  );
}
