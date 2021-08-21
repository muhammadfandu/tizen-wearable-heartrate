(function() {
	
	var sensors = tizen.sensorservice.getAvailableSensors();
	
	console.log(sensors);
	
    window.addEventListener('tizenhwkey', function(ev) {
        if (ev.keyName === 'back') {
            var page = document.getElementsByClassName('ui-page-active')[0],
                pageid = page ? page.id : '';

            if (pageid !== 'main') {
                window.history.back();
            }
        }
    });
}());