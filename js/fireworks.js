!function(){
    function initCanvas(){
        scale = window.devicePixelRatio || 1;
        n.width = window.innerWidth * scale;
        n.height = window.innerHeight * scale;
        u.scale(scale, scale);
    }

    function removeAnimation(target){
        if (d.indexOf(target) > -1){
            d.splice(d.indexOf(target), 1);
        }
    }

    function createFirework(x, y){
        initCanvas();
        
        // Create firework particles
        var fireworks = [];
        for (var i = 0; i < 24; i++){
            var particle = {
                x: x,
                y: y,
                color: colors[anime.random(0, colors.length - 1)],
                radius: anime.random(getFontSize(), 2 * getFontSize()),
                draw: function(){
                    u.beginPath();
                    u.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, true);
                    u.fillStyle = this.color;
                    u.fill();
                }
            };
            fireworks.push(particle);
        }

        // Create firework explosion
        var explosion = {
            x: x,
            y: y,
            color: "#FFF",
            radius: 0,
            alpha: 1,
            lineWidth: 6,
            draw: function(){
                u.globalAlpha = this.alpha;
                u.beginPath();
                u.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, true);
                u.lineWidth = this.lineWidth;
                u.strokeStyle = this.color;
                u.stroke();
                u.globalAlpha = 1;
            }
        };

        // Animation for firework explosion
        var explosionAnimation = anime({
            targets: fireworks,
            x: function(particle){ return particle.x + anime.random(-200, 200); },
            y: function(particle){ return particle.y + anime.random(-200, 200); },
            radius: 0,
            duration: function(){ return anime.random(1200, 1800); },
            easing: "easeOutExpo",
            complete: removeAnimation
        });

        // Animation for explosion
        var fireworkAnimation = anime({
            targets: explosion,
            radius: function(){ return anime.random(8.75 * getFontSize(), 11.25 * getFontSize()); },
            lineWidth: 0,
            alpha: {
                value: 0,
                easing: "linear",
                duration: function(){ return anime.random(400, 600); }
            },
            duration: function(){ return anime.random(1200, 1800); },
            easing: "easeOutExpo",
            complete: removeAnimation
        });

        d.push(explosionAnimation);
        d.push(fireworkAnimation);
    }

    // Function to get computed font size
    function getFontSize(){
        return parseFloat(getComputedStyle(document.documentElement).fontSize);
    }

    // Initialize Canvas and set up animation loop
    var n = document.getElementById("fireworks"),
        u = n.getContext("2d"),
        d = [],
        colors = ["#ff324a", "#31ffa6", "#206eff", "#ffff99"];

    anime({
        duration: Infinity,
        update: function(){
            u.clearRect(0, 0, n.width, n.height);
            d.forEach(function(animation){
                animation.animatables.forEach(function(animatable){
                    animatable.target.draw();
                });
            });
        }
    });

    // Event listener for mouse click to create fireworks
    document.addEventListener("mousedown", function(event){
        var x = event.clientX,
            y = event.clientY;
        createFirework(x, y);
    }, false);

    // Event listener for window resize
    window.addEventListener("resize", initCanvas, false);
}();

