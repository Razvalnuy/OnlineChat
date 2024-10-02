import {
	sends,
	mainMessage,
	inputMessage,
	templateMessage
} from "./variables.js"


function createMessage(value) {
	const templateContent = templateMessage.content.cloneNode(true)
	templateContent.querySelector('#message').textContent = value
	mainMessage.append(templateContent)
}

function checkLengthInput(value) {
	if (value.length < 1) return true
}



function sendMessage(event) {
	event.preventDefault()
	const textUser = inputMessage.value
	if (checkLengthInput(textUser)) {
		alert(`Ничего ?`)
		return
	}
	createMessage(textUser)
	console.log(`sendMessage`)

	sends.reset()
}

sends.addEventListener('submit', sendMessage)