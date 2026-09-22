(function(){
'use strict';
/* entradas al hacer scroll, con red de seguridad:
   si el observador no dispara, a los 2,5 s se muestra todo igual */
var els=[].slice.call(document.querySelectorAll('.rv'));
function showAll(){els.forEach(function(e){e.classList.add('in');});}
if('IntersectionObserver' in window){
  var io=new IntersectionObserver(function(en){
    en.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}});
  },{rootMargin:'0px 0px -8% 0px',threshold:.06});
  els.forEach(function(e){io.observe(e);});
  setTimeout(showAll,2500);
}else{showAll();}

/* el carrusel se puede arrastrar con el mouse, no solo con la rueda */
var rail=document.getElementById('rail');
if(rail){
  var down=false,startX=0,startL=0;
  rail.addEventListener('pointerdown',function(e){
    rail.setAttribute('data-drag','0');
    if(e.target.closest('a'))return;
    down=true;startX=e.clientX;startL=rail.scrollLeft;rail.style.cursor='grabbing';
  });
  window.addEventListener('pointerup',function(){down=false;rail.style.cursor='';});
  window.addEventListener('pointermove',function(e){
    if(!down)return;
    if(Math.abs(e.clientX-startX)>6)rail.setAttribute('data-drag','1');
    rail.scrollLeft=startL-(e.clientX-startX);
  });
}

/* el menu del telefono: abre, cierra al elegir, con Escape o tocando afuera */
(function(){
  var tg=document.querySelector('.navtoggle'), nm=document.getElementById('navmob');
  if(!tg||!nm)return;
  function abrir(si){
    tg.setAttribute('aria-expanded',si?'true':'false');
    tg.setAttribute('aria-label',si?'Cerrar el menú':'Abrir el menú de secciones');
    nm.hidden=!si;
  }
  tg.addEventListener('click',function(){abrir(nm.hidden);});
  nm.addEventListener('click',function(e){if(e.target.closest('a'))abrir(false);});
  document.addEventListener('keydown',function(e){if(e.key==='Escape'&&!nm.hidden){abrir(false);tg.focus();}});
  document.addEventListener('click',function(e){if(!nm.hidden&&!e.target.closest('.nav'))abrir(false);});
})();

/* lo que se anima solo corre mientras esta en pantalla */
(function(){
  var els=document.querySelectorAll('.storefront,.band,.paponwrap');
  if(!('IntersectionObserver' in window)){[].forEach.call(els,function(e){e.classList.add('en-vista');});return;}
  var io=new IntersectionObserver(function(en){en.forEach(function(e){e.target.classList.toggle('en-vista',e.isIntersecting);});},{rootMargin:'120px 0px'});
  [].forEach.call(els,function(e){io.observe(e);});
})();

/* ---------- estrella fugaz sobre el local ---------- */
(function(){
  var g=document.getElementById('fugaz'), sf=document.querySelector('.storefront');
  if(!g||!sf||!g.animate||matchMedia('(prefers-reduced-motion: reduce)').matches)return;
  function rnd(a,b){return a+Math.random()*(b-a);}
  function aLaVista(){var r=sf.getBoundingClientRect();return r.bottom>0&&r.top<innerHeight;}
  function cruzar(){
    if(!document.hidden&&aLaVista()){
      /* siempre en la franja alta del cielo: lejos de la luna, los postes y el techo */
      var derecha=Math.random()<.5, ang=rnd(14,26), largo=rnd(360,440);
      var x0=derecha?rnd(380,1700):rnd(820,2120), y0=rnd(30,165);
      var th=derecha?ang:180-ang, rad=th*Math.PI/180;
      var x1=x0+Math.cos(rad)*largo, y1=y0+Math.sin(rad)*largo;
      g.animate([
        {transform:'translate('+x0+'px,'+y0+'px) rotate('+th+'deg)',opacity:0},
        {opacity:1,offset:.18},{opacity:1,offset:.7},
        {transform:'translate('+x1+'px,'+y1+'px) rotate('+th+'deg)',opacity:0}
      ],{duration:rnd(950,1300),easing:'cubic-bezier(.3,.1,.6,1)'});
    }
    setTimeout(cruzar,rnd(4500,9000));
  }
  setTimeout(cruzar,1800);
})();

