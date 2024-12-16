async function saveTask() {
	const ms = 1000;
	const bb_taskInterval = setInterval(() => {
		clearInterval(bb_taskInterval);
	}, ms);

	const taskkey = "task";

	//storage
	let tmp = [];
	if(Object.keys((await chrome.storage.local.get(taskkey))).length !== 0) {
		tmp = (await chrome.storage.local.get(taskkey)).task;
	}
	const storageTask = tmp;

	//deadline
	const task = document.getElementsByClassName("element-details");
	let deadlineTask = [];
	for(let i=0; i<task.length; i++) {
		let task_tmp = new Task();

		task_tmp.subject = task[i].children[1].children[2].innerText;
		task_tmp.title = task[i].children[0].children[0].innerText;
		task_tmp.limit = task[i].children[1].children[0].innerText;
		task_tmp.url = task[i].children[1].children[2].href;
		task_tmp.option = false;
		
		task_tmp.subject = task_tmp.subject.split(" : ")[1];
		
		task_tmp.limit = task_tmp.limit.split(" : ")[1];
		task_tmp.limit = new Date(task_tmp.limit);
		task_tmp.limit = task_tmp.limit.getTime();
		
		task_tmp.url = task_tmp.url.toString();
		task_tmp.url = task_tmp.url.split("/");
		task_tmp.url = "https://king-lms.kcg.edu/auth-saml/saml/login?apId=_4_1&redirectUrl=https%3A%2F%2Fking-lms.kcg.edu%2Fultra%2Fcourses%2F"+task_tmp.url[5]+"%2Foutline";

		deadlineTask.push(task_tmp);
	}

	//storage and deadline
	let allTask = deadlineTask.concat(storageTask);
	allTask = [...new Set(allTask.map(JSON.stringify))].map(JSON.parse);
	allTask.sort((a, b) => new Date(a.limit) - new Date(b.limit));

	const retentionPeriod_key = "retentionPeriod";
	let retentionPeriod = (await chrome.storage.local.get([retentionPeriod_key]))[retentionPeriod_key];
	allTask = deleteOverDeadlineTask(allTask, retentionPeriod);
	await chrome.storage.local.set({[taskkey]: allTask});

	const weekDay = ["日", "月", "火", "水", "木", "金", "土"];
	const today = new Date();
	const acquisitionDate = today.getFullYear()+"年" + (today.getMonth()+1)+"月" + today.getDate()+"日" + "("+weekDay[today.getDay()]+") " + today.getHours()+":" + today.getMinutes()+":" + today.getSeconds()+"";
	chrome.storage.local.set({ "acquisitionDate": acquisitionDate });
}

function deleteOverDeadlineTask(allTask, retentionPeriod) {
	let now = new Date();
	now = now.getTime();
	retentionPeriod = now-retentionPeriod;
	
	for(let i=0; i<allTask.length; i++) {
		if(allTask[i].limit < retentionPeriod) {
			delete allTask[i];
		}
	}
	allTask = allTask.filter(v => v);

	return allTask;
}