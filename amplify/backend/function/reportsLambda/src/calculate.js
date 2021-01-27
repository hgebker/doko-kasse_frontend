const { request } = require('/opt/appSyncRequest');
const { listEvenings } = require('/opt/graphql/queries');

const appsyncUrl = 'https://k676ugdzbrcploevmqi324vw3e.appsync-api.eu-central-1.amazonaws.com/graphql';
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
    return !['Datum', 'Semester'].includes(key);
  });
}

function calculateTotalIncome(sumPerPlayer) {
  return Object.values(sumPerPlayer).reduce(function (total, playersSum) {
    return (total += playersSum);
  }, 0);
}

function calculatePlayersTotal(evenings) {
  return evenings.reduce(function (playersValues, evening) {
    const playerEntries = filterPlayerValues(evening);

    playerEntries.forEach(function ([key, value]) {
      playersValues[key] += value;
    });

    return playersValues;
  }, defaultPlayerValues);
}

function calculatePlayersMin(evenings) {
  return evenings.reduce(function (playersValues, evening) {
    const playerEntries = filterPlayerValues(evening);

    playerEntries.forEach(function ([key, value]) {
      if (value < playersValues[key]) {
        playersValues[key] = value;
      }
    });

    return playersValues;
  }, defaultPlayerValues);
}

function calculatePlayersMax(evenings) {
  return evenings.reduce(function (playersValues, evening) {
    const playerEntries = filterPlayerValues(evening);

    playerEntries.forEach(function ([key, value]) {
      if (value > playersValues[key]) {
        playersValues[key] = value;
      }
    });

    return playersValues;
  }, defaultPlayerValues);
}

function calculateNumberOfParticipationsForPlayers(evenings) {
  return evenings.reduce(function (playersValues, evening) {
    const playerEntries = filterPlayerValues(evening);

    playerEntries.forEach(function ([key, value]) {
      if (value) {
        playersValues[key]++;
      }
    });

    return playersValues;
  }, defaultPlayerValues);
}

function calculateAveragePerPlayer(evenings) {
  const sumPerPlayer = calculatePlayersTotal(evenings);
  const participationsPerPlayer = calculateNumberOfParticipationsForPlayers(evenings);
  const sumEntries = Object.entries(sumPerPlayer);

  return sumEntries.reduce(function (averagePerPlayer, [player, value]) {
    averagePerPlayer[player] = value / participationsPerPlayer[player];
    return averagePerPlayer;
  });
}

module.exports = async function calculateReports(semesterFilter) {
  const filter = semesterFilter ? { semester: { eq: { semesterFilter } } } : null;

  const response = await request({ query: listEvenings, variables: { limit: 100, filter } }, appsyncUrl);

  return {
    evenings: response.data.listEvenings.items,
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
      return calculateAveragePerPlayer(this.evenings, this.noOfParticipationsPerPlayer);
    },
    get totalIncome() {
      return calculateTotalIncome(this.sumPerPlayer);
    },
    get eveningCount() {
      return this.evenings.length;
    }
  };
};
