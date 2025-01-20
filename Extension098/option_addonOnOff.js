var addonOnOffButton = document.getElementById("addonOnOffButton");
addonOnOffButton.addEventListener('click', () => {
	//calender
	let taskCalendarOnOff = "";
	if(document.querySelector("#addonOnOff > tbody > tr:nth-child(1) > td > label:nth-child(1) > input").checked){
		taskCalendarOnOff = "on";
	}else {
		taskCalendarOnOff = "off";
	}

	//list
	let taskListOnOff = "";
	if(document.querySelector("#addonOnOff > tbody > tr:nth-child(2) > td > label:nth-child(1) > input").checked){
		taskListOnOff = "on";
	}else {
		taskListOnOff = "off";
	}

	//important
	let importantNewsOnOff = "";
	if(document.querySelector("#addonOnOff > tbody > tr:nth-child(3) > td > label:nth-child(1) > input").checked){
		importantNewsOnOff = "on";
	}else {
		importantNewsOnOff = "off";
	}

	let onoff = new OnOff();
	onoff.taskCalendarOnOff = taskCalendarOnOff;
	onoff.taskListOnOff = taskListOnOff;
	onoff.importantNewsOnOff = importantNewsOnOff;
	chrome.storage.local.set({ onoff });

	alert("拡張機能の on/off を設定しました");
});