class AjaxFormSubmitter{

	constructor(settings){
		if(settings["id"] !== undefined) this.id = settings["id"];
		else this.id = Math.floor(Math.random()*1000);
		this.url = settings["url"];
		this.dataClassName = settings["dataClassName"];
		this.successCallback = settings["success"];
		this.errorCallback = settings["error"];
		if(settings["beforeSend"])this.beforeSend = settings["beforeSend"].bind(this);
		else this.beforeSend = function(){return true;};
		if(settings["afterSend"])this.afterSend = settings["afterSend"].bind(this);
		else this.afterSend = function(){};
		if(settings["progressHandling"])this.progressHandling = settings["progressHandling"];
		else this.progressHandling = function(){};
		this.formData = {};
		this.statusVar = null;
		this.responseVar = null;

		var _this = this;
		$(settings["submit"]).click(function() {
			_this.formData = {};
			_this.parseForm();
			if(_this.beforeSend()){
				_this.send();
				_this.afterSend();
			}
		});
	}

	parseForm() {
		var _this = this;
		$("." + _this.dataClassName).each( function(index) {
			_this.formData[$(this).attr("name")] = _this.parseValue(this);
		});
	}

	parseValue(Element) {
		switch($(Element).prop("tagName")) {
			case "INPUT":
				if(Element.type == 'checkbox')
					return $(Element).is(":checked") ? 1:0;
			case "TEXTAREA":
				return $(Element).val();
			case "SELECT":
				return $(Element).find("option:selected").attr("name");
			default:
				return $(Element).html();
		}
	}

	send() {
		var _this = this;
		jQuery.ajax({
			type: "POST",
			url: _this.url,
			xhr: function () {
                var myXhr = $.ajaxSettings.xhr();
                if (myXhr.upload) {
                    myXhr.upload.addEventListener('progress', _this.progressHandling.bind(_this), false);
                }
                return myXhr;
            },
			data: _this.formData,
			success: _this.success.bind(_this),
			error: _this.error.bind(_this)
		});
	}

	success(data, textStatus, jqXHR) {
		this.statusVar = textStatus;
		this.responseVar = data;
		this.successCallback(data, textStatus);
	}

	error( jqXHR, textStatus, errorThrown) {
		this.statusVar = textStatus;
		this.responseVar = errorThrown;
		this.errorCallback(errorThrown, textStatus);
	}

	get response() {
		return this.responseVar;
	}

	get status() {
		return this.statusVar;
	}

	getId() {
        return this.id;
    }
}