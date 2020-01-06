(function($) {
 	//alert('===');

    //Attach this new method to jQuery
    $.fn.extend({
        EMSwitchBox: function(options) {
        	//alert('box');
			//alert('options:' + options.onLabel);
			//Set up defaults
			var defaults = { 
				onLabel:      'On', 
				offLabel:     'Off' 
			};
			var options = $.extend({}, defaults, options)
            //Iterate over the current set of matched elements
            return this.each(function() {
            	//alert(this);
                var $markup = $('<div class="switch"><span class="green">'+options.onLabel+'</span><span class="red">'+options.offLabel+'</span><div class="thumb"></div></div>');
                $markup.insertAfter($(this));
                $(this).hide();

                $('div.switch').toggle(function()
                {
                	//alert('off');
//                    if ((navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPod/i)) || (navigator.userAgent.match(/iPad/i)) || (navigator.userAgent.match(/Android/i)))
//                    {
//                    	//alert('支持其它');
//                        $(this).children('div.thumb').css({
//                            '-webkit-transition-duration': '300ms',
//                            '-webkit-transform': 'translate3d(53px,0,0)'
//                        });
//                    }
//                    else
//                    {
//                        $(this).children('div.thumb').animate({
//                            left: 26
//                        },
//                        300);
//                    }
                    $(this).children('div.thumb').animate({
                            left: 26
                        },
                        300);
                    //$(this).prev('input').attr('checked', true);

                },
                function()
                {
                	//alert('on');
//                    if ((navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPod/i)) || (navigator.userAgent.match(/iPad/i)) || (navigator.userAgent.match(/Android/i)))
//                    {
//                        $(this).children('div.thumb').css({
//                            '-webkit-transition-duration': '300ms',
//                            '-webkit-transform': 'translate3d(0,0,0)'
//                        });
//                    }
//                    else
//                    {
//                        $(this).children('div.thumb').animate({
//                            left: -27
//                        },
//                        300);
//                    }
                    $(this).children('div.thumb').animate({
                            left: -27
                        },
                        300);
                    //$(this).prev('input').attr('checked', false);
                });

            });

        }
    });
})(jQuery);