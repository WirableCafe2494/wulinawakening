// ============================================================
// HOME PAGE
// ============================================================
function HomePage({ navigate }) {
  const navCards = [
    { id: "world", num: "I", title: "World & Factions", desc: "The Orthodox, the Unorthodox, the Heavenly Demonic Cult, and the wanderers who serve none of them." },
    { id: "stats", num: "II", title: "The Six Stats", desc: "Strength, Dexterity, Constitution, Intelligence, Wisdom, Charisma — and what each one buys you." },
    { id: "derived", num: "III", title: "Derived Values", desc: "Posture, Wounds, Stance Score, and Qi Pool — the numbers a fight is actually made of." },
    { id: "races", num: "IV", title: "Races", desc: "Human, Yaoren, Tianren, Huli Jing, and the Death Touched." },
    { id: "backgrounds", num: "V", title: "Backgrounds", desc: "Seventeen lives before cultivation, each with its own feature and starting gear." },
    { id: "classes", num: "VI", title: "Classes & Skill Trees", desc: "Assassin, Martial Artist, Monk, Pharmacist, Shaman — full interactive skill trees." },
    { id: "cultivation", num: "VII", title: "Cultivation Ranks", desc: "Fifteen levels from Third Rate to Void Realm, with XP thresholds and unlocks." },
    { id: "mastery", num: "IX", title: "Mastery & Skills", desc: "Stars, mastery ranks, the full skill list, and weapon proficiency categories." },
    { id: "combat", num: "X", title: "Combat Rules", desc: "Technique rolls, critical outcomes, and the Multiple Attack Penalty." },
  ];

  return (
    <div>
      <div className="hero">
        <div className="hero-mark">A Wuxia Tabletop Roleplaying Game</div>
        <h1>The gap between a disciple<br />and a <span className="accent">force of nature</span><br />is one realm.</h1>
        <p className="desc">
          Wu Lin Awakening combines the cultivation progression of Nano Machine and Soul Land
          with the Posture-based combat of Sekiro. Cultivation determines what you can do.
          Combat skill determines how you win the fight.
        </p>
        <div className="hero-actions">
          <button className="btn primary" onClick={() => navigate("builder")}>
            <Icon name="scroll" style={{width:16,height:16}} /> Forge a Character
          </button>
          <button className="btn" onClick={() => navigate("classes")}>
            <Icon name="sword" style={{width:16,height:16}} /> Browse Skill Trees
          </button>
        </div>

        <div className="hero-philosophy">
          <div className="pcell">
            <div className="ptag">Cultivation</div>
            <h3>What you can do</h3>
            <p>A higher realm cultivator is genuinely more powerful — wider Qi pools, denser meridians, techniques simply unavailable to those below them.</p>
          </div>
          <div className="pcell">
            <div className="ptag">Combat skill</div>
            <h3>How you win the fight</h3>
            <p>A Transcendent prodigy can break a Grandmaster's Posture through superior technique and timing — even if the Wound exchange would be fatal.</p>
          </div>
        </div>
      </div>

      <div className="section-title"><span className="roman">Compendium</span> Find your chapter</div>
      <div className="home-grid-nav">
        {navCards.map(c => (
          <button key={c.id} className="home-nav-card" onClick={() => navigate(c.id)}>
            <div className="num">{c.num}</div>
            <h4>{c.title}</h4>
            <p>{c.desc}</p>
          </button>
        ))}
      </div>
    </div>
  );
}

// ============================================================
// PAGE HEADER helper
// ============================================================
function PageHead({ eyebrow, title, lede }) {
  return (
    <>
      <div className="page-eyebrow">{eyebrow}</div>
      <h1 className="page-title">{title}</h1>
      {lede && <p className="page-lede">{lede}</p>}
    </>
  );
}

