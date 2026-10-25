// ====== MainBelajar: fungsi kongsi untuk semua game ======
// Kod buka: satu kod bundle buka semua, atau kod satu game sahaja.
var MB_CODES = {"MAINBELAJAR36":"all","JOMKIRA12":"kira","JOMSIFIR12":"sifir","JOMBACA12":"baca","LUKIS12":"lukis","PUZZLE12":"puzzle"};
var MB_BUY_ONE = "";   // link bayar RM12 (satu game)
var MB_BUY_ALL = "";   // link bayar RM36 (bundle 5 game)
var MB_VERIFY_URL = "";  // bila diisi: kod disemak di server (kod unik dihantar ke emel pembeli). Kod statik di atas jadi kod ujian sahaja.

function load(k,d){ try{ var v=localStorage.getItem(k); return v?JSON.parse(v):d; }catch(e){ return d; } }
function save(k,v){ try{ localStorage.setItem(k,JSON.stringify(v)); }catch(e){} }
function mbHas(id){ var l=load("mb_unlock",[]); return l.indexOf("all")>=0||l.indexOf(id)>=0; }
function mbCode(v){ var g=MB_CODES[v]; if(!g) return false; var l=load("mb_unlock",[]); if(l.indexOf(g)<0){ l.push(g); save("mb_unlock",l); } return true; }

// ====== Bunyi ======
var AC=null;
function beep(f,d,type,vol){ try{ AC=AC||new (window.AudioContext||window.webkitAudioContext)(); var o=AC.createOscillator(),g=AC.createGain(); o.type=type||"sine"; o.frequency.value=f; g.gain.value=vol||0.15; o.connect(g); g.connect(AC.destination); o.start(); g.gain.exponentialRampToValueAtTime(0.001,AC.currentTime+d); o.stop(AC.currentTime+d); }catch(e){} }
function sndOk(){ beep(660,.12); setTimeout(function(){ beep(880,.2); },120); }
function sndNo(){ beep(200,.25,"square",.08); }
function sndWin(){ [523,659,784,1047].forEach(function(f,i){ setTimeout(function(){ beep(f,.25); },i*140); }); }

// ====== Suara (Cikgu Hoot) ======
var voiceOn=load("mb_voice",true), VOICE=null;
function pickVoice(){ try{ var vs=speechSynthesis.getVoices(); VOICE=vs.filter(function(v){return /^ms/i.test(v.lang);})[0]||vs.filter(function(v){return /^id/i.test(v.lang);})[0]||null; }catch(e){} }
try{ speechSynthesis.onvoiceschanged=pickVoice; pickVoice(); }catch(e){}
var NW=["sifar","satu","dua","tiga","empat","lima","enam","tujuh","lapan","sembilan"];
function nw(n){
  if(n<10) return NW[n]; if(n===10) return "sepuluh"; if(n===11) return "sebelas";
  if(n<20) return NW[n-10]+" belas";
  if(n<100) return NW[Math.floor(n/10)]+" puluh"+(n%10?" "+NW[n%10]:"");
  if(n<200) return "seratus"+(n%100?" "+nw(n%100):"");
  return String(n);
}
function speakable(s){
  return String(s).replace(/<[^>]*>/g," ")
    .replace(/\d+/g,function(m){ return " "+nw(+m)+" "; })
    .replace(/×/g," kali ").replace(/\+/g," tambah ").replace(/−/g," tolak ")
    .replace(/=/g," sama dengan ").replace(/→/g,", ").replace(/❓/g," berapa ")
    .replace(/[\u{1F000}-\u{1FFFF}\u{2600}-\u{27BF}\u{FE0F}]/gu,"");
}
var bt=null;
function bubble(t){ var b=document.getElementById("bub"); if(!b) return; b.textContent="🦉 "+t; b.classList.remove("hide"); clearTimeout(bt); bt=setTimeout(function(){ b.classList.add("hide"); },3000); }
var spkTimer=null;
function say(text,cb,o){
  o=o||{}; bubble(String(o.show||text).replace(/<[^>]*>/g," ").replace(/\s+/g," "));
  var done=false; function fin(){ if(done) return; done=true; clearTimeout(spkTimer); if(cb) cb(); }
  if(!voiceOn||!window.speechSynthesis){ clearTimeout(spkTimer); spkTimer=setTimeout(fin,o.gap||1100); return; }
  try{
    speechSynthesis.cancel();
    var t=speakable(text), u=new SpeechSynthesisUtterance(t);
    u.lang=VOICE?VOICE.lang:"ms-MY"; if(VOICE) u.voice=VOICE;
    u.rate=o.rate||0.9; u.pitch=o.pitch||1.35; u.volume=1;
    u.onend=fin; u.onerror=fin;
    speechSynthesis.speak(u);
    clearTimeout(spkTimer); spkTimer=setTimeout(fin,2500+t.length*110);
  }catch(e){ fin(); }
}
function toggleVoice(){ voiceOn=!voiceOn; save("mb_voice",voiceOn); try{ speechSynthesis.cancel(); }catch(e){} var v=document.getElementById("vb"); if(v) v.textContent=voiceOn?"🔊":"🔇"; if(voiceOn) say("Hai kawan! Jom main!"); }
var OKS=["Pandai!","Hebat!","Bagus!","Betul! Power!","Wah, cerdik!","Terbaik!","Yeay! Betul!"];
var NOS=["Cuba lagi ya!","Hampir betul!","Jangan putus asa!","Tak apa, cuba lagi!"];

