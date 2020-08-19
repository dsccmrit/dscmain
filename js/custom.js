/****************************************************

Just a quick and dirty hack of this original codepen

https://codepen.io/enricotoniato/pen/dteFo

***************************************************/

$(window).on('resize', function() {
    globalww = $(window).width();
    globalwh = $(window).height() + 60;
    $('#bubbles-container').width(globalww + 60).height(globalwh);
});

function styleDynamic() {
    var colorOptions = ['#ea4335', '#fbbc05', '#34a753', '#4184f4'];
    return {
        bubbles_color: colorOptions[Math.floor(Math.random() * colorOptions.length)],
        stroke_width: 0,
        stroke_color: "black"
    };
}

var background = {};
var globalww = $(window).width();
var globalwh = $(window).height();

background.initializr = function() {

    var $this = this;

    $this.id = "background_css3";
    $this.style = styleDynamic();
    $this.bubbles_number = 15;
    $this.speed = [1500, 8000]; //milliseconds
    $this.max_bubbles_height = $this.height;
    $this.shape = false;

    if ($("#" + $this.id).lenght > 0) {
        $("#" + $this.id).remove();
    }
    $this.object = $("<div id='bubbles-container' style='z-index:-1;margin:0;padding:0; overflow:hidden;position:fixed; top:0; background-repeat: no-repeat; background-attachment: fixed; background-position: center; background-size: cover;' id='"+$this.id+"'> </div>'").appendTo("body");
    $this.width = $this.object.width(globalww);
    $this.height = $this.object.height(globalwh + 60);

    $("body").prepend("<style>.shape_background {transform-origin:center; width:80px; height:80px; position: absolute}</style>");

    for (i = 0; i < $this.bubbles_number; i++) {
        $this.generate_bubbles()
    }

}

background.generate_bubbles = function() {
    var $this = this;
    $this.wh = globalwh;
    $this.ww = globalww;
    var base = $("<div class='shape_background'></div>");
    var shape_type = $this.shape ? $this.shape : Math.floor($this.rn(1, 1));
    $this.style = styleDynamic();
    if (shape_type == 1) {
        var bolla = base.css({
            borderRadius: "50%",
            background: $this.style.bubbles_color
        })
    } else if (shape_type == 2) {
        var bolla = base.css({
            width: 0,
            height: 0,
            "border-style": "solid",
            "border-width": "0 40px 69.3px 40px",
            "border-color": "transparent transparent " + $this.style.bubbles_color + " transparent",
            background: "transparent"
        });
    } else {
        var bolla = base.css({
            background: $this.style.bubbles_color
        });
    }
    var rn_size = $this.rn(.8, 1.2);
    bolla.css({
        "transform": "scale(" + rn_size + ") rotate(" + $this.rn(-360, 360) + "deg)",
        top: $this.wh + 100,
        left: $this.rn(-60, $this.ww + 60)
    });
    bolla.appendTo($this.object);
    bolla.transit({
        top: $this.rn($this.wh * .15, $this.wh * .6),
        "transform": "scale(" + rn_size + ") rotate(" + $this.rn(-360, 360) + "deg)",
        opacity: 0
    }, $this.rn($this.speed[0], $this.speed[1]), function() {
        $(this).remove();
        $this.generate_bubbles();
    })
}

background.rn = function(from, to, arr) {
    if (arr) {
        return Math.random() * (to - from + 1) + from;
    } else {
        return Math.floor(Math.random() * (to - from + 1) + from);
    }
}

background.initializr();