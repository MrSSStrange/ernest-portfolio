// Connection paths use layout coordinates, so entrance transforms never detach them.
const aiStack=document.getElementById('ai-stack');
const aiTopology=aiStack.querySelector('.ai-topology');
const aiGrid=aiStack.querySelector('.ai-tool-grid');
const aiHub=aiStack.querySelector('.ai-hub');
const aiSvg=aiStack.querySelector('.ai-connections');
const aiCells=[...aiStack.querySelectorAll('.ai-tool-cell')];
const aiToggle=aiStack.querySelector('.ai-motion-toggle');
const aiReduced=matchMedia('(prefers-reduced-motion: reduce)');
const aiFinePointer=matchMedia('(hover: hover) and (pointer: fine)');
let aiUserPaused=false,aiLayoutFrame=0;
function aiDrawConnections(){
 aiLayoutFrame=0;const width=aiTopology.clientWidth,height=aiTopology.clientHeight;if(!width||!height)return;
 aiSvg.setAttribute('viewBox',`0 0 ${width} ${height}`);aiSvg.replaceChildren();
 const sx=aiHub.offsetLeft+aiHub.offsetWidth/2,sy=aiHub.offsetTop+aiHub.offsetHeight;
 aiCells.forEach((cell,index)=>{const x=aiGrid.offsetLeft+cell.offsetLeft+cell.offsetWidth/2,y=aiGrid.offsetTop+cell.offsetTop,mid=sy+(y-sy)*.58;
  const d=`M ${sx} ${sy} C ${sx} ${mid}, ${x} ${mid}, ${x} ${y}`;
  ['ai-wire','ai-wire-pulse'].forEach(name=>{const path=document.createElementNS('http://www.w3.org/2000/svg','path');path.setAttribute('d',d);path.setAttribute('class',name);path.setAttribute('pathLength','100');path.style.setProperty('--i',index);aiSvg.append(path)});
 });
}
function aiScheduleLayout(){if(!aiLayoutFrame)aiLayoutFrame=requestAnimationFrame(aiDrawConnections)}
new ResizeObserver(aiScheduleLayout).observe(aiTopology);
new IntersectionObserver(entries=>{aiStack.classList.toggle('is-in-view',entries[0].isIntersecting)},{threshold:.08}).observe(aiStack);
function aiRefreshMotion(){
 const paused=aiUserPaused||aiReduced.matches;aiStack.classList.toggle('motion-paused',paused);
 aiToggle.disabled=aiReduced.matches;aiToggle.setAttribute('aria-pressed',String(paused));
 aiToggle.querySelector('[data-ai-motion-label]').textContent=aiReduced.matches?'Motion reduced':paused?'Play motion':'Pause motion';
 aiToggle.querySelector('.ai-pause-glyph').textContent=paused?'▷':'Ⅱ';
 if(paused)aiStack.querySelectorAll('.ai-tool').forEach(card=>{card.style.setProperty('--tilt-x','0deg');card.style.setProperty('--tilt-y','0deg')});
}
aiToggle.addEventListener('click',()=>{aiUserPaused=!aiUserPaused;aiRefreshMotion()});
aiReduced.addEventListener('change',aiRefreshMotion);aiRefreshMotion();
document.addEventListener('visibilitychange',()=>aiStack.classList.toggle('is-suspended',document.hidden));
aiStack.classList.toggle('is-suspended',document.hidden);
aiStack.querySelectorAll('.ai-tool').forEach(card=>{
 let frame=0,lastX=0,lastY=0;
 card.addEventListener('pointermove',event=>{if(aiReduced.matches||aiUserPaused||!aiFinePointer.matches)return;lastX=event.clientX;lastY=event.clientY;
  if(!frame)frame=requestAnimationFrame(()=>{frame=0;const r=card.getBoundingClientRect();card.style.setProperty('--tilt-x',`${-(lastY-r.top-r.height/2)/r.height*10}deg`);card.style.setProperty('--tilt-y',`${(lastX-r.left-r.width/2)/r.width*10}deg`)});
 });
 card.addEventListener('pointerleave',()=>{cancelAnimationFrame(frame);frame=0;card.style.setProperty('--tilt-x','0deg');card.style.setProperty('--tilt-y','0deg')});
});
if(window.gsap&&window.ScrollTrigger){
 gsap.registerPlugin(ScrollTrigger);
 gsap.matchMedia().add('(prefers-reduced-motion: no-preference)',()=>{
  gsap.from('#ai-stack-title,.ai-stack-intro',{y:40,opacity:0,duration:.9,stagger:.12,ease:'power3.out',clearProps:'transform,opacity',scrollTrigger:{trigger:aiStack,start:'top 85%'}});
  gsap.from(aiCells,{y:48,opacity:0,scale:.94,duration:.85,stagger:.1,ease:'power3.out',clearProps:'transform,opacity',scrollTrigger:{trigger:aiGrid,start:'top 92%'}});
 });
}
aiScheduleLayout();document.fonts.ready.then(aiScheduleLayout);
