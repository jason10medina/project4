    const mongoose = require('mongoose');
    const Item = require('./models/items'); 
    require('dotenv').config();
        mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
      .then(() => console.log('MongoDB connected'))
      .catch(err => console.error('MongoDB connection error:', err));
    
    const items = [
        {
            title: 'Leo Messi Jersey',
            seller: 'medinajasonn',
            price: 50,
            club: 'Inter Miami FC',
            condition: 'New',
            offers: 4,
            image: '/image/jerseys/messi.jpg',
            active: true
          },
          {
                    
                    title: 'Haaland Jersey',
                    seller: 'medinajasonn',
                    price: 50,
                    club: 'Manchester City',
                    condition: 'New',
                    offers: 4,
                    image: '/image/jerseys/3.jpg',
                    active: true
                  },
                  {
                    title: 'Mbappe Jersey',
                    seller: 'medinajasonn',
                    price: 50,
                    club: 'PSG',
                    condition: 'New',
                    offers: 4,
                    image: '/image/jerseys/mbappe.jpg',
                    active: true
                  },
                  {
                    title: 'Gonzalez Pedri Jersey',
                    seller: 'medinajasonn',
                    price: 50,
                    club: 'FC Barcelona',
                    condition: 'New',
                    offers: 4,
                    image: '/image/jerseys/pedri.jpg',
                    active: true
                  },
                  {
                    title: 'Bellingham Jersey',
                    seller: 'medinajasonn',
                    price: 50,
                    club: 'Real Madrid',
                    condition: 'New',
                    offers: 4,
                    image: '/image/jerseys/1.jpg',
                    active: true
                  },
                  {
                    title: 'Chicharito Jersey',
                    seller: 'medinajasonn',
                    price: 50,
                    club: 'LA Galaxy',
                    condition: 'New',
                    offers: 4,
                    image: '/image/jerseys/2.jpg',
                    active: true
                  }
              ];


    const insertItems = async () => {
      try {
        for (const itemData of items) {
          const item = new Item(itemData);
          await item.save(); 
        }
        console.log('All items have been inserted');
      } catch (error) {
        console.error('Error inserting items:', error);
      }
      mongoose.disconnect(); 
    };
    
    insertItems(); 
    