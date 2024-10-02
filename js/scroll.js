import {
	createMessage
} from "./send.js";
import {
	MAIN,
} from "./variables.js";

export {
	autoScroll,
	scrollTop
}

function autoScroll() {
	MAIN.mainMessage.scrollBy({
		top: 4e10,
		behavior: 'smooth',
	})
}

function scrollTop() {
	if (MAIN.mainMessage.scrollTop !== 0) return

	console.log(`Гружу историю...`)
	const allHistory = JSON.parse(localStorage.getItem('messages'))
	if (allHistory) {
		const lastHistory = allHistory.splice(0, 20)
		localStorage.setItem('messages', JSON.stringify(allHistory))
		console.log(`history`, allHistory)
		if (lastHistory.length === 0) {
			checkingHistory()
			return
		} else {
			for (const userInfo of lastHistory) {
				createMessage(userInfo, false)
			}
		}
	
		MAIN.mainMessage.scrollBy(0, 1520)
	}
}

function checkingHistory() {
	const load = document.createElement('div')
	load.textContent = 'Вся история загружена'
	load.classList.add('lastHistory')
	MAIN.mainMessage.prepend(load)
	MAIN.mainMessage.removeEventListener('scroll', scrollTop)
}