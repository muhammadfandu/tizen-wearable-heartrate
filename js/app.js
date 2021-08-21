var isMeasuring = false;
var counter = 0;

function getHR(){
	tizen.ppm.requestPermission("http://tizen.org/privilege/healthinfo", onSuccess, onError);
}

function onSuccess(){
	counter = 0;
	console.log("onSuccess method is running");
	var heart = document.getElementById("heart");
	
	function onchangeHR(hrmInfo){
		console.log("onchangeHR is running " + hrmInfo.heartRate);
		
		var currentdate = new Date().toLocaleTimeString('en-US', { hour12: false, 
            hour: "numeric", 
            minute: "numeric", second: "numeric"});
	
		console.log(currentdate);
		
		heart.innerHTML = "<b>" + hrmInfo.heartRate + " BPM </b> (" + currentdate + ")";
		if(hrmInfo.heartRate > 80){
//			console.log("Vibrate");
			navigator.vibrate(2000);
		}
		counter++;
		if(counter > 10){
			tizen.humanactivitymonitor.stop('HRM');
		}
	}
	tizen.humanactivitymonitor.start('HRM', onchangeHR);
}

function onError(e){
	console.log("error " + JSON.stringify(e));
}

function toggleHRM(){
	console.log(isMeasuring);
	isMeasuring = !isMeasuring;
	
	getHR();
	
	var toggle = document.getElementById("toggleHRM");
	if(isMeasuring){
		toggle.innerHTML = "Stop Measuring";
	}else{
		toggle.innerHTML = "Start Measuring";
	}
	
	setInterval(function(){
		getHR();
	}, 15000);
}	

(function () {
	var sensors = tizen.sensorservice.getAvailableSensors();
	console.log(sensors);
	
	window.addEventListener("tizenhwkey", function (ev) {
		var activePopup = null,
			page = null,
			pageId = "";

		if (ev.keyName === "back") {
			activePopup = document.querySelector(".ui-popup-active");
			page = document.getElementsByClassName("ui-page-active")[0];
			pageId = page ? page.id : "";

			if (pageId === "main" && !activePopup) {
				try {
					tizen.application.getCurrentApplication().exit();
				} catch (ignore) {
				}
			} else {
				window.history.back();
			}
		}
	});
}());