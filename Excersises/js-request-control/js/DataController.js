var DataController = function () {
	var DATA_API_URL = 'https://unsplash.it/200?RANDOM';
	var MAX_SIMULTANEOUS_REQUEST_COUNT = 3;
		
	this.getSingleDataElement = function() {
		return $.ajax({
			url: DATA_API_URL,
		});
	};

	this.requestDataForFullCapacity = function(allData, count, deferred) {
		var requestsServedCurrently = 0;

		while(requestsServedCurrently < MAX_SIMULTANEOUS_REQUEST_COUNT) {
			requestsServedCurrently++;
			this.handleDataRequest(allData, count, deferred);
		}
	};

	this.handleDataRequest = function(allData, count, deferred) {
		this.getSingleDataElement()
			.done(function(data) {

				allData.push(data);

				if(count > allData.length) {
					this.handleDataRequest(allData, count, deferred);
				} else {
					deferred.resolve(allData);
				}
			});
	};

	this.getDataCollection = function(count) {
		var data = [],
			deferred = $.Deferred();

		this.requestDataForFullCapacity(data, count, deferred);

		return deferred.promise();
	};
};
