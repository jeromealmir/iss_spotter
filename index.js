const nextISSTimesForMyLocation = require('./iss');

const printPassTimes = (passTimes) => {
  for (const times of passTimes) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(times.risetime);
    const duration = times.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  }
};

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) return console.log('It didn\'t work', error);

  printPassTimes(passTimes);
  
});