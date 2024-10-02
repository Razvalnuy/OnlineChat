export {
	TEMPLATE,
	MAIN,
	SENDS,
	URL,
	AUTHORIZATION,
	NAVIGATION,
	POPUP_SETTINGNAME,
}

//? url

const URL = 'https://edu.strada.one/api'

//? template
const TEMPLATE = {
	templateMessage: document.querySelector('#templateMessage'),
	text: templateMessage.querySelector('#message')
}

//? main
const MAIN = {
	mainMessage: document.querySelector('.main-message')
}

//? sends
const SENDS = {
	sends: document.querySelector('#sends'),
	inputMessage: document.querySelector('.input-message')
}

//?Avtorization
const AUTHORIZATION = {
	wrapGetCode: document.querySelector('#wrap-getCode'),
	getCodeBtn: document.querySelector('#get-code'),
	inputMail: document.querySelector('.input-mail-code'),
	inputGiveСode: document.querySelector('#give-code'),
	codeBtn: document.querySelector('#code-btn'),
	wrapGiveCode: document.querySelector('#wrapGiveCode')
}


const NAVIGATION = {
	settignsChat: document.querySelector('#settigns-chat')
}


const POPUP_SETTINGNAME = {
	wrapGiveCode: document.querySelector('#wrapGiveCode'),
	wrapSettingName: document.querySelector('#wrapSettingName'),
	inputName: document.querySelector('.input-name')
}