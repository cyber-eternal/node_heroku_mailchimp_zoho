const express = require("express");
const router = express.Router();
const Zoho = require('node-zoho');

const request = require('superagent');


const User = require('../model/schemas/users.js');

let zoho = new Zoho({
	authToken: '87af71914e56ea21367bbfbfd74d1202'
});
const ZOHO_CRM_AUTH_KEY = '87af71914e56ea21367bbfbfd74d1202'
const zohorde = require('zohorde')(ZOHO_CRM_AUTH_KEY);

/////////////////
//mailchimp conf//
////////////////


var mailchimpInstance = 'us17',
	listUniqueId = '732c4205ee',
	mailchimpApiKey = '44fbb747c7ed3c5a846a262db615248e-us17';


let data = [];

router.post('/mail', (req, res, next) => {
	data.push(req.body);
	request
		.post('https://' + mailchimpInstance + '.api.mailchimp.com/3.0/lists/' + listUniqueId + '/members/')
		.set('Content-Type', 'application/json;charset=utf-8')
		.set('Authorization', 'Basic ' + new Buffer('any:' + mailchimpApiKey).toString('base64'))
		.send({
			'email_address': req.body.Email,
			'status': 'subscribed',
			'merge_fields': {
				'FNAME': req.body["Last Name"],
				'LNAME': req.body["First Name"]
			}
		})
		.end(function (err, response) {
			if (response.status < 300 || (response.status === 400 && response.body.title === "Member Exists")) {
				console.log('Success!');
				zoho.execute('crm', 'Leads', 'insertRecords', data, (err, result) => {
					if (err !== null) {
						console.log(err);
					} else if (result.isError()) {
						console.log(result.message);
					} else {
						req.body.zoho_id = result.data.Id;
						console.log(req.body);
						let dat = {
							firstname : req.body["First Name"],
							fullname : req.body["Full Name"],
							lastname : req.body["Last Name"],
							email : req.body.Email
						}
						let newUser = new User(dat);
						newUser.save().then(() => {
							res.json(200, {
								msg: 'Users list save to database'
							})
						}).catch((err) => {
							console.log(err);
						});
					}
				});
			} else {
				console.log('Failed :(');
			}
		});
});

//////////////////
// show all users /// // link localhost:3000/
//////////////////

router.get("/", (req, res, next) => {
	// User.find({}, (err, user) => {
	// 	if (err) throw err;
	// 	res.json(200, user);
	// });
	zoho.execute('crm', 'Leads', 'getRecords', null, (err, result) => {
		if (err !== null) {
			console.log(err);
		} else if (result.isError()) {
			console.log('the result error is: ' + result.message);
		} else {
			res.send(result.data);
		}
	});
});

/////////////////////
// show user by id ///// link localhost:3000/5a591ce1cb240a37c2616095
/////////////////////

router.get('/user/:id', (req, res, next) => {
	User.findById(req.params.id, (err, user) => {
		if (user) {
			// res.json(200, user);
			if (user.zoho_id) {
				let id = user.zoho_id;
				zoho.execute('crm', 'Leads', 'getRecords', {
					"fromIndex": 1,
					"toIndex": 1,
					"LEADID": id
				}, (err, result) => {
					if (err !== null) {
						console.log(err);
					} else if (result.isError()) {
						console.log('the result error is:' + result.message);
					} else {
						res.send(result.data);
					}
				});
			}
		} else {
			res.json(404, {
				msg: "User not found"
			})
		}

	});
});

//////////////////
// add user    ///link localhost:3000/add
//////////////////

// router.post("/add", (req, res, next) => {
// 	let records = [req.body];
// 	zoho.execute('crm', 'Leads', 'insertRecords', records, (err, result) => {
// 		if (err !== null) {
// 			console.log(err);
// 		} else if (result.isError()) {
// 			console.log(result.message);
// 		} else {
// 			req.body.zoho_id = result.data.Id;
// 			console.log(req.body);
// 			let newUser = new User(req.body);
// 			newUser.save().then(() => {
// 				res.json(200, {
// 					msg: 'Users list save to database'
// 				})
// 			}).catch((err) => {
// 				console.log(err);
// 			});
// 		}
// 	});
// });

/////////////////////////
// update  user by id   //////link localhost:3000/update/user/5a591ce1cb240a37c2616095
////////////////////////

router.put("/update/user/:id", (req, res, next) => {
	if (req.body) {
		User.findById(req.params.id, (err, user) => {
			if (user) {
				user.set(req.body);
				user.save(function (err, updatedUser) {
					let id = updatedUser.zoho_id;
					let moduleName = 'Leads';
					let data = {
						firstname : req.body["First Name"],
						fullname : req.body["Full Name"],
						lastname : req.body["Last Name"],
						email : req.body.Email
					}
					let params = {
						id: id,
						data: data
					};
					zohorde.update(moduleName, params);
					res.send(updatedUser)
				});
			} else {
				res.json(204, {
					msg: "User not found"
				})
			}
		});
	} else {
		res.json(204, {
			msg: "What you want to change"
		})
	}
});


/////////////////////////
// delet  user by id   /// ////link localhost:3000/delete/user/5a591ce1cb240a37c2616095
////////////////////////


router.delete("/delete/user/:id", (req, res, next) => {
	User.findById(req.params.id, (err, user) => {
		if (user) {
			let id = user.zoho_id;
			user.remove((err) => {
				if (err) throw err;
				zoho.execute('crm', 'Leads', 'getRecords', {
					"fromIndex": 1,
					"toIndex": 1,
					"LEADID": id
				}, (err, result) => {
					if (err !== null) {
						console.log(err);
					} else if (result.isError()) {
						console.log(result.message);
					} else {
						console.log(result.data);
					}
				});
				res.json(200, {
					msg: "User removed"
				});
			});
		} else {
			res.json(404, {
				msg: "User not found"
			});
		}
	});
});


module.exports = router;