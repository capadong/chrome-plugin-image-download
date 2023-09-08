document.getElementById("downloadButton").addEventListener("click", function () {
	sendMessageToContentScript({
		action: "getImageUrls"
	}, (response) => {
		let images = response.images;

		chrome.runtime.sendMessage({
			action: "downloadImages",
			images: images
		});
	});
});

document.getElementById('markButton').addEventListener('click', function () {
	sendMessageToContentScript({
		action: "markImages"
	}, function (rsp) {
		if (rsp && rsp.count) {
			document.getElementById('markers').innerHTML = '(' + rsp.count + ')'
		}
	})
})


function sendMessageToContentScript(message, callback) {
	getCurrentTabId((tabId) => {
		chrome.tabs.sendMessage(tabId, message, function (response) {
			if (callback) callback(response);
		});
	});
}

function getCurrentTabId(callback) {
	chrome.tabs.query({
		active: true,
		currentWindow: true
	}, function (tabs) {
		if (callback) callback(tabs.length ? tabs[0].id : null);
	});
}