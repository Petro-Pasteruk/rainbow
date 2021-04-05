$(document).ready(function(){
  	$(".slider").owlCarousel({
 		autoplay: false,
 		items: 3
  })

  	$(".toggle-mnu").click(function() {
		$(this).toggleClass("on");
		$(".main-mnu").slideToggle();
		return false;
	})
  	 
});

