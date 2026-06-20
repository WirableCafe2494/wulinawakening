// ============================================================
// SKILL TREE ENGINE — Diablo 4 style node graph
// ============================================================

// Layout constants
const NODE_GAP_X = 130;
const NODE_GAP_Y = 136;
const PAD_X = 80;
const PAD_Y = 60;

// Map class id -> icon per node (heuristic by name keywords), falls back to class default
function nodeIcon(classId, node) {
  const n = node.name.toLowerCase();
  if (n.includes("sneak") || n.includes("blow") || n.includes("executioner")) return "dagger";
  if (n.includes("smoke") || n.includes("vanish") || n.includes("shadow")) return "smoke";
  if (n.includes("cunning") || n.includes("swash") || n.includes("cheat") || n.includes("opportunist") || n.includes("underhand")) return "feather";
  if (n.includes("flow")) return "fist";
  if (n.includes("strike") || n.includes("reckless") || n.includes("unstoppable") || n.includes("bloodlust")) return "blade";
  if (n.includes("diamond") || n.includes("unbreakable") || n.includes("footwork") || n.includes("multi") || n.includes("swift") || n.includes("action surge")) return "shield";
  if (n.includes("convergen") || n.includes("axiom") || n.includes("soul") || n.includes("focus")) return "lotus";
  if (n.includes("sturdy")) return "shield";
  if (n.includes("acupuncture") || n.includes("death point")) return "needle";
  if (n.includes("poison")) return "skull";
  if (n.includes("pill") || n.includes("dantian")) return "pill";
  if (n.includes("stimulation") || n.includes("surge") || n.includes("overdrive")) return "bolt";
  if (n.includes("flying needle")) return "needle";
  if (n.includes("moon")) return "moon";
  if (n.includes("jing")) return "wave";
  if (n.includes("shen")) return "eye";
  if (n.includes("forbidden") || n.includes("yama")) return "skull";
  if (n.includes("tao")) return "bolt";
  if (n.includes("qi sensing") || n.includes("meridian") || n.includes("pressure") || n.includes("prescience") || n.includes("iron body")) return "qi";
  return "star";
}

// Layout: group by tier (row), assign x by column with centering per row,
// but we want a real tree feel, so we compute x from `col` field directly with consistent spacing,
// and tier directly maps to y. This preserves the branching shape authored in data.js.
function layoutTree(tree) {
  const cols = tree.map(n => n.col);
  const tiers = tree.map(n => n.tier);
  const minCol = Math.min(...cols);
  const maxTier = Math.max(...tiers);
  const positioned = tree.map(n => ({
    ...n,
    x: PAD_X + (n.col - minCol) * NODE_GAP_X,
    y: PAD_Y + n.tier * NODE_GAP_Y
  }));
  const width = PAD_X * 2 + (Math.max(...cols) - minCol) * NODE_GAP_X;
  const height = PAD_Y * 2 + maxTier * NODE_GAP_Y;
  return { nodes: positioned, width, height };
}

