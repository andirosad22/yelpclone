const ExpressError = require('./ErrorHandle');
const baseUrl = 'https://geocode.search.hereapi.com/v1';
const apiKey = 'NIkJCDN1O-TX1qEsl_-9zZMS32c4u-DCz58S1ywfwFw';
module.exports.geocode= async(adrress) => {
  const url = `${baseUrl}/geocode?q=${adrress}&limit=1&apiKey=${apiKey}`;
  try{
    const response = await fetch(url);
    const data = await response.json();
    return data.items[0];
  }catch(error) {
    throw new ExpressError(error.message, 500);
  }
}