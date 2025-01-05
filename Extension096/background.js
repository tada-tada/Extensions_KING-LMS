class Task {
	constructor() {
		this.limit = '';
		this.option = '';
		this.subject = '';
		this.title = '';
		this.url = '';
	}
}

class OnOff {
	constructor() {
		this.importantNewsOnOff = 'on';
		this.taskCalendarOnOff = 'on';
		this.taskListOnOff = 'on';
		
	}
}

chrome.contextMenus.onClicked.addListener((info, tab) => {
	if (info.menuItemId === "openOptions") {
		chrome.runtime.openOptionsPage();
	}
});

chrome.runtime.onInstalled.addListener(() => {
	chrome.contextMenus.create({
		id: "openOptions",
		title: "オプションページを開く",
		contexts: ["all"]
	});
});

chrome.runtime.onInstalled.addListener((details) => {
	if (details.reason === "install") {
		const onoff = new OnOff();
		chrome.storage.local.set({ "onoff": onoff });

		const task = [];
		chrome.storage.local.set({ "task": task });

		const course = [];
		chrome.storage.local.set({ "course": course });

		const saveImportantNewsWord = ["行事","文化教養","体育行事","ハイキング","履修","単位","卒業","奨学","記念日","健康診断","学業","学期","提出","手続き","定期","実施"];
		chrome.storage.local.set({"importantWord": saveImportantNewsWord});

		const retentionPeriod = 2592000000;
		chrome.storage.local.set({"retentionPeriod": retentionPeriod});
	}
});