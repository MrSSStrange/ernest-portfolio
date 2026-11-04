const A=__ASSETS__,P=__ARTICLES__,$=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)],el=(t,c,x)=>{const n=document.createElement(t);if(c)n.className=c;if(x)n.textContent=x;return n};
$$('[data-i]').forEach(i=>i.src=A[i.dataset.i]);
$('#mq').innerHTML=('<span>Human ideas ✦</span><span>Applied AI ✦</span><span>Automation ✦</span><span>Context ✦</span><span>Data ✦</span>').repeat(4);
const TYP={process:'process',context:'context',agents:'agents',quality:'quality',daily:'daily',prompt:'prompt',data:'dset',human:'human',learning:'learn'};const TY={engineeringNetwork:'net',engineeringCode:'code',engineeringData:'data',engineeringFormula:'formula'};const LV=[],vio=new IntersectionObserver(es=>es.forEach(e=>e.target._v=e.isIntersecting));function live(c){c._g=c.getContext('2d');c._s={};LV.push(c);vio.observe(c)}
// journal
P.forEach(p=>{p.min=Math.max(1,Math.ceil(p.body.map(b=>b.h||b).join(' ').split(/\s+/).length/180));const b=el('button','ps'),im=el('div','im'),i=el('canvas');i._t=TYP[p.id];live(i);im.append(i);
 b.append(im,el('p','m',p.label+' · '+p.min+' min read'),el('h3','',p.title),el('p','',p.excerpt));
 b.onclick=()=>{$('#rm').textContent=p.label+' · '+p.min+' min read';$('#rt').textContent=p.title;$('#ri')._t=TYP[p.id];const a=$('#ra');a.replaceChildren();p.body.forEach(x=>a.append(typeof x==='string'?el('p','',x):el('h3','',x.h)));
 if(p.source){const q=el('p'),l=el('a','','Explore the example ↗');l.href=p.source;l.target='_blank';l.rel='noreferrer';q.append(l);a.append(q)}portfolioOpenDialog($('#rd'),b)};$('#g').append(b)});
