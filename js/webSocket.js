export {
	openWebSocket,
	socket
}

import Cookies from "js-cookie";

let socket = ''

function openWebSocket() {
	socket = new WebSocket(`wss://edu.strada.one/websockets?${Cookies.get('token')}`);

	socket.onclose = (event) => {
		if (event.wasClean) {
			console.log(`Соединение закрыто чисто, код:${event.code} причина: ${event.reason}`);
		}
	};
}