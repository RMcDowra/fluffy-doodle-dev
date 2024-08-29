$(document).ready(function () {

  $("img").click(function () {
    console.log("position: ", $("img").position());

  });


  $("img").draggable({
    containment: "#containment-wrapper",
    scroll: true,
    stop: function () {
      if ($("img").position().left > 300) {
        $("p").text("The Tribal Chief is surprised! KEEP GOING!");
        $("img").attr(
          "src",
          "https://pbs.twimg.com/profile_images/1607314822676234241/hPodyBa4_400x400.jpg"
        );
      
        if ($("img").position().left > 600) {
          $("p").text("Congratulations! You have been ACKNOWLEDGED!");
          $("img").attr(
            "src",
            "https://pbs.twimg.com/media/FVyBDxzaIAAzUoU.jpg"
          );
          
        }
    
      }
    }
  });
});