#Smoothzoom
A jQuery plugin to zoom and scroll through images by <a href="http://kthornbloom.com">Kevin Thornbloom</a>.

##Demo
<a href="http://kthornbloom.com/smoothzoom" target="_blank">Open demo in new window</a>

##Features

- Images zoom from their location on the page when clicked, and zoom back when closed. 
- Minimal, clean interface
- Keyboard accessable for previous(left arrow), next(right arrow), and close(esc or down arrow) functions.
- Responsive
- 'Lightbox' type viewer for groups of images
<i>Note: not for use with text links</i>

##Usage
- Include CSS in the header.

```
<link rel="stylesheet" href="css/smoothzoom.css">
```
- Include the load.gif image in the images folder
- Include and call javascript in the footer. jQuery and jQuery easing are used by this plugin.

```
	<script type="text/javascript" src="js/jquery.js"></script>
	<script type="text/javascript" src="js/easing.js"></script>
	<script type="text/javascript" src="js/smoothzoom.min.js"></script>
	<script type="text/javascript">
		 $(window).load( function() {
		 $('img').smoothZoom({
        	// Options go here
        	});
		 });
	</script>

```
- Create an image tag with your thumbnail.  To add an optional caption, use the alt tag. Wrap the whole thing in a link pointing to the full size image. Add data-smoothzoom="group1" to the link. You may change group1 to anything you'd like.
Use different names for different groupings of images.
```
<a href="images/1-large.jpg" data-smoothzoom="group1"><img src="images/1-small.jpg" alt="This is a caption"></a>
```
- Available Options:
<table class="rwd-table">
	<tbody><tr>
		<td><b>Option</b></td>
		<td><b>Description</b></td>
		<td><b>Default</b></td>
	</tr>
	<tr>
		<td>zoominSpeed</td>
		<td>Time (in milliseconds) the zoom-in lasts</td>
		<td>800</td>
	</tr>
	<tr>
		<td>zoomoutSpeed</td>
		<td>Time (in milliseconds) the zoom-out lasts</td>
		<td>400</td>
	</tr>
	<tr>
		<td>zoominEasing</td>
		<td>jQuery easing method on zoom-in (requires easing plugin)</td>
		<td>easeOutExpo</td>
	</tr>
	<tr>
		<td>zoomoutEasing</td>
		<td>jQuery easing method on zoom-out (requires easing plugin)</td>
		<td>easeOutExpo</td>
	</tr>
	<tr>
		<td>navigationButtons</td>
		<td>Set 'true' or 'false' for previous and next buttons. Buttons will not appear unless there is a group of images.</td>
		<td>true</td>
	</tr>
	<tr>
		<td>closeButton</td>
		<td>Set 'true' or 'false' for a close button on the modal window.</td>
		<td>false</td>
	</tr>
	<tr>
		<td>showCaption</td>
		<td>Set 'true' or 'false' to show captions.</td>
		<td>true</td>
	</tr>
</tbody></table>

##Browser Support
Chrome ✓
Firefox ✓
Safari ✓
IE - should work, but untested. Let me know how it goes!

##Licensing
Free to use and modify personally or commercially. Not for resale. 

##Help & Feedback
Connect with me on <a href="https://twitter.com/kthornbloom" target="_blank">twitter.</a>
