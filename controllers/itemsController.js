const Items = require('../models/items'); 
const { upload } = require('../middleware/fileUpload');
const { model, trusted } = require('mongoose');



function sendErrorResponse(res, statusCode, message) {
  res.status(statusCode).render('error', { error: message });
}

function escapeRegex(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}


// const itemsController = {

//   list: (req, res) => {
//     let items = itemsModel.find();
//     let query = req.query.query;

//     if(query) {
//         items = items.filter((item) => item.name.toLowerCase().includes(query.toLowerCase()) || item.club.toLowerCase().includes(query.toLowerCase()));
//     }

//     res.render('./items', { items });
// },

//   detail: (req, res) => {
//     const id = req.params.id;
//     const item = itemsModel.getItemById(id);
//     if (item) {
//         res.render('item', { item });
//     } else {
//         sendErrorResponse(res, 404, `Item with ID ${id} not found.`);
//     }
//   },


//   newItem: (req, res) => {
//     res.render('new');
//   },

  
//   create_post: (req, res) => {
//     const newItem = itemsModel.createItem(req.body);
//     if (newItem) {
//       res.redirect('/items');
//     } else {
//       res.status(400).render('error', { error: 'Error creating item' });
//     }
//   },

//   edit: (req, res) => {
//     const id = req.params.id;
//     const item = itemsModel.getItemById(id);
//     if (item) {
//         res.render('edit', { item });
//     } else {
//         res.status(404).send('Item not found');
//     }
// },

// update_post: (req, res) => {
//     const id = req.params.id;
//     const updatedData = req.body;
//     const result = itemsModel.updateById(id, updatedData);
//     if (result) {
//         res.redirect('/items/' + id);
//     } else {
//         res.status(404).send('Item not found');
//     }
// },

//   delete_post: (req, res) => {
//     const id = req.params.id;
//     const deleted = itemsModel.deleteItem(id);
//     if (deleted) {
//       res.redirect('/items');
//     } else {
//       res.status(404).render('error', { error: 'Item not found' });
//     }
//   },
// };


// exports.edit = (req, res) => {
//     let id = req.params.id;
//     let item = itemsModel.findById(id);
//     if(item) {
//         res.render('./items/edit', {item});
//     }
//     else {
//         res.status(404).send('Cannot find item with id ' + id);
//     }
// };

// exports.delete_post = (req,res) =>{
//     let id = req.params.id;
//     if(model.deleteById(id)){
//         res.redirect('/items');
//     }
//     else{
//         res.status(404).send('Cannot find item with id ' + id);
//     };
// }

// exports.create_post = (req, res) => {
//     let item = req.body;
//     item.image = '/image/jerseys/' + req.file.filename;
//     model.save(item);
//     res.redirect('/items');
//   },

exports.list = async (req, res) => {
  try {
    let query = {};
    if (req.query.query) {
      const regex = new RegExp(escapeRegex(req.query.query), 'gi');
      query = { $or: [{ title: regex }, { club: regex }], active: true };
    }

    const items = await Items.find(query).sort('title');
    res.render('./items', { items });
  } catch (error) {
    sendErrorResponse(res, 500, 'Server error retrieving items.');
  }
};

exports.detail = async (req, res) => {
  try {
    const item = await Items.findById(req.params.id);
    if (item) {
      res.render('item', { item });
    } else {
      sendErrorResponse(res, 404, `Item with ID ${req.params.id} not found.`);
    }
  } catch (error) {
    sendErrorResponse(res, 400, 'Invalid item ID format.');
  }
};

exports.create_post = async (req, res) => {
  let item = req.body;
  item.image = '/image/jerseys/' + req.file.filename;
  console.log(req.body);
  let itemsModel = new Items(item);
  itemsModel.save()
      .then(itemsModel => res.redirect('/items'))
      .catch((err) => {
        if(err.name === 'ValidatiomError') {
          err.status = 400;
        } 
        next(err);
      });
};


exports.edit = async (req, res) => {
  try {
    const item = await Items.findById(req.params.id);
    if (item) {
      res.render('edit', { item });
    } else {
      sendErrorResponse(res, 404, 'Item not found');
    }
  } catch (error) {
    sendErrorResponse(res, 400, 'Invalid item ID format.');
  }
};

exports.newItem = (req, res) => {
  res.render('new');
}

exports.update_post = async (req, res) => {
  let upd8 = req.body;
  let id = req.params.id;
  if(!id.match(/^[0-9a-fA-F]{24}$/)) {
    let err = new Error('Invalid item id');
    err.status = 400;
    return next(err);
  }
  if(req.file) {
    upd8.image= '/images/jerseys/' + req.file.filename;
  }
  console.log(upd8);
  itemsModel.findByIdAndUpdate(id, upd8, { useFindandModify: false }, { runValidators: true })
    .then(upd8 => { 
      if(upd8) {
        res.redirect('/items/' + id);
      }
      else {
        let err = new Error('Cannot find the requested item.');
        err.status = 404;
        next(err);
      }
    })
    .catch(err => {
      if(err.name === 'validationError') {
        err.status = 400;
      }
      next(err);
    });
};

exports.delete_post = async (req, res) => {
  try {
    const deletedItem = await Items.findByIdAndDelete(req.params.id);
    if (deletedItem) {
      res.redirect('/items');
    } else {
      sendErrorResponse(res, 404, 'Item not found for deletion.');
    }
  } catch (error) {
    sendErrorResponse(res, 400, 'Invalid item ID format.');
  }
};

