const addTaskButton = document.getElementById("addTaskButton");
addTaskButton.addEventListener('click',async ()=>{
	const subject = document.querySelector("#addTaskTable > tbody > tr:nth-child(2) > td > label > input[type=text]").value;
	const title = document.querySelector("#addTaskTable > tbody > tr:nth-child(3) > td > label > input[type=text]").value;
	let limitymd = document.querySelector("#addTaskTable > tbody > tr:nth-child(4) > td > label > input[type=date]").value;
	const limittime = document.querySelector("#addTaskTable > tbody > tr:nth-child(4) > td > input[type=time]").value;
	const taskurl = document.querySelector("#addTaskTable > tbody > tr:nth-child(5) > td > label > input[type=text]").value;

	if(subject != '' && title != '' && limitymd != '' && limittime != '') {
		limitymd = limitymd.split("-").join("/");
		let limit = limitymd+" "+limittime;
		limit = new Date(limit).getTime();

		let task_tmp = new Task();
		task_tmp.subject = subject;
		task_tmp.title = title;
		task_tmp.limit = limit;
		task_tmp.url = taskurl;
		task_tmp.option = true;

		const taskkey = "task";
		let allTask = (await chrome.storage.local.get([taskkey])).task;
		allTask.push(task_tmp);
		allTask = [...new Set(allTask.map(JSON.stringify))].map(JSON.parse);
		allTask.sort((a, b) => new Date(a.limit) - new Date(b.limit));
		await chrome.storage.local.set({[taskkey]: allTask});
	}else {
		alert("少なくともURL以外は入力してください。");
	}
	removeTaskTable_removeTag();
	option_showTask();
});