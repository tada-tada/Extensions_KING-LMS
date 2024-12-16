async function saveCourse() {
	let bbCourse = [];
	const tmpCourse = document.getElementsByClassName("course-title");
	for(let i=0; i<tmpCourse.length; i++) {
		if(tmpCourse[i].children[0].id.split("-")[2] != "") {
			const subject = (tmpCourse[i].children[0].innerHTML.split("】")[0])+"】";
			const url = "https://king-lms.kcg.edu/auth-saml/saml/login?apId=_4_1&redirectUrl=https%3A%2F%2Fking-lms.kcg.edu%2Fultra%2Fcourses%2F" + tmpCourse[i].children[0].id.split("-")[2] + "%2Foutline";

			let course = new Course();
			course.subject = subject;
			course.url = url;
			bbCourse.push(course);
		}else {
			break;
		}
	}

	const courseKey = "course";
	const storageCourse = (await chrome.storage.local.get([courseKey])).course;

	let allCourse = bbCourse.concat(storageCourse);
	allCourse = [...new Set(allCourse.map(JSON.stringify))].map(JSON.parse);

	await chrome.storage.local.set({[courseKey]: allCourse});
}