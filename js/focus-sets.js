// FLAGVERSE focus sets - named country lists the player saves and replays.
// A focus set is just an ordered list of ISO alpha-2 codes; when one is active,
// the game pool is restricted to exactly those countries.
const FVFocusSets = (function () {
  const KEY = "flagverse_focus_sets_v1";

  // Starter sets. These are offered as convenient regional groupings only;
  // they are starting points the player can duplicate and edit freely.
  const STARTER_SETS = [
    {
      id: "starter-levant-nile",
      name: "Levant & Nile",
      builtIn: true,
      codes: ["PS", "JO", "LB", "SY", "EG", "IQ", "SA"],
    },
    {
      id: "starter-eastern-europe",
      name: "Eastern Europe",
      builtIn: true,
      codes: ["UA", "PL", "BY", "MD", "RO", "SK", "HU", "LT", "LV", "EE"],
    },
    {
      id: "starter-north-africa",
      name: "North Africa",
      builtIn: true,
      codes: ["EG", "LY", "TN", "DZ", "MA", "SD", "MR"],
    },
    {
      id: "starter-gulf",
      name: "Gulf States",
      builtIn: true,
      codes: ["SA", "AE", "QA", "KW", "BH", "OM", "YE"],
    },
    {
      id: "starter-hard-flags",
      name: "Confusable Flags",
      builtIn: true,
      codes: ["ID", "MC", "RO", "TD", "NL", "LU", "CO", "EC", "VE", "SN", "ML", "SK", "SI"],
    },
  ];

  function readAll() {
    try {
      const raw = window.localStorage.getItem(KEY);
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [];
    } catch (e) {
      return [];
    }
  }

  function writeAll(sets) {
    try {
      window.localStorage.setItem(KEY, JSON.stringify(sets));
      return true;
    } catch (e) {
      return false;
    }
  }

  // Built-in sets are always listed first, followed by the player's own.
  function list() {
    return STARTER_SETS.concat(readAll());
  }

  function getById(id) {
    return list().find((s) => s.id === id) || null;
  }

  function save(name, codes) {
    const sets = readAll();
    const clean = Array.from(new Set((codes || []).map((c) => String(c).toUpperCase()))).filter(Boolean);
    if (!name || clean.length < 4) return null;

    const existing = sets.find((s) => s.name.toLowerCase() === name.toLowerCase());
    if (existing) {
      existing.codes = clean;
      writeAll(sets);
      return existing;
    }
    const entry = {
      id: "set-" + Date.now().toString(36),
      name: name.slice(0, 28),
      builtIn: false,
      codes: clean,
    };
    sets.push(entry);
    writeAll(sets);
    return entry;
  }

  function remove(id) {
    const sets = readAll().filter((s) => s.id !== id);
    return writeAll(sets);
  }

  return { list, getById, save, remove, STARTER_SETS };
})();
