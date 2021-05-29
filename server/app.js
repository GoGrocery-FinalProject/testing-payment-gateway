const express = require('express')
const app = express()
const port = 3000
const cors = require('cors')
const midtransClient = require('midtrans-client')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get('/', (req, res) => {
	let snap = new midtransClient.Snap({
		isProduction: false,
		serverKey: 'SB-Mid-server-OkJLecqkB5bPgBQhcPsJCKWY',
		clientKey: 'SB-Mid-client-sW5AHuqn__lVIlq3',
	})

	//bisa ambil dari req body
	let parameter = {
		transaction_details: {
			order_id: Math.round(new Date().getTime() / 1000),
			gross_amount: 100000,
		},
		//optional buat ditampilin di UI nya midtrans direct link
		item_details: [
			{
				id: 'ITEM1',
				price: 100000,
				quantity: 1,
				name: 'Midtrans Bear',
				brand: 'Midtrans',
				category: 'Toys',
				merchant_name: 'Midtrans',
			},
		],
		customer_details: {
			first_name: 'John',
			last_name: 'Watson',
			email: 'test@example.com',
			phone: '+628123456',
			billing_address: {
				first_name: 'John',
				last_name: 'Watson',
				email: 'test@example.com',
				phone: '081 2233 44-55',
				address: 'Sudirman',
				city: 'Jakarta',
				postal_code: '12190',
				country_code: 'IDN',
			},
		},
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

app.listen(port, () => {
	console.log('server listen to port ' + port)
})
