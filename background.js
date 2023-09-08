const download_path = 'downloaded/'

importScripts('eventRegister.js');

let fileId = 1;

function getFileName() {
  return fileId++;
}

function getFileExtension(filename) {
  return filename.slice(((filename.lastIndexOf(".") - 1) >>> 0) + 2);
}

eventRegister.registerListener({
  group: eventRegister.GROUP.BACKGROUND,
  action: 'downloadImages',
  run(result) {
    let urls = result.request.images
    for (let i = 0; i < urls.length; i++) {
      let url = urls[i]
      let filepath = download_path + getFileName() + '.' + getFileExtension(url)

      chrome.downloads.download({
        url: url,
        filename: filepath,
        saveAs: false
      });
    }
  }
})

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  eventRegister.exec({
    request,
    sender,
    sendResponse
  }, eventRegister.GROUP.BACKGROUND)
});