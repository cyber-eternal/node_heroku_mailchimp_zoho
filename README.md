# node_mongo_restApi_herocu_mLab

Rest api on express and mongodb

run npm i



  	For show all users lists send GET request localhost:3000/
	
	For search user list by id send GET request  localhost:3000/user/`user id	
					(localhost:3000/delete/user/5a591ce1cb240a37c2616095)
	
	For add user list send POST request  localhost:3000/add  and send request body 
							name and surname is required
							({
							"name":"John",
							"surname": "Smith",
							"country":"England",
							"city":	"London",
							"postal_code":"54894313",
							"address1":"ud556/5",
							"address2":"ud556/5",
								})

	 For update user list by id send PUT request localhost:3000/update/user/`user id`
					(localhost:3000/update/user/5a591ce1cb240a37c2616095)

	 For delete user list by id send DELETE request localhost:3000/delete/`user id`
					(localhost:3000/delete/user/5a591ce1cb240a37c2616095)

	
