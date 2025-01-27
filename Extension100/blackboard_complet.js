async function task_complet(complet_subject, complet_title, complet_limit, complet_url) {
	const taskKey = "task";
	let taskData = (await chrome.storage.local.get(taskKey)).task;	

	if(typeof complet_limit !== "undefined") {
		for(let i=0; i<taskData.length; i++) {
			if(taskData[i].subject==complet_subject && taskData[i].title==complet_title && taskData[i].limit==complet_limit && taskData[i].url==complet_url) {
				taskData[i].complet = true;
				break;
			}
		}	
	}else {
		for(let i=0; i<taskData.length; i++) {
			if(taskData[i].subject==complet_subject && taskData[i].title==complet_title && taskData[i].url==complet_url) {
				taskData[i].complet = true;
				break;
			}
		}
	}
	
	await chrome.storage.local.set({[taskKey]: taskData});
}
