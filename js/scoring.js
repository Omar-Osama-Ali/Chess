// FLAGVERSE scoring
const FVScoring = (function () {
  const BASE_POINTS = 100;
  const DIFFICULTY_MULTIPLIER = {
    easy: 1,
    normal: 1.1,
    hard: 1.25,
    expert: 1.5,
    insane: 2,
  };

  // Fast-answer bonus: up to 50 points, scaled by how much time remained.
  function speedBonus(timerSeconds, secondsRemaining) {
    if (!timerSeconds || secondsRemaining == null) return 0;
    const ratio = Math.max(0, Math.min(1, secondsRemaining / timerSeconds));
    return Math.round(50 * ratio);
  }

  // Streak bonus grows with consecutive correct answers, capped.
  function streakBonus(streak) {
    if (streak <= 1) return 0;
    return Math.min(200, (streak - 1) * 15);
  }

  // Three Clues: reward answering with fewer clues revealed (1, 2, or 3).
  function cluesBonus(cluesUsed) {
    if (cluesUsed <= 1) return 100;
    if (cluesUsed === 2) return 50;
    return 0;
  }

  function scoreCorrectAnswer({
    difficulty,
    timerSeconds,
    secondsRemaining,
    streak,
    cluesUsed,
  }) {
    const mult = DIFFICULTY_MULTIPLIER[difficulty] || 1;
    let total = BASE_POINTS;
    total += speedBonus(timerSeconds, secondsRemaining);
    total += streakBonus(streak);
    if (typeof cluesUsed === "number") total += cluesBonus(cluesUsed);
    return Math.round(total * mult);
  }

  return { scoreCorrectAnswer, speedBonus, streakBonus, cluesBonus, DIFFICULTY_MULTIPLIER, BASE_POINTS };
})();
