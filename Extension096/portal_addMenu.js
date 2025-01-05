function addMenu() {
	const BlackboardUrl = "https://king-lms.kcg.edu/auth-saml/saml/login?apId=_4_1&redirectUrl=https%3A%2F%2Fking-lms.kcg.edu%2Fultra%2Fdeadline";
	addMenuField("Blackboard", BlackboardUrl);

	const OneDriveURL = "https://kcgacjp-my.sharepoint.com/";
	addMenuField("OneDrive", OneDriveURL);

	const NaviUrl = "http://www3.kyoto-kcg.ac.jp/internal/kcc/";
	addMenuField("キャリアNAVI", NaviUrl);
	
	const PassChangeUrl = "https://idm.kcg.ac.jp/";
	addMenuField("パスワード変更", PassChangeUrl);

	const SystemRoom = "https://users2.kyoto-kcg.ac.jp/sysroom/";
	addMenuField("総合情報システム室", SystemRoom);

	if(location.href == "https://home.kcg.ac.jp/portal/" || location.href == "https://home.kcg.ac.jp/portal/#") {
		document.querySelector("#topPage > section:nth-child(8) > ul > li:nth-child(1) > div:nth-child(1) > p > a").href = BlackboardUrl;
	}
}

function addMenuField(name, url) {
	let menu = document.getElementsByClassName("dropdown-menu");
	let addMenu = document.createElement('li');
	menu[1].appendChild(addMenu);
	addMenu.setAttribute('class', "external");
	let addATag = document.createElement("a");
	addMenu.appendChild(addATag);
	addATag.textContent = name;
	addATag.setAttribute('href', url);
	addATag.setAttribute('target', "_blank");
	addATag.setAttribute('rel', 'noopener noreferrer');
	addATag.setAttribute('title', name + "を開きます");
}