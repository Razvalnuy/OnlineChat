export {
	sendCode
}
import {
	checkLengthInput

} from "../send.js"
import {
	URL,
	AUTHORIZATION
} from "../variables.js"

async function sendCode(event) {
	event.preventDefault()

	const text = AUTHORIZATION.inputMail.value

	try {
		const response = await fetch(`${URL}/user`, {
			method: "POST",
			headers: {
				'Content-type': 'application/json; charset=UTF-8'
			},
			body: JSON.stringify({
				email: checkLengthInput(text)
			}),
		})

		if (!response.ok) throw new Error('Не валидная почта!')
		avtorizationDialog.close()
		getCodeDialog.showModal()
		const date = await response.json()
		console.log(`date`, date)
	} catch (err) {
		alert(err.message);
	} finally {
		AUTHORIZATION.wrapGetCode.reset()
	}
}