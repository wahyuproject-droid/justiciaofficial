// Typing effect
const typingEl = document.getElementById("typing");
const texts = JSON.parse(typingEl.getAttribute("data-text"));
let idx = 0, charIdx = 0;
function type() {
  if (charIdx < texts[idx].length) {
    typingEl.textContent = texts[idx].substring(0, charIdx+1);
    charIdx++;
    setTimeout(type, 120);
  } else {
    setTimeout(() => {
      charIdx = 0;
      idx = (idx+1) % texts.length;
      type();
    }, 2000);
  }
}
type();

// Scroll reveal
const reveals = document.querySelectorAll(".reveal, .animate-zoom");
window.addEventListener("scroll", () => {
  for(let el of reveals){
    const rect = el.getBoundingClientRect();
    if(rect.top < window.innerHeight - 100) el.classList.add("show");
  }
});

// Footer year
document.getElementById("year").textContent = new Date().getFullYear();

// Stars + Meteor
const canvas = document.getElementById("starfield");
const ctx = canvas.getContext("2d");
let stars = [], meteor = null;

function resize(){
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener("resize", resize);
resize();

// Stars init
for(let i=0;i<150;i++){
  stars.push({
    x: Math.random()*canvas.width,
    y: Math.random()*canvas.height,
    r: Math.random()*1.5+0.5,
    d: Math.random()*0.5
  });
}

// Create single meteor
function createMeteor(){
  if(meteor) return; // hanya 1 meteor sekaligus
  let startX = Math.random()*canvas.width;
  let startY = Math.random()*canvas.height/3; 
  let length = Math.random()*80+60;
  let speed = Math.random()*6+6;
  meteor = {x:startX,y:startY,len:length,speed:speed,alpha:1};
}

// Draw stars + meteor
function drawScene(){
  ctx.clearRect(0,0,canvas.width,canvas.height);

  // Stars
  ctx.fillStyle="white";
  for(let s of stars){
    ctx.beginPath();
    ctx.arc(s.x,s.y,s.r,0,2*Math.PI);
    ctx.fill();
    s.y+=s.d;
    if(s.y>canvas.height){
      s.y=0; s.x=Math.random()*canvas.width;
    }
  }

  // Meteor
  if(meteor){
    let grad = ctx.createLinearGradient(meteor.x,meteor.y, meteor.x-meteor.len, meteor.y+meteor.len/3);
    grad.addColorStop(0, `rgba(0,200,255,${meteor.alpha})`);
    grad.addColorStop(1, "rgba(124,77,255,0)");
    ctx.strokeStyle = grad;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(meteor.x,meteor.y);
    ctx.lineTo(meteor.x-meteor.len,meteor.y+meteor.len/3);
    ctx.stroke();

    meteor.x += meteor.speed;
    meteor.y += meteor.speed/3;
    meteor.alpha -= 0.008;

    if(meteor.alpha<=0) meteor = null; // hilang
  }
}
setInterval(drawScene, 30);

// Meteor random muncul tiap 5-8 detik
setInterval(() => {
  if(!meteor) createMeteor();
}, Math.random()*3000+5000);
