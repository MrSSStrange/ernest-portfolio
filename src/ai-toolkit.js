// Connection paths use layout coordinates, so entrance transforms never detach them.
const aiStack=document.getElementById('ai-stack');
const aiTopology=aiStack.querySelector('.ai-topology');
const aiGrid=aiStack.querySelector('.ai-tool-grid');
const aiHub=aiStack.querySelector('.ai-hub');
const aiSvg=aiStack.querySelector('.ai-connections');
const aiCells=[...aiStack.querySelectorAll('.ai-tool-cell')];
const aiReduced=matchMedia('(prefers-reduced-motion: reduce)');
const aiFinePointer=matchMedia('(hover: hover) and (pointer: fine)');
let aiLayoutFrame=0;
function aiDrawConnections(){
 aiLayoutFrame=0;const width=aiTopology.clientWidth,height=aiTopology.clientHeight;if(!width||!height)return;
 aiSvg.setAttribute('viewBox',`0 0 ${width} ${height}`);aiSvg.replaceChildren();
 const sx=aiHub.offsetLeft+aiHub.offsetWidth/2,sy=aiHub.offsetTop+aiHub.offsetHeight;
 aiCells.forEach((cell,index)=>{const x=aiGrid.offsetLeft+cell.offsetLeft+cell.offsetWidth/2,y=aiGrid.offsetTop+cell.offsetTop,mid=sy+(y-sy)*.58;
  const d=`M ${sx} ${sy} C ${sx} ${mid}, ${x} ${mid}, ${x} ${y}`;
  ['ai-wire','ai-wire-pulse','ai-wire-back'].forEach(name=>{const path=document.createElementNS('http://www.w3.org/2000/svg','path');path.setAttribute('d',d);path.setAttribute('class',name);path.setAttribute('pathLength','100');path.style.setProperty('--i',index);aiSvg.append(path)});
 });
}
function aiScheduleLayout(){if(!aiLayoutFrame)aiLayoutFrame=requestAnimationFrame(aiDrawConnections)}
new ResizeObserver(aiScheduleLayout).observe(aiTopology);
// Signals run continuously; they only pause while off-screen or in a hidden tab to save power.
new IntersectionObserver(entries=>{aiStack.classList.toggle('is-in-view',entries[0].isIntersecting)},{threshold:.08}).observe(aiStack);
document.addEventListener('visibilitychange',()=>aiStack.classList.toggle('is-suspended',document.hidden));
aiStack.classList.toggle('is-suspended',document.hidden);
aiStack.querySelectorAll('.ai-tool').forEach(card=>{
 let frame=0,lastX=0,lastY=0;const reset=()=>{['--tilt-x','--tilt-y'].forEach(v=>card.style.setProperty(v,'0deg'));['--mx','--my'].forEach(v=>card.style.setProperty(v,'0px'))};
 card.addEventListener('pointermove',event=>{if(aiReduced.matches||!aiFinePointer.matches)return;lastX=event.clientX;lastY=event.clientY;
  if(!frame)frame=requestAnimationFrame(()=>{frame=0;const r=card.getBoundingClientRect(),nx=(lastX-r.left-r.width/2)/r.width,ny=(lastY-r.top-r.height/2)/r.height;
   card.style.setProperty('--tilt-x',`${-ny*10}deg`);card.style.setProperty('--tilt-y',`${nx*10}deg`);card.style.setProperty('--mx',`${nx*12}px`);card.style.setProperty('--my',`${ny*12}px`)});
 });
 card.addEventListener('pointerleave',()=>{cancelAnimationFrame(frame);frame=0;reset()});
});
if(window.gsap&&window.ScrollTrigger){
 gsap.registerPlugin(ScrollTrigger);
 gsap.matchMedia().add('(prefers-reduced-motion: no-preference)',()=>{
  gsap.from('#ai-stack-title,.ai-stack-intro',{y:40,opacity:0,duration:.9,stagger:.12,ease:'power3.out',clearProps:'transform,opacity',scrollTrigger:{trigger:aiStack,start:'top 85%'}});
  gsap.from('.ai-practice-card',{y:40,opacity:0,duration:.8,stagger:.12,ease:'power3.out',clearProps:'transform,opacity',scrollTrigger:{trigger:'.ai-practice',start:'top 88%'}});
  gsap.from(aiCells,{y:48,opacity:0,scale:.94,duration:.85,stagger:.1,ease:'power3.out',clearProps:'transform,opacity',scrollTrigger:{trigger:aiGrid,start:'top 92%'}});
 });
}
aiScheduleLayout();document.fonts.ready.then(aiScheduleLayout);
