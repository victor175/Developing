function addOptionToSelect(select, option) {
	var optionHTML = '<option>' + option + '</option>';
	select.append(optionHTML);
}

function populateSelectOptions(select, options, attribute, clearCurrent) {
	attribute = (typeof attribute === "undefined") ? false : attribute;
	clearCurrent = (typeof clearCurrent === "undefined") ? false : clearCurrent;
	var option;

	if(clearCurrent) {
		var lastOption = select.children().last();

		while(lastOption.attr('value') != 'None') {
			lastOption.remove();

			if(select.children().length > 0) {
				lastOption = select.children().last();
			} else {
				break;
			} 
		}
	}

	for(key in options) {
		option = options[key];
		if(attribute) {
			option = option[attribute];
		}

		addOptionToSelect(select, option);
	}
}

function cookieRefreshRequest() {
	$.ajax('/wp-admin/admin.php?page=simple_table_manager_list');
}

function filterData() {
	var attribute = $('#attribute-filter').val(),
		operator = $('#operator-filter').val(),
		value = $('#value-filter').val();

	if(attribute == '' || operator == '' || value == '') {
		alert('Please fill in all filter fields');
	} else {
		var filteredData = [],
			isMatching;
		
		for(key in weatherData) {
			isMatching = eval(weatherData[key][attribute] + " " + operator + " " + value);

			if(isMatching) {
				filteredData.push(weatherData[key]);
			}
		}

		initWeatherData(filteredData);
	}
}

