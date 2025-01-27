const ms = 2000;	//2s

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
}, ms);

//complet
let complet_bool = true;
const completInterval = setInterval(() => {
	//conplet	bug
	let dialog = document.querySelectorAll("[role=dialog]");
	if(typeof dialog[0] != "undefined"){
		if(typeof dialog[0].children[0] !== "undefined" && typeof dialog[0].children[0].children[2] !== "undefined" && typeof dialog[0].children[0].children[2].children[1] !== "undefined") {
			if(typeof dialog[0].children[0].children[2].children[0] !== "undefined" && complet_bool){
				complet_bool = false;
			
				const pattern1_subject = document.querySelectorAll("[class^='makeStylessubHeader']")[document.querySelectorAll("[class^='makeStylescontainerWrapper']").length-1].children[0].innerText;
				const pattern1_title = document.querySelectorAll("[class^='makeStylesheadingWrapperContainer']")[document.querySelectorAll("[class^='makeStylesheadingWrapperContainer']").length-1].children[0].innerText;
				let pattern1_limit = undefined;
				if(typeof document.querySelectorAll("[class^='makeStylescontentRoot']")[1] !== "undefined") {
					pattern1_limit = (new Date(document.querySelectorAll("[class^='makeStylescontentRoot']")[1].children[1].children[0].innerText)).getTime();
				}
				const pattern1_url = "https://king-lms.kcg.edu/auth-saml/saml/login?apId=_4_1&redirectUrl=https%3A%2F%2Fking-lms.kcg.edu%2Fultra%2Fcourses%2F"+location.href.split("=")[1]+"%2Foutline";
	
				dialog[0].children[0].children[2].children[1].addEventListener('click', ()=> { task_complet(pattern1_subject, pattern1_title, pattern1_limit, pattern1_url) });
			}
		}else if(typeof dialog[0].children[2] !== "undefined" && typeof dialog[0].children[2].children[0] !== "undefined" && typeof dialog[0].children[2].children[0].children[1] !== "undefined" && typeof dialog[0].children[2].children[0].children[1].children[1] !== "undefined") {
			if(typeof dialog[0].children[2].children[0].children[1].children[0].children[0] !== "undefined" && complet_bool) {
				complet_bool = false;

				const pattern2_subject = document.getElementsByClassName("panel-sub-title")[0].children[0].innerText;
				const pattern2_title = document.getElementsByClassName("editable-title-container")[0].children[0].innerText;
				let pattern2_limit = undefined;
				if(typeof document.getElementsByClassName("js-due-date") !== "undefined") {
					pattern2_limit = (new Date(document.getElementsByClassName("js-due-date")[0].innerText)).getTime();
				}
				const pattern2_url = "https://king-lms.kcg.edu/auth-saml/saml/login?apId=_4_1&redirectUrl=https%3A%2F%2Fking-lms.kcg.edu%2Fultra%2Fcourses%2F"+location.href.split("=")[1]+"%2Foutline";
	
				dialog[0].children[2].children[0].children[1].children[1].children[0].addEventListener('click', ()=> { task_complet(pattern2_subject, pattern2_title, pattern2_limit, pattern2_url) });
			}
		}
	}else if(!complet_bool) {
		complet_bool = true;
	}
}, 500);