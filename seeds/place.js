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
      price: 20000,
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam quaerat volupt',
      location: 'taman mini indonesia indah, jakarta',
      image: 'https://images.unsplash.com/photo-1657214667486-8fbe5af3e034?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    },
    {
      title: 'Taman Mini Indonesia Indah',
      price: 20000,
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam quaerat volupt',
      location: 'taman mini indonesia indah, jakarta',
      image: 'https://images.unsplash.com/photo-1657214667486-8fbe5af3e034?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    },
    {
      title: 'Taman Mini Indonesia Indah',
      price: 20000,
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam quaerat volupt',
      location: 'taman mini indonesia indah, jakarta',
      image: 'https://images.unsplash.com/photo-1657214667486-8fbe5af3e034?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    },
    {
      title: 'Taman Mini Indonesia Indah',
      price: 20000,
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam quaerat volupt',
      location: 'taman mini indonesia indah, jakarta',
      image: 'https://images.unsplash.com/photo-1657214667486-8fbe5af3e034?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    },
    {
      title: 'Taman Mini Indonesia Indah',
      price: 20000,
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam quaerat volupt',
      location: 'taman mini indonesia indah, jakarta',
      image: 'https://images.unsplash.com/photo-1657214667486-8fbe5af3e034?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    },
    {
      title: 'Taman Mini Indonesia Indah',
      price: 20000,
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam quaerat volupt',
      location: 'taman mini indonesia indah, jakarta',
      image: 'https://images.unsplash.com/photo-1657214667486-8fbe5af3e034?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    },
    {
      title: 'Taman Mini Indonesia Indah',
      price: 20000,
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam quaerat volupt',
      location: 'taman mini indonesia indah, jakarta',
      image: 'https://images.unsplash.com/photo-1657214667486-8fbe5af3e034?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    },
    {
      title: 'Taman Mini Indonesia Indah',
      price: 20000,
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam quaerat volupt',
      location: 'taman mini indonesia indah, jakarta',
      image: 'https://images.unsplash.com/photo-1657214667486-8fbe5af3e034?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
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
