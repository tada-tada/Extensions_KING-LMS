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
	
	const ms = 200	//200ms
	const interval = setInterval(() => {
		let newsList = document.querySelector("#tblGeneralNewsList");
		newsList.setAttribute('class', "general footable news-list prj_impNews");

		newsList = document.querySelector("#tblGeneralNewsList > tbody").children;
	
		let createNewsList = document.getElementsByClassName("newsList")[0];
		let importantNewsTable = document.createElement('table');
		createNewsList.insertBefore(importantNewsTable, document.querySelector("#topPage > section.newsList > h2").nextElementSibling);
		importantNewsTable.setAttribute('id', "tblImportantNewsList");
		importantNewsTable.setAttribute('class', "general footable news-list  prj_impNews");
		
		createImportantNewsThead();
	
		let subTitle = document.createElement('h3');
		createNewsList.insertBefore(subTitle, document.querySelector("#topPage > section.newsList > h2").nextElementSibling);
		subTitle.textContent = "重要なお知らせ";
		subTitle.setAttribute('class', "subTitle");

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
					document.querySelector("#ImportantNewsTbody").appendChild(impNewsTmp)	;	
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
		if(document.querySelector("#ImportantNewsTbody").children.length === 0) {
			document.getElementById("tblGeneralNewsList").remove();
			
			let importantNewsNoneDiv = document.createElement('div');
			importantNewsNoneDiv.setAttribute('class', "noDataHomeNews");
			document.querySelector("#topPage > section.newsList > h3:nth-child(2)").after(importantNewsNoneDiv);

			let importantNewsNoneSpan = document.createElement('span');
			importantNewsNoneSpan.innerHTML = "現在、重要なお知らせはありません。";
			importantNewsNoneDiv.appendChild(importantNewsNoneSpan);
		}
		clearInterval(interval_impNone);
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