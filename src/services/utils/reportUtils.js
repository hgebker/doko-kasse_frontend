const defaultPlayerValues = {
  tim: 0,
  jan: 0,
  ole: 0,
  hannes: 0,
  louisa: 0,
  sonstige: 0
};

function filterPlayerValues(evening) {
  return Object.entries(evening).filter(function ([key]) {
    return !['Datum', 'semester'].includes(key);
  });
}

function calculateTotalIncome(evenings) {
  const sumPerPlayer = calculatePlayersTotal(evenings);

  return Object.values(sumPerPlayer).reduce(function (total, playersSum) {
    total += playersSum;
    return total;
  }, 0);
}

function calculatePlayersTotal(evenings) {
  return evenings.reduce(
    function (playersValues, evening) {
      const playerEntries = filterPlayerValues(evening);

      playerEntries.forEach(function ([key, value]) {
        playersValues[key] += value;
      });

      return playersValues;
    },
    { ...defaultPlayerValues }
  );
}

function calculatePlayersMin(evenings) {
  return evenings.reduce(
    function (playersValues, evening) {
      const playerEntries = filterPlayerValues(evening);

      playerEntries.forEach(function ([key, value]) {
        if (!playersValues[key] || value < playersValues[key]) {
          playersValues[key] = value;
        }
      });

      return playersValues;
    },
    { ...defaultPlayerValues }
  );
}

function calculatePlayersMax(evenings) {
  return evenings.reduce(
    function (playersValues, evening) {
      const playerEntries = filterPlayerValues(evening);

      playerEntries.forEach(function ([key, value]) {
        if (value > playersValues[key]) {
          playersValues[key] = value;
        }
      });

      return playersValues;
    },
    { ...defaultPlayerValues }
  );
}

function calculateNumberOfParticipationsForPlayers(evenings) {
  return evenings.reduce(
    function (playersValues, evening) {
      const playerEntries = filterPlayerValues(evening);

      playerEntries.forEach(function ([key, value]) {
        if (value) {
          playersValues[key] = playersValues[key] + 1;
        }
      });

      return playersValues;
    },
    { ...defaultPlayerValues }
  );
}

function calculateAveragePerPlayer(evenings) {
  const sumPerPlayer = calculatePlayersTotal(evenings);
  const participationsPerPlayer = calculateNumberOfParticipationsForPlayers(evenings);
  const sumEntries = Object.entries(sumPerPlayer);

  return sumEntries.reduce(
    function (averagePerPlayer, [player, value]) {
      averagePerPlayer[player] = value ? value / participationsPerPlayer[player] : 0;
      return averagePerPlayer;
    },
    { ...defaultPlayerValues }
  );
}

const calculateWorst = averagePerPlayer => {
  const entriesOfRealPlayers = Object.entries(averagePerPlayer).filter(([player]) => player !== 'sonstige');
  const maxValue = Math.max(...Object.values(Object.fromEntries(entriesOfRealPlayers)));
  const [worstPlayer] = entriesOfRealPlayers.find(([, value]) => value === maxValue);
  return worstPlayer;
};

const calculateBest = averagePerPlayer => {
  const entriesOfRealPlayers = Object.entries(averagePerPlayer).filter(([player]) => player !== 'sonstige');
  const minValue = Math.min(...Object.values(Object.fromEntries(entriesOfRealPlayers)));
  const [bestPlayer] = entriesOfRealPlayers.find(([, value]) => value === minValue);
  return bestPlayer;
};

function calculateReport(evenings) {
  return {
    evenings,
    get sumPerPlayer() {
      return calculatePlayersTotal(this.evenings);
    },
    get minPerPlayer() {
      return calculatePlayersMin(this.evenings);
    },
    get maxPerPlayer() {
      return calculatePlayersMax(this.evenings);
    },
    get noOfParticipationsPerPlayer() {
      return calculateNumberOfParticipationsForPlayers(this.evenings);
    },
    get averagePerPlayer() {
      return calculateAveragePerPlayer(this.evenings);
    },
    get totalIncome() {
      return calculateTotalIncome(this.evenings);
    },
    get eveningCount() {
      return this.evenings.length;
    },
    get worst() {
      return calculateWorst(this.averagePerPlayer);
    },
    get best() {
      return calculateBest(this.averagePerPlayer);
    }
  };
}

export { calculateReport };
