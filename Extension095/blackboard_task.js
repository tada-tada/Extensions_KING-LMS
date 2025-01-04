async function saveTask() {
	const ms = 500;
	const bb_taskInterval = setInterval(() => {
		clearInterval(bb_taskInterval);
	}, ms);

	//storage
	const taskKey = "task";
	const storageTask = (await chrome.storage.local.get(taskKey)).task;

	const courseKey = "course";
	const storageCourse = (await chrome.storage.local.get([courseKey])).course;

	//deadline
	const task = document.getElementsByClassName("element-details");
	let deadlineTask = [];
	let deadlineCourse = [];
	for(let i=0; i<task.length; i++) {
		//task
		let task_tmp = new Task();
		
		task_tmp.subject = task[i].children[1].children[2].innerText;
		task_tmp.title = task[i].children[0].children[0].innerText;
		task_tmp.limit = task[i].children[1].children[0].innerText;
		task_tmp.url = task[i].children[1].children[2].href;
		task_tmp.option = false;
		task_tmp.complet = false;
		
		task_tmp.subject = task_tmp.subject.split(" : ").slice(1).join("");
		
		task_tmp.limit = task_tmp.limit.split(" : ")[1];
		task_tmp.limit = new Date(task_tmp.limit);
		task_tmp.limit = task_tmp.limit.getTime();
		
		task_tmp.url = task_tmp.url.toString();
		task_tmp.url = task_tmp.url.split("/");
		task_tmp.url = "https://king-lms.kcg.edu/auth-saml/saml/login?apId=_4_1&redirectUrl=https%3A%2F%2Fking-lms.kcg.edu%2Fultra%2Fcourses%2F"+task_tmp.url[5]+"%2Foutline";

		//course
		let course_tmp = new Course();
		if(task[i].children[1].children[2].innerText.split(" : ")[1].split("【").length !== 1) {
			course_tmp.subject = task[i].children[1].children[2].innerText.split(" : ").slice(1).join("").split("】")[0]+"】";
		}else {
			course_tmp.subject = task[i].children[1].children[2].innerText.split(" : ").slice(1).join("");
		}
		course_tmp.url = task_tmp.url;

		deadlineTask.push(task_tmp);
		deadlineCourse.push(course_tmp);
	}

	//task
	let allTask = deadlineTask.concat(storageTask);
	allTask = [...new Map(allTask.map(task => [JSON.stringify({ limit: task.limit, option: task.option, subject: task.subject, title: task.title, url: task.url }), task])).values()];
	allTask.sort((a, b) => new Date(a.limit) - new Date(b.limit));

	const retentionPeriod_key = "retentionPeriod";
	let retentionPeriod = (await chrome.storage.local.get([retentionPeriod_key]))[retentionPeriod_key];
	let now = new Date();
	now = now.getTime();
	now = now-retentionPeriod;
	allTask = allTask.filter(task => new Date(task.limit) > now);

	await chrome.storage.local.set({[taskKey]: allTask});

	//course
	let allCourse = deadlineCourse.concat(storageCourse);
	allCourse = [...new Set(allCourse.map(JSON.stringify))].map(JSON.parse);

	await chrome.storage.local.set({[courseKey]: allCourse});

	//acquisitions
	const weekDay = ["日", "月", "火", "水", "木", "金", "土"];
	const today = new Date();
	const acquisitionDate = today.getFullYear()+"年" + (today.getMonth()+1)+"月" + today.getDate()+"日" + "("+weekDay[today.getDay()]+") " + today.getHours()+":" + today.getMinutes()+":" + today.getSeconds()+"";
	chrome.storage.local.set({ "acquisitionDate": acquisitionDate });
}