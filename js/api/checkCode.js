export {
	checkCode
}

import {
	AUTHORIZATION
} from "../variables.js"

import {
	openWebSocket,
	socket
} from "../webSocket.js"

import {
	loadingHistory
} from "./history.js"

import { createMessage } from "../send.js"

import Cookies from "js-cookie"

async function checkCode(event) {
	if (event) event.preventDefault()

	const token = AUTHORIZATION.inputGiveСode.value

	const checkToken = token || Cookies.get('token')
	try {
		const response = await fetch(`https://edu.strada.one/api/user/me`, {
			method: "GET",
			headers: {
				'Content-type': 'application/json; charset=UTF-8',
				Authorization: `Bearer ${checkToken}`,
			},
		})

		if (!response.ok) throw new Error('Не валидный токен!')
		getCodeDialog.close()
		Cookies.set('token', checkToken)
		const date = await response.json()
		Cookies.set('user', JSON.stringify(date))

		loadingHistory()
		if (socket.readyState === 3 || !socket) { 
			await loadingHistory()
			openWebSocket()

			socket.onmessage = function (event) {
				console.log(`Получил`)
				const userInfo = JSON.parse(event.data)
				createMessage(userInfo)
			};
		}

	} catch (err) {
		console.log(err.message);
	}
}