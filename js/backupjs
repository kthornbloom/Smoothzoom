/*
 * Smoothzoom
 * http://kthornbloom.com
 *
 * Copyright 2014, Kevin Thornbloom
 * Free to use and modify under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 */

(function ($) {
    $.fn.extend({
        smoothZoom: function (options) {

            // These are overridden by options declared in footer
            var defaults = {
                zoominSpeed: 500,
                zoomoutSpeed: 500,
                zoominEasing: 'easeOutExpo',
                zoomoutEasing: 'easeOutBack',
                useThumbnails: 'false'
            }

            var options = $.extend(defaults, options);



            // Click Image

            $('img[rel="zoom"]').click(function (event) {
                $(this).addClass('lightZoomed');
                var link = $(this).attr('src'),
                    largeImg = $(this).parent().attr('href');
                    offset = $(this).offset(),
                    width = $(this).width(),
                    height = $(this).height(),
                    amountScrolled = $(window).scrollTop(),
                    viewportWidth = $(window).width(),
                    viewportHeight = $(window).height();
                if (useThumbnails = 'true') {
                    if ((! largeImg)||(largeImg == "#")) {
                        $('body').append("<div id='lightwrap'><img src=" + link + "></div><div id='lightbg'></div><img id='off-screen' src=" + link + ">");
                    } else {
                        $('body').append("<div id='lightwrap'><img src=" + largeImg + "></div><div id='lightbg'></div><img id='off-screen' src=" + largeImg + ">");
                    }
                } else {
                    $('body').append("<div id='lightwrap'><img src=" + link + "></div><div id='lightbg'></div><img id='off-screen' src=" + link + ">");
                }
                    $("#off-screen").load(function() {
                        var naturalWidth = this.width;   
                        var naturalHeight = this.height;
                    });
                $('#lightwrap img').css({
                    width: width,
                    height: height,
                    top: (offset.top - amountScrolled),
                    left: offset.left
                });
                imageSizer();
                $('#lightbg').fadeIn();
                event.preventDefault();
            });

            $(document.body).on("click", "#lightwrap, #lightbg", function (event) {
                var offset = $(".lightZoomed").offset(),
                    originalWidth = $(".lightZoomed").width(),
                    originalHeight = $(".lightZoomed").height(),
                    amountScrolled = $(window).scrollTop();
                $('#lightbg').fadeOut(500);
                $('#lightwrap img').animate({
                    height: originalHeight,
                    width: originalWidth,
                    top: (offset.top - amountScrolled),
                    left: offset.left,
                    marginTop: '0',
                    marginLeft: '0'
                }, options.zoomoutSpeed, options.zoomoutEasing, function () {
                        $('#lightwrap, #lightbg, #off-screen').remove();
                        $('.lightZoomed').removeClass('lightZoomed');
                    
                });
            });

            // Delay Function
            var delay = (function () {
                var timer = 0;
                return function (callback, ms) {
                    clearTimeout(timer);
                    timer = setTimeout(callback, ms);
                };
            })();

            // On Window Resize, Fix Img Size
            $(window).resize(function () {
                delay(function () {
                    imageSizer();
                }, 500);
            });

            function fitHeight() {
                
                var viewportHeight = $(window).height(),
                    viewportWidth = $(window).width(),
                    naturalWidth = $('#lightwrap img').prop('naturalWidth'),
                    naturalHeight = $('#lightwrap img').prop('naturalHeight'),
                    newHeight = (viewportHeight * 0.95),
                    ratio = (newHeight / naturalHeight),
                    newWidth = (naturalWidth * ratio);
                if (newHeight > naturalHeight) {
                    $('#lightwrap img').animate({
                        height: naturalHeight,
                        width: naturalWidth,
                        left: '50%',
                        top: '50%',
                        marginTop: -(naturalHeight / 2),
                        marginLeft:-(naturalWidth / 2)
                    }, options.zoominSpeed, options.zoominEasing);
                } else {
                    if (newWidth > viewportWidth) {
                        fitWidth();
                    } else {
                        $('#lightwrap img').animate({
                            height: newHeight,
                            width: newWidth,
                            left: '50%',
                            top: '2.5%',
                            marginTop: '0',
                            marginLeft: -(newWidth / 2)
                        }, options.zoominSpeed, options.zoominEasing);
                    }
                }
            }

            function fitWidth() {    
                
                var naturalWidth = $('#lightwrap img').prop('naturalWidth'),
                    naturalHeight = $('#lightwrap img').prop('naturalHeight'),
                    viewportWidth = $(window).width(),
                    viewportHeight = $(window).height(),
                    newWidth = (viewportWidth * 0.95),
                    ratio = (newWidth / naturalWidth),
                    newHeight = (naturalHeight * ratio);

                if (newHeight > naturalHeight) {
                    $('#lightwrap img').animate({
                        height: naturalHeight,
                        width: naturalWidth,
                        top: '50%',
                        left: '50%',
                        marginTop: -(naturalHeight / 2),
                        marginLeft:-(naturalWidth / 2)
                    }, options.zoominSpeed, options.zoominEasing);
                } else {
                    if(newHeight > viewportHeight) {
                        fitHeight();
                    } else {
                        $('#lightwrap img').animate({
                            height: newHeight,
                            width: newWidth,
                            top: '50%',
                            left: '2.5%',
                            marginTop: -(newHeight / 2),
                            marginLeft:'0'
                        }, options.zoominSpeed, options.zoominEasing);
                    }
                }
            }
            function fitSquare() {    
                
                var naturalWidth = $('#lightwrap img').prop('naturalWidth'),
                    naturalHeight = $('#lightwrap img').prop('naturalHeight'),
                    viewportWidth = $(window).width(),
                    viewportHeight = $(window).height(),
                    newWidth = (viewportWidth * 0.95),
                    ratio = (newWidth / naturalWidth),
                    newHeight = (naturalHeight * ratio);
                    if (newHeight > naturalHeight) {
                        $('#lightwrap img').animate({
                            height: naturalHeight,
                            width: naturalWidth,
                            top: '50%',
                            left: '50%',
                            marginTop: -(naturalHeight / 2),
                            marginLeft:-(naturalWidth / 2),
                        }, options.zoominSpeed, options.zoominEasing);
                    } else {
                        if(naturalHeight > viewportHeight) {
                            fitHeight();
                        } else {
                            $('#lightwrap img').animate({
                                height: newHeight,
                                width: newWidth,
                                top: '50%',
                                left: '2.5%',
                                marginTop: -(newHeight / 2),
                                marginLeft:'0'
                            }, options.zoominSpeed, options.zoominEasing);
                        }
                    }
            }
            // Image sizer
            function imageSizer() {
                var naturalWidth = $('#lightwrap img').prop('naturalWidth'),
                    naturalHeight = $('#lightwrap img').prop('naturalHeight'),
                    viewportWidth = $(window).width(),
                    viewportHeight = $(window).height(),
                    testHeight = (viewportHeight*.95),
                    testWidth = naturalWidth * (testHeight / naturalHeight);

                $('h1').html(naturalHeight);
                    
                if (naturalHeight > naturalWidth) {
                    fitHeight();
                } else if (naturalHeight == naturalWidth) {
                    fitSquare();
                } else {
                    $('h1').html('fitwidth');
                    fitWidth();
                }
            }

        }
    });
})(jQuery);