function SkillTree({ classData, allocated, setAllocated }) {
  const { nodes, width, height } = useMemo(() => layoutTree(classData.tree), [classData]);
  const [hover, setHover] = useState(null); // {node, x, y}
  const containerRef = useRef(null);

  const byId = useMemo(() => {
    const m = {};
    nodes.forEach(n => { m[n.id] = n; });
    return m;
  }, [nodes]);

  const isUnlocked = (id) => (allocated[id] || 0) > 0;

  const prereqsMet = (node) => {
    if (!node.prereq || node.prereq.length === 0) return true;
    return node.prereq.every(pid => isUnlocked(pid));
  };

  const nodeState = (node) => {
    if (isUnlocked(node.id)) return "unlocked";
    if (prereqsMet(node)) return "available";
    return "locked";
  };

  const totalSpent = Object.values(allocated).reduce((a, b) => a + b, 0);
  const POINT_CAP = 40;
  const pointsLeft = POINT_CAP - totalSpent;

  const handleAllocate = (node) => {
    const state = nodeState(node);
    const current = allocated[node.id] || 0;
    const REPEAT_CAP = 2;
    if (state === "unlocked") {
      if (node.repeatable && current < REPEAT_CAP) {
        if (pointsLeft <= 0) return;
        setAllocated(prev => ({ ...prev, [node.id]: current + 1 }));
      }
      // non-repeatable unlocked nodes: clicking again does nothing (use tooltip refund button)
      return;
    }
    if (state !== "available") return;
    if (pointsLeft <= 0) return;
    setAllocated(prev => ({ ...prev, [node.id]: current + 1 }));
  };

  const resetTree = () => setAllocated({});

  const refundNode = (node) => {
    const dependents = classData.tree.filter(n => (n.prereq || []).includes(node.id) && isUnlocked(n.id));
    if (dependents.length > 0) return;
    const current = allocated[node.id] || 0;
    if (current <= 1) {
      setAllocated(prev => {
        const next = { ...prev };
        delete next[node.id];
        return next;
      });
    } else {
      setAllocated(prev => ({ ...prev, [node.id]: current - 1 }));
    }
  };

  const showTooltip = (e, node) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setHover({ node, x: rect.left + rect.width / 2, y: rect.top });
  };

  return (
    <div className="tree-panel" style={{"--tree-color": classData.color}}>
      <div className="tree-toolbar">
        <div className="class-meta">
          <h3>{classData.name}</h3>
          <div className="req-line">{classData.requirement}</div>
        </div>
        <div style={{display: "flex", gap: 12, alignItems: "center"}}>
          <div className="points-tracker">
            <span className="pip-count">{pointsLeft}</span>
            <span className="pip-label">Points Left</span>
          </div>
          <button className="tree-reset-btn" onClick={resetTree}>Reset Tree</button>
        </div>
      </div>

      <div className="tree-scroll" ref={containerRef}>
        <div className="tree-svg-layer" style={{ width, height }}>
          <svg width={width} height={height} style={{position: "absolute", top: 0, left: 0}}>
            {nodes.map(node =>
              (node.prereq || []).map(pid => {
                const p = byId[pid];
                if (!p) return null;
                const isLit = isUnlocked(p.id) && isUnlocked(node.id);
                return (
                  <line
                    key={`${pid}-${node.id}`}
                    x1={p.x} y1={p.y} x2={node.x} y2={node.y}
                    className={`tree-edge ${isLit ? "lit" : ""}`}
                  />
                );
              })
            )}
          </svg>
          {nodes.map(node => {
            const state = nodeState(node);
            const rank = allocated[node.id] || 0;
            return (
              <div
                className={`tnode is-${state}`}
                key={node.id}
                style={{ left: node.x, top: node.y, "--node-color": classData.color }}
              >
                <div
                  className={`tnode-circle ${state}`}
                  onClick={() => handleAllocate(node)}
                  onMouseEnter={(e) => showTooltip(e, node)}
                  onMouseLeave={() => setHover(null)}
                  onFocus={(e) => showTooltip(e, node)}
                  onBlur={() => setHover(null)}
                  tabIndex={0}
                  role="button"
                  aria-label={`${node.name} — ${state}`}
                >
                  <Icon name={nodeIcon(classData.id, node)} className="tnode-icon" />
                  {rank > 0 && <span className="tnode-rank">{node.repeatable ? `x${rank}` : "✓"}</span>}
                </div>
                <div className="tnode-label">{node.name}</div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="tree-legend">
        <div className="litem"><span className="lswatch" style={{borderColor: "var(--ash-dim)", background: "var(--ink-raised)"}} /> Locked</div>
        <div className="litem"><span className="lswatch" style={{borderColor: "var(--parchment-dim)", background: "var(--ink-raised)"}} /> Available</div>
        <div className="litem"><span className="lswatch" style={{borderColor: classData.color, background: classData.color}} /> Unlocked</div>
      </div>

      {hover && (
        <div
          className="node-tooltip"
          style={{
            left: Math.min(Math.max(hover.x - 140, 12), window.innerWidth - 292),
            top: hover.y - 14,
            transform: "translateY(-100%)",
            pointerEvents: "auto"
          }}
          onMouseEnter={() => setHover(hover)}
          onMouseLeave={() => setHover(null)}
        >
          <h5>{hover.node.name}</h5>
          <div className="prereq">Requires: {hover.node.prereqLabel}</div>
          <p>{hover.node.desc}</p>
          {(() => {
            const state = nodeState(hover.node);
            const rank = allocated[hover.node.id] || 0;
            if (state === "unlocked") {
              const canAddMore = hover.node.repeatable && rank < 2;
              return (
                <>
                  <div className="status-line done">✓ Unlocked{hover.node.repeatable ? ` (rank ${rank}/2)` : ""}</div>
                  <div style={{display: "flex", gap: 8, marginTop: 8}}>
                    {canAddMore && (
                      <button className="btn" style={{padding: "5px 10px", fontSize: 11.5}} onClick={() => handleAllocate(hover.node)}>
                        Add rank
                      </button>
                    )}
                    <button className="btn" style={{padding: "5px 10px", fontSize: 11.5}} onClick={() => refundNode(hover.node)}>
                      Refund point
                    </button>
                  </div>
                </>
              );
            }
            if (state === "available") return <div className="status-line can">Click the node to unlock</div>;
            return <div className="status-line cannot">Prerequisites not met</div>;
          })()}
        </div>
      )}
    </div>
  );
}
