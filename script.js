// Background bintang
const canvas = document.getElementById("starfield");
const ctx = canvas.getContext("2d");
let stars = [];

function resizeCanvas(){
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

for(let i=0;i<180;i++){
  stars.push({
    x:Math.random()*canvas.width,
    y:Math.random()*canvas.height,
    r:Math.random()*1.5,
    d:Math.random()*1+0.5,
    o:Math.random()
  });
}
function drawStars(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  for(let s of stars){
    ctx.beginPath();
    ctx.arc(s.x,s.y,s.r,0,Math.PI*2);
    ctx.fillStyle=`rgba(255,255,255,${s.o})`;
    ctx.fill();
  }
  updateStars();
}
function updateStars(){
  for(let s of stars){
    s.y += s.d;
    s.o = 0.5+Math.sin(Date.now()/500+s.x)*0.5;
    if(s.y>canvas.height){
      s.y=0; s.x=Math.random()*canvas.width;
    }
  }
}
setInterval(drawStars,33);

// Efek ketik
const typingEl = document.getElementById("typing");
const texts = JSON.parse(typingEl.dataset.text);
let i=0, j=0, deleting=false;

function typeEffect(){
  const current = texts[i];
  if(!deleting){
    typingEl.textContent = current.slice(0, j++);
    if(j > current.length){
      deleting=true;
      setTimeout(typeEffect,1200);
      return;
    }
  } else {
    typingEl.textContent = current.slice(0, j--);
    if(j<0){
      deleting=false;
      i=(i+1)%texts.length;
      j=0;
    }
  }
  setTimeout(typeEffect, deleting?70:120);
}
setTimeout(typeEffect, 800);

// Scroll reveal + zoom
const sections = document.querySelectorAll(".reveal, .animate-zoom");
const revealOnScroll = () => {
  const trigger = window.innerHeight * 0.85;
  sections.forEach(sec=>{
    const top = sec.getBoundingClientRect().top;
    if(top<trigger){sec.classList.add("show");}
  });
};
window.addEventListener("scroll", revealOnScroll);
revealOnScroll();

// Tahun otomatis
document.getElementById("year").textContent = new Date().getFullYear();
