import Cookies from "js-cookie"
import {
	checkLengthInput
} from "../send.js"
import {
	checkCode
} from "./checkCode.js"
export {
	settingName
}

import {
	POPUP_SETTINGNAME
} from "../variables.js"

import {
	openWebSocket,
	socket
} from "../webSocket.js"

import { createMessage } from "../send.js"

async function settingName(event) {
	event.preventDefault()
	settignsChatDialog.showModal()
	const newName = POPUP_SETTINGNAME.inputName.value

	try {
		const response = await fetch(` https://edu.strada.one/api/user`, {
			method: "PATCH",
			headers: {
				'Content-type': 'application/json; charset=UTF-8',
				Authorization: `Bearer ${Cookies.get('token')}`,
			},
			body: JSON.stringify({
				name: checkLengthInput(newName)
			})
		})

		if (!response.ok) throw new Error('Не валидное имя!')
		console.log(`res`, response)
		settignsChatDialog.close()

		const date = await response.json()
		console.log(`Имя сменено на`, date)
		POPUP_SETTINGNAME.wrapSettingName.reset()
	
		socket.close(1000, `Для смены имени на ${date.name}`)

		openWebSocket()
		socket.onmessage = function (event) {
			console.log(`Получил`)
			const userInfo = JSON.parse(event.data)
			createMessage(userInfo)
		};

		// await checkCode()
	} catch (err) {
		console.log(err.message);
		settignsChatDialog.showModal()
	}
}