$('#rx').onclick=()=>$('#rd').close();
// split helpers
$$('#h1 .ln').forEach(l=>{const nodes=[...l.childNodes];l.replaceChildren();nodes.forEach(n=>{if(n.nodeType===3)[...n.textContent].forEach(c=>{const s=el('span','ch',c);l.append(s)});else{n.classList.add('ch');l.append(n)}})});
const wp=$('#words');wp.innerHTML=wp.textContent.split(' ').map(w=>'<span>'+w+'</span>').join(' ');
if(window.gsap&&window.ScrollTrigger&&!matchMedia('(prefers-reduced-motion: reduce)').matches){
gsap.registerPlugin(ScrollTrigger);const R=gsap.utils.random;
// hero: letters fly in from everywhere and assemble
gsap.from('.ch',{x:()=>R(-700,700),y:()=>R(-500,500),rotation:()=>R(-200,200),scale:()=>R(.3,2.4),opacity:0,duration:2.2,ease:'expo.out',stagger:{each:.05,from:'random'}});
gsap.from('.hl > *',{y:40,opacity:0,duration:1,delay:1.2,stagger:.15,ease:'power3.out'});
gsap.to('#h1',{yPercent:-12,ease:'none',scrollTrigger:{trigger:'.hero',start:'top top',end:'bottom top',scrub:true}});
// marquee driven by scroll velocity
const mq=gsap.to('#mq',{xPercent:-50,duration:28,ease:'none',repeat:-1});
ScrollTrigger.create({onUpdate:s=>{const v=Math.min(8,1+Math.abs(s.getVelocity())/250);gsap.to(mq,{timeScale:v*(s.direction||1),duration:.3,overwrite:true});gsap.to(mq,{timeScale:1*(s.direction||1),duration:1,delay:.3,overwrite:'auto'})}});
// words scrub
gsap.to('#words span',{opacity:1,stagger:.1,ease:'none',scrollTrigger:{trigger:'#words',start:'top 80%',end:'bottom 45%',scrub:true}});
// portrait reveal
gsap.from('#pt',{clipPath:'inset(100% 0% 0% 0% round 20px)',duration:1.4,ease:'expo.out',scrollTrigger:{trigger:'#pt',start:'top 85%'}});
gsap.from('#pt canvas',{scale:1.5,yPercent:12,ease:'none',scrollTrigger:{trigger:'#pt',start:'top 90%',end:'bottom 40%',scrub:true}});
gsap.from('.about h2,.c2',{y:70,opacity:0,duration:1.1,stagger:.15,ease:'power3.out',scrollTrigger:{trigger:'.about',start:'top 70%'}});
// hover rows with floating image (Skiper-style)
const pv=$('#pv'),qx=gsap.quickTo(pv,'x',{duration:.5,ease:'power3'}),qy=gsap.quickTo(pv,'y',{duration:.5,ease:'power3'}),qr=gsap.quickTo(pv,'rotation',{duration:.4});let px=0;
$$('.row[data-p]').forEach(r=>{r.addEventListener('pointerenter',()=>{pv._t=TY[r.dataset.p];gsap.to(pv,{opacity:1,scale:1,duration:.4,ease:'back.out(1.5)'})});r.addEventListener('pointerleave',()=>gsap.to(pv,{opacity:0,scale:.6,duration:.3}));
 r.addEventListener('pointermove',e=>{qx(e.clientX+30);qy(e.clientY-120);qr(Math.max(-12,Math.min(12,(e.clientX-px)*.4)));px=e.clientX})});
gsap.from('.row',{y:60,opacity:0,stagger:.12,duration:1,ease:'power3.out',scrollTrigger:{trigger:'#focus .row',start:'top 85%'}});
// pinned horizontal approach
gsap.matchMedia().add('(min-width:861px)',()=>{const t=$('#trk'),d=()=>t.scrollWidth-innerWidth+innerWidth*.04;
 const h=gsap.to(t,{x:()=>-d(),ease:'none',scrollTrigger:{trigger:'#proc',start:'top top',end:()=>'+='+d(),pin:true,scrub:1,invalidateOnRefresh:true,onUpdate:s=>gsap.set('#bar',{scaleX:s.progress})}});
 gsap.utils.toArray('.sg canvas').forEach(i=>gsap.fromTo(i,{scale:1.25},{scale:1,ease:'none',scrollTrigger:{trigger:i,containerAnimation:h,start:'left 95%',end:'left 25%',scrub:true}}))});
// journal + contact
ScrollTrigger.batch('.ps',{start:'top 90%',onEnter:b=>gsap.from(b,{y:70,opacity:0,stagger:.12,duration:.9,ease:'power3.out',overwrite:true})});
gsap.from('.ct h2 span',{yPercent:110,rotation:4,opacity:0,stagger:.15,duration:1.1,ease:'expo.out',scrollTrigger:{trigger:'.ct',start:'top 75%'}});
gsap.from('.pr',{y:80,opacity:0,duration:1,stagger:.15,ease:'power3.out',scrollTrigger:{trigger:'.pj',start:'top 70%'}});
$$('.pj h2,.xp h2,.certificates h2,.tl h2,.jr h2').forEach(h=>gsap.from(h,{y:60,opacity:0,duration:1,ease:'power3.out',scrollTrigger:{trigger:h,start:'top 88%'}}));
gsap.fromTo('.tlv',{'--f':0},{'--f':1,ease:'none',scrollTrigger:{trigger:'.tlv',start:'top 70%',end:'bottom 65%',scrub:true}});
gsap.from('.it',{x:-50,opacity:0,stagger:.25,duration:1,ease:'power3.out',scrollTrigger:{trigger:'.tlv',start:'top 80%'}});
gsap.from('.cc',{y:60,opacity:0,stagger:.15,duration:.9,ease:'power3.out',clearProps:'transform,opacity',scrollTrigger:{trigger:'.cs',start:'top 85%'}});
setTimeout(()=>{const cs=$$('#h1 .ch');addEventListener('pointermove',e=>{if(scrollY>innerHeight)return;cs.forEach(c=>{const r=c.getBoundingClientRect(),dx=r.left+r.width/2-e.clientX,dy=r.top+r.height/2-e.clientY,d=Math.hypot(dx,dy)||1,f=Math.max(0,1-d/230);gsap.to(c,{x:dx/d*f*46,y:dy/d*f*46,rotation:f*dx*.04,duration:.5,ease:'power3.out',overwrite:'auto'})})})},3300);
// cursor
const c=$('#cur'),cx=gsap.quickTo(c,'x',{duration:.2}),cy=gsap.quickTo(c,'y',{duration:.2});addEventListener('pointermove',e=>{cx(e.clientX);cy(e.clientY)});
$$('a,button,.row').forEach(n=>{n.addEventListener('pointerenter',()=>gsap.to(c,{scale:3.2,duration:.3}));n.addEventListener('pointerleave',()=>gsap.to(c,{scale:1,duration:.3}))});
}else{document.documentElement.classList.add('motion-disabled');$('#cur').remove();$$('#words span').forEach(s=>s.style.opacity=1)}
const IM=new Image();IM.src=A.portrait;const RM=matchMedia('(prefers-reduced-motion: reduce)').matches;
const cl=x=>Math.max(0,Math.min(1,x)),ez=x=>1-Math.pow(1-x,3);
const BG=(g,W,H)=>{g.fillStyle='#0a0c0b';g.fillRect(0,0,W,H)},RR=(g,x,y,w,h,r,f,s)=>{g.beginPath();g.roundRect(x,y,w,h,r);if(f){g.fillStyle=f;g.fill()}if(s){g.strokeStyle=s;g.stroke()}};
const FM=['e^x = Σ xⁿ/n!','∇·E = ρ/ε₀','σ = √(Σ(x−μ)²/N)','|ψ⟩ = α|0⟩ + β|1⟩','S = k ln Ω','Δx Δp ≥ ħ/2','y″ + ω²y = 0','det(A − λI) = 0'];
const SC={
net(c,g,W,H,t,S){if(!S.p)S.p=Array.from({length:Math.min(128,Math.max(18,Math.round(W*H/5500)))},()=>({x:Math.random()*W,y:Math.random()*H,vx:(Math.random()-.5)*.5,vy:(Math.random()-.5)*.5}));
 g.fillStyle='#0a0c0b';g.fillRect(0,0,W,H);const P=S.p,R=W*.2;for(const a of P){a.x+=a.vx;a.y+=a.vy;if(a.x<0||a.x>W)a.vx*=-1;if(a.y<0||a.y>H)a.vy*=-1}
 for(let i=0;i<P.length;i++)for(let j=i+1;j<P.length;j++){const a=P[i],b=P[j],d=Math.hypot(a.x-b.x,a.y-b.y);if(d<R){g.strokeStyle=`rgba(10,228,72,${(1-d/R)*.55})`;g.beginPath();g.moveTo(a.x,a.y);g.lineTo(b.x,b.y);g.stroke();const k=(t/900+i*.37)%1;g.fillStyle='#fffce1';g.fillRect(a.x+(b.x-a.x)*k-1,a.y+(b.y-a.y)*k-1,2,2)}}
 g.fillStyle='#0ae448';for(const a of P){g.beginPath();g.arc(a.x,a.y,2.2,0,6.3);g.fill()}},
code(c,g,W,H,t,S){const cs=14,n=Math.ceil(W/cs);if(!S.y){S.y=Array.from({length:n},()=>Math.random()*H);S.v=Array.from({length:n},()=>1+Math.random()*3);g.fillStyle='#0a0c0b';g.fillRect(0,0,W,H)}
 g.fillStyle='rgba(10,12,11,.14)';g.fillRect(0,0,W,H);g.font='13px monospace';
 for(let i=0;i<n;i++){g.fillStyle='#b8ffcb';g.fillText('01{}[]<>=/;λΣ∂'[Math.random()*14|0],i*cs,S.y[i]);g.fillStyle='#0ae448';g.fillText('01'[Math.random()*2|0],i*cs,S.y[i]-cs);S.y[i]+=S.v[i];if(S.y[i]>H&&Math.random()>.975)S.y[i]=0}},
data(c,g,W,H,t,S){g.fillStyle='#0a0c0b';g.fillRect(0,0,W,H);const N=46,vx=W/2,vy=-H*.15;
 for(let i=0;i<N;i++){const f=i/(N-1),x=f*W*1.6-W*.3;g.strokeStyle=`hsla(${120-f*85},90%,55%,.35)`;g.beginPath();g.moveTo(vx,vy);g.lineTo(x,H);g.stroke();
  for(let k=0;k<2;k++){const u=((t/2600+i*.173+k*.5)%1)**2,s=1+u*3;g.fillStyle=`hsl(${120-f*85},95%,70%)`;g.fillRect(vx+(x-vx)*u-s/2,vy+(H-vy)*u-s/2,s,s)}}},
formula(c,g,W,H,t,S){if(!S.f)S.f=Array.from({length:14},(_,i)=>({s:FM[i%8],x:Math.random()*W*.8,y:Math.random()*H,z:12+Math.random()*14,v:.15+Math.random()*.3,h:Math.random()*6}));
 g.fillStyle='#0a0c0b';g.fillRect(0,0,W,H);for(const f of S.f){f.y-=f.v;if(f.y<-20)f.y=H+20;g.globalAlpha=.25+.55*Math.abs(Math.sin(t/1500+f.h));g.fillStyle=Math.sin(f.h*9)>.6?'#0ae448':'#d8dcd6';g.font=`${f.z}px serif`;g.fillText(f.s,f.x+Math.sin(t/2000+f.h)*14,f.y)}g.globalAlpha=1},
xls(c,g,W,H,t,S){g.fillStyle='#0a0c0b';g.fillRect(0,0,W,H);const p=(t/8000)%1,gA=p>.9?1-(p-.9)/.1:1,fs=Math.max(9,W*.024);g.font=fs+'px monospace';
 const nm=['Service 1','Service 2','Service 3','Service 4','Service 5','Service 6','Service 7'],pr=['1 200','2 500','8 000','3 400','900','2 000','2 800'],ct=[0,0,0,1,1,2,2],fi=[0,3,5],lx=W*.05,lw=W*.37,rx=W*.55,y0=H*.2,lh=H*.085,rh=H*.068;
 g.globalAlpha=gA;g.fillStyle='#8d9290';g.fillText('price.xlsx',lx,H*.12);g.fillStyle='#0ae448';g.fillText('ready structure',rx,H*.12);
 for(let k=0;k<3;k++){g.globalAlpha=gA*ez(cl((p-.12-fi[k]*.1)/.12));g.fillStyle='#0ae448';g.fillText('Category '+'ABC'[k]+'  #'+(101+k),rx,y0+(fi[k]+k)*rh+rh*.6)}
 for(let i=0;i<7;i++){const u=ez(cl((p-.15-i*.1)/.2)),ly=y0+i*lh,ry=y0+(i+ct[i]+1)*rh,x=lx+(rx+W*.03-lx)*u,y=ly+(ry-ly)*u;
  if(u<1){g.globalAlpha=gA*(1-u)*.9;g.fillStyle='#1b1e1c';g.fillRect(lx,ly,lw,lh*.82);g.fillStyle='#8d9290';g.fillText(nm[i]+'   '+pr[i],lx+8,ly+lh*.55)}
  if(u>0){g.globalAlpha=gA;g.fillStyle=u>.98?'#0a3d1c':'#2a2d2b';g.fillRect(x,y,lw,rh*.82);g.fillStyle=u>.98?'#0ae448':'#fffce1';g.fillText(nm[i]+'   '+pr[i]+(u>.98?'  ✓':''),x+8,y+rh*.55)}}g.globalAlpha=1},
doc(c,g,W,H,t,S){g.fillStyle='#0a0c0b';g.fillRect(0,0,W,H);const p=(t/8000)%1,gA=p>.92?1-(p-.92)/.08:1,fs=Math.max(8,W*.021);g.globalAlpha=gA;g.font=fs+'px monospace';
 const px=W*.06,py=H*.12,pw=W*.3,ph=H*.76,sc=cl((p-.1)/.6);
 g.fillStyle='#e9ebe6';g.fillRect(px,py,pw,ph);g.fillStyle='#2b6cd8';g.fillRect(px,py,pw,H*.045);g.fillStyle='#fff';g.fillText('document.docx',px+6,py+H*.032);
 g.fillStyle='#b9beb8';[.12,.2,.26,.32,.4,.46,.54,.6,.66].forEach((y,i)=>g.fillRect(px+pw*.08,py+ph*y,pw*(i?.84-(i%3)*.12:.5),i?H*.014:H*.03));g.fillStyle='#cfd3cd';g.fillRect(px+pw*.08,py+ph*.74,pw*.84,ph*.2);
 g.fillStyle='#0ae448';g.fillRect(px,py+ph*sc,pw,2);g.globalAlpha=gA*.15;g.fillRect(px,py,pw,ph*sc);g.globalAlpha=gA;
 for(let i=0;i<14;i++){const u=(t/1100+i/14)%1;g.fillStyle='#0ae448';g.fillRect(px+pw+W*.03+u*W*.14,H*.5+Math.sin(i*2+t/400)*H*.12*(1-u*.4),3,3)}
 const jx=W*.55,jw=W*.4;g.fillStyle='#121513';g.fillRect(jx,py,jw,ph);g.strokeStyle='#ffffff1a';g.strokeRect(jx,py,jw,ph);
 const L=['{','  "title": "…",','  "blocks": [','    { "type": "heading" },','    { "type": "text" },','    { "type": "text" },','    { "type": "table",','      "rows": [ … ] }','  ]','}'],n=Math.floor(sc*L.length+.99);
 L.slice(0,n).forEach((s,i)=>{g.fillStyle=i%3?'#0ae448':'#fffce1';g.fillText(s,jx+10,py+H*.07+i*H*.062)});
 if(sc>=1){g.fillStyle='#0ae448';g.fillRect(jx+10,py+ph-H*.1,jw-20,H*.07);g.fillStyle='#0e100f';g.fillText('✓ ready to import',jx+20,py+ph-H*.055)}g.globalAlpha=1},
process(c,g,W,H,t,S){BG(g,W,H);const L=['Input','Rules','Model','Output'],bw=W*.17,bh=H*.22,y=H*.5-bh/2,xs=[0,1,2,3].map(i=>W*.09+i*W*.235);g.font=`${W*.04}px sans-serif`;g.textAlign='center';
 g.strokeStyle='#ffffff22';g.lineWidth=2;g.beginPath();g.moveTo(xs[0]+bw,H*.5);g.lineTo(xs[3],H*.5);g.stroke();const lit=[0,0,0,0];
 for(let k=0;k<3;k++){const u=(t/4000+k/3)%1;lit[Math.min(3,Math.floor(u*3.99))]=1;g.fillStyle='#0ae448';g.beginPath();g.arc(xs[0]+bw/2+u*(xs[3]-xs[0]),H*.5,5,0,6.3);g.fill()}
 xs.forEach((x,i)=>{RR(g,x,y,bw,bh,10,'#121412',lit[i]?'#0ae448':'#ffffff22');g.fillStyle=i==2?'#0ae448':'#fffce1';g.fillText(L[i],x+bw/2,H*.5+W*.014)});g.textAlign='left'},
context(c,g,W,H,t,S){if(!S.p)S.p=Array.from({length:24},(_,i)=>({sx:Math.random()*W,sy:Math.random()*H,hx:W*.3+(i%4)*W*.1+W*.015,hy:H*.26+Math.floor(i/4)*H*.085}));BG(g,W,H);
 const p=(t/6500)%1,e=p<.5?ez(p/.5):p<.85?1:1-ez((p-.85)/.15);g.setLineDash([6,5]);g.strokeStyle=`rgba(10,228,72,${.3+e*.6})`;g.strokeRect(W*.28,H*.2,W*.44,H*.6);g.setLineDash([]);
 for(const q of S.p){g.fillStyle=e>.95?'#0ae448':'#8d9290';g.globalAlpha=.5+e*.5;g.fillRect(q.sx+(q.hx-q.sx)*e,q.sy+(q.hy-q.sy)*e,W*.085,H*.03)}g.globalAlpha=1},
agents(c,g,W,H,t,S){BG(g,W,H);const cx=W/2,cy=H/2,R=Math.min(W,H)*.33;g.strokeStyle='#ffffff14';g.beginPath();g.arc(cx,cy,R,0,6.3);g.stroke();
 for(let i=0;i<5;i++){const a=t/6000+i*1.2566,x=cx+Math.cos(a)*R,y=cy+Math.sin(a)*R,u=(t/1400+i*.2)%2,k=u<1?u:2-u;g.strokeStyle='#0ae44855';g.beginPath();g.moveTo(cx,cy);g.lineTo(x,y);g.stroke();
  g.fillStyle='#fffce1';g.fillRect(cx+(x-cx)*k-2,cy+(y-cy)*k-2,4,4);RR(g,x-W*.04,y-W*.04,W*.08,W*.08,8,'#121412','#0ae44888')}
 g.fillStyle='#0ae448';g.beginPath();g.arc(cx,cy,W*.055+Math.sin(t/300)*2,0,6.3);g.fill()},
quality(c,g,W,H,t,S){BG(g,W,H);const p=(t/7000)%1,n=6,rh=H*.12,y0=H*.14,sy=y0+Math.min(1,p/.7)*n*rh;g.font=`${W*.05}px sans-serif`;
 for(let i=0;i<n;i++){const y=y0+i*rh,ok=sy>y+rh*.5&&p<.95,bad=i==2&&p<.8;RR(g,W*.1,y,W*.6,rh*.62,6,'#161816');g.fillStyle='#ffffff26';g.fillRect(W*.13,y+rh*.24,W*(.2+((i*37)%25)/100),rh*.14);if(ok){g.fillStyle=bad?'#ff5f57':'#0ae448';g.fillText(bad?'✕':'✓',W*.76,y+rh*.5)}}
 g.fillStyle='#0ae448';g.globalAlpha=.8;g.fillRect(W*.08,sy,W*.64,2);g.globalAlpha=1},
daily(c,g,W,H,t,S){BG(g,W,H);const cw=W*.1,ch=H*.13,x0=W*.15,y0=H*.2,s=(t/500)%12;g.font=`${W*.035}px sans-serif`;
 for(let d=0;d<7;d++){g.fillStyle='#8d9290';g.fillText(['Mon','Tue','Wed','Thu','Fri','Sat','Sun'][d],x0+d*cw*1.15,y0-H*.04);for(let r=0;r<5;r++){const rep=r==1||r==3||(r==2&&d%2==0),lit=rep&&((s-d*1.3+12)%12)<2.2;RR(g,x0+d*cw*1.15,y0+r*ch*1.2,cw,ch,6,lit?'#0ae448':rep?'#0ae44826':'#161816')}}},
prompt(c,g,W,H,t,S){BG(g,W,H);const p=(t/8000)%1,gA=p>.93?1-(p-.93)/.07:1;g.globalAlpha=gA;RR(g,W*.12,H*.1,W*.76,H*.8,12,'#121412','#ffffff1f');g.font=`${W*.04}px sans-serif`;
 ['Goal','Context','Format'].forEach((l,i)=>{const y=H*.22+i*H*.25,k=cl(p*3.4-i*.9);g.fillStyle='#0ae448';g.fillText(l,W*.17,y);for(let j=0;j<2;j++){g.fillStyle='#ffffff2e';g.fillRect(W*.17,y+H*.04+j*H*.06,W*.66*cl(k*2-j*.7)*(j?.7:1),H*.025)}});g.globalAlpha=1},
dset(c,g,W,H,t,S){if(!S.p)S.p=Array.from({length:60},(_,i)=>{const k=i%3;return{sx:Math.random()*W,sy:Math.random()*H*.65,hx:[.28,.5,.72][k]*W+(Math.random()-.5)*W*.14,hy:[.35,.55,.3][k]*H+(Math.random()-.5)*H*.14,k}});BG(g,W,H);
 const p=(t/6000)%1,e=p<.5?ez(p/.5):p<.85?1:1-ez((p-.85)/.15),bins=new Array(12).fill(0);
 for(const q of S.p){const x=q.sx+(q.hx-q.sx)*e,y=q.sy+(q.hy-q.sy)*e;bins[Math.min(11,Math.max(0,Math.floor(x/W*12)))]++;g.fillStyle=e>.6?['#0ae448','#fffce1','#ffb454'][q.k]:'#8d9290';g.beginPath();g.arc(x,y,3,0,6.3);g.fill()}
 bins.forEach((b,i)=>{const h=b*H*.022;g.fillStyle='#ffffff2a';g.fillRect(i*W/12+3,H*.95-h,W/12-6,h)})},
human(c,g,W,H,t,S){BG(g,W,H);const p=(t/5000)%1,u=p<.4?p/.4*.5:p<.6?.5:.5+(p-.6)/.4*.5,y=H*.5,xs=[W*.18,W*.5,W*.82],s=W*.07,rv=p>.4&&p<.6;g.strokeStyle='#ffffff22';g.lineWidth=2;g.beginPath();g.moveTo(xs[0],y);g.lineTo(xs[2],y);g.stroke();
 RR(g,xs[0]-W*.08,y-W*.08,W*.16,W*.16,10,'#121412','#0ae448');RR(g,xs[2]-W*.08,y-W*.08,W*.16,W*.16,10,'#121412',u>.95?'#0ae448':'#ffffff22');
 g.save();g.translate(xs[1],y);g.rotate(.785);g.fillStyle='#121412';g.strokeStyle=rv?'#ffb454':'#ffffff33';g.fillRect(-s,-s,2*s,2*s);g.strokeRect(-s,-s,2*s,2*s);g.restore();
 if(rv){g.strokeStyle='#ffb454';g.globalAlpha=1-(p-.4)/.2;g.beginPath();g.arc(xs[1],y,W*.09+(p-.4)*W*.5,0,6.3);g.stroke();g.globalAlpha=1}
 g.fillStyle='#0ae448';g.beginPath();g.arc(xs[0]+(xs[2]-xs[0])*u,y,6,0,6.3);g.fill();g.font=`${W*.032}px sans-serif`;g.textAlign='center';g.fillStyle='#8d9290';g.fillText('Auto',xs[0],y+W*.13);g.fillText('Auto',xs[2],y+W*.13);g.fillStyle='#ffb454';g.fillText('Human',xs[1],y+W*.13);g.textAlign='left'},
learn(c,g,W,H,t,S){BG(g,W,H);const p=(t/7000)%1,n=6,sw=W*.12,x0=W*.1,base=H*.85;g.globalAlpha=p>.94?1-(p-.94)/.06:1;
 for(let i=0;i<n;i++){const h=(i+1)*H*.1*ez(cl(p*7-i*.8));g.fillStyle=i==n-1?'#0ae448':'#ffffff22';g.fillRect(x0+i*sw*1.1,base-h,sw,h)}
 const q=cl(p/.9)*(n-1),i=Math.floor(q),f=q-i,h=(i+1)*H*.1,h2=(Math.min(n-1,i+1)+1)*H*.1;g.fillStyle='#fffce1';g.beginPath();g.arc(x0+(i+f)*sw*1.1+sw/2,base-(h+(h2-h)*f)-8,6,0,6.3);g.fill();g.globalAlpha=1},
portrait(c,g,W,H,t,S){if(!S.p){if(!IM.naturalWidth)return;const o=document.createElement('canvas'),s=3,w=Math.floor(W/s),h=Math.floor(H/s);o.width=w;o.height=h;const x=o.getContext('2d');x.drawImage(IM,0,0,w,h);const D=x.getImageData(0,0,w,h).data;S.p=[];
  for(let j=0;j<h;j++)for(let i=0;i<w;i++){const k=(j*w+i)*4;if(D[k+3]>140)S.p.push({hx:i*s,hy:j*s,x:RM?i*s:Math.random()*W,y:RM?j*s:Math.random()*H,vx:0,vy:0,l:(D[k]+D[k+1]+D[k+2])/765})}}
 g.clearRect(0,0,W,H);const sw=(t/20)%(H+120)-60,px=c._px??-999,py=c._py??-999;
 for(const p of S.p){const dx=p.x-px,dy=p.y-py,d2=dx*dx+dy*dy;if(d2<6400){const d=Math.sqrt(d2)||1,F=(80-d)/80*5;p.vx+=dx/d*F;p.vy+=dy/d*F}
  p.vx+=(p.hx-p.x)*.045;p.vy+=(p.hy-p.y)*.045;p.vx*=.86;p.vy*=.86;p.x+=p.vx;p.y+=p.vy;const near=Math.abs(p.hy-sw)<26,sp=Math.abs(p.vx)+Math.abs(p.vy);
  g.fillStyle=near?'#0ae448':sp>1.2?'#fff':`rgb(${190+p.l*65|0},${195+p.l*60|0},${190+p.l*50|0})`;g.globalAlpha=near?1:.4+p.l*.6;g.fillRect(p.x,p.y,2,2)}g.globalAlpha=1}};
