function importantNewsWordEdit_show(showImportantWord) {
	for(let i=0; i<showImportantWord.length; i++ ) {
		let importantNewsWordEdit_showDivInput = document.createElement('input');
		importantNewsWordEdit_showDivInput.setAttribute('type', 'button');
		importantNewsWordEdit_showDivInput.setAttribute('value', showImportantWord[i]);
		importantNewsWordEdit_showDivInput.setAttribute('id', 'importantNewsWordEdit_showDivInput_'+(i));
		importantNewsWordEdit_showDivInput.setAttribute('class', 'importantNewsWordEdit_showDivInput');

		let importantNewsWordEdit_showDiv = document.createElement('div');
		importantNewsWordEdit_showDiv.appendChild(importantNewsWordEdit_showDivInput);

		document.getElementById("importantNewsWordEdit_div").appendChild(importantNewsWordEdit_showDiv);
	}

	const buttons = document.querySelectorAll("input.importantNewsWordEdit_showDivInput");
	buttons.forEach(button => {
		button.addEventListener("click", function() {
			document.getElementById("mportantNewsWordEditText").value = button.value;
			document.getElementById("importantNewsWordEditButton").value = button.id;
		});
	});
}

//edit
const importantNewsWordEditButton = document.getElementById("importantNewsWordEditButton");
importantNewsWordEditButton.addEventListener('click',async ()=>{
	if(importantNewsWordEditButton.value != "null") {
		const importantWordKey = "importantWord";
		const importantWord = ( (await chrome.storage.local.get([importantWordKey])).importantWord );
		importantWord[importantNewsWordEditButton.value.split("_")[2]] = document.getElementById("mportantNewsWordEditText").value;
		chrome.storage.local.set({ "importantWord": importantWord });

		importantNewsWordEditTagRemove(importantWord);
	}
});

//add
const importantNewsWordEditButton_add = document.getElementById("importantNewsWordEditButton_add");
importantNewsWordEditButton_add.addEventListener('click',async ()=>{
	let importantNewsWordEditText = document.getElementById("mportantNewsWordEditText");
	if(importantNewsWordEditText.value != "") {
		const importantWordKey = "importantWord";
		const importantWord = ( (await chrome.storage.local.get([importantWordKey])).importantWord );
		importantWord.push(importantNewsWordEditText.value);
		chrome.storage.local.set({ "importantWord": importantWord });
	
		importantNewsWordEditTagRemove(importantWord);
	}
});

//remove
const importantNewsWordEditButton_remove = document.getElementById("importantNewsWordEditButton_remove");
importantNewsWordEditButton_remove.addEventListener('click',async ()=>{
	const importantNewsWordEditButton = document.getElementById("importantNewsWordEditButton");
	if(importantNewsWordEditButton.value != "null") {
		const importantWordKey = "importantWord";
		const importantWord = ( (await chrome.storage.local.get([importantWordKey])).importantWord );
		importantWord.splice(importantNewsWordEditButton.value.split("_")[2], 1);
		chrome.storage.local.set({ "importantWord": importantWord });
	
		importantNewsWordEditTagRemove(importantWord);
	}
});

//tag remobe
function importantNewsWordEditTagRemove(saveImportantNewsWord) {
	let importantNewsWordEditTag = document.getElementById("importantNewsWordEdit_div").children;
	for(let i=importantNewsWordEditTag.length-1; 0<=i; i--) {
		importantNewsWordEditTag[i].remove();
	}
	document.getElementById("mportantNewsWordEditText").value = "";
	document.getElementById("importantNewsWordEditButton").value = "null";

	importantNewsWordEdit_show(saveImportantNewsWord);
}

//clear
const importantNewsWordEditButtonClear = document.getElementById("importantNewsWordEditButtonClear");
importantNewsWordEditButtonClear.addEventListener('click',async ()=>{
	const saveImportantNewsWord = ["行事","文化教養","体育行事","ハイキング","履修","単位","卒業","奨学","記念日","健康診断","学業","学期","提出","手続き","定期","実施"];
	await chrome.storage.local.set({"importantWord": saveImportantNewsWord});
	
	importantNewsWordEditTagRemove(saveImportantNewsWord);
});