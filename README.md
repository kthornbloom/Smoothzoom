#Smoothzoom
A jQuery plugin to responsively zoom inline page images by <a href="http://kthornbloom.com">Kevin Thornbloom</a>.
<img src="http://kthornbloom.com/public/smoothzoom.gif">

##Demo
<a href="http://kthornbloom.com/smoothzoom" target="_blank">Open demo in new window</a>

##Features

- Lightweight script
- Zooms scaled down images, or wrap in an anchor to use thumbnails
- Zoomed images will always fit the screen in the best way

##Usage
- Include CSS in the header.

```
<link rel="stylesheet" href="css/smoothzoom.css">
```
- Include and call javascript in the footer.

```
	<script type="text/javascript" src="js/smoothzoom.min.js"></script>
	<script type="text/javascript">
		 $(window).load( function() {
		 $('img').smoothZoom({
        	// Options go here
        		});
		 });
	</script>

```
- Add rel="zoom" to any image you want to zoom

```
<img src="images/1.jpg" rel="zoom">
```
- To use thumbnails, set the smaller image in the img tag. Then wrap it in an anchor that points to the larger.

```
<a href="images/3.jpg"><img src="images/3-THUMB.jpg" rel="zoom"></a>
```
- Available Options:
<table class="rwd-table">
	<tbody><tr>
		<td><b>Option</b></td>
		<td><b>Description</b></td>
		<td><b>Values</b></td>
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
		<td>resizeDelay</td>
		<td>Check if window resized every X milliseconds</td>
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
</tbody></table>

##Licensing
Free to use and modify personally or commercially. Not for resale. 

##Help & Feedback
Connect with me on <a href="https://twitter.com/kthornbloom" target="_blank">twitter.</a>
