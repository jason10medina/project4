// const { v4: uuidv4 } = require('uuid');
const mongoose = require('mongoose');
const { upload } = require('../middleware/fileUpload');

const itemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  seller: { type: String, required: true },
  price: { type: Number, required: true, min: 0.01 },
  club: { type: String, required: true }, 
  condition: { type: String, required: true, enum: ['New', 'Used', 'Refurbished'] }, 
  offers: { type: Number, default: 0 }, 
  image: { type: String, required: true },
  active: { type: Boolean, default: true }
});

const Items = mongoose.model('Item', itemSchema);

// module.exports = Items;


// const items = [
//     {
//       id: 1,
//       name: 'Leo Messi Jersey',
//       seller: 'medinajasonn',
//       price: 50,
//       club: 'Inter Miami FC',
//       condition: 'New',
//       offers: 4,
//       image: '/image/jerseys/messi.jpg',
//       active: true
//     },
//     {
//       id: 2,
//       name: 'Haaland Jersey',
//       seller: 'medinajasonn',
//       price: 50,
//       club: 'Manchester City',
//       condition: 'New',
//       offers: 4,
//       image: '/image/jerseys/3.jpg',
//       active: true
//     },
//     {
//       id: 3,
//       name: 'Mbappe Jersey',
//       seller: 'medinajasonn',
//       price: 50,
//       club: 'FC Barcelona',
//       condition: 'New',
//       offers: 4,
//       image: '/image/jerseys/mbappe.jpg',
//       active: true
//     },
//     {
//       id: 4,
//       name: 'Gonzalez Pedri Jersey',
//       seller: 'medinajasonn',
//       price: 50,
//       club: 'FC Barcelona',
//       condition: 'New',
//       offers: 4,
//       image: '/image/jerseys/pedri.jpg',
//       active: true
//     },
//     {
//       id: 5,
//       name: 'Bellingham Jersey',
//       seller: 'medinajasonn',
//       price: 50,
//       club: 'Real Madrid',
//       condition: 'New',
//       offers: 4,
//       image: '/image/jerseys/1.jpg',
//       active: true
//     },
//     {
//       id: 6,
//       name: 'Chicharito Jersey',
//       seller: 'medinajasonn',
//       price: 50,
//       club: 'LA Galaxy',
//       condition: 'New',
//       offers: 4,
//       image: '/image/jerseys/2.jpg',
//       active: true
//     }
//   ];
  
// const itemsModel = {
//     find: () => {
//         return items;
//     },

//     getItemById: (id) => {
//         return items.find(item => item.id === parseInt(id));
//     },

//     createItem: (newItemData) => {
//         const newItem = { id: items.length + 1, ...newItemData };
//         items.push(newItem);
//         return newItem;
//     },
    
//     deleteItem: (id) => {
//         const itemIndex = items.findIndex(item => item.id === parseInt(id));
//         if (itemIndex !== -1) {
//             items.splice(itemIndex, 1);
//             return true; // Return true to indicate successful deletion
//         }
//         return false;
//     }
// };

// exports.findById = id => items.find(item=>item.id===id);

// exports.updateById = function(id, newItem) {
//   const index = items.findIndex(item => item.id === parseInt(id));
//   if (index !== -1) {
//       // Update the item directly in the array
//       items[index] = { ...items[index], ...newItem };
//       return true;
//   } else {
//       return false;
//   }
// };

// exports.delete = function(id) {
//     let index = items.findIndex(item => item.id === id);
//     if(index !== -1) {
//         items.splice(index, 1);
//         return true;
//     } else {
//         return false;
//     }
// }

// exports.createItem = function(item) {
//     item.id = uuidv4();
//     item.offers = 0;
//     item.active = true;
//     items.push(item);
// }

// exports.getAllItems = () => {
   
//     return items.filter(item => item.active); 
// };


module.exports = Items;
