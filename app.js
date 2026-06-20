const { useState, useEffect, useMemo, useRef, useCallback } = React;

// ============================================================
// ICONS — minimal hand-rolled SVG icon set themed to wuxia concepts
// ============================================================
function Icon({ name, className, style }) {
  const paths = {
    qi: <path d="M12 2c2 3-1 4-1 7a3 3 0 106 0c0-1-.5-2-1-2.5 2 0 4 2.5 4 6a8 8 0 11-16 0c0-4 3-7 4-9 1-1.5 2.5-1.5 4 0-1.5 1-2 2.5-2 4.5" />,
    fist: <path d="M7 11V7a2 2 0 014 0v3M11 11V6a2 2 0 014 0v5M15 11V7a2 2 0 014 0v5c0 4-2 8-7 8s-7-3-7-7v-2a2 2 0 014 0" />,
    blade: <path d="M4 20L18 6m0 0l2-2m-2 2l-3-1 1-3M9 15l-3 3 1 2 2 1 3-3" />,
    dagger: <path d="M12 2v13m0 0l-3 3 1.5 1.5L12 18l1.5 1.5L15 18l-3-3z" />,
    needle: <path d="M3 21l5-5m0 0L19 5l1 1L9 17M8 16l1-3 3-1" />,
    lotus: <path d="M12 22c0-4 0-9 0-12M12 10c-3-1-5-4-4-7 3 1 4 4 4 7zM12 10c3-1 5-4 4-7-3 1-4 4-4 7zM8 16c-3 0-5-2-6-5 3-1 6 0 7 3zM16 16c3 0 5-2 6-5-3-1-6 0-7 3z" />,
    flame: <path d="M12 2c1 3-3 5-3 9a3 3 0 006 0c0-1.5-1-2-1-3 2 1 3 4 3 6a5 5 0 11-10 0c0-5 3-8 5-12z" />,
    moon: <path d="M20 14.5A8.5 8.5 0 119.5 4a7 7 0 1010.5 10.5z" />,
    skull: <path d="M12 2a8 8 0 00-8 8c0 3 1.5 5 3 6.5V19a1 1 0 001 1h1v1a1 1 0 001 1h4a1 1 0 001-1v-1h1a1 1 0 001-1v-2.5c1.5-1.5 3-3.5 3-6.5a8 8 0 00-8-8zM9 11h.01M15 11h.01" />,
    eye: <path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7-10-7-10-7z M12 15a3 3 0 100-6 3 3 0 000 6z" />,
    shield: <path d="M12 2l8 3v6c0 5-3.5 8.5-8 11-4.5-2.5-8-6-8-11V5z" />,
    pill: <path d="M5 12a5 5 0 015-5h4a5 5 0 010 10H10a5 5 0 01-5-5z M9 7l6 10" />,
    scroll: <path d="M5 4h11a3 3 0 013 3v1H8M5 4a2 2 0 00-2 2v1h13M5 20h11a3 3 0 003-3v-1H8M5 20a2 2 0 01-2-2v-1h13" />,
    bolt: <path d="M13 2L4 14h6l-1 8 9-12h-6z" />,
    smoke: <path d="M12 21c-2 0-3-1.5-3-3s1.5-2 1.5-3.5S9 12 9 10a3 3 0 116 0c0 1.5-1.5 2-1.5 4.5S15 18 15 18a3 3 0 01-3 3z" />,
    star: <path d="M12 2l3 6.5 7 .8-5.2 4.9 1.3 7-6.1-3.5-6.1 3.5 1.3-7L2 9.3l7-.8z" />,
    wave: <path d="M2 12c2-3 4-3 6 0s4 3 6 0 4-3 6 0 M2 18c2-3 4-3 6 0s4 3 6 0 4-3 6 0" />,
    spiral: <path d="M12 12a4 4 0 11-4-4 6 6 0 016 6 8 8 0 01-8 8" />,
    book: <path d="M4 19.5A2.5 2.5 0 016.5 17H20M4 4.5A2.5 2.5 0 016.5 2H20v18.5a2.5 2.5 0 00-2.5 2.5H4z" />,
    sword: <path d="M14.5 2.5l7 7-9 9-3-1-1-3z M9.5 14.5L4 20l-1.5-.5L2 18l5.5-5.5" />,
    compass: <path d="M12 2a10 10 0 100 20 10 10 0 000-20z M15 9l-2 6-6 2 2-6z" />,
    feather: <path d="M20 4S10 6 7 13s-1 9-1 9 6-2 9-7 5-11 5-11z M14 10L6 18" />,
  };
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}>
      {paths[name] || paths.star}
    </svg>
  );
}

