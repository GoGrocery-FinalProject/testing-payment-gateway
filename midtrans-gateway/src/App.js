import logo from './logo.svg'
import './App.css'
import axios from 'axios'
import { useState } from 'react'

function App() {
	const [token, setToken] = useState('')
	const [link, setLink] = useState('')
	const getToken = () => {
		axios({
			url: 'http://localhost:3000',
			method: 'POST',
			data: {
				gross_amount: 100000,
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
			},
		})
			.then(({ data }) => {
				console.log(data)
				setLink(data.link)
				setToken(data.transactionToken)
			})
			.catch(console.log)
	}

	function goPayment() {
		window.snap.pay(token)
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
					Snap Method
				</button>
				{link ? (
					<button>
						<a href={link}>GO TO Midtrans Payment redirect method</a>
					</button>
				) : (
					<p></p>
				)}
			</header>
		</div>
	)
}

export default App
