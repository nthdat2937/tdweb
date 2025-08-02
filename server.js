const express = require("express");
const app = express();
const crypto = require("crypto");
const io = require("socket.io");

let validTokens = new Set(); 

const restrictedPages = [
    "/chat.html", "/games.html", "/pomodoro.html", "/cam.html", 
    "/usefulwebsite.html", "/song.html", "/thamkhao.html", "/cavoi.html", 
    "/intro.html", "/topic.html", "/sukienquantrong.html", "/index2.html"
];

app.get("/generate-token", (req, res) => {
    const token = crypto.randomBytes(16).toString("hex"); 
    validTokens.add(token);
    res.json({ success: true, token });
});

app.use((req, res, next) => {
    if (restrictedPages.includes(req.path)) {
        const token = req.query.token;

        if (!token || !validTokens.has(token)) {
            return res.status(403).send(`<!DOCTYPE html><html lang="vi"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>403 Forbidden</title><style>body{font-family:'Segoe UI',Tahoma,Geneva,Verdana,sans-serif;background:linear-gradient(135deg,#1a1a2e,#16213e);color:#fff;display:flex;justify-content:center;align-items:center;height:100vh;margin:0;overflow:hidden}.container{text-align:center;padding:2rem;background:rgba(0,0,0,.2);border-radius:10px;box-shadow:0 8px 32px rgba(0,0,0,.3);backdrop-filter:blur(10px);border:1px solid rgba(255,255,255,.1);position:relative;max-width:500px;z-index:1}h1{font-size:4rem;margin:0;background:linear-gradient(to right,#ff6b6b,#ff9e7d);-webkit-background-clip:text;background-clip:text;color:transparent;animation:pulse 2s infinite}p{font-size:1.5rem;margin:1rem 0;color:#e2e2e2}.lock-icon{font-size:5rem;margin-bottom:1rem;color:#ff6b6b;animation:shake .5s ease-in-out 2s infinite}.particles{position:absolute;top:0;left:0;width:100%;height:100%;z-index:0}.back-btn{margin-top:2rem;padding:.8rem 1.8rem;background:linear-gradient(to right,#ff6b6b,#ff9e7d);border:none;border-radius:50px;color:#fff;font-weight:700;cursor:pointer;transition:all .3s ease;position:relative;overflow:hidden}.back-btn:hover{transform:translateY(-3px);box-shadow:0 10px 20px rgba(255,107,107,.3)}.back-btn:before{content:'';position:absolute;top:0;left:-100%;width:100%;height:100%;background:linear-gradient(90deg,transparent,rgba(255,255,255,.2),transparent);transition:all .6s}.back-btn:hover:before{left:100%}@keyframes pulse{0%{transform:scale(1)}50%{transform:scale(1.05)}100%{transform:scale(1)}}@keyframes shake{0%,100%{transform:translateX(0)}25%{transform:translateX(-5px) rotate(-5deg)}75%{transform:translateX(5px) rotate(5deg)}}@media (max-width:600px){h1{font-size:3rem}p{font-size:1.2rem}.lock-icon{font-size:4rem}}</style></head><body><div class="particles" id="particles-js"></div><div class="container"><div class="lock-icon">🔒</div><h1>403 Forbidden</h1><p>Truy cập không hợp lệ!</p><p class="message">Bạn không có quyền truy cập trang này.</p><button class="back-btn" onclick="window.history.back()">Quay lại</button></div><script src="https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js"></script><script>document.addEventListener('DOMContentLoaded',function(){particlesJS('particles-js',{particles:{number:{value:80,density:{enable:!0,value_area:800}},color:{value:"#ff6b6b"},shape:{type:"circle"},opacity:{value:.5,random:!0},size:{value:3,random:!0},line_linked:{enable:!0,distance:150,color:"#ff9e7d",opacity:.4,width:1},move:{enable:!0,speed:2,direction:"none",random:!0,straight:!1,out_mode:"out"}},interactivity:{detect_on:"canvas",events:{onhover:{enable:!0,mode:"repulse"},onclick:{enable:!0,mode:"push"}},modes:{repulse:{distance:100,duration:.4},push:{particles_nb:4}}}})});</script></body></html>`);
        }

        validTokens.delete(token); 
    }

    next();
});

app.use(express.static("public"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server chạy trên cổng ${PORT}`));
