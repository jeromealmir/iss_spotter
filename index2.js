const nextISSTimesForMyLocation = require('./iss_promised');

const printPassTimes = (passTimes) => {
  for (const times of passTimes) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(times.risetime);
    const duration = times.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  }
};

nextISSTimesForMyLocation()
  .then((passTimes) => {
    printPassTimes(passTimes);
  })
  .catch((error) => {
    console.log('It didn\'t work: ', error.message);
  });