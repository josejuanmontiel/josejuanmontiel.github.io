document.createSvg = function(tagName) {
    var svgNS = "http://www.w3.org/2000/svg";
    return this.createElementNS(svgNS, tagName);
};

var numberPerSide = 20;
var size = 10;
var pixelsPerSide = 400;

const currentAttempts = parseInt(localStorage.getItem('attempts') ?? '0')
localStorage.setItem('attempts', (currentAttempts + 1).toString())

var grid = function(numberPerSide, pixelsWith, pixelsHeight, colors) {
    var svg = document.createSvg("svg");
    svg.setAttribute("width", pixelsWith);
    svg.setAttribute("height", pixelsHeight);
    sizeH = Math.floor(pixelsHeight/numberPerSide);
    sizeW = Math.floor(pixelsWith/numberPerSide);
    svg.setAttribute("viewBox", [0, 0, numberPerSide * sizeW, numberPerSide * sizeH].join(" "));
    
    const   range = {min: 0, max: numberPerSide*numberPerSide}, 
            delta = range.max - range.min;
    var rand = Math.round(range.min + Math.random() * delta);

    // alert(rand);

    for(var i = 0; i < numberPerSide; i++) {
        for(var j = 0; j < numberPerSide; j++) {
            var color1 = colors[(i+j) % colors.length];
            var color2 = colors[(i+j+1) % colors.length];  
            var g = document.createSvg("g");
            g.setAttribute("transform", ["translate(", i*sizeW, ",", j*sizeH, ")"].join(""));
            var number = numberPerSide * i + j;
            var box = document.createSvg("rect");
            box.setAttribute("width", sizeW);
            box.setAttribute("height", sizeH);
            box.setAttribute("fill", color1);
            box.setAttribute("id", "b" + number); 
            g.appendChild(box);

            if (rand+1==i*numberPerSide+j+1) {
                var a = document.createElement('a');
                a.title = "Secret Game";
                a.href = "main.html";
                box.appendChild(a);
                if (3 <= currentAttempts && currentAttempts <= 5) {
                    var animate = document.createSvg("animate");
                    animate.setAttribute("attributeName", "fill");
                    animate.setAttribute("dur", "3s");
                    animate.setAttribute("calcMode", "discrete");
                    animate.setAttribute("values", "#eeeeee;transparent");
                    animate.setAttribute("repeatCount", "indefinite"); 
                    animate.setAttribute("begin", "0s"); 
                    box.appendChild(animate);
                }
            } else {
                var text = document.createSvg("text");
                text.setAttribute("fill", color2);
                text.setAttribute("font-size", 6);
                text.setAttribute("x", 0);
                text.setAttribute("y", sizeH/2);
                text.setAttribute("id", "t" + number);
                g.appendChild(text);
            }

            svg.appendChild(g);
        }  
    }
    svg.addEventListener(
        "click",
        function(e){
            var id = e.target.id;
            if(id)
                if (rand==id.substring(1)) {
                    window.location.href="main.html"
                    // alert(id.substring(1));
                }
        },
        false);
    return svg;
};

var container = document.getElementById("container");
container.appendChild(grid(5,  window.innerWidth, window.innerHeight, ["#000000", "#000000"]));

localStorage.currentVisibility = "none"
