const ms = 100;	//100ms　0.1秒

//lesson
const courseInterval = setInterval(() => {
	if("https://king-lms.kcg.edu/ultra/course" == location.href || "https://king-lms.kcg.edu/ultra/course/#" == location.href) {
		const course = document.getElementsByClassName("course-title");
		if(typeof course[0] != 'undefined' && course[0].children[0].id.split("-")[2] != "") {
			saveCourse();
			clearInterval(courseInterval);
		}
	}
}, ms);


//task
const deadlineInterval = setInterval(() => {
	if("https://king-lms.kcg.edu/ultra/deadline" == location.href  || "https://king-lms.kcg.edu/ultra/deadline/#" == location.href) {
		const deadlineL = document.getElementsByClassName("element-details").length;
		if(deadlineL != 0) {
			saveTask();
			clearInterval(deadlineInterval);
		}
	}
}, ms);