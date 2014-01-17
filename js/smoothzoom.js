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

            // Set Defaults
            var defaults = {
                zoominSpeed: 1000,
                zoomoutSpeed: 1000,
                zoominEasing: 'easeOutExpo',
                zoomoutEasing: 'easeOutExpo',
                useThumbnails: 'false'
            }

            var options = $.extend(defaults, options);



            // Click Image

            $('img[rel="zoom"]').click(function (event) {
                $(this).attr('id', 'lightzoomed');
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
                    $('#lightwrap img').css({
                        width: width,
                        height: height,
                        top: (offset.top - amountScrolled),
                        left: offset.left
                    });
                    imageSizer();
                    $('#lightbg').fadeIn();
                });
                
                    event.preventDefault(); 
            });

            // Close Modal Overlay

            $(document.body).on("click", "#lightwrap, #lightbg", function (event) {
                var offset = $("#lightzoomed").offset(),
                    originalWidth = $("#lightzoomed").width(),
                    originalHeight = $("#lightzoomed").height(),
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
                        $('#lightzoomed').removeAttr('id');
                    
                });
            });

            // Delay Function so window resize only checks every 500ms
            var delay = (function () {
                var timer = 0;
                return function (callback, ms) {
                    clearTimeout(timer);
                    timer = setTimeout(callback, ms);
                };
            })();

            // On Window Resize, fix image size
            $(window).resize(function () {
                delay(function () {
                    imageSizer();
                }, 500);
            });


            // Function to fit image based on height
            function fitHeight() {
                
                var viewportHeight = $(window).height(),
                    viewportWidth = $(window).width(),
                    naturalWidth = $('#off-screen').width(),
                    naturalHeight = $('#off-screen').height(),
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

            // Function to fit image based on width
            function fitWidth() {    
                
                var naturalWidth = $('#off-screen').width(),
                    naturalHeight = $('#off-screen').height(),
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

            // Function to fit square images
            function fitSquare() {    
                
                var naturalWidth = $('#off-screen').width(),
                    naturalHeight = $('#off-screen').height(),
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

            // Determines if the image should be sized by height, width, or as a square
            function imageSizer() {
                var naturalWidth = $('#off-screen').width(),
                    naturalHeight = $('#off-screen').height(),
                    viewportWidth = $(window).width(),
                    viewportHeight = $(window).height(),
                    testHeight = (viewportHeight*.95),
                    testWidth = naturalWidth * (testHeight / naturalHeight);

                
                if (naturalHeight > naturalWidth) {
                    fitHeight();
                } else if (naturalHeight == naturalWidth) {
                    fitSquare();
                } else {
                    fitWidth();
                }
            }

        }
    });
})(jQuery);
