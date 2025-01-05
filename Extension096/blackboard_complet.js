async function outline_complet() {
	if(typeof document.getElementsByTagName("button")[52] !== "undefined") {
		const subjectContainer = document.getElementsByClassName("react-container")[2].children[0].children[0].children[0];
	
		let complet_subject = subjectContainer.getElementsByTagName("div")[4].innerText;
		let complet_title = subjectContainer.getElementsByTagName("div")[7].children[0].innerText;
		let complet_limit = subjectContainer.getElementsByTagName("span")[4].innerText;
		let complet_url = location.href.split("/")[5];

		complet_limit = new Date(complet_limit);
		complet_limit = complet_limit.getTime();
		
		complet_url = "https://king-lms.kcg.edu/auth-saml/saml/login?apId=_4_1&redirectUrl=https%3A%2F%2Fking-lms.kcg.edu%2Fultra%2Fcourses%2F"+complet_url+"%2Foutline";

		const taskKey = "task";
		let taskData = (await chrome.storage.local.get(taskKey)).task;

		for(let i=0; i<taskData.length; i++) {
			if(taskData[i].subject==complet_subject && taskData[i].title==complet_title && taskData[i].limit==complet_limit && taskData[i].url==complet_url) {
				taskData[i].complet = true;
				break;
			}
		}
		await chrome.storage.local.set({[taskKey]: taskData});
	}
}