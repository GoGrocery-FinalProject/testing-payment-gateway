import logo from './logo.svg'
import './App.css'
import axios from 'axios'
import midtransClient from 'midtrans-client'
import { useState } from 'react'

let snap = new midtransClient.Snap({
	isProduction: false,
	serverKey: 'SB-Mid-server-OkJLecqkB5bPgBQhcPsJCKWY',
	clientKey: 'SB-Mid-client-sW5AHuqn__lVIlq3',
})

function App() {
	const [token, setToken] = useState('')
	const [link, setLink] = useState('')
	const getToken = () => {
		axios({
			url: 'http://localhost:3000',
			method: 'GET',
		})
			.then(({ data }) => {
				console.log(data)
				setLink(data.link)
				setToken(data.transactionToken)
				// snap.pay(data.transactionToken)
			})
			.catch(console.log)
	}

	function goPayment() {
		//belum solved
		snap.pay(token)
	}
	return (
		<div className="App">
			<header className="App-header">
				<img src={logo} className="App-logo" alt="logo" />
				<p>
					Edit <code>src/App.js</code> and save to reload.
				</p>
				<button
					onClick={() => {
						getToken()
					}}
				>
					getToken
				</button>
				<button
					onClick={() => {
						goPayment()
					}}
				>
					payment
				</button>
				{link ? (
					<button>
						<a href={link}>GO TO Midtrans Payment</a>
					</button>
				) : (
					<p></p>
				)}
			</header>
		</div>
	)
}

export default App
