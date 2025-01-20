async function showImportantNews() {
	const onoffkey = "onoff";
	let onoff = (await chrome.storage.local.get([onoffkey])).onoff;

	if(onoff.importantNewsOnOff != "on") {
		return;
	}

	const searchImportantWordKey = "importantWord";
	let searchImportantWord = ( await chrome.storage.local.get([searchImportantWordKey]))[searchImportantWordKey];
	if(!searchImportantWord) {
		searchImportantWord = ["行事","文化教養","体育行事","ハイキング","履修","単位","卒業","奨学","記念日","健康診断","学業","学期","提出","手続き","定期","実施"];
	}

	const ms = 250	//0.250s
	const interval = setInterval(() => {
		let newsList = document.querySelector("#tblGeneralNewsList");
		newsList.setAttribute('class', "general footable news-list prj_impNews");

		newsList = document.querySelector("#tblGeneralNewsList > tbody").children;
	
		let createNewsList = document.getElementsByClassName("newsList")[0];
		let importantNews_details = document.createElement("details");
		importantNews_details.setAttribute("id", "impNews_details");
		createNewsList.insertBefore(importantNews_details, document.querySelector("#topPage > section.newsList > h2").nextElementSibling);

		let importantNews_summary = document.createElement("summary");
		importantNews_details.appendChild(importantNews_summary);
		
		let importantNews_strong = document.createElement("strong");
		importantNews_summary.appendChild(importantNews_strong);
	
		let subTitle = document.createElement('h3');
		subTitle.textContent = "重要なお知らせ▽";
		subTitle.setAttribute('class', "subTitle");
		importantNews_strong.appendChild(subTitle);

		let importantNewsTable = document.createElement('table');
		importantNewsTable.setAttribute('id', "tblImportantNewsList");
		importantNewsTable.setAttribute('class', "general footable news-list  prj_impNews");
		importantNews_details.appendChild(importantNewsTable);
		
		createImportantNewsThead();

		

		let ImportantNewsTbody = document.createElement('tbody');
		ImportantNewsTbody.setAttribute('id', "ImportantNewsTbody");
		document.querySelector("#tblImportantNewsList").appendChild(ImportantNewsTbody);

		let ipNews_removeNumber = [];
		let news;
		let news_title;

		for(let i=0; i < newsList.length; i++){
			news = newsList[i].children[1].children[2];
			news_title = "#\\/News\\/Detail\\/" + news.href.split("/")[6];
		
			for(let j=0; j<searchImportantWord.length; j++) {
				if(document.querySelector(news_title).textContent.indexOf(searchImportantWord[j]) != -1) {
					const impNewsTmp = newsList[i].cloneNode(true);
					document.querySelector("#ImportantNewsTbody").appendChild(impNewsTmp);		
					ipNews_removeNumber.push(i);
					break;
				}
			}
		}
		
		removeImportantNewsTag(ipNews_removeNumber);

		importantNewsTable.setAttribute('id', "tblGeneralNewsList");
		clearInterval(interval);
	}, ms);

	const interval_impNone = setInterval(() => {
		if(typeof document.querySelector("#ImportantNewsTbody")!=="undefined"  && typeof document.querySelector("#ImportantNewsTbody").children!=="undefined" && typeof document.querySelector("#ImportantNewsTbody").children.length!=="undefined") {
			
			if(document.querySelector("#ImportantNewsTbody").children.length === 0) {
				let impNews_details = document.getElementById("impNews_details");
				document.getElementById("tblGeneralNewsList").remove();
				
				let importantNewsNoneDiv = document.createElement('div');
				importantNewsNoneDiv.setAttribute('class', "noDataHomeNews");
				impNews_details.appendChild(importantNewsNoneDiv);
				
				let importantNewsNoneSpan = document.createElement('span');
				importantNewsNoneSpan.innerHTML = "現在、重要なお知らせはありません。";
				importantNewsNoneDiv.appendChild(importantNewsNoneSpan);
			}
			clearInterval(interval_impNone);
		}
	}, ms);
	/**/
	const interval_news = setInterval(() => {
		if(typeof document.querySelector("#ImportantNewsTbody")!=="undefined"  && typeof document.querySelector("#ImportantNewsTbody").children!=="undefined" && typeof document.querySelector("#ImportantNewsTbody").children.length!=="undefined") {
			
			let commonNews_details = document.createElement("details");
			commonNews_details.setAttribute("id", "commonNews");
			document.querySelector("#impNews_details").after(commonNews_details)
			/**/
			let commonNews_summary = document.createElement("summary");
			commonNews_details.appendChild(commonNews_summary);
			
			let commonNews_strong = document.createElement("strong");
			commonNews_summary.appendChild(commonNews_strong);
			
			let newsList = document.getElementsByClassName("newsList")[0];
			newsList.children[3].innerHTML = newsList.children[3].innerHTML+"▽"
			const commonNews_subtitle = newsList.children[3];
			const commonNews_none = newsList.children[4];
			const commonNews_newslist = newsList.children[5];

			commonNews_strong.appendChild(commonNews_subtitle);
			commonNews_details.appendChild(commonNews_none);
			commonNews_details.appendChild(commonNews_newslist);
			
			clearInterval(interval_news);
		}
	}, ms);
	
}

//remove
function removeImportantNewsTag(ipNews_removeNumber) {
	let remove_newsList = document.getElementsByClassName("prj_impNews")[1].children[1].children;
	
	for(let i=0,k=0; i<remove_newsList.length; i++,k++) {
		for(let j=0; j<ipNews_removeNumber.length; j++) {
			if(k == ipNews_removeNumber[j]) {
				delete remove_newsList[i].remove();
				i--;
				break;
			}
		}
	}
}

//thead
function createImportantNewsThead() {
	let importantNewsThead = document.createElement('thead');
	document.querySelector("#tblImportantNewsList").appendChild(importantNewsThead);
	const importantNewsTr = document.createElement('tr');
	importantNewsThead.appendChild(importantNewsTr);
	
	createImportantNewsTh("日時"		,"news-date-head");
	createImportantNewsTh("タイトル"	,"news-title-head");
	createImportantNewsTh("配信元"		,"news-sender-head");
	createImportantNewsTh("カテゴリ"	,"news-category-head");
}

//th
function createImportantNewsTh(textContent, className) {
	let importantNewsTh = document.createElement('th');
	document.querySelector("#tblImportantNewsList > thead > tr").appendChild(importantNewsTh);
	importantNewsTh.textContent = textContent;
	importantNewsTh.setAttribute('class', className);
}