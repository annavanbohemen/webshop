const User = require('./model')
const Router = require('express').Router
const router = new Router()
const bcrypt = require('bcrypt')


router.post('/users', (req, res) => {
  const user = {
	  email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 10)
  }
  User.create(user)
      .then(entity => {
  	res.send({
  		id: entity.id,
  		email: entity.email
  	})
  })
      .catch(err => {
  	res.status(500).send({
  		message: 'Something went wrong'
  	})
  })
})

router.get('/secret', (req, res) => {
	if (req.user) {
		res.send({
			message: `Welcome, you should be the user with email ${req.user.email}`
		})
	}
	else {
		res.status(401).send({
			message: 'Please login!'
		})
	}
})

module.exports = router
