/* ===== MainBelajar: Templat Kad Watak (Awang & Melur) =====
   Satu templat untuk semua game. Game baru = satu fail data dalam folder slaid/.
   Cara guna dalam HTML:
     <div id="kad"></div>
     <script src="suara/senarai.js"></script>
     <script src="slaid/NAMA.js"></script>      (isi window.MB_SLAID)
     <script src="kad-watak.js"></script>
   Lihat slaid/sains-badan.js untuk contoh parameter. */
(function(){
"use strict";
var BASE=(document.currentScript&&document.currentScript.src||"").replace(/[^\/]*$/,"");
var W={ melur:{nama:"Melur",img:"watak/melur.webp",mul:"watak/melur-mulut.webp",ar:0.6692,l:43.165,t:19.739,w:15.005,h:6.878,warna:"#0f7c82",pic:1.5},
        awang:{nama:"Awang",img:"watak/awang.webp",mul:"watak/awang-mulut.webp",ar:0.6263,l:52.086,t:27.796,w:16.043,h:6.564,warna:"#8b1538",pic:1.0} };
var D=window.MB_SLAID||{slaid:[]};
// Gaya (pose) tambahan didaftar dalam watak/gaya.js. Setiap slaid boleh pilih: "gaya":{"melur":"lambai","awang":"duduk"}
var GAYA=window.MB_GAYA||{};
var CFG={ tajuk:D.tajuk||"MainBelajar", latar:D.latar||"#e7f5ff", penanya:D.penanya||"melur", penjawab:D.penjawab||"awang",
  salam:D.salam||"Hai kawan! Jom kita belajar sama-sama!",
  pujian:D.pujian||["Betul! Tahniah!","Betul! Pandai!","Yeay, betul! Hebat!","Betul! Terbaik!"],
  galakan:D.galakan||["Cuba lagi ya!","Hampir betul! Cuba lagi.","Tak apa, cuba lagi!"],
  tamat:D.tamat||["Jom cuba lagi ya!","Bagus! Sikit lagi!","Hebat! Kamu memang pandai!"] };
var KIRI=CFG.penanya, KANAN=CFG.penjawab;

var css=
"html,body{margin:0;min-height:100%;background:"+CFG.latar+";font-family:'Trebuchet MS',system-ui,sans-serif;color:#3b2a14}"+
"*{box-sizing:border-box;-webkit-tap-highlight-color:transparent;user-select:none}"+
".kw{max-width:1180px;margin:0 auto;padding:12px;display:grid;gap:10px 14px;grid-template-columns:1fr minmax(320px,560px) 1fr;"+
  "grid-template-areas:'L top R' 'L q R' 'L ch R';grid-template-rows:auto auto 1fr;min-height:100vh;align-items:start}"+
".kw-top{grid-area:top;display:flex;align-items:center;gap:10px}"+
".kw-tj{font-weight:900;font-size:22px;color:#ff8a3d;flex:1}.kw-no{background:#fff;border-radius:20px;padding:6px 14px;font-weight:800;box-shadow:0 3px 0 #0001}"+
".kw-vb{background:#fff;border:0;border-radius:50%;width:44px;height:44px;font-size:22px;box-shadow:0 3px 0 #0002}"+
".kw-bar{height:14px;background:#0001;border-radius:10px;overflow:hidden;margin-top:8px}.kw-bar i{display:block;height:100%;width:0;background:#4cd964;transition:width .4s}"+
".kw-q{grid-area:q;background:#fff;border-radius:24px;padding:20px 16px;text-align:center;box-shadow:0 5px 0 #0002;transition:box-shadow .3s,transform .3s}"+
".kw-q.tanya{animation:kwGlow 1.1s ease-in-out infinite}.kw-q .g{font-size:64px;line-height:1.1}.kw-q .t{font-size:26px;font-weight:900;line-height:1.3}"+
".kw-ch{grid-area:ch;display:grid;gap:12px}"+
".kw-b{background:#ffd23d;border:0;border-radius:20px;min-height:68px;font:inherit;font-size:22px;font-weight:900;color:#3b2a14;box-shadow:0 5px 0 #0003;padding:10px}"+
".kw-b:active{transform:translateY(3px)}.kw-b.ok{background:#4cd964;animation:kwPop .45s}.kw-b.no{background:#ff5c5c;animation:kwShake .4s}.kw-b.btn2{background:#3db8ff;color:#fff}.kw-b.btn3{background:#4cd964;color:#fff}"+
".kw-c{position:relative;align-self:end;justify-self:center;width:100%;max-width:330px;position:sticky;bottom:0}"+
".kw-c.L{grid-area:L}.kw-c.R{grid-area:R}"+
".kw-fig{position:relative;width:100%;transform-origin:50% 100%;animation:kwNafas 3.2s ease-in-out infinite;transition:filter .2s}"+
".kw-fig img{display:block;width:100%;height:auto;pointer-events:none}"+
".kw-m{position:absolute;background-size:400% 100%;background-repeat:no-repeat}"+
".kw-c.cakap .kw-fig{animation:kwCakap .5s ease-in-out infinite}"+
".kw-c.diam .kw-fig{filter:saturate(.75) brightness(.96)}"+
".kw-c.lompat .kw-fig{animation:kwLompat .55s ease-out 3}.kw-c.geleng .kw-fig{animation:kwGeleng .5s ease-in-out 2}.kw-c.tunjuk .kw-fig{animation:kwTunjuk .9s ease-in-out infinite}"+
".kw-nm{text-align:center;font-weight:900;color:#fff;border-radius:12px;padding:2px 10px;width:max-content;margin:-6px auto 6px;position:relative;font-size:15px}"+
".kw-bb{background:#fff;border:4px solid #888;border-radius:20px;padding:10px 14px;font-size:19px;font-weight:800;line-height:1.3;text-align:center;box-shadow:0 5px 0 #0002;opacity:0;transform:scale(.8);transition:opacity .2s,transform .2s;pointer-events:none}"+
".kw-bb.show{opacity:1;transform:scale(1)}"+
".kw-c .kw-bb{position:absolute;left:0;right:0;bottom:100%;margin-bottom:6px;z-index:3}"+
".kw-c .kw-bb:after{content:'';position:absolute;left:50%;top:100%;margin-left:-10px;border:10px solid transparent;border-top-color:inherit}"+
".kw-mid{display:none}"+
".kw-fx{position:fixed;inset:0;pointer-events:none;overflow:hidden;z-index:9}.kw-fx span{position:absolute;font-size:30px;will-change:transform}"+
".kw-end{grid-area:q;text-align:center}.kw-end .s{font-size:60px}"+
"@keyframes kwGlow{0%,100%{box-shadow:0 5px 0 #0002,0 0 0 0 #ffd23d00}50%{box-shadow:0 5px 0 #0002,0 0 0 8px #ffd23d}}"+
"@keyframes kwPop{50%{transform:scale(1.08)}}@keyframes kwShake{25%{transform:translateX(-8px)}75%{transform:translateX(8px)}}"+
"@keyframes kwNafas{50%{transform:scaleY(1.012)}}@keyframes kwCakap{50%{transform:translateY(-5px) rotate(-1deg)}}"+
"@keyframes kwLompat{0%,100%{transform:translateY(0) scale(1,1)}15%{transform:translateY(0) scale(1.06,.92)}50%{transform:translateY(-70px) scale(.97,1.05)}85%{transform:translateY(0) scale(1.05,.94)}}"+
"@keyframes kwGeleng{25%{transform:rotate(-4deg)}75%{transform:rotate(4deg)}}"+
"@keyframes kwTunjuk{50%{transform:translateX(10px) rotate(2deg)}}"+
"@keyframes kwNaik{0%{opacity:0;transform:translateY(0) scale(.4)}15%{opacity:1}100%{opacity:0;transform:translateY(-190px) scale(1.5)}}"+
"@keyframes kwJatuh{0%{transform:translateY(-10vh) rotate(0)}100%{transform:translateY(110vh) rotate(540deg)}}"+
"@media(max-width:899px){.kw{grid-template-columns:1fr 1.25fr 1fr;grid-template-areas:'top top top' 'q q q' 'L mid R' 'ch ch ch';grid-template-rows:auto auto auto 1fr;gap:10px 6px;padding:10px}"+
  ".kw-c{position:relative;max-width:150px;align-self:end}.kw-mid{display:flex;grid-area:mid;align-self:center;min-height:176px;align-items:center;justify-content:center}"+
  ".kw-mid .kw-bb{font-size:15px;padding:8px 8px;width:100%}.kw-q .t{font-size:22px}.kw-q .g{font-size:48px}.kw-b{font-size:19px;min-height:58px}.kw-nm{font-size:12px;margin-top:-4px}"+
  "@keyframes kwLompat{0%,100%{transform:translateY(0)}50%{transform:translateY(-28px)}}}";
var st=document.createElement("style"); st.textContent=css; document.head.appendChild(st);

var root=document.getElementById("kad")||document.body.appendChild(document.createElement("div"));
root.className="kw";
function charHTML(id,side){ var c=W[id];
  return '<div class="kw-c '+side+'" id="kw-'+id+'"><div class="kw-fig"><img src="'+BASE+c.img+'" alt="'+c.nama+'">'+
    '<div class="kw-m" style="left:'+c.l+'%;top:'+c.t+'%;width:'+c.w+'%;height:'+c.h+'%;background-image:url('+BASE+c.mul+')"></div></div>'+
    '<div class="kw-nm" style="background:'+c.warna+'">'+c.nama+'</div></div>'; }
root.innerHTML='<div class="kw-top"></div><div class="kw-q"></div><div class="kw-ch"></div>'+charHTML(KIRI,"L")+charHTML(KANAN,"R")+
  '<div class="kw-mid"></div><div class="kw-bb" id="kw-bb"></div><div class="kw-fx" id="kw-fx"></div>';
var $=function(s){ return root.querySelector(s); };
var TOP=$(".kw-top"), Q=$(".kw-q"), CH=$(".kw-ch"), BB=$("#kw-bb"), FX=$("#kw-fx"), MID=$(".kw-mid");
var EL={}; [KIRI,KANAN].forEach(function(id){ EL[id]=document.getElementById("kw-"+id); EL[id].mouth=EL[id].querySelector(".kw-m"); });
var REST=1;
function frame(id,f){ EL[id].mouth.style.backgroundPositionX=(f*100/3)+"%"; }
frame(KIRI,REST); frame(KANAN,REST);
var mq=window.matchMedia("(max-width:899px)");
function setGaya(id,nama){ var g=(GAYA[id]||{})[nama]||W[id], f=EL[id].querySelector("img");
  if(EL[id].gayaNow===g) return; EL[id].gayaNow=g; f.src=BASE+g.img;
  var m=EL[id].mouth.style; m.left=g.l+"%"; m.top=g.t+"%"; m.width=g.w+"%"; m.height=g.h+"%"; m.backgroundImage="url("+BASE+g.mul+")";
  m.display=g.mul?"":"none"; }
function placeBubble(id){ var host=mq.matches?MID:EL[id]; if(BB.parentNode!==host) host.appendChild(BB); BB.style.borderColor=W[id].warna; }

/* ---------- bunyi kesan ---------- */
var AC=null;
function ac(){ try{ AC=AC||new (window.AudioContext||window.webkitAudioContext)(); if(AC.state==="suspended") AC.resume(); }catch(e){} return AC; }
function beep(f,d,type,vol){ try{ var a=ac(),o=a.createOscillator(),g=a.createGain(); o.type=type||"sine"; o.frequency.value=f; g.gain.value=vol||0.12; o.connect(g); g.connect(a.destination); o.start(); g.gain.exponentialRampToValueAtTime(0.001,a.currentTime+d); o.stop(a.currentTime+d); }catch(e){} }
function sndOk(){ beep(660,.12); setTimeout(function(){ beep(880,.2); },120); }
function sndNo(){ beep(200,.25,"square",.07); }
function sndWin(){ [523,659,784,1047].forEach(function(f,i){ setTimeout(function(){ beep(f,.25); },i*140); }); }

/* ---------- suara + gerak mulut ---------- */
var suaraOn=true; try{ suaraOn=localStorage.getItem("kw_suara")!=="0"; }catch(e){}
var V=null; function pv(){ try{ var vs=speechSynthesis.getVoices(); V=vs.filter(function(v){return /^ms/i.test(v.lang);})[0]||vs.filter(function(v){return /^id/i.test(v.lang);})[0]||null; }catch(e){} }
try{ pv(); speechSynthesis.addEventListener("voiceschanged",pv); }catch(e){}
function norm(t){ return String(t).toLowerCase().replace(/[^a-z0-9]+/g," ").trim(); }
function shapes(t){ var o=[],s=String(t).toLowerCase(); for(var i=0;i<s.length;i++){ var c=s[i];
  o.push(c==="a"?3:(c==="e"||c==="o")?2:(c==="i"||c==="u")?1:"mbp".indexOf(c)>=0?0:/[a-z]/.test(c)?1:/[0-9]/.test(c)?3:0); } return o; }
var SEQ=0, tick=null, guard=null, hideT=null, curA=null;
function stopAll(){ SEQ++; clearInterval(tick); clearTimeout(guard); try{ speechSynthesis.cancel(); }catch(e){} if(curA){ try{ curA.pause(); }catch(e){} curA=null; }
  [KIRI,KANAN].forEach(function(id){ frame(id,REST); EL[id].classList.remove("cakap","diam"); }); }
function lipText(id,text,rate){ var sh=shapes(text),i=0; clearInterval(tick);
  tick=setInterval(function(){ if(i>=sh.length) i=Math.max(0,sh.length-4); frame(id,sh[i++]); },Math.max(55,Math.round(78/(rate||0.9))));
  return function(ci){ if(ci>=0&&ci<sh.length) i=ci; }; }
function clipFor(id,text){ var m=(window.MB_SUARA||{})[id]; return m&&m[norm(text)]; }
// pecah ayat: guna klip mp3 untuk bahagian yang ada, selebihnya suara telefon
function plan(id,text){ var parts=String(text).match(/[^.!?]+[.!?]*\s*/g)||[String(text)], out=[], i=0;
  while(i<parts.length){ var hit=null;
    for(var j=parts.length;j>i;j--){ var seg=parts.slice(i,j).join("").trim(), f=clipFor(id,seg); if(f){ hit={t:seg,f:f}; i=j; break; } }
    if(!hit){ var t=parts[i++].trim(); if(out.length&&!out[out.length-1].f) out[out.length-1].t+=" "+t; else out.push({t:t}); } else out.push(hit); }
  return out; }
function speakTTS(id,text,my,next){
  var est=900+text.length*95;
  if(!suaraOn||!window.speechSynthesis){ lipText(id,text,.9); guard=setTimeout(next,Math.min(est,2600)); return; }
  try{ var u=new SpeechSynthesisUtterance(text.replace(/[\u{1F000}-\u{1FFFF}\u{2600}-\u{27BF}\u{FE0F}]/gu,""));
    u.lang=V?V.lang:"ms-MY"; if(V) u.voice=V; u.rate=.9; u.pitch=W[id].pic; var sync=lipText(id,text,.9);
    u.onboundary=function(e){ if(typeof e.charIndex==="number") sync(e.charIndex); };
    u.onend=function(){ if(my===SEQ) next(); };
    u.onerror=function(){ if(my!==SEQ) return; clearTimeout(guard); guard=setTimeout(next,Math.min(est,2600)); };
    speechSynthesis.speak(u); clearTimeout(guard); guard=setTimeout(next,est+2000);
  }catch(e){ next(); } }
function speakClip(id,part,my,next){
  if(!suaraOn){ lipText(id,part.t,.9); guard=setTimeout(next,Math.min(900+part.t.length*95,2600)); return; }
  var a=new Audio(BASE+"suara/"+part.f); curA=a; var fell=false, raf=0;
  function fallback(){ if(fell||my!==SEQ) return; fell=true; cancelAnimationFrame(raf); speakTTS(id,part.t,my,next); }
  a.onerror=fallback;
  a.onended=function(){ cancelAnimationFrame(raf); clearInterval(tick); if(my===SEQ) next(); };
  var sync=lipText(id,part.t,.9);                 // gerak ikut teks dulu
  if(/^https?:/.test(location.protocol)){        // di server: gerak ikut bunyi sebenar
    try{ a.crossOrigin="anonymous"; var ctx=ac(), src=ctx.createMediaElementSource(a), an=ctx.createAnalyser(); an.fftSize=512; src.connect(an); an.connect(ctx.destination);
      var buf=new Uint8Array(an.fftSize), heard=false;
      (function loop(){ if(my!==SEQ||a.ended) return; an.getByteTimeDomainData(buf); var s=0; for(var i=0;i<buf.length;i++){ var v=(buf[i]-128)/128; s+=v*v; }
        var r=Math.sqrt(s/buf.length); if(r>0.01&&!heard){ heard=true; clearInterval(tick); }
        if(heard) frame(id,r<0.02?0:r<0.06?1:r<0.13?2:3); raf=requestAnimationFrame(loop); })();
    }catch(e){} }
  a.play().catch(fallback);
  clearTimeout(guard); guard=setTimeout(function(){ if(my===SEQ&&!a.ended&&a.paused) fallback(); },1500); }
/* cakap(siapa, teks, selesai, {gaya}) */
function cakap(id,text,cb,o){
  o=o||{}; stopAll(); var my=SEQ, other=id===KIRI?KANAN:KIRI;
  placeBubble(id); BB.textContent=text; BB.classList.add("show"); clearTimeout(hideT);
  EL[id].classList.add("cakap"); EL[other].classList.add("diam");
  var q=plan(id,text), i=0;
  (function next(){ if(my!==SEQ) return; clearInterval(tick); clearTimeout(guard);
    if(i>=q.length){ frame(id,REST); EL[id].classList.remove("cakap"); EL[other].classList.remove("diam");
      hideT=setTimeout(function(){ BB.classList.remove("show"); },1600); if(cb) cb(); return; }
    var p=q[i++]; if(p.f) speakClip(id,p,my,next); else speakTTS(id,p.t,my,next); })(); }
function gaya(id,cls,ms){ EL[id].classList.remove("lompat","geleng","tunjuk"); void EL[id].offsetWidth; EL[id].classList.add(cls); if(ms) setTimeout(function(){ EL[id].classList.remove(cls); },ms); }

/* ---------- kesan meriah ---------- */
function letup(id,list){ var r=EL[id].getBoundingClientRect();
  for(var i=0;i<9;i++){ (function(i){ var s=document.createElement("span"); s.textContent=list[i%list.length];
    s.style.left=(r.left+r.width*(.15+Math.random()*.7))+"px"; s.style.top=(r.top+r.height*(.1+Math.random()*.3))+"px";
    s.style.animation="kwNaik "+(1+Math.random()*.6)+"s ease-out "+(i*90)+"ms both"; FX.appendChild(s); setTimeout(function(){ s.remove(); },2400); })(i); } }
function konfeti(n){ var E=["🎉","⭐","✨","🎊","🌟","💛"];
  for(var i=0;i<(n||26);i++){ var s=document.createElement("span"); s.textContent=E[i%E.length]; s.style.left=(Math.random()*100)+"vw"; s.style.top="0";
    s.style.fontSize=(18+Math.random()*20)+"px"; s.style.animation="kwJatuh "+(1.6+Math.random()*1.6)+"s linear "+(Math.random()*500)+"ms both"; FX.appendChild(s);
    (function(s){ setTimeout(function(){ s.remove(); },4200); })(s); } }

/* ---------- aliran slaid ---------- */
var S={i:0,skor:0};
function pick(a){ return a[Math.floor(Math.random()*a.length)]; }
function shuffle(a){ a=a.slice(); for(var i=a.length-1;i>0;i--){ var j=Math.floor(Math.random()*(i+1)),t=a[i]; a[i]=a[j]; a[j]=t; } return a; }
function top(){ var n=D.slaid.length;
  TOP.innerHTML='<div style="flex:1"><div style="display:flex;align-items:center;gap:10px"><div class="kw-tj">'+CFG.tajuk+'</div><div class="kw-no">'+Math.min(S.i+1,n)+' / '+n+'</div>'+
    '<button class="kw-vb" id="kw-vb">'+(suaraOn?"🔊":"🔇")+'</button></div><div class="kw-bar"><i style="width:'+(S.i/n*100)+'%"></i></div></div>';
  document.getElementById("kw-vb").onclick=function(){ suaraOn=!suaraOn; try{ localStorage.setItem("kw_suara",suaraOn?"1":"0"); }catch(e){} if(!suaraOn) stopAll(); top(); }; }
function mula(){ S={i:0,skor:0}; top(); Q.className="kw-q";
  Q.innerHTML='<div class="g">'+(D.emoji||"🎒")+'</div><div class="t">'+CFG.tajuk+'</div>'+(D.sub?'<p style="font-weight:700;margin:6px 0 0">'+D.sub+'</p>':'');
  CH.innerHTML='<button class="kw-b btn3" id="kw-go">▶ Mula</button>';
  document.getElementById("kw-go").onclick=function(){ ac(); gaya(KIRI,"lompat",1700); cakap(KIRI,CFG.salam,function(){ setTimeout(soalan,300); }); CH.innerHTML=""; }; }
function soalan(){
  if(S.i>=D.slaid.length) return tamat();
  var sl=D.slaid[S.i]; top();
  [KIRI,KANAN].forEach(function(id){ setGaya(id,(sl.gaya||{})[id]||"asas"); });
  var betul=sl.pilihan[sl.betul||0], pil=sl.kekal?sl.pilihan:shuffle(sl.pilihan), tried=false, done=false;
  Q.className="kw-q tanya"; Q.innerHTML=(sl.gambar?'<div class="g">'+sl.gambar+'</div>':'')+'<div class="t">'+(sl.papar||sl.tanya)+' <span id="kw-ul">🔊</span></div>';
  CH.innerHTML=pil.map(function(p,i){ return '<button class="kw-b" data-i="'+i+'">'+p+'</button>'; }).join("");
  function tanya(){ gaya(KIRI,"tunjuk"); Q.classList.add("tanya"); cakap(KIRI,sl.tanya,function(){ EL[KIRI].classList.remove("tunjuk"); Q.classList.remove("tanya"); }); }
  Q.onclick=function(){ if(!done) tanya(); };
  setTimeout(tanya,250);
  Array.prototype.forEach.call(CH.querySelectorAll(".kw-b"),function(b){ b.onclick=function(){
    if(done) return; ac(); EL[KIRI].classList.remove("tunjuk"); Q.classList.remove("tanya");
    if(pil[+b.getAttribute("data-i")]===betul){
      done=true; b.classList.add("ok"); sndOk(); if(!tried) S.skor++; S.i++;
      gaya(KANAN,"lompat",1700); gaya(KIRI,"lompat",600); letup(KANAN,["👏","👍","⭐","👏","🎉"]); konfeti(22);
      var go=false, nx=function(){ if(go) return; go=true; setTimeout(soalan,500); };
      cakap(KANAN,(sl.puji||pick(CFG.pujian))+(sl.terang?" "+sl.terang:""),nx); setTimeout(nx,9000);
    } else { tried=true; b.classList.add("no"); sndNo(); gaya(KANAN,"geleng",1000); setTimeout(function(){ b.classList.remove("no"); },450); cakap(KANAN,sl.galak||pick(CFG.galakan)); }
  }; }); }
function tamat(){ var n=D.slaid.length, r=S.skor/n, b=r>=.9?3:r>=.6?2:1; top(); sndWin(); konfeti(40);
  Q.className="kw-q"; Q.onclick=null; Q.innerHTML='<div class="g">'+"⭐".repeat(b)+'</div><div class="t">'+CFG.tamat[b-1]+'</div><p style="font-size:20px;font-weight:700;margin:8px 0 0">Betul '+S.skor+' / '+n+' (kali pertama)</p>';
  CH.innerHTML='<button class="kw-b btn3" id="kw-lagi">🔁 Main Lagi</button>'+(D.balik?'<a class="kw-b btn2" style="text-decoration:none;display:flex;align-items:center;justify-content:center" href="'+D.balik+'">🏠 Menu</a>':'');
  document.getElementById("kw-lagi").onclick=function(){ stopAll(); mula(); };
  gaya(KANAN,"lompat",1700); gaya(KIRI,"lompat",1700); letup(KANAN,["👏","👍","⭐"]); letup(KIRI,["🎉","⭐","💛"]);
  setTimeout(function(){ cakap(KANAN,CFG.tamat[b-1]+" Betul "+S.skor+" daripada "+n+"."); },500); }
[KIRI,KANAN].forEach(function(id){ EL[id].onclick=function(){ ac(); gaya(id,"lompat",1700); letup(id,["💛","⭐"]); cakap(id,"Hai! Saya "+W[id].nama+"."); }; });
window.MBKad={cakap:cakap,mula:mula,konfeti:konfeti,_s:function(){ return S; }};
mula();
})();
