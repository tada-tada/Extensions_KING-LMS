async function portalCourse_week() {
	const courseKey = "course";
	const course = (await chrome.storage.local.get([courseKey])).course;

	if (course.length === 0) return;

	const trElements = document.querySelectorAll("#calendar .fc-content-skeleton td");
	for(let i=0; i<trElements.length; i++) {	//calendar colum
		if(trElements[i].children.length != 0) {
			const tmp = trElements[i].children[0].children[0].children[0].innerHTML;
			const potalCourseSubject = tmp.slice(2,tmp.length);

			for(let j=0; j<course.length; j++) {
				if(course[j].subject == potalCourseSubject) {
					trElements[i].children[0].setAttribute("href", course[j].url);
					trElements[i].children[0].setAttribute("target", "_blank");
					trElements[i].children[0].setAttribute("rel", "noopener noreferrer");
				}
			}
		}
	}
}

async function portalCourse_month() {
	const courseKey = "course";
	const course = (await chrome.storage.local.get([courseKey])).course;

	if (course.length === 0) return;

	for(let i=0; i<document.getElementsByClassName("fc-day-grid")[0].children.length; i++) {	//calendar row
		const tdElements = document.getElementsByClassName("fc-content-skeleton")[i].getElementsByTagName("td");
		for(let j=0; j<tdElements.length; j++) {	//calendar colum
			if(tdElements[j].className == "fc-event-container") {
				const tmp = tdElements[j].getElementsByClassName("fc-title")[0].innerHTML;
				const potalCourseSubject = tmp.slice(2,tmp.length);
				
				for(let k=0; k<course.length; k++) {
					if(course[k].subject == potalCourseSubject) {
						tdElements[j].children[0].setAttribute("href", course[k].url);
						tdElements[j].children[0].setAttribute("target", "_blank");
						tdElements[j].children[0].setAttribute("rel", "noopener noreferrer");
					}
				}
			}
		}
	}
}