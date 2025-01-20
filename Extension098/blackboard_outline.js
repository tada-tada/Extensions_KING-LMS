async function outline() {
	const container = document.getElementsByClassName("click-to-invoke-container");

	//task
	let outlineTask = [];
	for(let i=0; i<container.length; i++) {
		if(typeof container[i].children[0].children[1] !== "undefined" && typeof container[i].children[0].children[1].children[2] !== "undefined" && typeof container[i].children[0].children[1].children[2].children[0] !== "undefined") {
			let task = new Task();
			task.subject = document.getElementsByClassName("js-header-text")[0].innerText;
			task.title = container[i].getElementsByClassName("ax-focusable-title")[0].innerText;
			task.limit = container[i].children[0].children[1].children[2].children[0].innerText;
			task.url = "https://king-lms.kcg.edu/auth-saml/saml/login?apId=_4_1&redirectUrl=https%3A%2F%2Fking-lms.kcg.edu%2Fultra%2Fcourses%2F"+location.href.split("/")[5]+"%2Foutline";
			task.option = false;
			task.complet = false;

			task.limit = task.limit.split(" : ")[1];
			task.limit = new Date(task.limit);
			task.limit = task.limit.getTime();

			outlineTask.push(task);
		}
	}
	const taskKey = "task";
	const storageTask = (await chrome.storage.local.get(taskKey)).task;

	let allTask = outlineTask.concat(storageTask);
	allTask = allTask = [...new Map(allTask.map(task => [JSON.stringify({ limit: task.limit, option: task.option, subject: task.subject, title: task.title, url: task.url }), task])).values()];
	allTask.sort((a, b) => new Date(a.limit) - new Date(b.limit));
	
	const retentionPeriod_key = "retentionPeriod";
	const retentionPeriod = (await chrome.storage.local.get([retentionPeriod_key]))[retentionPeriod_key];

	let now = new Date();
	now = now.getTime();
	now = now-retentionPeriod;

	allTask = allTask.filter(task => new Date(task.limit) > now);
	await chrome.storage.local.set({[taskKey]: allTask});

	//course
	const courseKey = "course";
	const storageCourse = (await chrome.storage.local.get([courseKey])).course;

	let outlineCourse = [];
	let outline_course = new Course();

	if(document.getElementsByClassName("js-header-text")[0].innerText.split("】").length !== 1) {
		outline_course.subject = document.getElementsByClassName("js-header-text")[0].innerText.split("】")[0] + "】";
	}else {
		outline_course.subject = document.getElementsByClassName("js-header-text")[0].innerText;
	}
	
	outline_course.url = "https://king-lms.kcg.edu/auth-saml/saml/login?apId=_4_1&redirectUrl=https%3A%2F%2Fking-lms.kcg.edu%2Fultra%2Fcourses%2F"+location.href.split("/")[5]+"%2Foutline";
	outlineCourse.push(outline_course);

	let allCourse = outlineCourse.concat(storageCourse);
	allCourse = [...new Set(allCourse.map(JSON.stringify))].map(JSON.parse);

	await chrome.storage.local.set({[courseKey]: allCourse});

	//acquisitions
	const weekDay = ["日", "月", "火", "水", "木", "金", "土"];
	const today = new Date();
	const acquisitionDate = today.getFullYear()+"年" + (today.getMonth()+1)+"月" + today.getDate()+"日" + "("+weekDay[today.getDay()]+") " + today.getHours()+":" + today.getMinutes()+":" + today.getSeconds()+"";
	await chrome.storage.local.set({ "acquisitionDate": acquisitionDate });
}