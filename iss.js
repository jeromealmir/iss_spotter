const request = require('request');

//makes an api call and return ip address
const fetchMyIP = (callback) => {
  request('https://api.ipify.org?format=json', (error, response, body) => {

    if (error) return callback(error, null);

    //parse ip address
    const ip = JSON.parse(body).ip;

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    
    //if no error, pass ip address to callback
    return callback(null, ip);
  });
};

//makes an api call and request ip information
const fetchCoordsByIP = (ip, callback) => {
  request(`http://ipwho.is/${ip}`, (error, response, body) => {
    
    if (error) return callback(error, null);

    //parse ip information
    const parsedBody = JSON.parse(body);
    
    if (!parsedBody['success']) {
      const message = `Success status was ${parsedBody.success}. Server message says: ${parsedBody.message} when fetching for IP ${parsedBody.ip}`;
      return callback(Error(message), null);
    }

    //extract longitude and latitude data
    const {latitude, longitude} = parsedBody;
    
    //if no error, pass lat long to callback
    return callback(null, {latitude, longitude});

  });
};

module.exports = {fetchMyIP, fetchCoordsByIP};