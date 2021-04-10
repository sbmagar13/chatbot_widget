(function( jQuery ) {
	$.widget( "custom.jqSpeechToText", {
		options: {
			icon0: "",				// Off Icon
			icon1: "",				// Listening Icon
			classPrefix: "ui",
			lang: "en-CA",
			capitalize: true,
			addPeriod: true,
			onstart: null,
			onerror: null,
			onend: null
		},
		
		_create: function() {
			var $this = this;
			
			this.interim_div = $( "<div>" )
				.addClass( this.options.classPrefix + "-speechtotext-interim" )
				.insertAfter( this.element );
			
			this._final_transcript = "";
			this._previous_transcript = "";
			if(typeof(webkitSpeechRecognition) != "undefined") {
				this._recognition = new webkitSpeechRecognition();
			} else {
				this._recognition = new SpeechRecognition();
			}
			this._recognition.continuous = true;
			this._recognition.interimResults = true;
			this._recognition.lang = this.options.lang;
			this._recognizing = false;
			
			// attach any event code as necessary
			if(this.options.onstart != null) this._recognition.onstart = this.options.onstart;
			if(this.options.onerror != null) this._recognition.onerror = this.options.onerror;
			if(this.options.onend != null) this._recognition.onend = this.options.onend;

			/*this._recognition.onstart = function() { ... }
			this._recognition.onresult = function(event) { ... }
			this._recognition.onerror = function(event) { ... }
			this._recognition.onend = function() { ... }*/
			
			this._recognition.onresult = function(event) {
				var $obj = jQuery($this.element[0]);
				var interim_transcript = '';
				var transcript;

				for (var i = event.resultIndex; i < event.results.length; ++i) {
					transcript = event.results[i][0].transcript;
					
					if (event.results[i].isFinal) {
						if($this.options.capitalize) transcript = transcript.replace(/\s?\S/, function(m) { return m.toUpperCase(); });
						if($this.options.addPeriod) transcript += ". ";
						$this._final_transcript += transcript;
					} else {
						interim_transcript += transcript;
					}
				}
				
				jQuery($this.interim_div).html(interim_transcript);
				$obj.val( $this._previous_transcript + $this._final_transcript);
			};			
			if(this.options.icon0 != "") this._attachIcon();
		},
		
		_attachIcon: function() {
			var $obj = jQuery(this.element[0]);
			var $this = this;
			
			this.mic = jQuery("<img>")
				.attr("src", this.options.icon0)
				.attr("title", "Click to start speech recognition.")
				.attr("alt", "mic")
				.addClass(this.options.classPrefix + "-speechtotext-icon")
				.insertAfter($obj)
				.position({ my: "right top", at: "right top", of: $obj })
				.click(function() {
					$this.toggle();
				});
			$obj.on("resize", function() {
				$this.mic.position({ my: "right top", at: "right top", of: $obj });
			});
		},

		_setOption: function(key, value) {
			switch(key) {
				case "icon0":
					this.mic.prop("src", value);
					this.options.icon0 = value;
					break;
				
				case "icon1":
				case "capitalize":
				case "addPeriod":
					this.options[key] = value;
					break;
				
				case "lang":
					this._recognition.lang = value;
					this.options.lang = value;
					break;
					
				case "classPrefix":
					this.interim_div.removeClass(this.options.classPrefix + "-speechtotext-interim").addClass(value + "-speechtotext-interim");
					this.mic.removeClass(this.options.classPrefix + "-speechtotext-icon").addClass(value + "-speechtotext-icon");
					this.options.classPrefix = value;
					break;
				
				case "onstart":
					this._recognition.onstart = value;
					this.options.onstart = value;
					break;
				
				case "onerror":
					this._recognition.onerror = value;
					this.options.onerror = value;
					break;
				
				case "onend":
					this._recognition.onend = value;
					this.options.onend = value;
					break;
			}
			this._super(key, value);
		},
		
		_destroy: function() {
			if(this._recognizing) this._recognition.abort();
			this.interim_div.remove();
			this.mic.remove();
		},
		
		toggle: function() {
			if(this._recognizing) {
				this.stop();
			} else {
				this.start();
			}
		},
		
		start: function() {
			if(!this._recognizing) {
				this._final_transcript = '';
				this._previous_transcript = jQuery(this.element[0]).val();
				this._recognizing = true;
				this.mic.prop("src", this.options.icon1);
				this._recognition.start();
			}
		},
		
		stop: function() {
			this._recognizing = false;
			this.mic.prop("src", this.options.icon0);
			this._recognition.stop();
		}
		
	});
})( jQuery );
