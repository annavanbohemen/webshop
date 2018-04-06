const User = require('./model')
const Router = require('express').Router
const router = new Router()
const bcrypt = require('bcrypt')
const sign = require('../jwt').sign


router.post('/logins', (req, res) => {
  User.findOne({
		where: {
			email: req.body.email
		}
	})
	.then(entity => {
		if (bcrypt.compareSync(req.body.password, entity.password)) {
console.log(entity);
      res.send({
				jwt: sign(entity.id)
			})
		}
		else {
			res.status(400).send({
				message: 'Password was incorrect'
			})
		}
	})
	.catch(err => {
		console.error(err)
		res.status(500).send({
			message: 'Something went wrong'
		})
	})
})

module.exports = router
