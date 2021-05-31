const express = require('express')
const app = express()
const port = 3000
const cors = require('cors')
const midtransClient = require('midtrans-client')
const axios = require('axios')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

let snap = new midtransClient.Snap({
	isProduction: false,
	serverKey: 'SB-Mid-server-OkJLecqkB5bPgBQhcPsJCKWY',
	clientKey: 'SB-Mid-client-sW5AHuqn__lVIlq3',
})
app.post('/', (req, res) => {
	//bisa ambil dari req body
	let parameter = {
		transaction_details: {
			order_id: Math.round(new Date().getTime() / 1000),
			gross_amount: req.body.gross_amount,
		},
		//optional data details
		// kirim (arr of obj) cth: item_details: cart
		item_details: req.body.item_details,
		// optional data customernya
		// customer_details: {
		// 	first_name: 'John',
		// 	last_name: 'Watson',
		// 	email: 'test@example.com',
		// 	phone: '+628123456',
		// 	billing_address: {
		// 		first_name: 'John',
		// 		last_name: 'Watson',
		// 		email: 'test@example.com',
		// 		phone: '081 2233 44-55',
		// 		address: 'Sudirman',
		// 		city: 'Jakarta',
		// 		postal_code: '12190',
		// 		country_code: 'IDN',
		// 	},
		// },
		credit_card: {
			secure: true,
		},
	}

	snap.createTransaction(parameter).then((transaction) => {
		// send transaction token && link
		let link = transaction.redirect_url
		let transactionToken = transaction.token
		let clientKey = snap.apiConfig.clientKey
		res.status(200).json({ link, transactionToken, clientKey })
	})
})

app.get('/status', (req, res) => {
	console.log(req.body, '<<<<<<<<<<<<<<<<<<<<<<<<<')
	axios({
		url: `https://api.sandbox.midtrans.com/v2/${req.body.order_id}/status`,
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json',
			Authorization:
				'Basic ' +
				Buffer.from('SB-Mid-server-OkJLecqkB5bPgBQhcPsJCKWY').toString(
					'base64'
				),
		},
	})
		.then(({ data }) => {
			console.log(data)
			res.send(data)
		})
		.catch((err) => {
			console.log(err)
		})
})

app.post('/transaction', (req, res) => {
	let parameter = {
		transaction_details: {
			order_id: Math.round(new Date().getTime() / 1000),
			gross_amount: req.body.gross_amount,
		},
		//optional data details
		// kirim (arr of obj) cth: item_details: cart
		item_details: req.body.item_details,
		// optional data customernya
		// customer_details: {
		// 	first_name: 'John',
		// 	last_name: 'Watson',
		// 	email: 'test@example.com',
		// 	phone: '+628123456',
		// 	billing_address: {
		// 		first_name: 'John',
		// 		last_name: 'Watson',
		// 		email: 'test@example.com',
		// 		phone: '081 2233 44-55',
		// 		address: 'Sudirman',
		// 		city: 'Jakarta',
		// 		postal_code: '12190',
		// 		country_code: 'IDN',
		// 	},
		// },
		credit_card: {
			secure: true,
		},
	}
	snap.createTransaction(parameter).then((transaction) => {
		// send transaction token && link
		let link = transaction.redirect_url
		let transactionToken = transaction.token
		let clientKey = snap.apiConfig.clientKey
		res.status(200).json({ link, transactionToken, clientKey })
	})
	axios({
		url: `https://app.sandbox.midtrans.com/snap/v1/transactions`,
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json',
			Authorization:
				'Basic ' +
				Buffer.from('SB-Mid-server-OkJLecqkB5bPgBQhcPsJCKWY').toString(
					'base64'
				),
		},
		data: parameter,
	})
})

app.listen(port, () => {
	console.log('server listen to port ' + port)
})
