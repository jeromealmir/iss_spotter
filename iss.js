const request = require('request');

const fetchMyIP = (callback) => {
  request('https://api.ipify.org?format=json', (error, response, body) => {

    if (error) return callback(error, null);

    const ip = JSON.parse(body).ip;

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
      
    return callback(null, ip);
  });
};

const fetchCoordsByIP = (ip, callback) => {
  request(`http://ipwho.is/${ip}`, (error, response, body) => {
    
    if (error) return callback(error, null);

    const parsedBody = JSON.parse(body);
    
    if (!parsedBody['success']) {
      const message = `Success status was ${parsedBody.success}. Server message says: ${parsedBody.message} when fetching for IP ${parsedBody.ip}`;
      return callback(Error(message), null);
    }

    const {latitude, longitude} = parsedBody;
    
    return callback(null, {latitude, longitude});

  });
};

module.exports = {fetchMyIP, fetchCoordsByIP};