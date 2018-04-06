const Router = require('express').Router
const Product = require('./model')
const bodyParser = require('body-parser')
const router = new Router()


router.use(bodyParser.json())

router.get('/products', (request, response) => {

  Product.findAll({
    attributes: ['id', 'name', 'price']
  })
    .then(products => {
      response.send({products})
    })
    .catch(err => {
      response.status(500).send({
        message: 'something is really wrong!'
      })
    })
})

router.get('/products/:id', (request, response) => {
  const productId = request.params.id

  Product.findById(productId)
  .then(result => {
     if (result) {
       response.send(result)
     }
     else {
       response.status(404).send({
         message: 'Product not found!'
       })
     }
   })
  .catch(err => {
    response.status(500).send({
      message: 'something is really wrong!'
    })
  })
})

router.post('/products', (request, response) => {
  const product = request.body
  console.log(product)

  Product.create(product)
  .then(newProduct => {
    response.status(201).send(newProduct)
  })
  .catch(err => {
    response.status(500).send({
      message: 'something is really wrong!'
    })
})
})

router.put('/products/:id', (request, response) => {
  const productId = Number(request.params.id)
  const updates = request.body

  Product.findById(productId)
  .then(product => {
    product.update(updates)

      .then(updatedProduct => {
        response.send(updatedProduct)
      })
      .catch(err => {
        response.status(404).send({
          message: 'Product not found!'
        })
      })
    .catch(err => {
      response.status(500).send({
      message: 'something is really wrong!'
      })
    })
  })
})

router.delete('/products/:id', (req, res) => {
  const productId = Number(req.params.id)

  Product.findById(productId)
	  .then(entity => {
	    return entity.destroy()
	  })
	  .then(_ => {
	    res.send({
	      message: 'The product was deleted succesfully'
	    })
	  })
	  .catch(error => {
	    res.status(500).send({
	      message: `Something went wrong`,
	      error
	    })
	  })
})


module.exports = router
