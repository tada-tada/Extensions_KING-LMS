async function streamTaskCourseSave() {
	const stream = document.getElementsByClassName("element-details");

	//course
	let streamCourse = [];
	for(let i=0; i<stream.length; i++) {
		const streamElm = stream[i].getElementsByClassName("context ellipsis")[0].children[0];
		let course = new Course();
		if(streamElm.innerHTML.split("】").length !== 1) {
			course.subject = streamElm.innerHTML.split("】")[0] + "】";
		}else {
			course.subject = streamElm.innerHTML;
		}
		course.url = "https://king-lms.kcg.edu/auth-saml/saml/login?apId=_4_1&redirectUrl=https%3A%2F%2Fking-lms.kcg.edu%2Fultra%2Fcourses%2F" + streamElm.href.split("/")[5] + "%2Foutline";
	
		streamCourse.push(course);
	}
	const courseKey = "course";
	const storageCourse = (await chrome.storage.local.get([courseKey])).course;

	let allCourse = streamCourse.concat(storageCourse);
	allCourse = [...new Map(allTask.map(task => [JSON.stringify({ limit: task.limit, option: task.option, subject: task.subject, title: task.title, url: task.url }), task])).values()];

	await chrome.storage.local.set({[courseKey]: allCourse});

	//task
	let streamTask = [];
	for(let i=0; i<stream.length; i++) {
		if(stream[i].children[3].getElementsByClassName("due-date").length !== 0) {
			let subject = stream[i].children[1].children[0].textContent;
			let url = "https://king-lms.kcg.edu/auth-saml/saml/login?apId=_4_1&redirectUrl=https%3A%2F%2Fking-lms.kcg.edu%2Fultra%2Fcourses%2F" + stream[i].children[1].children[0].href.split("/")[5] + "%2Foutline";
			let title = stream[i].children[2].getElementsByClassName("js-title-link")[0].innerText.split(" : ").slice(1).join("");
			let limit = stream[i].children[3].getElementsByClassName("due-date")[0].children[0].children[0].textContent;
			limit = new Date(limit);
			limit = limit.getTime();

			let task = new Task();

			task.subject = subject;
			task.title = title;
			task.limit = limit;
			task.url = url;
			task.option = false;
			task.complet = false;

			streamTask.push(task);
		}
	}
	const taskKey = "task";
	const storageTask = (await chrome.storage.local.get([taskKey])).task;

	let allTask = streamTask.concat(storageTask);
	allTask = allTask = [...new Map(allTask.map(task => [JSON.stringify({ limit: task.limit, option: task.option, subject: task.subject, title: task.title, url: task.url }), task])).values()];
	allTask.sort((a, b) => new Date(a.limit) - new Date(b.limit));
	
	const retentionPeriod_key = "retentionPeriod";
	let retentionPeriod = (await chrome.storage.local.get([retentionPeriod_key]))[retentionPeriod_key];
	let now = new Date();
	now = now.getTime();
	now = now-retentionPeriod;
	allTask = allTask.filter(task => new Date(task.limit) > now);

	await chrome.storage.local.set({[taskKey]: allTask});

	//acquisitions
	const weekDay = ["日", "月", "火", "水", "木", "金", "土"];
	const today = new Date();
	const acquisitionDate = today.getFullYear()+"年" + (today.getMonth()+1)+"月" + today.getDate()+"日" + "("+weekDay[today.getDay()]+") " + today.getHours()+":" + today.getMinutes()+":" + today.getSeconds()+"";
	await chrome.storage.local.set({ "acquisitionDate": acquisitionDate });
}