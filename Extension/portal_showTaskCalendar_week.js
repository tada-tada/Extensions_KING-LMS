async function showTask_week() {
	const key = "task";
	const taskData = (await chrome.storage.local.get([key])).task;
	
	const onoffkey = "onoff";
	let onoff = (await chrome.storage.local.get([onoffkey])).onoff;

	if(onoff.taskCalendarOnOff == "on") {
		const maxTaskCnt = taskCnt_week(taskData);
		const calLength = document.querySelector("#calendar > div.fc-view-container > div > table > tbody > tr > td > div > div > div > div.fc-content-skeleton > table > tbody").children.length;
	
		for(let i=0; i<maxTaskCnt; i++) {
			spanLineCalendar_week();
		}
		if(maxTaskCnt > 0) {
			spanLineCalendar_week();
		}
	
		showTaskCalendar_week(taskData, calLength);
	}
}

function taskCnt_week(taskData) {								//calendar count
	let maxTaskCnt = 0;
	let taskCnt = 0;

	for(let i=0; i<7; i++) {
		const prj_ymd = document.getElementsByClassName("fc-day")[i].getAttribute("data-date").replace(/-/g, '/');
		taskCnt = 0;
		
		for(let j=0; j<taskData.length; j++) {
			let tmp = (new Date(taskData[j].limit)).toLocaleString().split(" ")[0].split("/");
			let tmp_y = tmp[0];
			let tmp_m = ("00"+tmp[1]).slice(-2);
			let tmp_d = ("00"+tmp[2]).slice(-2);
			const date = tmp_y +"/"+ tmp_m +"/"+ tmp_d;
			if(date == prj_ymd) {
				taskCnt++;
				if(maxTaskCnt < taskCnt) {
					maxTaskCnt = taskCnt;
				}
			}
		}
	}
	return maxTaskCnt;
}

async function showTaskCalendar_week(taskData, calLength) {		//calendartask
	let taskCnt = 0;

	let now = new Date();
	now = now.getTime();

	for(let i=0; i<7; i++) {
		taskCnt = 0;
		const prj_ymd = document.getElementsByClassName("fc-day")[i].getAttribute("data-date").replace(/-/g, '/');

		for(let j=0; j<taskData.length; j++) {
			let tmp = (new Date(taskData[j].limit)).toLocaleString().split(" ")[0].split("/");
			let tmp_y = tmp[0];
			let tmp_m = ("00"+tmp[1]).slice(-2);
			let tmp_d = ("00"+tmp[2]).slice(-2);
			const showLimit = tmp_y +"/"+ tmp_m +"/"+ tmp_d;

			if(showLimit.split(" ")[0] == prj_ymd) {
				const showSubject = taskData[j].subject;
				const showTitle = taskData[j].title;
				const showTaskurl = taskData[j].url;
				const showUsability = taskData[j].option;

				let showTaskCal_elm_td = document.querySelector("#calendar > div.fc-view-container > div > table > tbody > tr > td > div > div > div > div.fc-content-skeleton > table > tbody > tr:nth-child("+ (calLength+2+taskCnt) +") > td:nth-child("+ (1+i) +")");
				let showTaskCal_elm_a = document.createElement("a");

				if(showUsability == true) {
					if(now < taskData[j].limit) {		//limit
						showTaskCal_elm_a.setAttribute("class","prjTooltipContainer_userTask_under fc-day-grid-event fc-h-event fc-event fc-start fc-end");
					}else {
						showTaskCal_elm_a.setAttribute("class","prjTooltipContainer_userTask_over fc-day-grid-event fc-h-event fc-event fc-start fc-end");
					}
				}else {
					if(now < taskData[j].limit) {		//limit
						if(taskData[j].complet) {		//complet
							showTaskCal_elm_a.setAttribute("class","prjTooltipContainer_school_under_complet fc-day-grid-event fc-h-event fc-event fc-start fc-end");
						}else {
							showTaskCal_elm_a.setAttribute("class","prjTooltipContainer_school_under fc-day-grid-event fc-h-event fc-event fc-start fc-end");
						}
					}else {
						if(taskData[j].complet) {		//complet
							showTaskCal_elm_a.setAttribute("class","prjTooltipContainer_school_over_complet fc-day-grid-event fc-h-event fc-event fc-start fc-end");
						}else {
							showTaskCal_elm_a.setAttribute("class","prjTooltipContainer_school_over_incomplet fc-day-grid-event fc-h-event fc-event fc-start fc-end");
						}
					}
				}
				showTaskCal_elm_a.textContent = "";
				showTaskCal_elm_a.setAttribute("href",showTaskurl);
				showTaskCal_elm_a.setAttribute("target","_blank");
				showTaskCal_elm_a.setAttribute("rel","noopener noreferrer");
				showTaskCal_elm_td.appendChild(showTaskCal_elm_a);
				showTaskCal_elm_td.children[0].remove();

				let showTaskCal_elm_div1 = document.createElement("div");
				showTaskCal_elm_div1.setAttribute("class","fc-content");
				showTaskCal_elm_a.appendChild(showTaskCal_elm_div1);
				
				let showTaskCal_elm_span1 = document.createElement("span");
				showTaskCal_elm_span1.setAttribute("class","fc-title");
				showTaskCal_elm_span1.textContent = showSubject;
				showTaskCal_elm_div1.appendChild(showTaskCal_elm_span1);

				//tooltip
				let showTaskCal_elm_span2 = document.createElement("span");
				showTaskCal_elm_span2.setAttribute("class","prjTooltip -bottom");
				showTaskCal_elm_span2.setAttribute("role","tooltip");
				showTaskCal_elm_a.appendChild(showTaskCal_elm_span2);

				let showTaskCal_elm_span3 = document.createElement("span");
				showTaskCal_elm_span3.setAttribute("class","prjTooltip_Body");
				showTaskCal_elm_span2.appendChild(showTaskCal_elm_span3);

				let showTaskCal_elm_div2 = document.createElement("div");
				showTaskCal_elm_span2.appendChild(showTaskCal_elm_div2);

				let showTaskCal_elm_ul = document.createElement("ul");
				showTaskCal_elm_div2.appendChild(showTaskCal_elm_ul);

				let showTaskCal_elm_li_subject = document.createElement("li");
				showTaskCal_elm_li_subject.textContent = "科目：" + showSubject;
				showTaskCal_elm_ul.appendChild(showTaskCal_elm_li_subject);

				let showTaskCal_elm_li_title = document.createElement("li");
				showTaskCal_elm_li_title.textContent = "予定：" + showTitle;
				showTaskCal_elm_ul.appendChild(showTaskCal_elm_li_title);

				let showTaskCal_elm_li_limit = document.createElement("li");
				showTaskCal_elm_li_limit.textContent = "期限：" + showLimit;
				showTaskCal_elm_ul.appendChild(showTaskCal_elm_li_limit);

				taskCnt++;
			}
		}
	}
}

async function spanLineCalendar_week() {						//calendar span
	let calendarTable =  document.getElementsByClassName("fc-content-skeleton");
	calendarTable = calendarTable[0].children[0].children[0];
	let calendarTr = document.createElement('tr');
	calendarTable.appendChild(calendarTr);

	for(let i=0; i<7; i++) {
		let calendartd = document.createElement("td");
		calendartd.setAttribute("class","fc-event-container");
		calendarTr.appendChild(calendartd);

		let calendarA = document.createElement("div");

		calendarA.innerHTML = "　";
		calendartd.appendChild(calendarA);
	}
}