// ====== Alat ======
function rnd(a,b){ return Math.floor(Math.random()*(b-a+1))+a; }
function pick(a){ return a[rnd(0,a.length-1)]; }
function shuffle(a){ a=a.slice(); for(var i=a.length-1;i>0;i--){ var j=rnd(0,i),t=a[i]; a[i]=a[j]; a[j]=t; } return a; }
function rep(e,n){ var s=""; for(var i=0;i<n;i++) s+=e; return s; }
function uniq3(correct,poolFn){ var set=[correct],g=0; while(set.length<3&&g++<200){ var x=poolFn(); if(set.indexOf(x)<0) set.push(x); } return shuffle(set); }

// ====== Kunci / bayar ======
function mbPaywall(id,name,done){
  say("Ini berkunci. Minta ibu bapa buka ya!");
  var m=document.createElement("div"); m.className="modal";
  m.innerHTML='<div class="box"><div class="big">🔒</div><h2>'+name+'</h2>'+
    '<p>Buka penuh game ini: <b>RM12</b><br>Atau <b>Bundle 5 game MainBelajar: RM36</b></p>'+
    (MB_BUY_ALL?'<a class="btn gr" href="'+MB_BUY_ALL+'" target="_blank" style="display:block;text-decoration:none">Beli Bundle RM36</a>':'<div class="btn gr">Beli Bundle RM36</div>')+
    (MB_BUY_ONE?'<a class="btn alt" href="'+MB_BUY_ONE+'" target="_blank" style="display:block;text-decoration:none;margin-top:8px">Beli game ini RM12</a>':'')+
    '<p>Dah ada kod?</p><input id="mbcode" placeholder="MASUK KOD" maxlength="24"><button class="btn" id="mbgo">Buka</button> <button class="btn alt" id="mbx">Tutup</button><p id="mbmsg"></p></div>';
  document.body.appendChild(m);
  m.querySelector("#mbx").onclick=function(){ m.remove(); };
  m.querySelector("#mbgo").onclick=function(){
    var v=m.querySelector("#mbcode").value.trim().toUpperCase(), msg=m.querySelector("#mbmsg");
    function granted(g){ var l=load("mb_unlock",[]); if(l.indexOf(g)<0){ l.push(g); save("mb_unlock",l); } if(mbHas(id)){ sndWin(); m.remove(); say("Yeay! Dah terbuka!"); if(done) done(); } else { sndNo(); msg.textContent="Kod ini untuk game lain."; } }
    if(MB_VERIFY_URL){
      msg.textContent="Menyemak kod...";
      var dev=load("mb_dev",null); if(!dev){ dev=Math.random().toString(36).slice(2)+Date.now().toString(36); save("mb_dev",dev); }
      fetch(MB_VERIFY_URL,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({code:v,game:id,device:dev})})
        .then(function(r){ return r.json(); })
        .then(function(j){ if(j&&j.ok&&j.unlock) granted(j.unlock); else { sndNo(); msg.textContent=(j&&j.message)||"Kod salah, cuba lagi."; } })
        .catch(function(){ sndNo(); msg.textContent="Tiada internet. Cuba lagi."; });
      return;
    }
    if(!MB_CODES[v]){ sndNo(); msg.textContent="Kod salah, cuba lagi."; return; }
    granted(MB_CODES[v]);
  };
}
