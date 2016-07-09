const myApp = new Framework7();
const $$ = Dom7;
const wsserver = cordova.plugins.wsserver;

var view1 = myApp.addView('#view-1', {
    dynamicNavbar: true
});
var view2 = myApp.addView('#view-2', {
    dynamicNavbar: true
});
var view3 = myApp.addView('#view-3');
var view4 = myApp.addView('#view-4');

document.addEventListener('deviceready', onDeviceReady, false);
function onDeviceReady() {
    document.addEventListener('backbutton', onBackButton, false);
    webSocketTest();
}

function onBackButton() {
    let currentView = myApp.getCurrentView();
    currentView.router.back();
}

function webSocketTest() {
    var ws = new WebSocket('ws://ybjson01.youbike.com.tw:1002/gwjs.json');

    ws.onopen = function () {
        myApp.addNotification({
            title: '通知',
            message: 'on open'
        });
        this.send('');         // transmit "hello" after connecting 
    };

    ws.onmessage = function (event) {
        myApp.addNotification({
            title: '通知',
            message: 'on message'
        });
        myApp.onPageInit('about', function (page) {
            $$(page.container).find('.content-block').html(event.data);
        });
        this.close();
    };

    ws.onerror = function () {
        myApp.addNotification({
            title: '通知',
            message: 'on open'
        });
    };

    ws.onclose = function (event) {
        console.log('close code=' + event.code);
        myApp.addNotification({
            title: '通知',
            message: 'close code=' + event.code
        });
    };
}