$$('canvas[data-s]').forEach(c=>{c._t=c.dataset.s;live(c)});
const pt=$('#ptc');pt._t='portrait';live(pt);pt.addEventListener('pointermove',e=>{const b=pt.getBoundingClientRect();pt._px=(e.clientX-b.left)*pt.clientWidth/b.width;pt._py=(e.clientY-b.top)*pt.clientHeight/b.height});pt.addEventListener('pointerleave',()=>pt._px=-999);
live($('#pv'));{const hb=$('#hb');hb._t='net';live(hb)}live($('#ri'));
(function L(t){requestAnimationFrame(L);for(const c of LV){if(!c._v)continue;const W=c.clientWidth,H=c.clientHeight;if(!W||!H||!SC[c._t])continue;const d=Math.min(2,devicePixelRatio||1);
 if(c.width!==Math.round(W*d)||c.height!==Math.round(H*d)||c._pt!==c._t){c.width=Math.round(W*d);c.height=Math.round(H*d);c._s={};c._pt=c._t;c._d=0}
 if((RM&&c._d>2)||(c._t==='portrait'&&!IM.naturalWidth))continue;c._d++;const g=c._g;g.setTransform(d,0,0,d,0,0);SC[c._t](c,g,W,H,t,c._s)}})(0);
const SDB='<div class="sd"><b class="a"></b><b></b><b></b><b style="width:60%"></b></div>',BAR=x=>`<div class="tb"><i></i><i></i><i></i><span>${x}</span></div>`,CUR='<div class="cu"><svg viewBox="0 0 22 22" width="22" height="22"><path d="M3 2l14 7-6 2-2 6z" fill="#fff" stroke="#000" stroke-width="1.2" stroke-linejoin="round"/></svg></div>';
const bars=n=>Array.from({length:n},(_,i)=>`<b style="--i:${i};width:${[92,80,88,60,84,70,90,50,76][i%9]}%"></b>`).join('');
$('#d1').innerHTML=`<div class="sc"><div class="win">${BAR('Price import')}${SDB}<div class="mn"><div class="dz" data-a="dz"><span>Drop an Excel file here</span><em class="fn">price.xlsx</em></div><button class="bt go" data-a="go">Import</button><div class="pg"><i></i></div>
<div class="rs"><h4>Ready structure</h4><button class="bt g" data-a="rs">New import</button>${['A','B','C'].map((k,i)=>`<div class="gp" style="--i:${i}"><u>Category ${k}<s>#${101+i}</s></u><p><i style="--w:${60+i*18}px"></i><span>${['1 200','3 400','2 000'][i]}</span></p><p><i style="--w:${90-i*14}px"></i><span>${['2 500','900','2 800'][i]}</span></p></div>`).join('')}</div></div></div><div class="ff" data-a="file">price.xlsx</div>${CUR}</div>`;
$('#d2').innerHTML=`<div class="sc"><div class="win">${BAR('Document import')}${SDB}<div class="mn"><div class="pgz"><em></em><b class="t"></b>${bars(9)}<div class="sn"></div></div><button class="bt cv2" data-a="conv">Convert</button><button class="bt im2" data-a="imp">Import</button>
<div class="js">${['{','  "title": "…",','  "blocks": [','    { "type": "heading" },','    { "type": "text" },','    { "type": "table",','      "rows": [ … ] }','  ]','}'].map((l,i)=>`<div style="--i:${i}">${l.replace(/ /g,'&nbsp;')}</div>`).join('')}</div>
<div class="ok"><h4>✓ Document ready</h4><button class="bt g" data-a="rs2">Reset</button><div class="dc"><b class="t" style="--i:0"></b>${bars(8)}</div></div></div></div>${CUR}</div>`;
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
function demo(root,script){const sc=root.querySelector('.sc'),cu=sc.querySelector('.cu'),W=600;let k=1,vis=false,cx=60,cy=330;
 const fit=()=>{k=root.clientWidth/W;sc.style.transform=`scale(${k})`};new ResizeObserver(fit).observe(root);fit();
 new IntersectionObserver(e=>vis=e[0].isIntersecting).observe(root);
 const gate=async()=>{while(!vis||document.hidden)await sleep(200)};
 const at=n=>{const r=sc.querySelector(`[data-a=${n}]`).getBoundingClientRect(),b=sc.getBoundingClientRect();return[(r.left+r.width/2-b.left)/k,(r.top+r.height/2-b.top)/k]};
 const put=(x,y)=>{cx=x;cy=y;cu.style.transform=`translate(${x}px,${y}px)`;if(root._f){root._f.style.left=x-40+'px';root._f.style.top=y-15+'px'}};
 const move=async(to,ms=700)=>{await gate();const[x,y]=typeof to==='string'?at(to):to,x0=cx,y0=cy,dx=x-x0,dy=y-y0,L=Math.hypot(dx,dy)||1,arc=Math.min(50,L*.15),t0=performance.now();
  return new Promise(res=>{(function f(n){const u=Math.min(1,(n-t0)/ms),e=u<.5?2*u*u:1-Math.pow(-2*u+2,2)/2,s=Math.sin(u*Math.PI)*arc;put(x0+dx*e-dy/L*s,y0+dy*e+dx/L*s);u<1?requestAnimationFrame(f):res()})(t0)})};
 const press=async()=>{cu.classList.add('p');await sleep(150);cu.classList.remove('p')};
 const api={set:s=>root.dataset.s=s,move,press,at,sleep:async ms=>{await gate();await sleep(ms)},click:async n=>{await move(n,650);await press()},root};
 put(60,330);if(RM){root.dataset.s=3;cu.style.display='none';return}
 (async()=>{for(;;)await script(api)})()}
const ff=$('#d1 .ff');
demo($('#d1'),async a=>{ff.style.left=ff.style.top='';a.set(0);await a.move([60,330],1);await a.sleep(1100);await a.move('file',700);await a.press();$('#d1')._f=ff;await a.move('dz',850);$('#d1')._f=null;a.set(1);await a.sleep(650);await a.click('go');a.set(2);await a.sleep(1700);a.set(3);await a.sleep(3400);await a.click('rs');a.set(0);ff.style.left=ff.style.top='';await a.move([60,330],800);await a.sleep(600)});
demo($('#d2'),async a=>{a.set(0);await a.move([60,330],1);await a.sleep(1100);await a.click('conv');a.set(1);await a.sleep(2500);a.set(2);await a.sleep(700);await a.click('imp');a.set(3);await a.sleep(3400);await a.click('rs2');a.set(0);await a.move([60,330],800);await a.sleep(600)});
