export {
	checkLengthInput,
	createMessage,
	startApp
}

import {
	TEMPLATE,
	MAIN,
	SENDS,
	AUTHORIZATION,
	NAVIGATION,
	POPUP_SETTINGNAME,
} from "./variables.js"


import {
	sendCode
} from "./api/sendCode.js"

import {
	checkCode
} from "./api/checkCode.js"

import {
	settingName
} from "./api/settingName.js"

import {
	openWebSocket,
	socket
} from "./webSocket.js"

import {
	loadingHistory
} from "./api/history.js"


import {
	autoScroll,
	scrollTop
} from "./scroll.js"

import { leaveSession } from "./leave.js"

import Cookies from "js-cookie"

import {
	format,
	parseISO
} from "date-fns"


function startApp() {
	if (Cookies.get('token')) {
		avtorizationDialog.close()
		loadingHistory()
		openWebSocket()

		socket.onmessage = function (event) {
			console.log(`Получил`)
			const userInfo = JSON.parse(event.data)
			createMessage(userInfo)
		};
	} else {
		avtorizationDialog.showModal()
	}
}

function checkLengthInput(value) {
	if (value.length < 1) {
		throw new Error('Слишком коротко')
	} else {
		return value
	}
}

function createMessage(userInfo, flag = true) {

	const user = JSON.parse(Cookies.get('user'))
	const templateContent = TEMPLATE.templateMessage.content.cloneNode(true)
	templateContent.querySelector('#message').textContent = userInfo.text

	templateContent.querySelector('#me').textContent = userInfo.user.name
	templateContent.querySelector('.time-message').textContent = format(parseISO(userInfo.updatedAt), 'HH:mm')

	if (userInfo.user.email !== user.email) templateContent.querySelector('.message-i').classList.add('message-me')

	if (flag) {
		MAIN.mainMessage.append(templateContent)
		setTimeout(autoScroll, 100)

	} else {
		MAIN.mainMessage.prepend(templateContent)
	}
}


function sendMessage(event) {
	event.preventDefault()
	try {

		const user = JSON.parse(Cookies.get('user'))
		const textUser = checkLengthInput(SENDS.inputMessage.value)
		user.text = textUser

		socket.send(JSON.stringify({
			text: textUser
		}));

		socket.onmessage = function (event) {
			console.log(`Получил`)
			const userInfo = JSON.parse(event.data)
			createMessage(userInfo)
		};

	} catch (err) {
		console.log(err.message)
	}
	SENDS.sends.reset()
}

window.addEventListener('DOMContentLoaded', startApp)


AUTHORIZATION.getCodeBtn.addEventListener('click', sendCode)

AUTHORIZATION.codeBtn.addEventListener('click', event => {
	event.preventDefault()
	avtorizationDialog.close()
	getCodeDialog.showModal()
})

POPUP_SETTINGNAME.wrapGiveCode.addEventListener('submit', checkCode)

SENDS.sends.addEventListener('submit', sendMessage)

NAVIGATION.settignsChat.addEventListener('click', event => {
	settignsChatDialog.showModal()
})

POPUP_SETTINGNAME.wrapSettingName.addEventListener('submit', settingName)

document.querySelector('#login').addEventListener('click', leaveSession)

MAIN.mainMessage.addEventListener('scroll', scrollTop)