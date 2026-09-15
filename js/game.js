// FLAGVERSE game session - mode-agnostic state machine driven by the UI layer.
const FVGame = (function () {
  function buildQueue(config, countries) {
    const pool = FVQuestions.getPool(
      countries,
      config.region,
      config.difficulty,
      config.customCountries
    );
    const queue = [];
    const usedCodes = new Set();
    const includeMap = config.mode === "mapChallenge" || config.mode === "randomMix";
    let guard = 0;

    while (queue.length < config.questionCount && guard < config.questionCount * 20) {
      guard++;
      let mode = config.mode;
      if (mode === "randomMix") mode = FVQuestions.randomModeForMix(true);
      if (mode === "speedRound") mode = FVQuestions.randomModeForMix(false);

      const q = FVQuestions.buildQuestion(mode, pool, config.difficulty, usedCodes);
      if (!q) continue;

      if (!config.allowRepeats) usedCodes.add(q.answer.code);
      if (usedCodes.size >= pool.length) usedCodes.clear();

      queue.push(q);
    }
    return queue;
  }

  function createSession(config, countries) {
    const queue = buildQueue(config, countries);
    const players = (config.players && config.players.length ? config.players : ["Player 1"]).map(
      (name) => ({
        name,
        score: 0,
        streak: 0,
        bestStreak: 0,
        correct: 0,
        wrong: 0,
      })
    );

    return {
      config,
      queue,
      index: 0,
      playerIndex: 0,
      players,
      startedAt: Date.now(),
      answers: [],
      finished: queue.length === 0,
    };
  }

  function currentQuestion(session) {
    return session.queue[session.index] || null;
  }

  function currentPlayer(session) {
    return session.players[session.playerIndex];
  }

  // Records an answer for the active player on the active question.
  function submitAnswer(session, selectedCode, meta) {
    const q = currentQuestion(session);
    if (!q) return null;
    const player = currentPlayer(session);
    const isCorrect = selectedCode === q.correctCode;

    let points = 0;
    if (isCorrect) {
      player.streak += 1;
      player.bestStreak = Math.max(player.bestStreak, player.streak);
      player.correct += 1;
      points = FVScoring.scoreCorrectAnswer({
        difficulty: session.config.difficulty,
        timerSeconds: session.config.timerEnabled ? session.config.timerSeconds : null,
        secondsRemaining: meta && meta.secondsRemaining,
        streak: player.streak,
        cluesUsed: meta && meta.cluesUsed,
      });
      player.score += points;
    } else {
      player.streak = 0;
      player.wrong += 1;
    }

    session.answers.push({
      questionIndex: session.index,
      player: player.name,
      selectedCode,
      correctCode: q.correctCode,
      isCorrect,
      points,
    });

    return { isCorrect, points, correctCode: q.correctCode };
  }

  // Advances to next player (multiplayer) or next question. Returns
  // true if the game just finished.
  function advance(session) {
    if (session.players.length > 1 && session.playerIndex < session.players.length - 1) {
      session.playerIndex += 1;
      return false;
    }
    session.playerIndex = 0;
    session.index += 1;
    if (session.index >= session.queue.length) {
      session.finished = true;
      return true;
    }
    return false;
  }

  function summary(session) {
    const totalMs = Date.now() - session.startedAt;
    const totalQuestions = session.queue.length;
    const perPlayer = session.players.map((p) => ({
      name: p.name,
      score: p.score,
      correct: p.correct,
      wrong: p.wrong,
      bestStreak: p.bestStreak,
      accuracy: totalQuestions > 0 ? Math.round((p.correct / totalQuestions) * 100) : 0,
    }));
    const winner = perPlayer.slice().sort((a, b) => b.score - a.score)[0];
    return {
      totalQuestions,
      timeMs: totalMs,
      difficulty: session.config.difficulty,
      region: session.config.region,
      mode: session.config.mode,
      players: perPlayer,
      winner: session.players.length > 1 ? winner : null,
      single: session.players.length === 1 ? perPlayer[0] : null,
    };
  }

  return { createSession, currentQuestion, currentPlayer, submitAnswer, advance, summary, buildQueue };
})();
