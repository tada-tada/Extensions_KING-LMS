async function showTaskList() {
	const onoffkey = "onoff";
	let onoff = (await chrome.storage.local.get([onoffkey])).onoff;

	if(onoff.taskListOnOff == "on") {
		const taskkey = "task";
		const taskData = (await chrome.storage.local.get(taskkey)).task;

		let calendar = document.getElementById("calendar");

		let taskList_details = document.createElement("details");
		let taskList_summary = document.createElement("summary");
		let taskList_strong = document.createElement("strong");
		taskList_strong.textContent = "課題一覧を表示する▽";

		calendar.appendChild(taskList_details);
		taskList_details.appendChild(taskList_summary);
		taskList_summary.appendChild(taskList_strong);

		let taskList = document.createElement("div");
		taskList.classList.add("kcg_prj_div");
		taskList.setAttribute("style","width: 100%; height: 500px; overflow-y: scroll; border: 1px #999999 solid;");
		taskList_details.appendChild(taskList);
		
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

			let taskList_taskUl = document.createElement("ul");
			taskList_taskElem.appendChild(taskList_taskUl);
			taskList_taskUl.classList.add("taskList_ul");
			
			//subject
			let taskList_subjectA = document.createElement("a");
			taskList_subjectA.textContent = "科目:"+taskList_subject;
			taskList_subjectA.style.fontWeight = "bold";
			taskList_subjectA.setAttribute('href', taskList_taskurl);
			taskList_subjectA.setAttribute("target","_blank");
			taskList_subjectA.setAttribute("rel","noopener noreferrer");
			let taskList_subjectLi = document.createElement("li");
			taskList_subjectLi.appendChild(taskList_subjectA);
			taskList_taskUl.appendChild(taskList_subjectLi);
	
			//title
			let taskList_titleLi = document.createElement("li");
			taskList_titleLi.textContent = "予定:"+taskList_title;
			taskList_taskUl.appendChild(taskList_titleLi);
	
			//limit
			let taskList_limitLi = document.createElement("li");
			taskList_limitLi.textContent = "期限:"+taskList_limit;
			taskList_taskUl.appendChild(taskList_limitLi);
		}

		//aquisition
		const taskList_acquisitionDateKey = "acquisitionDate";
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