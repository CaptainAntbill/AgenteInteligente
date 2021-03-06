const TRAFFIC_FRECUENCY = {
     low: 3000,
     medium: 1500,
     high: 800
 };
 
 const TIME_MODIFIER = {
     low: 0,
     medium: 0.5,
     high: 1
 };

 const MAX_LANE_CARS = 5;

let lanes = {
    x: new HorizontalLane("#lane-1", "#traffic-light-1", "#light-counter-1", false, "high"),
    y: new VerticalLane("#lane-2", "#traffic-light-2", "#light-counter-2", true, "medium"),
}

$(document).ready(function () {
    countdown(10, lanes.x, lanes.y);
});

$("input[type=radio][name^=frecuency]").change(function() {
    let frecuency = this.value;
    let lane = lanes[$(this).data("lane")];
    lane.frecuency = frecuency;
    
    // If lane not stopped, restart to update frecuency
    if(!lane.stopped) {
        lane.start()
    }
});

function countdown(seconds, greenLane, redLane) {
    function tick() {
        seconds--;
        $(greenLane.counter).children().first().html(seconds);
        $(redLane.counter).children().first().html(seconds + 1);
        if( seconds == 2 ) {
            $(`${greenLane.light}, ${greenLane.counter}`).removeClass("green");
            $(`${greenLane.light}, ${greenLane.counter}`).addClass("yellow");
        }
        if( seconds > 0 ) {
            setTimeout(tick, 1000);
        } else {
            greenLane.stop();
            setTimeout(() => {
                redLane.start();
                countdown(calculateSeconds(redLane, greenLane), redLane, greenLane);
            }, 500);
        }
    }
    tick();
}

function calculateSeconds(greenLane, redLane) {
    let additionalSecconds = (TIME_MODIFIER[greenLane.frecuency] - TIME_MODIFIER[redLane.frecuency]) * 10;
    return 20 + additionalSecconds;
}




