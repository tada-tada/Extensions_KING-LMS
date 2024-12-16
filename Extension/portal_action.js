if("https://home.kcg.ac.jp/portal/" == location.href || "https://home.kcg.ac.jp/portal/#" == location.href){
	//access
	const interval_fcCnt = setInterval(() => {
		if(typeof document.getElementsByClassName("fc-content-skeleton")[0].children[0].children[0] !== "undefined") {
			showTask_week();
			portalCourse_week();

			clearInterval(interval_fcCnt);
		}
	}, 100);

	//calendar next
	const nextButton = document.getElementsByClassName("fc-next-button")[0];
	nextButton.onclick = function() {
		const interval_fcCnt_1 = setInterval(() => {
			if(typeof (document.getElementsByClassName("fc-month-button fc-button fc-state-default fc-corner-left fc-corner-right fc-state-active")[0]) === "undefined") {
				showTask_week();
				portalCourse_week();
			}else if(typeof (document.getElementsByClassName("fc-basicWeek-button fc-button fc-state-default fc-corner-left fc-corner-right fc-state-active")[0]) === "undefined") {
				showTask_month();
				portalCourse_month();
			}
			clearInterval(interval_fcCnt_1);
		}, 100);
	};

	//calendar prev
	const prevButton = document.getElementsByClassName("fc-prev-button")[0];
	prevButton.onclick = function() {
		const interval_fcCnt_2 = setInterval(() => {
			if(typeof (document.getElementsByClassName("fc-month-button fc-button fc-state-default fc-corner-left fc-corner-right fc-state-active")[0]) === "undefined") {
				showTask_week();
				portalCourse_week();
			}else if(typeof (document.getElementsByClassName("fc-basicWeek-button fc-button fc-state-default fc-corner-left fc-corner-right fc-state-active")[0]) === "undefined") {
				showTask_month();
				portalCourse_month();
			}
			clearInterval(interval_fcCnt_2);
		}, 100);
	};

	//calendar today
	document.getElementsByClassName("fc-today-button")[0].onclick = function() {
		const interval_calender_today = setInterval(() => {
			if(typeof (document.getElementsByClassName("fc-month-button fc-button fc-state-default fc-corner-left fc-corner-right fc-state-active")[0]) === "undefined") {
				showTask_week();
				portalCourse_week();
			}else if(typeof (document.getElementsByClassName("fc-basicWeek-button fc-button fc-state-default fc-corner-left fc-corner-right fc-state-active")[0]) === "undefined") {
				showTask_month();
				portalCourse_month();
			}
			clearInterval(interval_calender_today);
		}, 100);
	};

	//calendar month
	document.getElementsByClassName("fc-month-button fc-button fc-state-default fc-corner-left fc-corner-right")[0].onclick = function() {
		if(typeof (document.getElementsByClassName("fc-basicWeek-button fc-button fc-state-default fc-corner-left fc-corner-right fc-state-active")[0]) === "undefined") {
			const interval_calender_month = setInterval(() => {
				showTask_month();
				portalCourse_month();
				clearInterval(interval_calender_month);
			}, 100);
		}
	};

	//calendar week
	document.getElementsByClassName("fc-basicWeek-button fc-button fc-state-default fc-corner-left fc-corner-right")[0].onclick = function() {
		if(typeof (document.getElementsByClassName("fc-month-button fc-button fc-state-default fc-corner-left fc-corner-right fc-state-active")[0]) === "undefined") {
			const interval_calender_week = setInterval(() => {
				showTask_week();
				portalCourse_week();
				clearInterval(interval_calender_week);
			}, 100);
		}
	};

	showImportantNews();
	taskAcquisitionDate();
	showTaskList();
}

//addMenu
const interval = setInterval(() => {
	if(document.getElementsByClassName("dropdown-menu") != null) {
		addMenu();
		clearInterval(interval);
	}
}, 1000);

//acquisition
async function taskAcquisitionDate() {
	const acquisitionDateKey = "acquisitionDate";
	const taskAcquisitionDate = ( await chrome.storage.local.get([acquisitionDateKey]))[acquisitionDateKey];
	let acquisitionDateElem  = document.createElement("div");
	if(typeof taskAcquisitionDate === "undefined") {
		acquisitionDateElem.textContent = "課題が保存されていません";
	}else {
		acquisitionDateElem.textContent = "データ取得日時：" + taskAcquisitionDate;
	}
	acquisitionDateElem.setAttribute('style', 'text-align: right;');
	document.querySelector("#topPage > div.text-right").after(acquisitionDateElem);
}