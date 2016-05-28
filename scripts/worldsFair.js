/**
 * Created by Solaman on 5/28/2016.
 */
(function() {
   var doodleContainerElement = document.getElementById("doodle-container").getElementsByClassName("overlay")[0];
   var lookingGlassElement = document.getElementById("looking-glass");
   var smallDoodleWidth = doodleContainerElement.clientWidth;

   var bigDoodleContainerElement = document.getElementById("big-doodle-container-mid");
   //var bigDoodleContainerTopElement = document.getElementById("big-doodle-container-top");
   //var bigDoodleContainerBottomElement = document.getElementById("big-doodle-container-bottom");

   var bigDoodleElement = bigDoodleContainerElement.getElementsByTagName("img")[0];
   var bigDoodleWidth = bigDoodleElement.naturalWidth;
   var doodleDisplacement = (bigDoodleWidth/ smallDoodleWidth - 1);

   //var bigDoodleTopElement = bigDoodleContainerTopElement.getElementsByTagName("img")[0];
   //var bigDoodleBottomElement = bigDoodleContainerBottomElement.getElementsByTagName("img")[0];

    var actionCount = 0;
    var currentAction = 0;
   function moveLookingGlass(event) {
       var x = event.clientX;
       var y = event.clientY;

       lookingGlassElement.style["top"] = (y-50) + "px";
       lookingGlassElement.style["left"] = (x- 50) + "px";
   }

   function moveMagnifiedDoodle(event) {
       var x = event.clientX;
       var y = event.clientY;

       var deltaX = x*doodleDisplacement;
       var deltaY = y*doodleDisplacement;

       bigDoodleElement.style["top"] = -(y + deltaY) + "px";
       bigDoodleElement.style["left"] = -(x + deltaX) + "px";
       bigDoodleContainerElement.style["top"] = (y - 46) + "px";
       bigDoodleContainerElement.style["left"] = (x - 46) + "px";

   }

   doodleContainerElement.addEventListener("mouseenter", function(event) {
         lookingGlassElement.classList.add("active");

         bigDoodleContainerElement.classList.add("active");
         doodleContainerElement.addEventListener("mousemove", moveLookingGlass);
         doodleContainerElement.addEventListener("mousemove", moveMagnifiedDoodle);
   });

   doodleContainerElement.addEventListener("mouseleave", function(event) {
        lookingGlassElement.classList.remove("active");
        bigDoodleContainerElement.classList.remove("active");
        doodleContainerElement.removeEventListener("mousemove", moveLookingGlass);
       doodleContainerElement.removeEventListener("mousemove", moveMagnifiedDoodle);
   });
})();