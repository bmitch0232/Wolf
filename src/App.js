import { useState, useEffect, useCallback } from "react";

// ─── Styles ────────────────────────────────────────────────────────────────────
const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Mono:wght@400;500&family=DM+Sans:wght@300;400;500&display=swap');

  :root {
    --green:  #1a3a2a;
    --green2: #2d5a3d;
    --gold:   #c9a84c;
    --gold2:  #e8c96e;
    --cream:  #f5f0e8;
    --sand:   #e8dcc8;
    --dark:   #0d1f17;
    --text:   #1a1a12;
    --muted:  #6b7c6a;
    --white:  #fffef9;
    --red:    #b84040;
    --shadow: 0 4px 24px rgba(0,0,0,0.18);
  }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: var(--dark); font-family: 'DM Sans', sans-serif; color: var(--text); }

  .app-bg {
    min-height: 100vh;
    background: radial-gradient(ellipse at top, #1a3a2a 0%, #0d1f17 60%);
    background-attachment: fixed;
  }

  /* Header */
  .header {
    background: linear-gradient(135deg, var(--dark) 60%, var(--green2));
    border-bottom: 2px solid var(--gold);
    padding: 18px 24px 14px;
    display: flex; align-items: center; justify-content: space-between;
    position: sticky; top: 0; z-index: 100;
    box-shadow: 0 4px 20px rgba(0,0,0,0.4);
  }
  .header-title {
    font-family: 'Playfair Display', serif;
    font-size: 1.7rem; color: var(--gold2);
    letter-spacing: .03em;
  }
  .header-sub {
    font-size: .75rem; color: var(--gold);
    font-family: 'DM Mono', monospace; letter-spacing:.12em; margin-top:2px;
  }

  /* Nav */
  .nav { display: flex; gap: 6px; flex-wrap: wrap; }
  .nav-btn {
    background: transparent; border: 1px solid var(--gold);
    color: var(--gold); font-family: 'DM Mono', monospace;
    font-size: .7rem; letter-spacing:.1em; padding: 6px 12px;
    cursor: pointer; border-radius: 3px; transition: all .2s;
    text-transform: uppercase;
  }
  .nav-btn:hover, .nav-btn.active { background: var(--gold); color: var(--dark); }

  /* Main */
  .main { max-width: 860px; margin: 0 auto; padding: 24px 16px 60px; }

  /* Cards */
  .card {
    background: var(--cream);
    border-radius: 8px; border: 1px solid var(--sand);
    box-shadow: var(--shadow); padding: 24px; margin-bottom: 20px;
  }
  .card-title {
    font-family: 'Playfair Display', serif;
    font-size: 1.25rem; color: var(--green); margin-bottom: 16px;
    border-bottom: 1px solid var(--sand); padding-bottom: 10px;
  }

  /* Buttons */
  .btn {
    display: inline-flex; align-items: center; gap: 6px;
    padding: 9px 18px; border-radius: 4px; cursor: pointer;
    font-family: 'DM Mono', monospace; font-size: .78rem;
    letter-spacing: .08em; border: none; transition: all .18s;
    text-transform: uppercase; font-weight: 500;
  }
  .btn-gold { background: var(--gold); color: var(--dark); }
  .btn-gold:hover { background: var(--gold2); }
  .btn-green { background: var(--green2); color: var(--gold2); }
  .btn-green:hover { background: var(--green); }
  .btn-red { background: var(--red); color: var(--white); }
  .btn-red:hover { background: #8b3333; }
  .btn-outline { background: transparent; border: 1px solid var(--green2); color: var(--green2); }
  .btn-outline:hover { background: var(--green2); color: var(--white); }
  .btn-sm { padding: 5px 10px; font-size: .68rem; }

  /* Inputs */
  input, select {
    background: var(--white); border: 1.5px solid var(--sand);
    border-radius: 4px; padding: 8px 12px; font-size: .9rem;
    font-family: 'DM Sans', sans-serif; color: var(--text);
    outline: none; transition: border .2s; width: 100%;
  }
  input:focus, select:focus { border-color: var(--gold); }
  label {
    display: block; font-size: .75rem; color: var(--muted); margin-bottom: 4px;
    font-family: 'DM Mono', monospace; text-transform: uppercase; letter-spacing:.06em;
  }

  /* Form grid */
  .form-row { display: flex; gap: 12px; margin-bottom: 14px; flex-wrap: wrap; }
  .form-row .fg { flex: 1; min-width: 140px; }

  /* Chips */
  .chip-list { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 8px; }
  .chip {
    display: inline-flex; align-items: center; gap: 6px;
    background: var(--green2); color: var(--gold2);
    border-radius: 20px; padding: 4px 12px 4px 14px;
    font-size: .8rem; font-family: 'DM Mono', monospace;
  }
  .chip-x { cursor: pointer; color: var(--gold); font-size: .9rem; line-height:1; }
  .chip-x:hover { color: var(--red); }

  /* Round list rows */
  .round-row {
    display: flex; align-items: center; justify-content: space-between;
    padding: 12px 16px; background: var(--white); border-radius: 6px;
    border: 1px solid var(--sand); margin-bottom: 10px; cursor: pointer;
    transition: all .15s;
  }
  .round-row:hover { border-color: var(--gold); background: #fffdf5; }
  .round-meta { font-family: 'DM Mono', monospace; font-size: .72rem; color: var(--muted); }
  .round-name { font-family: 'Playfair Display', serif; font-size: 1rem; color: var(--green); }

  /* Scorecard table */
  .sc-table { width: 100%; border-collapse: collapse; table-layout: fixed; }
  .sc-table th {
    font-family: 'DM Mono', monospace; font-size: .7rem;
    letter-spacing: .07em; text-transform: uppercase;
    padding: 10px 6px; text-align: center; white-space: nowrap;
    border-bottom: 2px solid var(--gold);
  }
  .sc-table th.th-hole { background: var(--dark); color: var(--gold); width: 52px; }
  .sc-table th.th-player {
    background: var(--green2); color: var(--gold2);
    overflow: hidden; text-overflow: ellipsis;
  }
  .sc-table td {
    padding: 5px 4px; text-align: center;
    border-bottom: 1px solid var(--sand);
  }
  .sc-table tr:hover td { background: rgba(200,168,76,0.05); }
  .sc-table td.td-hole {
    font-family: 'DM Mono', monospace; font-weight: 600;
    color: var(--muted); background: var(--sand); font-size: .82rem;
  }
  .sc-table tr.total-row td {
    background: var(--green); color: var(--gold2);
    font-family: 'DM Mono', monospace; font-weight: 700;
    font-size: .88rem; border-top: 2px solid var(--gold);
    padding: 8px 6px;
  }
  .sc-table tr.total-row td.td-hole { background: var(--dark); color: var(--gold); }

  /* Points input */
  .pts-input {
    width: 100%; text-align: center;
    padding: 7px 2px; font-size: .9rem; font-weight: 500;
    font-family: 'DM Mono', monospace;
    background: var(--white); border: 1.5px solid #ddd; border-radius: 4px;
    color: var(--text); outline: none; transition: border .15s;
    -moz-appearance: textfield;
  }
  .pts-input::-webkit-inner-spin-button,
  .pts-input::-webkit-outer-spin-button { -webkit-appearance: none; }
  .pts-input:focus { border-color: var(--gold); background: #fffdf5; }

  /* Points badge */
  .pts-badge {
    display: inline-block; min-width: 40px;
    padding: 3px 8px; border-radius: 12px;
    font-family: 'DM Mono', monospace; font-size: .82rem; font-weight: 600;
  }
  .pts-pos { background: #d4edda; color: #1a5c2a; }
  .pts-neg { background: #f8d7da; color: #721c24; }
  .pts-zero { background: #e9ecef; color: #6c757d; }

  /* Leaderboard */
  .lb-row {
    display: flex; align-items: center; gap: 12px;
    padding: 11px 16px; background: var(--white);
    border-radius: 6px; border: 1px solid var(--sand); margin-bottom: 8px;
  }
  .lb-rank { font-family: 'Playfair Display', serif; font-size: 1.4rem; color: var(--gold); width: 36px; }
  .lb-name { flex: 1; font-weight: 500; font-size: .95rem; }
  .lb-pts { font-family: 'DM Mono', monospace; font-size: 1.05rem; font-weight: 700; }

  /* Empty state */
  .empty-state {
    text-align:center; color: #c9a84c; padding: 40px;
    font-family:'DM Mono',monospace; font-size:.8rem; opacity:.7;
  }
  .section-hint { font-size:.78rem; color:var(--muted); margin-bottom:14px; }
`;

// ─── Constants ─────────────────────────────────────────────────────────────────
const HOLES = Array.from({ length: 18 }, (_, i) => i + 1);
const STORAGE_KEY = "wolf-golf-tracker";

// ─── localStorage helpers (works in any browser, no server needed) ─────────────
function loadData() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : { players: [], rounds: [] };
  } catch {
    return { players: [], rounds: [] };
  }
}

function saveData(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.error("Could not save data:", e);
  }
}

// ─── Helpers ───────────────────────────────────────────────────────────────────
function ptsClass(n) {
  if (n > 0) return "pts-pos";
  if (n < 0) return "pts-neg";
  return "pts-zero";
}

function getRoundTotals(round) {
  const totals = {};
  round.playerIds.forEach(pid => { totals[pid] = 0; });
  HOLES.forEach(h => {
    const hole = round.holes[h];
    round.playerIds.forEach(pid => {
      const v = Number(hole.points[pid]);
      if (!isNaN(v) && hole.points[pid] !== "") totals[pid] += v;
    });
  });
  return totals;
}

// ─── App Component ─────────────────────────────────────────────────────────────
export default function App() {
  const [data, setData] = useState(() => loadData());
  const [view, setView] = useState("rounds");
  const [activeRoundId, setActiveRoundId] = useState(null);
  const [newPlayerName, setNewPlayerName] = useState("");
  const [newRound, setNewRound] = useState({
    name: "",
    date: new Date().toISOString().split("T")[0],
    playerIds: [],
  });
  const [showNewRound, setShowNewRound] = useState(false);

  // Persist to localStorage whenever data changes
  useEffect(() => {
    saveData(data);
  }, [data]);

  const activeRound = data.rounds.find(r => r.id === activeRoundId);

  // ── Players ──────────────────────────────────────────────────────────────────
  function addPlayer() {
    const name = newPlayerName.trim();
    if (!name || data.players.find(p => p.name.toLowerCase() === name.toLowerCase())) return;
    setData(prev => ({
      ...prev,
      players: [...prev.players, { id: crypto.randomUUID(), name }],
    }));
    setNewPlayerName("");
  }

  function removePlayer(id) {
    setData(prev => ({ ...prev, players: prev.players.filter(p => p.id !== id) }));
  }

  // ── Rounds ───────────────────────────────────────────────────────────────────
  function createRound() {
    if (!newRound.playerIds.length) return;
    const holes = {};
    HOLES.forEach(h => {
      holes[h] = { points: {} };
      newRound.playerIds.forEach(pid => { holes[h].points[pid] = ""; });
    });
    const round = {
      id: crypto.randomUUID(),
      name: newRound.name || `Round ${data.rounds.length + 1}`,
      date: newRound.date,
      playerIds: newRound.playerIds,
      holes,
      createdAt: Date.now(),
    };
    setData(prev => ({ ...prev, rounds: [...prev.rounds, round] }));
    setNewRound({ name: "", date: new Date().toISOString().split("T")[0], playerIds: [] });
    setShowNewRound(false);
    setActiveRoundId(round.id);
    setView("scoring");
  }

  function deleteRound(id) {
    if (!window.confirm("Delete this round?")) return;
    setData(prev => ({ ...prev, rounds: prev.rounds.filter(r => r.id !== id) }));
    if (activeRoundId === id) { setActiveRoundId(null); setView("rounds"); }
  }

  // ── Points entry ─────────────────────────────────────────────────────────────
  function setPoints(holeNum, playerId, val) {
    setData(prev => ({
      ...prev,
      rounds: prev.rounds.map(r => {
        if (r.id !== activeRoundId) return r;
        return {
          ...r,
          holes: {
            ...r.holes,
            [holeNum]: {
              ...r.holes[holeNum],
              points: { ...r.holes[holeNum].points, [playerId]: val },
            },
          },
        };
      }),
    }));
  }

  // ── Export round to CSV ───────────────────────────────────────────────────────
  function exportRoundCSV(round) {
    const playerName = pid => data.players.find(p => p.id === pid)?.name || pid;
    const totals = getRoundTotals(round);

    const headers = ["Hole", ...round.playerIds.map(playerName)];
    const rows = HOLES.map(h => {
      const hole = round.holes[h];
      return [h, ...round.playerIds.map(pid => hole.points[pid] ?? "")];
    });
    const totalRow = ["TOTAL", ...round.playerIds.map(pid => totals[pid])];

    const csv = [headers, ...rows, totalRow]
      .map(row => row.join(","))
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${round.name.replace(/\s+/g, "_")}_${round.date}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  // ─── Render ──────────────────────────────────────────────────────────────────
  return (
    <div className="app-bg">
      <style>{STYLES}</style>

      {/* Header */}
      <div className="header">
        <div>
          <div className="header-title">🐺 Wolf Golf</div>
          <div className="header-sub">Game Tracker</div>
        </div>
        <div className="nav">
          <button
            className={`nav-btn ${view === "rounds" ? "active" : ""}`}
            onClick={() => setView("rounds")}
          >
            Rounds
          </button>
          <button
            className={`nav-btn ${view === "players" ? "active" : ""}`}
            onClick={() => setView("players")}
          >
            Players
          </button>
          {activeRound && (
            <button
              className={`nav-btn ${view === "scoring" ? "active" : ""}`}
              onClick={() => setView("scoring")}
            >
              Scorecard
            </button>
          )}
        </div>
      </div>

      <div className="main">

        {/* ── PLAYERS ── */}
        {view === "players" && (
          <div className="card">
            <div className="card-title">Player Roster</div>
            <div className="form-row">
              <div className="fg">
                <label>Player Name</label>
                <input
                  value={newPlayerName}
                  onChange={e => setNewPlayerName(e.target.value)}
                  onKeyDown={e => e.key === "Enter" && addPlayer()}
                  placeholder="Enter name…"
                />
              </div>
              <div className="fg" style={{ display: "flex", alignItems: "flex-end" }}>
                <button className="btn btn-gold" onClick={addPlayer}>+ Add Player</button>
              </div>
            </div>
            <div className="chip-list">
              {data.players.length === 0 && (
                <span className="section-hint">No players yet. Add some above.</span>
              )}
              {data.players.map(p => (
                <span className="chip" key={p.id}>
                  {p.name}
                  <span className="chip-x" onClick={() => removePlayer(p.id)}>✕</span>
                </span>
              ))}
            </div>
          </div>
        )}

        {/* ── ROUNDS ── */}
        {view === "rounds" && (
          <>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <span style={{ color: "#c9a84c", fontFamily: "'DM Mono', monospace", fontSize: ".8rem" }}>
                {data.rounds.length} round{data.rounds.length !== 1 ? "s" : ""} saved
              </span>
              <button className="btn btn-gold" onClick={() => setShowNewRound(v => !v)}>
                {showNewRound ? "✕ Cancel" : "+ New Round"}
              </button>
            </div>

            {showNewRound && (
              <div className="card">
                <div className="card-title">New Round</div>
                <div className="form-row">
                  <div className="fg">
                    <label>Round Name</label>
                    <input
                      value={newRound.name}
                      onChange={e => setNewRound(r => ({ ...r, name: e.target.value }))}
                      placeholder="e.g. Saturday Morning"
                    />
                  </div>
                  <div className="fg">
                    <label>Date</label>
                    <input
                      type="date"
                      value={newRound.date}
                      onChange={e => setNewRound(r => ({ ...r, date: e.target.value }))}
                    />
                  </div>
                </div>

                <div style={{ marginBottom: 16 }}>
                  <label style={{ marginBottom: 8 }}>Select Players for this Round</label>
                  {data.players.length === 0 && (
                    <div className="section-hint">⚠ Go to the Players tab to add players first.</div>
                  )}
                  <div className="chip-list" style={{ marginBottom: 10 }}>
                    {data.players
                      .filter(p => !newRound.playerIds.includes(p.id))
                      .map(p => (
                        <span
                          className="chip"
                          key={p.id}
                          style={{ cursor: "pointer", background: "#e8dcc8", color: "#1a3a2a" }}
                          onClick={() => setNewRound(r => ({ ...r, playerIds: [...r.playerIds, p.id] }))}
                        >
                          + {p.name}
                        </span>
                      ))}
                  </div>
                  <div className="chip-list">
                    {newRound.playerIds.map(pid => {
                      const p = data.players.find(x => x.id === pid);
                      return p ? (
                        <span className="chip" key={pid}>
                          ✓ {p.name}
                          <span
                            className="chip-x"
                            onClick={() => setNewRound(r => ({
                              ...r,
                              playerIds: r.playerIds.filter(x => x !== pid),
                            }))}
                          >✕</span>
                        </span>
                      ) : null;
                    })}
                  </div>
                </div>

                <button
                  className="btn btn-green"
                  onClick={createRound}
                  disabled={!newRound.playerIds.length}
                >
                  Create Round & Enter Points →
                </button>
              </div>
            )}

            {data.rounds.length === 0 && !showNewRound && (
              <div className="empty-state">No rounds yet. Create one above!</div>
            )}

            {[...data.rounds]
              .sort((a, b) => b.createdAt - a.createdAt)
              .map(round => {
                const totals = getRoundTotals(round);
                const leader = round.playerIds
                  .slice()
                  .sort((a, b) => totals[b] - totals[a])[0];
                const leaderName = data.players.find(p => p.id === leader)?.name || "";
                return (
                  <div
                    className="round-row"
                    key={round.id}
                    onClick={() => { setActiveRoundId(round.id); setView("scoring"); }}
                  >
                    <div>
                      <div className="round-name">{round.name}</div>
                      <div className="round-meta">
                        {round.date} · {round.playerIds.length} players · Leader: {leaderName}{" "}
                        ({totals[leader] > 0 ? "+" : ""}{totals[leader] ?? 0} pts)
                      </div>
                    </div>
                    <div style={{ display: "flex", gap: 8 }}>
                      <button
                        className="btn btn-outline btn-sm"
                        onClick={e => {
                          e.stopPropagation();
                          setActiveRoundId(round.id);
                          setView("scoring");
                        }}
                      >Open</button>
                      <button
                        className="btn btn-gold btn-sm"
                        onClick={e => { e.stopPropagation(); exportRoundCSV(round); }}
                      >CSV</button>
                      <button
                        className="btn btn-red btn-sm"
                        onClick={e => { e.stopPropagation(); deleteRound(round.id); }}
                      >Del</button>
                    </div>
                  </div>
                );
              })}
          </>
        )}

        {/* ── SCORING ── */}
        {view === "scoring" && activeRound && (() => {
          const totals = getRoundTotals(activeRound);
          const name = pid => data.players.find(p => p.id === pid)?.name || pid;
          const sorted = [...activeRound.playerIds].sort((a, b) => totals[b] - totals[a]);

          return (
            <>
              {/* Leaderboard */}
              <div className="card" style={{ marginBottom: 16 }}>
                <div className="card-title" style={{ marginBottom: 14 }}>
                  {activeRound.name}{" "}
                  <span style={{
                    fontFamily: "'DM Mono',monospace",
                    fontSize: ".78rem",
                    color: "var(--muted)",
                    fontWeight: 400,
                  }}>
                    · {activeRound.date}
                  </span>
                </div>
                {sorted.map((pid, i) => {
                  const pts = totals[pid];
                  return (
                    <div className="lb-row" key={pid}>
                      <div className="lb-rank">#{i + 1}</div>
                      <div className="lb-name">{name(pid)}</div>
                      <div
                        className="lb-pts"
                        style={{ color: pts > 0 ? "#2d5a3d" : pts < 0 ? "#b84040" : "#6b7c6a" }}
                      >
                        {pts > 0 ? "+" : ""}{pts} pts
                      </div>
                    </div>
                  );
                })}
                <div style={{ marginTop: 14, display: "flex", gap: 8 }}>
                  <button
                    className="btn btn-gold btn-sm"
                    onClick={() => exportRoundCSV(activeRound)}
                  >
                    ↓ Export CSV
                  </button>
                </div>
              </div>

              {/* Points Scorecard */}
              <div className="card" style={{ padding: "20px 10px" }}>
                <div className="card-title" style={{ paddingLeft: 6 }}>Points Entry</div>
                <p className="section-hint" style={{ paddingLeft: 6 }}>
                  Type points per player for each hole. Use negative numbers for losses.
                </p>

                <table className="sc-table">
                  <thead>
                    <tr>
                      <th className="th-hole">Hole</th>
                      {activeRound.playerIds.map(pid => (
                        <th className="th-player" key={pid}>{name(pid)}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {HOLES.map(h => {
                      const hole = activeRound.holes[h];
                      return (
                        <tr key={h}>
                          <td className="td-hole">{h}</td>
                          {activeRound.playerIds.map(pid => (
                            <td key={pid}>
                              <input
                                type="number"
                                className="pts-input"
                                value={hole.points[pid]}
                                onChange={e => setPoints(h, pid, e.target.value)}
                                placeholder="0"
                              />
                            </td>
                          ))}
                        </tr>
                      );
                    })}
                    <tr className="total-row">
                      <td className="td-hole">TOTAL</td>
                      {activeRound.playerIds.map(pid => {
                        const pts = totals[pid];
                        return (
                          <td key={pid}>
                            <span className={`pts-badge ${ptsClass(pts)}`}>
                              {pts > 0 ? "+" : ""}{pts}
                            </span>
                          </td>
                        );
                      })}
                    </tr>
                  </tbody>
                </table>
              </div>
            </>
          );
        })()}

      </div>
    </div>
  );
}
