/**
 * Created by eparr on 10/3/2017.
 */

var heart = document.getElementById('heart');
heart.style.visibility = "hidden";
// moves the element at a time interval

function myMove() {
    heart.style.visibility = "visible";
    var leftPos = 0;
    var topPos = 0;
    var id = setInterval(frame, 5);
    function frame() {
        if (leftPos == 363 && topPos < 440) {
            topPos++;
            heart.style.top = topPos + 'px';
        } else if (topPos == 440 && leftPos <= 363 && leftPos != 0) {
            leftPos--;
            heart.style.left = leftPos + 'px';
        } else if (leftPos == 0 && topPos <= 440 && topPos != 0) {
            topPos--;
            heart.style.top = topPos + 'px';
        } else {
            leftPos++;
            heart.style.left = leftPos + 'px';
        }
    }
}

window.myMove();