/* ---------- Tony, la mascota: narra el recorrido y cuenta datos de cada seccion ---------- */
(function(){
  /* el dibujo de Tony vive aca, asi es el mismo en todas las paginas */
  var tpl=document.createElement('template');
  tpl.innerHTML=`<svg class="papon" viewBox="0 0 200 320" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <g stroke="#1E1713" stroke-linecap="round" stroke-linejoin="round">
    <!-- piernas y botas de cowboy -->
    <path d="M84 238v34" fill="none" stroke-width="8"/>
    <path d="M116 238v34" fill="none" stroke-width="8"/>
    <path d="M75 266 L95 266 L96 302 L56 302 C56 293 63 289 72 289 L75 289 Z" fill="#7A4A2A" stroke-width="5"/>
    <path d="M105 266 L125 266 L128 289 C137 289 144 293 144 302 L104 302 Z" fill="#7A4A2A" stroke-width="5"/>
    <path d="M87 302 L96 302 L96 309 L89 309 Z" fill="#3E2616" stroke-width="4"/>
    <path d="M104 302 L113 302 L111 309 L104 309 Z" fill="#3E2616" stroke-width="4"/>
    <path d="M79 274l6 6 6-6M109 274l6 6 6-6" fill="none" stroke="#F2C14E" stroke-width="3"/>
    <!-- brazo izquierdo, el que señala -->
    <g class="pp-arml">
      <path d="M44 164q-24 8-28 28" fill="none" stroke-width="8"/>
      <circle cx="14" cy="198" r="11" fill="#FBF3E4" stroke-width="5"/>
    </g>
    <!-- brazo derecho, el que saluda -->
    <g class="pp-arm">
      <path d="M156 164q24-6 30-26" fill="none" stroke-width="8"/>
      <circle cx="188" cy="132" r="11" fill="#FBF3E4" stroke-width="5"/>
    </g>
    <!-- pan de abajo, medallon smash, cheddar y lechuga -->
    <path d="M42 214 L158 214 L158 228 C158 238 150 242 140 242 L60 242 C50 242 42 238 42 228 Z" fill="#E9A23B" stroke-width="5.5"/>
    <path d="M38 196 C38 188 44 186 52 186 L148 186 C156 186 162 188 162 196 L162 206 C162 214 156 216 148 216 L52 216 C44 216 38 214 38 206 Z" fill="#6E3B22" stroke-width="5.5"/>
    <path d="M54 202h10M74 208h9M112 201h12M132 208h9" fill="none" stroke="#8E5433" stroke-width="3"/>
    <path d="M40 182 L160 182 L160 190 C151 190 152 204 145 205 C138 206 140 192 129 192 L97 192 C90 192 92 209 84 209 C76 209 78 192 70 192 L40 192 Z" fill="#F2C14E" stroke-width="4.5"/>
    <path d="M34 174 Q42 188 50 176 Q58 188 66 176 Q74 188 82 176 Q90 188 98 176 Q106 188 114 176 Q122 188 130 176 Q138 188 146 176 Q154 188 162 176 Q169 180 166 185 L34 185 Q30 180 34 174 Z" fill="#86BF4E" stroke-width="4.5"/>
    <!-- pan de arriba con sesamo -->
    <path d="M36 176 C36 122 64 98 100 98 C136 98 164 122 164 176 Z" fill="#E9A23B" stroke-width="6"/>
    <path d="M52 150 C54 132 60 120 70 112" fill="none" stroke="#F6C66B" stroke-width="6"/>
    <g fill="#FBF3E4" stroke-width="2.5">
      <ellipse cx="52" cy="128" rx="4.2" ry="2.6" transform="rotate(-35 52 128)"/>
      <ellipse cx="148" cy="128" rx="4.2" ry="2.6" transform="rotate(35 148 128)"/>
      <ellipse cx="50" cy="164" rx="4.2" ry="2.6" transform="rotate(-10 50 164)"/>
      <ellipse cx="150" cy="164" rx="4.2" ry="2.6" transform="rotate(10 150 164)"/>
    </g>
    <!-- cara -->
    <path d="M70 110q11-6 22-1M108 109q11-5 22 1" fill="none" stroke-width="4.5"/>
    <g class="eyes">
      <circle class="eye" cx="82" cy="128" r="14" fill="#fff" stroke-width="4.5"/>
      <circle class="eye" cx="118" cy="128" r="14" fill="#fff" stroke-width="4.5"/>
      <circle class="pupil" cx="82" cy="129" r="6" fill="#1E1713" stroke="none"/>
      <circle class="pupil" cx="118" cy="129" r="6" fill="#1E1713" stroke="none"/>
    </g>
    <circle class="pp-cheek" cx="54" cy="146" r="6" fill="#E8907F" stroke="none"/>
    <circle class="pp-cheek" cx="146" cy="146" r="6" fill="#E8907F" stroke="none"/>
    <path class="pp-smile" d="M87 161q13 11 26 0" fill="none" stroke-width="5"/>
    <ellipse class="pp-o" cx="100" cy="166" rx="7" ry="7" fill="#7A2A1F" stroke-width="4"/>
    <!-- bigote -->
    <path d="M100 151 C92 145 78 145 70 153 C66 157 64 161 70 161 C76 157 86 157 100 159 C114 157 124 157 130 161 C136 161 134 157 130 153 C122 145 108 145 100 151 Z" fill="#6B3A22" stroke-width="4"/>
    <!-- sombrero de cowboy: se lo saca para saludar -->
    <g class="pp-hat">
      <path d="M62 92 C58 64 64 40 78 36 C88 34 92 46 100 46 C108 46 112 34 122 36 C136 40 142 64 138 92 Z" fill="#C97D3A" stroke-width="5.5"/>
      <path d="M63 68 C86 74 114 74 137 68 L138 81 C114 87 86 87 62 81 Z" fill="#E03127" stroke-width="4.5"/>
      <path d="M100 68.5l2.4 5 5.4.6-4 3.7 1.1 5.3-4.9-2.7-4.8 2.7 1.1-5.3-4-3.7 5.4-.6z" fill="#F2C14E" stroke-width="2"/>
      <path d="M20 100 C38 112 162 112 180 100 C178 90 150 86 100 88 C50 86 22 90 20 100 Z" fill="#B86B2E" stroke-width="5.5"/>
    </g>
  </g>
</svg>`;
  var wraps=[].slice.call(document.querySelectorAll('.paponwrap'));
  if(!tpl||!wraps.length)return;
  var reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
  function $(id){return document.getElementById(id);}

  wraps.forEach(function(w){
    var rig=document.createElement('div');
    rig.className='pp-rig';
    rig.appendChild(tpl.content.cloneNode(true));
    w.insertBefore(rig,w.firstChild);
  });
  var svgs=[].slice.call(document.querySelectorAll('.papon'));

  /* ---- la mirada: sigue el cursor, o lo que Tony esté comentando ---- */
  var mx=innerWidth/2,my=innerHeight/2,raf=null,MAX=5;
  function track(){
    raf=null;
    svgs.forEach(function(s){
      var box=s.getBoundingClientRect();
      if(!box.width||box.bottom<0||box.top>innerHeight)return;
      var pupils=s.querySelectorAll('.pupil'), eyes=s.querySelectorAll('.eye');
      for(var i=0;i<pupils.length;i++){
        var r=eyes[i].getBoundingClientRect();
        var dx=mx-(r.left+r.width/2), dy=my-(r.top+r.height/2);
        var d=Math.hypot(dx,dy)||1, k=Math.min(1,d/200);
        /* unidades del dibujo, no pixeles: se ve igual en cualquier tamano */
        pupils[i].style.transform='translate('+(dx/d*MAX*k).toFixed(2)+'px,'+(dy/d*MAX*k).toFixed(2)+'px)';
      }
    });
  }
  function lookAt(x,y){mx=x;my=y;if(raf===null)raf=requestAnimationFrame(track);}
  if(!reduce){
    addEventListener('pointermove',function(e){lookAt(e.clientX,e.clientY);},{passive:true});
    setInterval(function(){
      if(document.hidden)return;
      svgs.forEach(function(s){
        s.classList.add('blink');
        setTimeout(function(){s.classList.remove('blink');},140);
      });
    },4300);
  }

  /* ---- hablar y moverse ---- */
  function say(w,txt,ms){
    var b=w&&w.querySelector('.bubble');
    if(!b||!txt)return;
    b.textContent=txt;
    w.classList.remove('talk');void w.offsetWidth;w.classList.add('talk');
    clearTimeout(w._t);
    w._t=setTimeout(function(){w.classList.remove('talk');},ms||3200);
  }
  var DUR={hop:720,spin:980,wave:1500,blush:3400,point:3400,hat:950};
  function act(w,name){
    if(!w||!name)return;
    w.classList.remove(name);void w.offsetWidth;w.classList.add(name);
    clearTimeout(w['_'+name]);
    w['_'+name]=setTimeout(function(){w.classList.remove(name);},DUR[name]||1200);
  }

  /* ---- las escenas: una por sección ---- */
  var float=$('paponFloat');
  /* cada escena tiene datos reales de su seccion: dice el primero al entrar y, si lo tocas, sigue con los demas */
  var scenes=[
    {sec:'top', who:$('paponHero'), act:'hat', lines:[
      '¡Howdy! O sea… ¿qué hacé, loco? Soy Tony. ¿Te muestro Frich?',
      'Tres locales en Córdoba: Nueva Córdoba, Valle Escondido y Jesús María.',
      'Smash burgers, papas onduladas y canastita yankee. Así somos, de una.']},
    {sec:'menu', who:float, act:'hop', lines:[
      'Todas las America Burger vienen con papas incluidas, ¿viste?',
      '¿No comés carne? Las cinco clásicas salen veganas, a $13.000.',
      '¿Hambre de cowboy? El medallón extra sale $2.700.']},
    {sec:'papas', who:$('paponPeek'), act:'wave', enter:'peek', lines:[
      'Mirá esas papas: onduladas y en canastita. Posta, lo más.',
      '¿Querés más papas? El extra sale $2.900, loco.',
      '¿Aros de cebolla? También hay, a $3.500.']},
    {sec:'historia', who:$('paponLocal'), act:'hat', enter:'walk',
     el:'.storefront', f:.3, /* se activa con la vereda ya a la vista, no con el titulo */ lines:[
      'Este es el de Jesús María, en Paseo del Huerto 99. Pasá nomás.',
      'Acá abrimos también al mediodía: de lunes a sábado, de 12 a 15.',
      'De noche, mesas rojas en la vereda y el cartel prendido. Una fiesta.']},
    {sec:'nosotros', who:float, act:'wave', lines:[
      'Tres locales, todos en Córdoba. Cordobeses de pura cepa.',
      'Estos le ponen el buzo todos los días. Literal, mirá la foto.',
      'El neón está siempre prendido. Como yo.']},
    {sec:'resenas', who:float, act:'blush', lines:[
      '4,4 estrellas con más de mil opiniones en Google. ¡Mirá vos!',
      'Esto lo escribió la gente, eh. Nosotros no tocamos nada.']},
    {sec:'sucursales', who:float, act:'point', lines:[
      'Nueva Córdoba y Valle Escondido: todos los días de 20 a 24, loco.',
      'Jesús María abre también al mediodía, de lunes a sábado.',
      'Tocá «Cómo llegar» y te abre la ruta directo. Ni te perdés.']},
    {sec:'franquicias', who:float, act:'hop', lines:[
      '¿Un Frich en tu ciudad? El primer paso es el formulario, compañero.',
      'Llenarlo no es una aprobación: es para conocerse.',
      'Buscan socios que estén en el local día a día. Con las botas puestas.']},
    {sec:'proceso', who:float, act:'point', lines:[
      'El formulario tiene 16 preguntas, compañero. Tomate tu tiempo.',
      'Te preguntan si contás con el capital y en qué plazo querés abrir.',
      'Y si vos o un socio estaría en el local, día a día.']},
    {sec:'pedir', who:$('paponFinal'), act:'hop', lines:[
      'Pedís por WhatsApp y pasás a buscar. Así no esperás.',
      '¿Preferís una app? También estamos en Rappi y PedidosYa.',
      'O llamá directo a tu local: abajo están los tres.']}
  ].filter(function(s){s.el=s.el?document.querySelector(s.el):$(s.sec);s.f=s.f||.45;return s.who&&s.el;});
  var current=null, actor=null, dicho={}, pendiente=null;

  function entrar(s){
    if(s.enter==='peek'){s.who.classList.add('up');return 800;}
    if(s.enter==='walk'){
      if(reduce){s.who.classList.add('here');return 300;}
      s.who.classList.add('walking','here');
      clearTimeout(s._w);s._w=setTimeout(function(){s.who.classList.remove('walking');},2600);
      return 2700;
    }
    return 0;
  }
  function salir(s){
    if(s.enter==='peek')s.who.classList.remove('up');
    if(s.enter==='walk'&&s.who.classList.contains('here')){
      s.who.classList.remove('here','talk');
      if(!reduce){
        s.who.classList.add('walking');
        clearTimeout(s._w);s._w=setTimeout(function(){s.who.classList.remove('walking');},2600);
      }
    }
  }
  function activar(s){
    if(current===s)return;
    var prev=current;
    current=s;actor=s.who;
    if(prev&&prev.who!==s.who){salir(prev);prev.who.classList.remove('talk');}
    if(float)float.classList.toggle('on',s.who===float);
    var espera=entrar(s);
    if(!prev)espera=1300;                               /* al cargar, deja terminar la entrada del hero */
    else if(s.who===float&&prev.who!==float)espera=500; /* que termine de aparecer antes de hablar */
    clearTimeout(s._t);
    s._t=setTimeout(function(){
      if(current!==s)return;
      if(s.sec==='pedir'&&pendiente){act(s.who,'spin');say(s.who,pendiente,4200);pendiente=null;return;}
      act(s.who,s.act);
      if(!dicho[s.sec]){dicho[s.sec]=1;s.i=1;say(s.who,s.lines[0],3800);}
    },espera);
  }
  function detectar(){
    if(innerHeight+scrollY>=document.documentElement.scrollHeight-4)return scenes[scenes.length-1];
    for(var i=0;i<scenes.length;i++){
      var r=scenes[i].el.getBoundingClientRect(), linea=innerHeight*scenes[i].f;
      if(r.top<=linea&&r.bottom>linea)return scenes[i];
    }
    return null;
  }
  /* cambia de escena recien cuando la nueva se sostiene un instante:
     si el scroll pasa volando por varias secciones, Papon no entra y sale de cada una */
  var cand=null,candT=null;
  function escena(){
    var hit=detectar();
    if(!hit||hit===current){cand=null;clearTimeout(candT);return;}
    if(!current){activar(hit);return;}
    if(hit===cand)return;
    cand=hit;clearTimeout(candT);
    candT=setTimeout(function(){var h2=detectar();cand=null;if(h2&&h2!==current)activar(h2);},240);
  }

  /* ---- se inclina con la velocidad del scroll ---- */
  var lastY=scrollY, lean=0, empuje=0, leanRaf=null, escRaf=null;
  function leanLoop(){
    leanRaf=null;
    lean+=(empuje-lean)*0.18;empuje*=0.82;
    if(Math.abs(lean)<0.05&&Math.abs(empuje)<0.05){lean=0;float.style.setProperty('--lean','0');return;}
    float.style.setProperty('--lean',lean.toFixed(2));
    leanRaf=requestAnimationFrame(leanLoop);
  }
  addEventListener('scroll',function(){
    var y=scrollY,v=y-lastY;lastY=y;
    if(!reduce&&float){
      empuje=Math.max(-9,Math.min(9,-v*0.35));
      if(leanRaf===null)leanRaf=requestAnimationFrame(leanLoop);
    }
    if(escRaf===null)escRaf=requestAnimationFrame(function(){escRaf=null;escena();});
  },{passive:true});
  addEventListener('resize',escena);
  escena();

  function visible(w){
    if(!w)return false;
    if(w===float&&!float.classList.contains('on'))return false;
    var r=w.getBoundingClientRect();
    return r.width>0&&r.bottom>0&&r.top<innerHeight;
  }
  function quien(){return visible(actor)?actor:(visible(float)?float:null);}

  /* ---- comenta lo que tocás del menú ---- */
  var ultimo=0, rail=$('rail');
  function comentar(el,forzar){
    var now=Date.now();
    if(!forzar&&now-ultimo<1600)return;
    ultimo=now;
    var w=quien();if(!w)return;
    var r=el.getBoundingClientRect();
    lookAt(r.left+r.width/2,r.top+Math.min(r.height/2,120));
    say(w,el.getAttribute('data-say'),2900);
    if(forzar)act(w,'hop');
  }
  [].forEach.call(document.querySelectorAll('[data-say]'),function(el){
    var t=null;
    el.addEventListener('pointerenter',function(e){
      if(e.pointerType!=='mouse')return;
      t=setTimeout(function(){comentar(el,false);},380);
    });
    el.addEventListener('pointerleave',function(){clearTimeout(t);});
    el.addEventListener('click',function(e){
      if(e.target.closest('a'))return;
      if(rail&&rail.getAttribute('data-drag')==='1')return;
      clearTimeout(t);comentar(el,true);
    });
  });

  /* ---- festeja cuando hacés un pedido ---- */
  [].forEach.call(document.querySelectorAll('a[href="#pedir"],a[href^="tel:"],a[href*="instagram.com"],a[href*="wa.me"],a[href*="rappi"],a[href*="pedidosya"],a[href*="docs.google.com/forms"]'),function(a){
    a.addEventListener('click',function(){
      var w=quien()||actor, href=a.getAttribute('href');
      var card=a.closest('.card'), h3=card&&card.querySelector('h3'), nombre=h3&&h3.textContent.trim();
      if(href==='#pedir'){
        say(w,'¡Vamos! Te llevo al pedido.',2400);act(w,'spin');
        if(!current||current.sec!=='pedir')pendiente='¡Llegamos! Pedí por WhatsApp o llamá a tu local.';
      }else if(href.indexOf('wa.me')>=0){
        say(w,nombre?'¡Una '+nombre+'! De una, te abro WhatsApp.':'¡Eso! Te abro WhatsApp.',3000);act(w,'spin');
      }else if(href.indexOf('tel:')===0){
        say(w,'¡Eso! Del otro lado te atienden.',3000);act(w,'spin');
      }else if(href.indexOf('rappi')>=0||href.indexOf('pedidosya')>=0){
        say(w,'¡Yeehaw! Que llegue calentito.',3000);act(w,'hop');
      }else if(href.indexOf('docs.google.com/forms')>=0){
        say(w,'¡Suerte, compañero! Ojalá nos veamos en tu ciudad.',3400);act(w,'spin');
      }else{
        say(w,'Escribinos por Insta, dale.',3000);act(w,'hop');
      }
    });
  });

  /* ---- si lo tocás, contesta ---- */
  function charla(w){
    var s=current, txt='¡Howdy! O sea, ¿qué hacé? Soy Tony.';
    if(s&&s.lines){s.i=(s.i||0)%s.lines.length;txt=s.lines[s.i];s.i++;}
    say(w,txt,3800);act(w,Math.random()<.5?'hop':'hat');
  }
  wraps.forEach(function(w){
    w.addEventListener('click',function(){charla(w);});
    w.addEventListener('keydown',function(e){
      if(e.key==='Enter'||e.key===' '){e.preventDefault();charla(w);}
    });
  });

  /* ---- cuando nadie lo mira, se mueve solo ---- */
  if(!reduce)setInterval(function(){
    var w=quien();
    if(document.hidden||!w||w.classList.contains('talk')||w.classList.contains('walking'))return;
    var k=Math.random(), r=w.getBoundingClientRect(), vx=mx, vy=my;
    if(k<.45){
      lookAt(r.left-400,r.top+r.height*.3);
      setTimeout(function(){lookAt(r.right+400,r.top+r.height*.3);},650);
      setTimeout(function(){lookAt(vx,vy);},1400);
    }else if(k<.65)act(w,'wave');
    else if(k<.85)act(w,'hat');
    else act(w,'hop');
  },7000);
})();
})();