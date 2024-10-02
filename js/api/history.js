export {
	loadingHistory
}

import Cookies from "js-cookie"

import {
	autoScroll,
	scrollTop
} from "../scroll.js"

import { MAIN } from "../variables.js"

async function loadingHistory() {
	console.log(`testLoadingHistory`)
	MAIN.mainMessage.textContent = ''
	try {
		const response = await fetch('https://edu.strada.one/api/messages/', {
			method: "GET",
			headers: {
				'Content-type': 'application/json; charset=UTF-8',
				Authorization: `Bearer ${Cookies.get('token')}`,
			}
		})
		if (!response.ok) throw new Error('Не получилось получить историю!')
		let data = await response.json()
		const allHistory = data.messages.reverse()
		localStorage.setItem('messages', JSON.stringify(allHistory.reverse()))

		scrollTop()
		
		setTimeout(autoScroll, 100)
	} catch (err) {
		console.log(err.message);
	}
}