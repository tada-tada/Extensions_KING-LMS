optionSetting();

async function optionSetting() {
	const settingRetentionPeriod_key = "retentionPeriod";
	const settingRetentionPeriod = (await chrome.storage.local.get([settingRetentionPeriod_key]))[settingRetentionPeriod_key];
	if(settingRetentionPeriod == 86400000) {			//1day
		document.querySelector("#retentionPeriodTable > tbody > tr:nth-child(1) > td > select").options[0].selected = true;
	}else if(settingRetentionPeriod == 604800000) {		//1week
		document.querySelector("#retentionPeriodTable > tbody > tr:nth-child(1) > td > select").options[1].selected = true;
	}else if(settingRetentionPeriod == 2592000000) {	//1month
		document.querySelector("#retentionPeriodTable > tbody > tr:nth-child(1) > td > select").options[2].selected = true;
	}

	//on/off calerndar
	const onoffKey = "onoff";
	const setting_onoff = (await chrome.storage.local.get([onoffKey])).onoff;
	if(setting_onoff.taskCalendarOnOff == "on") {
		document.querySelector("#addonOnOff > tbody > tr:nth-child(1) > td > label:nth-child(1) > input").checked = true;
	}else {
		document.querySelector("#addonOnOff > tbody > tr:nth-child(1) > td > label:nth-child(2) > input").checked = true;
	}

	//on/off list
	if(setting_onoff.taskListOnOff == "on") {
		document.querySelector("#addonOnOff > tbody > tr:nth-child(2) > td > label:nth-child(1) > input").checked = true;
	}else {
		document.querySelector("#addonOnOff > tbody > tr:nth-child(2) > td > label:nth-child(2) > input").checked = true;
	}

	//on/off important
	if(setting_onoff.importantNewsOnOff == "on") {
		document.querySelector("#addonOnOff > tbody > tr:nth-child(3) > td > label:nth-child(1) > input").checked = true;
	}else {
		document.querySelector("#addonOnOff > tbody > tr:nth-child(3) > td > label:nth-child(2) > input").checked = true;
	}

	//important show
	const importantWordKey = "importantWord";
	const importantWord = ( (await chrome.storage.local.get([importantWordKey])).importantWord);
	importantNewsWordEdit_show(importantWord);
}