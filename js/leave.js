export {
	leaveSession
}

import {
	openWebSocket,
	socket
} from "./webSocket.js"
import {
	checkCode
} from "./api/checkCode.js"

import { loadingHistory } from "./api/history.js"
import { createMessage, startApp } from "./send.js"
import Cookies from "js-cookie"



function leaveSession() {
	socket.close(1000, 'Вы закрыли и покинули чат')
	socket = ''
	console.log(socket)
	Cookies.remove('token')
	Cookies.remove('user')
	localStorage.removeItem('messages')
	avtorizationDialog.showModal()
}