// ============================================================
// RACES PAGE
// ============================================================
function RacesPage() {
  return (
    <div>
      <PageHead
        eyebrow="Chapter IV — Races"
        title="Races"
        lede="Your race shapes your Qi from birth — what flows through you before you ever touch a cultivation manual."
      />
      <div className="card-grid two">
        {RACES.map(r => (
          <div className="entry-card" key={r.id}>
            <h4>{r.name}</h4>
            <p className="blurb">{r.blurb}</p>
            <div className="row"><span className="k">Bonus</span>{r.bonus}</div>
            {r.penalty && <div className="row"><span className="k" style={{color: "var(--seal-bright)"}}>Penalty</span>{r.penalty}</div>}
            <div className="row"><span className="k">Trait</span>{r.extra}</div>
            {r.variant && (
              <div className="feature-box">
                <div className="fname">{r.variant.name}</div>
                <p>{r.variant.desc}</p>
                <div className="tag-row" style={{marginTop: 8, marginBottom: 0}}>
                  {r.variant.elements.map(e => <span className="tag" key={e}>{e}</span>)}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ============================================================
// BACKGROUNDS PAGE
// ============================================================
function BackgroundsPage() {
  const [filter, setFilter] = useState("");
  const filtered = BACKGROUNDS.filter(b =>
    b.name.toLowerCase().includes(filter.toLowerCase()) ||
    b.skills.some(s => s.toLowerCase().includes(filter.toLowerCase()))
  );

  return (
    <div>
      <PageHead
        eyebrow="Chapter V — Backgrounds"
        title="Backgrounds"
        lede="Your life before cultivation. Each grants two skill proficiencies, a tool proficiency, starting equipment, and a unique passive feature."
      />
      <input
        type="text"
        placeholder="Search backgrounds or skills..."
        value={filter}
        onChange={e => setFilter(e.target.value)}
        style={{
          width: "100%", maxWidth: 360, padding: "10px 14px", marginBottom: 28,
          background: "var(--ink-card)", border: "1px solid var(--ink-border)",
          borderRadius: "var(--radius)", color: "var(--parchment)", fontSize: 13.5
        }}
      />
      <div className="card-grid two">
        {filtered.map(b => (
          <div className="entry-card" key={b.id}>
            <h4>{b.name}</h4>
            <div className="tag-row">
              {b.skills.map(s => <span className="tag" key={s}>{s}</span>)}
            </div>
            <div className="row"><span className="k">Pick</span>{b.pick} of the above</div>
            <div className="row"><span className="k">Tool</span>{b.tool}</div>
            <div className="row"><span className="k">Equipment</span>{b.equipment}</div>
            <div className="feature-box">
              <div className="fname">{b.featureName}</div>
              <p>{b.feature}</p>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <p style={{color: "var(--ash)", fontSize: 13.5}}>No backgrounds match "{filter}".</p>
        )}
      </div>
    </div>
  );
}
