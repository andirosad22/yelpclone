const ExpressError = require('./ErrorHandle');
const baseUrl = 'https://geocode.search.hereapi.com/v1';
const apiKey = 'NIkJCDN1O-TX1qEsl_-9zZMS32c4u-DCz58S1ywfwFw';
const geocode= async(adrress) => {
  const url = `${baseUrl}/geocode?q=${adrress}&limit=1&apiKey=${apiKey}`;
  try{
    const response = await fetch(url);
    const data = await response.json();
    return data.items[0];
  }catch(error) {
    throw new ExpressError(error.message, 500);
  }
}

const geometry = async (address) => {
  try{
    const {position} = await geocode(address);
    return {
      type: "Point",
      coordinates: [position.lng, position.lat]
    }
  }catch(error) {
    throw new ExpressError(error.message, 500);
  }
}

module.exports= {
  geocode,
  geometry
};