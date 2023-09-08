// content.js

$(function () {
    console.log('page loaded')
})

eventRegister.registerListener({
    group: eventRegister.GROUP.CONTENT,
    action: 'getImageUrls',
    _getImageUrls() {
        const images = document.querySelectorAll("img");
        const imageUrls = Array.from(images).map(img => img.src);
        return imageUrls;
    },
    run(result) {
        const images = this._getImageUrls();
    
        result.sendResponse({
            action: 'getImags',
            images
        });
    }
})

eventRegister.registerListener({
    group: eventRegister.GROUP.CONTENT,
    action: 'markImages',
    run(result) {
        const images = document.querySelectorAll("img");
        Array.from(images).forEach(img => {
            img.style.border = '2px solid red'
        });

        result.sendResponse({
            count:images.length
        })
    }
})

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    eventRegister.exec({
        request,
        sender,
        sendResponse
    }, eventRegister.GROUP.CONTENT)
});