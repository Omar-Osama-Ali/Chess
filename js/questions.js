// FLAGVERSE question generation
const FVQuestions = (function () {
  const DIFFICULTY_TIER = { easy: 1, normal: 2, hard: 3, expert: 4, insane: 5 };

  // Pairs/groups of countries whose flags are commonly confused for each other.
  // Used to make distractors sharper at Hard/Expert/Insane.
  const SIMILAR_FLAGS = [
    ["ID", "MC"],
    ["RO", "TD"],
    ["NL", "LU"],
    ["CO", "EC", "VE"],
    ["AU", "NZ"],
    ["SN", "ML"],
    ["SK", "SI"],
    ["NO", "IS"],
    ["IE", "CI"],
    ["FI", "SE"],
    ["HR", "RS"],
    ["QA", "BH"],
    ["AE", "SC"],
    ["NE", "IN"],
    ["TD", "AD"],
  ];

  function flagUrl(code, size) {
    size = size || "w320";
    return `https://flagcdn.com/${size}/${code.toLowerCase()}.png`;
  }

  function flagUrlLarge(code) {
    return flagUrl(code, "w640");
  }

  const CONTINENT_MAP = {
    africa: "Africa",
    asia: "Asia",
    europe: "Europe",
    northAmerica: "North America",
    southAmerica: "South America",
    oceania: "Oceania",
  };

  function regionFilter(countries, region, customCodes) {
    if (region === "custom") {
      const set = new Set((customCodes || []).map((c) => c.toUpperCase()));
      return countries.filter((c) => set.has(c.code));
    }
    if (region === "middleEast") return countries.filter((c) => c.middleEast);
    if (region && region !== "world") {
      const cont = CONTINENT_MAP[region];
      if (cont) return countries.filter((c) => c.continent === cont);
    }
    return countries;
  }

  // Filters to region + difficulty tier. If a narrow region (e.g. Oceania at
  // Easy) doesn't have enough countries for a 4-option question, the tier is
  // progressively loosened (region is always respected; difficulty is not,
  // for Custom regions, since that list is explicit).
  function getPool(countries, region, difficulty, customCodes) {
    const startTier = DIFFICULTY_TIER[difficulty] || 2;
    const regionPool = regionFilter(countries, region, customCodes);

    if (region === "custom") return regionPool;

    for (let tier = startTier; tier <= 5; tier++) {
      const pool = regionPool.filter((c) => c.difficulty <= tier);
      if (pool.length >= 4) return pool;
    }
    return regionPool;
  }

  function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function pick(arr, n, exclude) {
    const excludeSet = new Set((exclude || []).map((c) => c.code));
    const candidates = shuffle(arr.filter((c) => !excludeSet.has(c.code)));
    return candidates.slice(0, n);
  }

  // Choose 3 distractors for `answer`, preferring same-continent / similar-flag
  // plausibility, falling back to the wider pool if not enough are available.
  function distractorsFor(answer, pool, difficulty, useSimilarFlags) {
    let candidates = [];

    if (useSimilarFlags) {
      const group = SIMILAR_FLAGS.find((g) => g.includes(answer.code));
      if (group) {
        const codes = new Set(group.filter((c) => c !== answer.code));
        candidates = pool.filter((c) => codes.has(c.code));
      }
    }

    if (candidates.length < 3) {
      const sameContinent = pool.filter(
        (c) => c.continent === answer.continent && c.code !== answer.code
      );
      candidates = candidates.concat(
        shuffle(sameContinent).filter((c) => !candidates.includes(c))
      );
    }

    if (candidates.length < 3) {
      const rest = pool.filter(
        (c) => c.code !== answer.code && !candidates.includes(c)
      );
      candidates = candidates.concat(shuffle(rest));
    }

    return candidates.slice(0, 3);
  }

  function buildMCQ(answer, distractors) {
    return shuffle([answer, ...distractors]);
  }

  // Builds one question object for a given mode.
  function buildQuestion(mode, pool, difficulty, usedCodes) {
    const tier = DIFFICULTY_TIER[difficulty] || 2;
    const useSimilarFlags = tier >= 3;
    const available = pool.filter((c) => !usedCodes.has(c.code));
    const workingPool = available.length >= 4 ? available : pool;

    if (workingPool.length < 4) return null; // not enough countries for MCQ

    const answer = workingPool[Math.floor(Math.random() * workingPool.length)];
    const distractors = distractorsFor(answer, pool, difficulty, useSimilarFlags);
    if (distractors.length < 3) return null;

    const base = { mode, answer, pool };

    switch (mode) {
      case "flagToCountry": {
        const options = buildMCQ(answer, distractors);
        return Object.assign(base, {
          prompt: "Which country is this?",
          flag: flagUrlLarge(answer.code),
          options: options.map((c) => ({ label: c.name, code: c.code })),
          correctCode: answer.code,
        });
      }
      case "countryToFlag": {
        const options = buildMCQ(answer, distractors);
        return Object.assign(base, {
          prompt: `Which flag belongs to ${answer.name}?`,
          countryName: answer.name,
          options: options.map((c) => ({ flag: flagUrl(c.code), code: c.code })),
          correctCode: answer.code,
        });
      }
      case "capitalToCountry": {
        const options = buildMCQ(answer, distractors);
        return Object.assign(base, {
          prompt: "Which country has this capital?",
          capital: answer.capital,
          options: options.map((c) => ({ label: c.name, code: c.code })),
          correctCode: answer.code,
        });
      }
      case "countryToContinent": {
        const continents = [
          "Africa",
          "Asia",
          "Europe",
          "North America",
          "South America",
          "Oceania",
        ];
        const wrongContinents = shuffle(
          continents.filter((c) => c !== answer.continent)
        ).slice(0, 3);
        const options = shuffle([answer.continent, ...wrongContinents]);
        return Object.assign(base, {
          prompt: `Which continent is ${answer.name} in?`,
          flag: flagUrl(answer.code),
          countryName: answer.name,
          options: options.map((c) => ({ label: c, code: c })),
          correctCode: answer.continent,
        });
      }
      case "continentToCountry": {
        const options = buildMCQ(answer, distractors);
        return Object.assign(base, {
          prompt: `Which of these countries is in ${answer.continent}?`,
          options: options.map((c) => ({ label: c.name, code: c.code, flag: flagUrl(c.code) })),
          correctCode: answer.code,
        });
      }
      case "threeClues": {
        const neighborName = (() => {
          if (!answer.neighbors || !answer.neighbors.length) return null;
          const n = pool.find((c) => c.code === answer.neighbors[0]);
          return n ? n.name : null;
        })();
        const clues = [
          `Located in ${answer.continent}.`,
          `Its capital is ${answer.capital}.`,
          neighborName
            ? `It shares a border with ${neighborName}.`
            : `Its flag can be seen below once revealed.`,
        ];
        const options = buildMCQ(answer, distractors);
        return Object.assign(base, {
          prompt: "Which country is this?",
          clues,
          flag: flagUrlLarge(answer.code),
          options: options.map((c) => ({ label: c.name, code: c.code })),
          correctCode: answer.code,
        });
      }
      case "mapChallenge": {
        return Object.assign(base, {
          prompt: `Find ${answer.name}`,
          flag: flagUrl(answer.code),
          countryName: answer.name,
          correctCode: answer.code,
          correctN3: answer.iso_n3,
        });
      }
      default:
        return null;
    }
  }

  const QUIZ_MODES = [
    "flagToCountry",
    "countryToFlag",
    "capitalToCountry",
    "countryToContinent",
    "continentToCountry",
    "threeClues",
  ];

  function randomModeForMix(includeMap) {
    const modes = includeMap ? QUIZ_MODES.concat(["mapChallenge"]) : QUIZ_MODES;
    return modes[Math.floor(Math.random() * modes.length)];
  }

  return {
    getPool,
    buildQuestion,
    flagUrl,
    flagUrlLarge,
    shuffle,
    pick,
    QUIZ_MODES,
    randomModeForMix,
    DIFFICULTY_TIER,
  };
})();
