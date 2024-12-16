option_showTask();

const removeTaskButton = document.getElementById("removeTask_button");
removeTaskButton.addEventListener('click',async ()=>{
	const taskkey = "task";
	let allTask = (await chrome.storage.local.get([taskkey])).task;

	let removeTaskChecBox = document.getElementsByClassName("removeTaskChecBox");
	for(let i=0; i<removeTaskChecBox.length; i++) {
		if(removeTaskChecBox[i].checked == true) {
			delete allTask[i];
		}
	}
	allTask = allTask.filter(v => v);
	await chrome.storage.local.set({[taskkey]: allTask});

	removeTaskTable_removeTag();
	option_showTask();
});


async function option_showTask() {
	const key = "task";
	let allTask = (await chrome.storage.local.get([key])).task;
	for(let i=0; i<allTask.length; i++) {
		removeTaskTable_showTag(allTask[i], i);
	}
}

function removeTaskTable_showTag(taskData, i) {
	const removeTaskTable_show_subject = taskData.subject;
	const removeTaskTable_show_title = taskData.title;
	let removeTaskTable_show_limit = taskData.limit;

	removeTaskTable_show_limit = new Date(removeTaskTable_show_limit);
	removeTaskTable_show_limit = removeTaskTable_show_limit.toLocaleString("ja");

	let removeTaskTable = document.getElementById("removeTaskTable").children[0].children;

	//tr
	let removeTaskTable_tr = document.createElement("tr");
	removeTaskTable_tr.setAttribute("class", "removeTaskTable_tr");

	//checkbox
	let removeTaskTable_td_checkbox = document.createElement("td");
	removeTaskTable_tr.appendChild(removeTaskTable_td_checkbox);

	let removeTaskTable_checkbox = document.createElement("input");
	removeTaskTable_checkbox.setAttribute("type","checkbox");
	removeTaskTable_checkbox.setAttribute("class","removeTaskChecBox");
	removeTaskTable_checkbox.setAttribute("value","removeTaskTable_checkbox_"+i);
	removeTaskTable_td_checkbox.appendChild(removeTaskTable_checkbox);

	//subject
	let removeTaskTable_td_subject = document.createElement("td");
	removeTaskTable_tr.appendChild(removeTaskTable_td_subject);

	let removeTaskTable_subject = document.createElement("div");
	removeTaskTable_subject.innerHTML = removeTaskTable_show_subject;
	removeTaskTable_td_subject.appendChild(removeTaskTable_subject);

	//title
	let removeTaskTable_td_title = document.createElement("td");
	removeTaskTable_tr.appendChild(removeTaskTable_td_title);

	let removeTaskTable_title = document.createElement("div");
	removeTaskTable_title.innerHTML = removeTaskTable_show_title;
	removeTaskTable_td_title.appendChild(removeTaskTable_title);

	//limit
	let removeTaskTable_td_limit = document.createElement("td");
	removeTaskTable_tr.appendChild(removeTaskTable_td_limit);

	let removeTaskTable_limit = document.createElement("div");
	removeTaskTable_limit.innerHTML = removeTaskTable_show_limit;
	removeTaskTable_td_limit.appendChild(removeTaskTable_limit);

	//show
	removeTaskTable[(removeTaskTable.length-2)].before(removeTaskTable_tr);
}

//tag remove
function removeTaskTable_removeTag() {
	let removeTaskTable_tr = document.getElementsByClassName("removeTaskTable_tr");
	for(let i=removeTaskTable_tr.length-1; i>=0; i--) {
		removeTaskTable_tr[i].remove();
	}
}