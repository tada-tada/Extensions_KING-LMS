const ms = 2000;	//1s

//course
const courseInterval = setInterval(() => {
	if("https://king-lms.kcg.edu/ultra/course" == location.href || "https://king-lms.kcg.edu/ultra/course/#" == location.href) {
		const course = document.getElementsByClassName("course-title");
		if(typeof course[0] != 'undefined' && course[0].children[0].id.split("-")[2] != "") {
			saveCourse();
		}
	}
}, ms);

//task
const deadlineInterval = setInterval(() => {
	if("https://king-lms.kcg.edu/ultra/deadline" == location.href  || "https://king-lms.kcg.edu/ultra/deadline/#" == location.href) {		
		const deadlineL = document.getElementsByClassName("element-details").length;
		if(deadlineL != 0) {
			saveTask();
		}
	}
}, ms);

//stream
const streamInterval = setInterval(() => {
	if("https://king-lms.kcg.edu/ultra/stream" == location.href  || "https://king-lms.kcg.edu/ultra/stream/#" == location.href) {	
		if(document.getElementsByClassName("activity-feed").length === 2) {
			const upcomingStream = document.getElementsByClassName("activity-feed")[0].children.length;
			const previousStream = document.getElementsByClassName("activity-feed")[1].children.length;
	
			if(upcomingStream != 0 && previousStream != 0) {
				streamTaskCourseSave();
			}	
		}
	}
}, ms);

//outline
const outlineInterval = setInterval(() => {
	//outline
	let location_href = location.href;
	if(location_href.split("/")[(location_href.split("/").length)-1] === "outline" || location_href.split("/")[(location_href.split("/").length)-2] === "outline") {	
		if(document.getElementsByClassName("click-to-invoke-container").length !== 0) {
			outline();
		}
	}

	//conplet	bug
}, ms);