// ============================================================
// WORLD PAGE
// ============================================================
function WorldPage() {
  return (
    <div>
      <PageHead
        eyebrow="Chapter I — Introduction & The World"
        title="The Jianghu"
        lede="The martial world, where sects hold power, Qi shapes reality, and four factions pull the Jianghu in four directions."
      />
      <div className="card-grid two">
        {FACTIONS.map(f => (
          <div className="faction-card" key={f.id} style={{"--faction-color": f.color}}>
            <div className="sub">{f.subtitle}</div>
            <h3>{f.name}</h3>
            <p>{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ============================================================
// STATS PAGE
// ============================================================
function StatsPage() {
  return (
    <div>
      <PageHead
        eyebrow="Chapter II — The Six Stats"
        title="The Six Stats"
        lede="Stats use the standard array (15, 14, 13, 12, 10, 8) or 4d6 dropping the lowest die. Modifier = (Score − 10) ÷ 2, always rounded down."
      />
      <div className="card-grid">
        {STATS.map(s => (
          <div className="stat-card" key={s.id}>
            <div className="abbr">{s.abbr}</div>
            <h4>{s.name}</h4>
            <p>{s.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ============================================================
// DERIVED VALUES PAGE
// ============================================================
function DerivedPage() {
  return (
    <div>
      <PageHead
        eyebrow="Chapter III — Derived Values"
        title="Derived Values"
        lede="Everything a fight is made of: how much you can absorb, how much you can take, how hard you are to hit, and what fuels your techniques."
      />
      <div className="card-grid two">
        {DERIVED_VALUES.map(d => (
          <div className="card derived-card" key={d.name}>
            <h4>{d.name}</h4>
            <span className="formula">{d.formula}</span>
            <p>{d.desc}</p>
          </div>
        ))}
      </div>

      <div className="divider-orn"><span>POSTURE IN PRACTICE</span></div>
      <div className="card-grid two">
        <div className="card">
          <h4 style={{fontFamily: "var(--font-display)", fontSize: 16, margin: "0 0 8px", color: "var(--parchment)"}}>Passive Recovery</h4>
          <p style={{fontSize: 13.5, color: "var(--parchment-dim)", lineHeight: 1.6, margin:0}}>DEX mod Posture per turn, automatic at the start of your turn. Minimum of 1.</p>
        </div>
        <div className="card">
          <h4 style={{fontFamily: "var(--font-display)", fontSize: 16, margin: "0 0 8px", color: "var(--parchment)"}}>Steady Action</h4>
          <p style={{fontSize: 13.5, color: "var(--parchment-dim)", lineHeight: 1.6, margin:0}}>Costs 1 action. Recover STR mod additional Posture. Minimum of 1.</p>
        </div>
      </div>
      <div className="divider" />
      <div className="card" style={{borderColor: "var(--seal)", background: "rgba(155,34,38,0.06)"}}>
        <h4 style={{fontFamily: "var(--font-display)", fontSize: 17, margin: "0 0 8px", color: "var(--seal-bright)"}}>When Posture hits 0</h4>
        <p style={{fontSize: 14, color: "var(--parchment-dim)", lineHeight: 1.7, margin:0}}>
          You are completely vulnerable. No more deflecting. No more reactions. No more blocking.
          Every hit deals Wounds directly and there is nothing you can do about it.
        </p>
      </div>

      <div className="divider-orn"><span>AT MAX WOUNDS</span></div>
      <div className="card-grid two">
        <div className="card">
          <h4 style={{fontFamily: "var(--font-display)", fontSize: 16, margin: "0 0 8px", color: "var(--parchment)"}}>Fall</h4>
          <p style={{fontSize: 13.5, color: "var(--parchment-dim)", lineHeight: 1.6, margin:0}}>Unconscious and dying. Allies have 3 turns to stabilize you.</p>
        </div>
        <div className="card">
          <h4 style={{fontFamily: "var(--font-display)", fontSize: 16, margin: "0 0 8px", color: "var(--parchment)"}}>Final Stand</h4>
          <p style={{fontSize: 13.5, color: "var(--parchment-dim)", lineHeight: 1.6, margin:0}}>See Chapter X — Combat Rules.</p>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// INTERNAL INJURIES PAGE
// ============================================================
function InjuriesPage() {
  const colors = ["#C9A24B", "#C9A24B", "#D88B3D", "#9B2226", "#5A1F22"];
  return (
    <div>
      <PageHead
        eyebrow="Chapter III — Internal Injuries"
        title="Internal Injuries"
        lede="Bodily injuries and damaged internal organs that disrupt the flow of Qi, making martial techniques progressively harder to use."
      />
      <div className="injury-ladder">
        {INTERNAL_INJURIES.map((inj, i) => (
          <div className="injury-step" key={inj.level} style={{"--injury-color": colors[i]}}>
            <div className="lvl-badge">{inj.level}</div>
            <div className="iname">{inj.name}</div>
            <div className="ieffect">{inj.effect}</div>
            <div className="irecovery">{inj.recovery}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
