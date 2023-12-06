const mongoose = require('mongoose');
const Place = require('../models/place');

mongoose.connect('mongodb://127.0.0.1/bestpoints')
.then((result)=>{
    console.log('connected to mongoose');
}).catch((err)=>{
    console.log(err);
});

async function seedPlace(){
  const places = [
    {
      title: 'Taman Mini Indonesia Indah',
      price: 'Rp. 20.000',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam quaerat volupt',
      location: 'taman mini indonesia indah, jakarta',
      image: 'https://source.unsplash.com/collection/2349781/1280x720'
    },
    {
      title: 'Taman Mini Indonesia Indah',
      price: 'Rp. 20.000',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam quaerat volupt',
      location: 'taman mini indonesia indah, jakarta',
      image: 'https://source.unsplash.com/collection/2349781/1280x720'
    },
    {
      title: 'Taman Mini Indonesia Indah',
      price: 'Rp. 20.000',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam quaerat volupt',
      location: 'taman mini indonesia indah, jakarta',
      image: 'https://source.unsplash.com/collection/2349781/1280x720'
    },
    {
      title: 'Taman Mini Indonesia Indah',
      price: 'Rp. 20.000',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam quaerat volupt',
      location: 'taman mini indonesia indah, jakarta',
      image: 'https://source.unsplash.com/collection/2349781/1280x720'
    },
    {
      title: 'Taman Mini Indonesia Indah',
      price: 'Rp. 20.000',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam quaerat volupt',
      location: 'taman mini indonesia indah, jakarta',
      image: 'https://source.unsplash.com/collection/2349781/1280x720'
    },
    {
      title: 'Taman Mini Indonesia Indah',
      price: 'Rp. 20.000',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam quaerat volupt',
      location: 'taman mini indonesia indah, jakarta',
      image: 'https://source.unsplash.com/collection/2349781/1280x720'
    },
    {
      title: 'Taman Mini Indonesia Indah',
      price: 'Rp. 20.000',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam quaerat volupt',
      location: 'taman mini indonesia indah, jakarta',
      image: 'https://source.unsplash.com/collection/2349781/1280x720'
    },
    {
      title: 'Taman Mini Indonesia Indah',
      price: 'Rp. 20.000',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam quaerat volupt',
      location: 'taman mini indonesia indah, jakarta',
      image: 'https://source.unsplash.com/collection/2349781/1280x720'
    },
  ];
  try{
    await Place.deleteMany({});
    await Place.insertMany(places);
    console.log('Data Berhasil Di simpan');
  } catch(err){
    console.log('terjadi kesalahan saat menyimpan data: ', err);
  }finally{
    mongoose.disconnect();
  }
};
seedPlace();
