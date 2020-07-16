!function(window, document, $, undefined) {
    $(function() {
        var $li = $("#skin li"),
            cookie_skin = $.cookie("MyCssSkin");
        $li.on("click", function() {
            //console.log(this)
            switchSkin(this.id);
        });

        if(cookie_skin) {
            switchSkin(cookie_skin);
        }
    });

    function switchSkin(skinName) {
        $("#" + skinName)
            .addClass("selected")
            .siblings(".selectde").removeClass("selected");
        $("#cssfile").attr('href', "css/skin" + skinName + ".css");
        $.cookie("MyCssSkin", skinName, {path:"/", express:10});
    };

    $(function() {
        $(".module_up_down").on("click", function() {
            var $this = $(this);
            $this.prev().slideToggle();
        });
    });

    $(function() {
        var $scrollNews = $(".scrollNews"),
            scrollTimer;

        /*var scrollTimer = setInterval(function() {
            scrollNews($scrollNews);
        }, 3000);*/

        function timer() {
            scrollTimer = setInterval(function() {
            scrollNews($scrollNews);
            }, 3000);
        };

        $scrollNews.hover(function() {
            clearInterval(scrollTimer);
        }, function() {
            timer();
        }).trigger("mouseleave");
    });

    function scrollNews(obj) {
            var $self = obj.find("ul:first");
            var lineHeight = $self.find("li:first").height();
            $self.animate({"marginTop":0}, 600, function() {
                $self.css({"marginTop":0}).find("li:first").appendTo($self);
            });
        };

    $(function() {
        $(".m-treeview > li > span").on("click", function() {
            var $ul = $(this).siblings("ul");
            if($ul.is(":visible")) {
                $ul.hide();
            }else {
                $ul.show();
            }
            return false;
        });
    });

    /*广告*/
    $(function() {
        /*var len = $(".num > li").length,
            index = 0,
            adTimer;
        $(".num > li").on("mouseover", function() {
            index = $(this).index();
            showImg(index);
        }).eq(0).mouseover();

        $(".ad").hover(function() {
            clearInterval(adTimer);
        }, function() {
            adTimer = setInterval(function() {
                showImg(index);
                index++;
                if(index = len) {
                    index = 0;
                }
            }, 3000);
        }).trigger("mouseleave")*/
    
        var $target = $('.ad'),
            $slideLi = $target.find('.num > li'),
            $sliderPic = $target.find('.slider > li'),
            timer;

            $sliderPic.each(function(i) {
                $(this).attr('index', i);
            });

        $slideLi.on('click', function() {
            var $this = $(this),
            currIndex = $this.index(),
            oldIndex = $this.siblings('.cur').index();

            $this.addClass('cur').siblings('.cur').removeClass('cur');
            $sliderPic.eq(oldIndex).before($sliderPic.eq(currIndex));
        
            $target.find('.slider > li').each(function(i) {
                $(this).css('z-index', $sliderPic.length - i - 1);
            });
            $sliderPic.eq(oldIndex).show().fadeOut();
            $sliderPic.eq(currIndex).hide().fadeIn();
        });
        /*$target.find('a.next').on('click', function() {
            var $this = $(this);
            var oldIndex = $slideLi.filter('.cur').index();
            oldIndex++;

            if (oldIndex == $slideLi.length) {
                oldIndex = 0;
            }
            //console.log(oldIndex);
            $slideLi.eq(oldIndex).trigger('click');
        });

        $target.find('a.prev').on('click', function() {
            var $this = $(this);
            var oldIndex = $slideLi.filter('.cur').index();
            oldIndex--;

            if (oldIndex == $slideLi.length) {
                oldIndex = 0;
            }
            //console.log(oldIndex);
            $slideLi.eq(oldIndex).trigger('click');
        });*/

        function onhover() {
            timer = setInterval(function() {
                $target.find('.num > li').trigger('click');
            }, 2000);
        };
        onhover();

        $target.hover(function() {
            clearInterval(timer);
        }, function() {
            onhover();
        });

    });
}(window, document, jQuery);