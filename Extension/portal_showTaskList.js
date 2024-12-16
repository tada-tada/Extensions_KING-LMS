async function showTaskList() {
	const onoffkey = "onoff";
	let onoff = (await chrome.storage.local.get([onoffkey])).onoff;

	if(onoff.taskListOnOff == "on") {
		const taskkey = "task";
		const taskData = (await chrome.storage.local.get(taskkey)).task;

		let taskList = document.createElement("div");
		taskList.classList.add("kcg_prj_div");

		let calendar = document.getElementById("calendar");
		calendar.appendChild(taskList);

		for(let i=0; i<taskData.length; i++) {
			const taskList_subject = taskData[i].subject;
			const taskList_title = taskData[i].title;
			let taskList_limit = taskData[i].limit;
			const taskList_taskurl = taskData[i].url;

			taskList_limit = new Date(taskList_limit);
			taskList_limit = taskList_limit.toLocaleString("ja");

			let taskList_taskElem = document.createElement("div");
			taskList.appendChild(taskList_taskElem);
			taskList_taskElem.classList.add("taskList");

			//subject
			let taskList_subjectElem = document.createElement("a");
			taskList_subjectElem.textContent = "科目:"+taskList_subject;
			taskList_taskElem.appendChild(taskList_subjectElem);
			taskList_subjectElem.style.fontWeight = "bold";
			taskList_subjectElem.setAttribute('href', taskList_taskurl);
			taskList_subjectElem.setAttribute("target","_blank");
			taskList_subjectElem.setAttribute("rel","noopener noreferrer");

			//title
			let taskList_titleElem  = document.createElement("h5");
			taskList_titleElem.textContent = "予定:"+taskList_title;
			taskList_taskElem = taskList.children[i];
			taskList_taskElem.appendChild(taskList_titleElem);

			//limit
			let taskList_limitElem  = document.createElement("h5");
			taskList_limitElem.textContent = "期限:"+taskList_limit;
			taskList_taskElem = taskList.children[i];
			taskList_taskElem.appendChild(taskList_limitElem);
		}
		let taskList_textElem  = document.createElement("div");
		taskList_textElem.textContent = "課題データ一覧";
		taskList.prepend(taskList_textElem);

		//acquisition
		const taskList_acquisitionDateKey = "acquisitionDate"
		const taskList_taskAcquisitionDate = ( await chrome.storage.local.get([taskList_acquisitionDateKey]))[taskList_acquisitionDateKey];
		let taskList_acquisitionDateElem  = document.createElement("div");
		taskList.prepend(taskList_acquisitionDateElem);

		if(typeof taskList_taskAcquisitionDate === "undefined") {
			taskList_acquisitionDateElem.textContent = "課題が保存されていません";
		}else {
			taskList_acquisitionDateElem.textContent = "最終データ更新日時：" + taskList_taskAcquisitionDate;
		}
	}
}