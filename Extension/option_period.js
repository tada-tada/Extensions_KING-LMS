let retentionPeriodButton = document.getElementById("retentionPeriodButton");
retentionPeriodButton.addEventListener('click',() => {
	let retentionPeriod = document.querySelector("#retentionPeriodTable > tbody > tr:nth-child(2) > td > select").value;

	if(retentionPeriod == "1day") {
		retentionPeriod = 1*60*60*24*1000;		//1*60*60*24 = 1day
	}else if(retentionPeriod == "1week") {
		retentionPeriod = 1*60*60*24*7*1000;
	}else if(retentionPeriod == "1month") {
		retentionPeriod = 1*60*60*24*30*1000;
	}

	const retentionPeriod_key = "retentionPeriod";
	chrome.storage.local.set({ [retentionPeriod_key]: retentionPeriod });

	alert("課題の保存期間を登録しました。");
})
