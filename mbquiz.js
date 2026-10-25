// ====== MainBelajar: enjin kuiz kongsi untuk game berbilang level ======
function mbDeck(arr){ var q=[],last=null; return function(){ if(!q.length){ q=shuffle(arr); if(q[q.length-1]===last&&q.length>1){ q.unshift(q.pop()); } } last=q.pop(); return last; }; }
// bank: [soalan, jawapan betul, salah1, salah2, (sebutan tambahan)]
function mbMCQ(bank,opts){
  opts=opts||{}; var d=mbDeck(bank);
  return function(){
    var it=d(), wrongs=shuffle(it.slice(2,4)), all=shuffle([it[1]].concat(wrongs));
    return {prompt:it[0], vis:opts.vis?opts.vis(it):"", say:it[0], ch:all, ans:all.indexOf(it[1]), ok:it[4]||it[1], small:true, one:true};
  };
}
function mbQuizGame(cfg){
  var TOTAL=cfg.total||10, stars=load(cfg.key,{}), app=document.getElementById("app"), S=null;
  document.documentElement.style.setProperty("--bg",cfg.bg||"#fff7e0");
  function tot(){ var s=0; for(var k in stars) s+=stars[k]; return s; }
  function shell(){ app.innerHTML='<div id="hd"></div><div id="qa"></div>'; }
  function hd(back,right,pct){ document.getElementById("hd").innerHTML='<div class="top"><button class="back" id="bk">← Balik</button><div class="stars">'+right+'</div></div><div class="bar"><i style="width:'+pct+'%"></i></div>'; document.getElementById("bk").onclick=back; }
  function spk(t,lang,cb,o){ if(lang==="en") sayEn(t,cb,o); else say(t,cb,o); }
  function stop(){ try{ speechSynthesis.cancel(); }catch(e){} }
  function home(){
    stop();
    var h='<div class="top"><a class="back" href="../">🏠</a><div class="title" style="font-size:22px">'+cfg.title+' '+cfg.emoji+'</div><div class="stars">⭐ '+tot()+'</div><button class="vb" id="vb">'+(voiceOn?"🔊":"🔇")+'</button></div>'+(cfg.sub?'<p class="center" style="margin:0 0 10px;font-weight:700">'+cfg.sub+'</p>':'')+'<div class="grid">';
    cfg.levels.forEach(function(L){
      var lk=!L.free&&!mbHas(cfg.id);
      h+='<button class="lv" data-id="'+L.id+'">'+(lk?'<span class="lock">🔒</span>':'')+'<div class="ic">'+L.ic+'</div><div class="nm">'+L.name+'</div><div class="st">'+(stars[L.id]?rep("⭐",stars[L.id]):"")+'</div></button>';
    });
    h+='</div>';
    if(!mbHas(cfg.id)) h+='<button class="btn alt wide" id="buy">🔓 Buka Semua Level</button>';
    app.innerHTML=h;
    document.getElementById("vb").onclick=toggleVoice;
    Array.prototype.forEach.call(app.querySelectorAll(".lv"),function(b){
      b.onclick=function(){ var L=cfg.levels[+b.getAttribute("data-id")-1]; if(!L.free&&!mbHas(cfg.id)) return mbPaywall(cfg.id,cfg.title+": Buka Semua Level",home); start(L); };
    });
    var bb=document.getElementById("buy"); if(bb) bb.onclick=function(){ mbPaywall(cfg.id,cfg.title+": Buka Semua Level",home); };
  }
  function start(L){ S={L:L,i:0,score:0}; if(L.reset) L.reset(); next(); }
  function next(){
    if(S.i>=TOTAL) return finish();
    shell(); hd(function(){ stop(); home(); },(S.i+1)+" / "+TOTAL,S.i/TOTAL*100);
    var L=S.L, qa=document.getElementById("qa");
    if(L.custom){ L.custom(qa,function(first){ if(first) S.score++; S.i++; setTimeout(next,1900); }); return; }
    drawQ(L.gen(),qa);
  }
  function drawQ(q,qa){
    var h='<div class="q"><div class="prompt" id="pr" style="font-size:'+(q.pf||24)+'px">'+q.prompt+' 🔊</div><div class="vis" style="font-size:'+(q.vf||40)+'px">'+(q.vis||"")+'</div></div><div class="choices'+(q.two?' two':q.one?' one':'')+'">';
    q.ch.forEach(function(c,i){ h+='<button class="ch'+(q.small?' t':'')+'" data-i="'+i+'">'+c+'</button>'; });
    h+='</div>';
    qa.innerHTML=h;
    var lang=q.lang||"ms";
    document.getElementById("pr").onclick=function(){ spk(q.say,lang,null,{show:q.show}); };
    if(!q.mute) setTimeout(function(){ spk(q.say,lang,null,{show:q.show}); },200);
    var done=false, tried=false;
    Array.prototype.forEach.call(qa.querySelectorAll(".ch"),function(b){
      b.onclick=function(){
        if(done) return; var i=+b.getAttribute("data-i");
        if(i===q.ans){
          done=true; b.classList.add("ok"); sndOk(); if(!tried) S.score++; S.i++;
          if(q.okEn) say(pick(OKS),function(){ sayEn(q.okEn); }); else say(pick(OKS)+(q.ok?" "+q.ok:""),null,{show:q.okShow});
          setTimeout(next,q.okEn?2600:(q.ok&&String(q.ok).length>40?3800:2300));
        } else { tried=true; b.classList.add("no"); sndNo(); setTimeout(function(){ b.classList.remove("no"); },450); say(pick(NOS)); }
      };
    });
  }
  function finish(){
    var n=S.score>=9?3:S.score>=6?2:1;
    if(!stars[S.L.id]||stars[S.L.id]<n){ stars[S.L.id]=n; save(cfg.key,stars); }
    sndWin();
    var msg=n===3?"Hebat! Kamu memang pandai!":n===2?"Bagus! Sikit lagi!":"Jom cuba lagi ya!";
    setTimeout(function(){ say(msg+" Betul "+S.score+" daripada "+TOTAL+"."); },500);
    var nxt=cfg.levels[S.L.id];
    app.innerHTML='<div class="center" style="padding-top:30px"><div class="big">'+rep("⭐",n)+'</div><h1>'+msg+'</h1><p style="font-size:22px">Betul '+S.score+' / '+TOTAL+' (kali pertama)</p>'+
      '<button class="btn gr wide" id="again">🔁 Main Lagi</button>'+(nxt?'<button class="btn alt wide" id="nx">➡️ Level Seterusnya</button>':'')+'<button class="btn wide" id="hm">🏠 Menu</button></div>';
    document.getElementById("again").onclick=function(){ start(S.L); };
    document.getElementById("hm").onclick=home;
    var nb=document.getElementById("nx");
    if(nb) nb.onclick=function(){ if(!nxt.free&&!mbHas(cfg.id)){ home(); mbPaywall(cfg.id,cfg.title+": Buka Semua Level",home); } else start(nxt); };
  }
  home();
}
