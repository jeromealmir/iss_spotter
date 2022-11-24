const {fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes} = require('./iss');

fetchMyIP((error, ip) => {
  if (error) return console.log('It didn\'t work', error);

  console.log('It works! Returned IP:', ip);
});

fetchCoordsByIP('50.67.204.116', (error, coordinates) => {
  if (error) return console.log('It didn\t work!', error);
  
  console.log('It works! Returned coordinates:', coordinates);
});

const coordinates = { latitude: 49.054587, longitude: -122.328026 };

fetchISSFlyOverTimes(coordinates, (error, passTimes) => {
  if (error) return console.log('It didn\'t work!', error);

  console.log('It works! Returned data: ', passTimes);
});