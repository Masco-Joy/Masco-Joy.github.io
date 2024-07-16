!function () {
    var t = (window.innerWidth + window.innerHeight) / 8,
        n = document.getElementById("background"),
        e = n.getContext("2d"),
        o = 1,
        i = void 0,
        r = void 0,
        a = [],
        d = void 0,
        h = void 0,
        y = { x: 0, y: 0, tx: 0, ty: 0, z: 5e-4 };

    function x(t) {
        t.x = Math.random() * i,
            t.y = Math.random() * r
    }

    function m() {
        o = window.devicePixelRatio || 1,
            i = window.innerWidth * o,
            r = window.innerHeight * o,
            n.width = i,
            n.height = r,
            a.forEach(x)
    }

    for (var c = 0; c < t; c++) {
        a.push({ x: 0, y: 0, z: .2 + .8 * Math.random() });
    }

    m();

    function animate() {
        e.clearRect(0, 0, i, r),
            y.tx *= .95,
            y.ty *= .95,
            y.x += .7 * (y.tx - y.x),
            y.y += .7 * (y.ty - y.y),
            a.forEach(function (t) {
                t.x += y.x * t.z,
                    t.y += y.y * t.z,
                    t.x += (t.x - i / 2) * y.z * t.z,
                    t.y += (t.y - r / 2) * y.z * t.z,
                    t.z += y.z,
                    (t.x < -50 || t.x > i + 50 || t.y < -50 || t.y > r + 50) && (
                        t.z = .2 + .8 * Math.random(),
                        t.x = Math.random() * i,
                        t.y = Math.random() * r
                    )
            }),
            a.forEach(function (t) {
                e.beginPath(),
                    e.lineCap = "round",
                    e.lineWidth = 3 * t.z * o,
                    e.strokeStyle = "rgba(102,175,239,.2)",
                    e.beginPath(),
                    e.moveTo(t.x, t.y);
                var n = 2 * y.x,
                    a = 2 * y.y;
                Math.abs(n) < .1 && (n = .5),
                    Math.abs(a) < .1 && (a = .5),
                    e.lineTo(t.x + n, t.y + a),
                    e.stroke()
            }),
            requestAnimationFrame(animate)
    }

    animate(),
        window.addEventListener("resize", m),
        window.addEventListener("mousemove", function (t) {
            var n, a, e;
            n = t.clientX,
                t = t.clientY,
                "number" == typeof d && "number" == typeof h && (
                    a = n - d,
                    e = t - h,
                    y.tx = y.x + a / 8 * o * 1,
                    y.ty = y.y + e / 8 * o * 1
                ),
                d = n,
                h = t
        }),
        window.addEventListener("mouseleave", function () {
            h = d = null
        })
}();
