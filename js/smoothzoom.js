/*
 * Smoothzoom V 1.1.0
 * http://github.com/kthornbloom/smoothzoom
 *
 * Copyright 2015, Kevin Thornbloom
 * Free to use in personal and commercial projects.
 * Do not resell as a plugin
 * http://www.opensource.org/licenses/mit-license.php
 */

(function($) {
	$.fn.extend({
		smoothZoom: function(options) {

			var defaults = {
				zoominSpeed: 800,
				zoomoutSpeed: 400,
				zoominEasing: 'easeOutExpo',
				zoomoutEasing: 'easeOutExpo',
				navigationButtons: 'true',
				closeButton: 'false',
				showCaption:'true'
			}

			var options = $.extend(defaults, options);



			// CLICKING AN IMAGE

			$('a[data-smoothzoom]').click(function(event) {

				var link = $('img', this).attr('src'),
					largeImg = $(this).attr('href'),
					target = $(this).attr('target'),
					offset = $('img', this).offset(),
					width = $('img', this).width(),
					height = $('img', this).height(),
					amountScrolled = $(window).scrollTop(),
					viewportWidth = $(window).width(),
					viewportHeight = $(window).height();

					$('img', this).attr('id', 'lightzoomed');
					$('body').append("<div class='sz-overlay'></div><a href='#' class='sz-zoomed' style='background:url(" + largeImg + ")'>&nbsp;</a><div class='sz-ui'></div>");

					// Add Nav buttons if needed, and if option is set
					var groupName = $('#lightzoomed').parents('a').data('smoothzoom'),
						groupTotal = $('a[data-smoothzoom=' + groupName + ']').length
					if (options.navigationButtons == 'true' && groupTotal > 1) {$('body').append("<a href='#' class='sz-left'>&#9664;</a><a href='#' class='sz-right'>&#9654;</a>");}

					// Add Close button if option is set
					if (options.closeButton == 'true') {$('body').append("<a href='#' class='sz-close'>&#10006;</a>")}

					// Add Caption div if option is set
					if (options.showCaption == 'true') {$('body').append("<div class='sz-caption'></div>");caption();}

					$('.sz-overlay, .sz-left, .sz-right').fadeIn();
					$('.sz-zoomed').css({
						width: width,
						height: height,
						top: (offset.top - amountScrolled),
						left: offset.left
					});
					$('.sz-zoomed').animate({
						width: '90%',
						height: '90%',
						top: '5%',
						left: '5%'
					}, options.zoominSpeed, options.zoominEasing);

				event.preventDefault();
			});

			// Close Everything On Click
			$(document.body).on("click", ".sz-zoomed, .sz-close", function(event) {
				closeAll();
				event.preventDefault();
			});

			// Next Button
			$(document.body).on("click", ".sz-right", function(event) {
				advanceGroup();
				event.preventDefault();
			});

			// Prev Button
			$(document.body).on("click", ".sz-left", function(event) {
				devanceGroup();
				event.preventDefault();
			});

			// Update Caption
			function caption(){
				if (options.showCaption == 'true') {
					var currentCap = $('#lightzoomed').attr('alt');
					if(currentCap) {
						$(".sz-caption").html("<span>" + currentCap+ "</span>").fadeIn();
					} else {
						$(".sz-caption").empty();
					}
				}
			}

			// Close Function
			function closeAll() {
					var offset = $("#lightzoomed").offset(),
					originalWidth = $("#lightzoomed").width(),
					originalHeight = $("#lightzoomed").height(),
					amountScrolled = $(window).scrollTop();
				$('.sz-overlay, .sz-left, .sz-right').fadeOut();
				$('.sz-zoomed').animate({
					width: originalWidth,
					height: originalHeight,
					top: (offset.top - amountScrolled),
					left: offset.left
				}, options.zoomoutSpeed, options.zoomoutEasing, function() {
					$('.sz-zoomed, .sz-overlay, .sz-right, .sz-left, .sz-caption, .sz-close').remove();
					$('#lightzoomed').removeAttr('id');
				});
			}

			// Move forward in group
			function advanceGroup() {
				var groupName = $('#lightzoomed').parents('a').data('smoothzoom'),
					currentIndex = $('#lightzoomed').parents('a').index("[data-smoothzoom=" + groupName + "]"),
					groupTotal = $('a[data-smoothzoom=' + groupName + ']').length,
					nextIndex = currentIndex + 1;
				// if at end
				if (nextIndex >= groupTotal) {
					// do a little bounce
					$('.sz-zoomed').animate({
						width: '80%',
						height: '80%',
						top: '10%',
						left: '10%'
					},200, function(){
						$('.sz-zoomed').animate({
							width: '90%',
							height: '90%',
							top: '5%',
							left: '5%'
						},200);
					});
				} else {
					// fade out and remove current image
					$("#lightzoomed").removeAttr('id');
					$('.sz-caption').fadeOut();
					$('.sz-zoomed').animate({
						width: '80%',
						height: '80%',
						top: '10%',
						left: '10%',
						opacity:'0'
					}, function(){
						// find next image
						$("[data-smoothzoom=" + groupName + "]:eq(" + nextIndex + ")").find('img').attr('id', 'lightzoomed');
						var newImg = $("#lightzoomed").parent().attr('href');
						// set new background and initial CSS state
						$('.sz-zoomed').css({
							opacity:'0',
							background: 'url(' + newImg + ')',
							width: '80%',
							height: '80%',
							top: '10%',
							left: '10%'
						});
						// animate back in
						$('<img/>').attr('src', newImg).load(function() {
							$(this).remove();
							$('.sz-zoomed').animate({
								opacity:'1',
								width: '90%',
								height: '90%',
								top: '5%',
								left: '5%'
							});
						});
						
						caption();
					});
				}
			}

			// Go Back in Group
			function devanceGroup() {
				var groupName = $('#lightzoomed').parents('a').data('smoothzoom'),
					currentIndex = $('#lightzoomed').parents('a').index("[data-smoothzoom=" + groupName + "]"),
					groupTotal = $('a[data-smoothzoom=' + groupName + ']').length,
					nextIndex = currentIndex - 1;
				// if at end
				if (nextIndex <= -1) {
					// do a little bounce
					$('.sz-zoomed').animate({
						width: '80%',
						height: '80%',
						top: '10%',
						left: '10%'
					},200, function(){
						$('.sz-zoomed').animate({
							width: '90%',
							height: '90%',
							top: '5%',
							left: '5%'
						},200);
					});
				} else {
					// fade out and remove current image
					$("#lightzoomed").removeAttr('id');
					$('.sz-caption').fadeOut();
					$('.sz-zoomed').animate({
						opacity:'0',
						width: '80%',
						height: '80%',
						top: '10%',
						left: '10%'
					}, function(){
						// find next image
						$("[data-smoothzoom=" + groupName + "]:eq(" + nextIndex + ")").find('img').attr('id', 'lightzoomed');
						var newImg = $("#lightzoomed").parent().attr('href');
						// set new background and initial CSS state
						$('.sz-zoomed').css({
							background: 'url(' + newImg + ')',
							opacity:'0',
							width: '80%',
							height: '80%',
							top: '10%',
							left: '10%'
						});
						// animate back in
						$('<img/>').attr('src', newImg).load(function() {
							$(this).remove();
							$('.sz-zoomed').animate({
								width: '90%',
								height: '90%',
								top: '5%',
								left: '5%',
								opacity:'1'
							});
						});
						caption();
					});
				}
			}

			// Keyboard shortcuts
			$(document).keydown(function(e) {
				switch (e.which) {
					case 37: // Left arrow
						if ($('.sz-overlay').length) {
							devanceGroup();
						}
						break;

					case 39: // Right arrow
						if ($('.sz-overlay').length) {
							advanceGroup();
						}
						break;

					case 27: // Escape key
						closeAll();
						break;

					case 40: // Down arrow
						closeAll();
						break;

					default:
						return; // exit this handler for other keys
				}
				e.preventDefault();
			});

		}
	});
})(jQuery);
