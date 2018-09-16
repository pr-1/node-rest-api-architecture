var products = {

    getAll: function(req, res) {
      var allProducts = data; // Get Data from database in product model
      res.json(allProducts);
    },
  
    getOne: function(req, res) {
      var id = req.params.id;
      var product = data[0]; // Get Data from database in product model
      res.json(product);
    },
  
    create: function(req, res) {
      var newProduct = req.body;
      data.push(newProduct); // Add Data to database in product model
      res.json(newProduct);
    },
  
    update: function(req, res) {
      var updateProduct = req.body;
      var id = req.params.id;
      data[id] = updateProduct // Update Data in database in product model
      res.json(updateProduct);
    },
  
    delete: function(req, res) {
      var id = req.params.id;
      data.splice(id, 1) // Delete Data from database in product model
      res.json(true);
    }
  };
  
  // Custom data for database 
  // Try creating it as JSON as done in model/product
  var data = [{
    name: 'product 1',
    id: '1'
  }, {
    name: 'product 2',
    id: '2'
  }, {
    name: 'product 3',
    id: '3'
  }];
  
  module.exports = products;