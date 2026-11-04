const CERTIFICATES=__CERTIFICATES__;
const portfolioOrigins=new WeakMap();
let portfolioModalCount=0,portfolioPreviousOverflow='';
function portfolioCloseMenu(){
 document.querySelector('header').classList.remove('nav-open');
 const toggle=document.querySelector('.nav-toggle');toggle.setAttribute('aria-expanded','false');toggle.textContent='Menu';
}
function portfolioOpenDialog(dialog,origin){
 if(dialog.open)return;
 portfolioCloseMenu();portfolioOrigins.set(dialog,origin||document.activeElement);
 if(!portfolioModalCount)portfolioPreviousOverflow=document.documentElement.style.overflow;
 dialog.showModal();portfolioModalCount++;document.documentElement.style.overflow='hidden';dialog.scrollTop=0;
 dialog.querySelector('[data-close-dialog],#rx')?.focus({preventScroll:true});
}
document.querySelectorAll('dialog').forEach(dialog=>{
 dialog.addEventListener('close',()=>{portfolioModalCount=Math.max(0,portfolioModalCount-1);if(!portfolioModalCount)document.documentElement.style.overflow=portfolioPreviousOverflow;portfolioOrigins.get(dialog)?.focus({preventScroll:true});});
 dialog.addEventListener('click',event=>{if(event.target!==dialog)return;const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close();});
 dialog.querySelectorAll('[data-close-dialog]').forEach(button=>button.addEventListener('click',()=>dialog.close()));
});
document.querySelectorAll('[data-open-cv]').forEach(link=>link.addEventListener('click',event=>{event.preventDefault();portfolioOpenDialog(document.getElementById('cv-dialog'),link);}));
const portfolioPdfBytes=Uint8Array.from(atob(A.cvPdf.split(',')[1]),character=>character.charCodeAt(0));
const portfolioPdfUrl=URL.createObjectURL(new Blob([portfolioPdfBytes],{type:'application/pdf'}));
document.querySelectorAll('[data-download-cv]').forEach(link=>{link.href=portfolioPdfUrl;link.download='Ernest-Muzafarov-CV.pdf';});
let portfolioCertificate=null;
function portfolioCertificateMode(mode){
 if(!portfolioCertificate)return;
 const translated=mode==='translation'&&portfolioCertificate.translation;
 document.getElementById('certificate-full-image').hidden=translated;
 document.getElementById('certificate-translation').hidden=!translated;
 document.querySelectorAll('[data-certificate-tab]').forEach(button=>{button.setAttribute('aria-pressed',String(button.dataset.certificateTab===(translated?'translation':'original')));button.hidden=button.dataset.certificateTab==='translation'&&!portfolioCertificate.translation;});
}
document.querySelectorAll('[data-certificate]').forEach(button=>button.addEventListener('click',()=>{
 const certificate=CERTIFICATES.find(c=>c.id===button.dataset.certificate);if(!certificate)return;portfolioCertificate=certificate;
 document.getElementById('certificate-dialog-title').textContent='Udemy certificate · '+(certificate.id==='webdev'?'Web Development':'JavaScript');
 const image=document.getElementById('certificate-full-image');image.src=A[certificate.asset];image.alt=certificate.title+' — certificate awarded to '+certificate.recipient+' on '+certificate.date;
 const download=document.getElementById('certificate-download');download.href=A[certificate.asset];download.download=certificate.number+'.jpg';
 document.querySelectorAll('[data-certificate-field]').forEach(field=>{const key=field.dataset.certificateField;field.textContent=key==='hours'?certificate.hours+' total hours':certificate[key];});
 portfolioCertificateMode(button.dataset.certificateMode||'original');portfolioOpenDialog(document.getElementById('certificate-dialog'),button);
}));
document.querySelectorAll('[data-certificate-tab]').forEach(button=>button.addEventListener('click',()=>portfolioCertificateMode(button.dataset.certificateTab)));
document.querySelector('.nav-toggle').addEventListener('click',event=>{const open=document.querySelector('header').classList.toggle('nav-open');event.currentTarget.setAttribute('aria-expanded',String(open));event.currentTarget.textContent=open?'Close menu':'Menu';});
document.querySelectorAll('header nav a').forEach(link=>link.addEventListener('click',portfolioCloseMenu));
document.addEventListener('keydown',event=>{if(event.key==='Escape')portfolioCloseMenu();});
document.fonts.ready.then(()=>{if(window.ScrollTrigger)ScrollTrigger.refresh();});
window.addEventListener('load',()=>{if(window.ScrollTrigger)ScrollTrigger.refresh();},{once:true});