// ============================================================
// NAVIGATION CONFIG
// ============================================================
const NAV = [
  { group: "Begin", items: [
    { id: "home", label: "The Jianghu", icon: "compass" },
    { id: "builder", label: "Forge a Character", icon: "scroll" },
  ]},
  { group: "Chapter I–II", items: [
    { id: "world", label: "World & Factions", icon: "lotus" },
    { id: "stats", label: "The Six Stats", icon: "fist" },
  ]},
  { group: "Chapter III", items: [
    { id: "derived", label: "Derived Values", icon: "shield" },
    { id: "injuries", label: "Internal Injuries", icon: "skull" },
  ]},
  { group: "Chapter IV–V", items: [
    { id: "races", label: "Races", icon: "spiral" },
    { id: "backgrounds", label: "Backgrounds", icon: "book" },
  ]},
  { group: "Chapter VI", items: [
    { id: "classes", label: "Classes & Skill Trees", icon: "sword" },
  ]},
  { group: "Chapter VII–X", items: [
    { id: "cultivation", label: "Cultivation Ranks", icon: "moon" },
    { id: "mastery", label: "Mastery & Skills", icon: "star" },
    { id: "combat", label: "Combat Rules", icon: "blade" },
  ]},
];

const ALL_PAGE_IDS = NAV.flatMap(g => g.items.map(i => i.id));

// ============================================================
// ROOT APP
// ============================================================
function App() {
  const [page, setPage] = useState("home");
  const [navOpen, setNavOpen] = useState(false);

  useEffect(() => { window.scrollTo(0, 0); }, [page]);

  const navigate = useCallback((id) => {
    setPage(id);
    setNavOpen(false);
  }, []);

  return (
    <div className="app-shell">
      <div className={`scrim ${navOpen ? "show" : ""}`} onClick={() => setNavOpen(false)} />

      <aside className={`sidebar ${navOpen ? "open" : ""}`}>
        <div className="sidebar-brand">
          <span className="mark">武林 · Wu Lin Awakening</span>
          <span className="sub">Compendium &amp; Character Forge</span>
        </div>
        <nav className="sidebar-nav">
          {NAV.map(group => (
            <div className="nav-group" key={group.group}>
              <div className="nav-group-label">{group.group}</div>
              {group.items.map(item => (
                <button
                  key={item.id}
                  className={`nav-item ${page === item.id ? "active" : ""}`}
                  onClick={() => navigate(item.id)}
                >
                  <span className="dot" />
                  {item.label}
                </button>
              ))}
            </div>
          ))}
        </nav>
        <div className="sidebar-foot">A wuxia TTRPG of Posture, Wounds, and the climb from Third Rate to Void Realm.</div>
      </aside>

      <div>
        <div className="mobile-bar">
          <span className="mark">武林 · Wu Lin Awakening</span>
          <button onClick={() => setNavOpen(true)}>☰ Menu</button>
        </div>
        <main className="main">
          <Page id={page} navigate={navigate} />
        </main>
      </div>
    </div>
  );
}

function Page({ id, navigate }) {
  switch (id) {
    case "home": return <HomePage navigate={navigate} />;
    case "world": return <WorldPage />;
    case "stats": return <StatsPage />;
    case "derived": return <DerivedPage />;
    case "injuries": return <InjuriesPage />;
    case "races": return <RacesPage />;
    case "backgrounds": return <BackgroundsPage />;
    case "classes": return <ClassesPage />;
    case "cultivation": return <CultivationPage />;
    case "mastery": return <MasteryPage />;
    case "combat": return <CombatPage />;
    case "builder": return <BuilderPage />;
    default: return <HomePage navigate={navigate} />;
  }
}
