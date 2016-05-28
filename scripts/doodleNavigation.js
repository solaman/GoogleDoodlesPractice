/**
 * Created by Solaman on 5/26/2016.
 */
var reverseDoodleIndex = ['childrensday11-hp.png', 'flower.jpg', 'marionettes.png', 'wrench.jpg'];

var doodleImageNames = ['childrensday11-hp.png', 'flower.jpg', 'marionettes.png', 'wrench.jpg'];

var doodleContainerElement = document.getElementById("doodle-container");

(function() {
    var currentDoodleIndex = 0;
    var doodleURL = "resources/images/";
    var doodleImageElement = doodleContainerElement.getElementsByClassName("displayed-doodle")[0];
    var swapFrom = 0;
    doodleImageElement.addEventListener("load", function() {
       this.style["top"] = (150 - this.height/2) + "px";
       doodleEnter(swapFrom);
    });

    var prevLink = doodleContainerElement.getElementsByClassName("prev-doodle")[0];
    var nextLink = doodleContainerElement.getElementsByClassName("next-doodle")[0];

    var doodleEnter = function(doodleDelta) {
        if(doodleDelta === 0) {
            return;
        }
        resetDoodlePosition();
        var distanceToStart = (doodleImageElement.width + doodleContainerElement.clientWidth)/2;
        var numberOfFrames = 60;
        var horizontalPositionFrameDelta = distanceToStart/numberOfFrames;
        var horizontalPositionProperty = null;
        if(doodleDelta > 0) {
            horizontalPositionProperty = "right";
        } else {
            horizontalPositionProperty = "left";
        }

        doodleImageElement.style[horizontalPositionProperty] = distanceToStart + "px";
        doodleImageElement.style["opacity"] = 1;
        var interval = setInterval(doodleEnteringAnimation, 5);
        var distanceFromStart = distanceToStart;
        function doodleEnteringAnimation() {
            if(distanceFromStart <= 0) {
                doodleImageElement.style[horizontalPositionProperty] = 0 + "px";
                clearInterval(interval);
                prevLink.classList.remove("disabled");
                nextLink.classList.remove("disabled");
            } else {
                distanceFromStart -= horizontalPositionFrameDelta;
                doodleImageElement.style[horizontalPositionProperty] = distanceFromStart + "px";
            }
        }
    };

    function resetDoodlePosition() {
        doodleImageElement.style["left"] = null;
        doodleImageElement.style["right"] = null;
    }

    var doodleExit = function(pageDelta){
        resetDoodlePosition();
        var distanceToCover = (doodleImageElement.width + doodleContainerElement.clientWidth)/2;
        var numberOfFrames = 60;
        var horizontalPositionFrameDelta = distanceToCover/numberOfFrames;
        var horizontalPositionProperty = null;
        if(pageDelta > 0) {
            horizontalPositionProperty = "left";
        } else {
            horizontalPositionProperty = "right";
        }

        var interval = setInterval(doodleLeavingAnimation, 5);

        var coveredDistance = 0;
        function doodleLeavingAnimation() {
            if (coveredDistance >= distanceToCover) {
                clearInterval(interval);
                swapDoodles(pageDelta);
            } else {
                coveredDistance += horizontalPositionFrameDelta;
                doodleImageElement.style[horizontalPositionProperty] = coveredDistance + "px";
            }
        }
    };

    var swapDoodles = function(pageDelta) {
        currentDoodleIndex = ((currentDoodleIndex + pageDelta) % doodleImageNames.length + doodleImageNames.length ) % doodleImageNames.length;
        doodleImageElement.style["opacity"] = 0;
        swapFrom = pageDelta;
        doodleImageElement.setAttribute("src", doodleURL + doodleImageNames[currentDoodleIndex]);
    };

    prevLink.addEventListener("click", function() {
        if(prevLink.classList.contains("disabled")){
         return;
        }
        prevLink.classList.add("disabled");
        nextLink.classList.add("disabled");
        doodleExit(-1);
    });

    nextLink.addEventListener("click", function() {
        if(nextLink.classList.contains("disabled")){
            return;
        }
        prevLink.classList.add("disabled");
        nextLink.classList.add("disabled");
        doodleExit(1);
    });
})();

