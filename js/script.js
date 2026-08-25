const menu=document.getElementById('menu');
const navLinks=document.getElementById('navLinks');
if(menu&&navLinks){
  menu.addEventListener('click',()=>{navLinks.classList.toggle('open');menu.textContent=navLinks.classList.contains('open')?'×':'☰'});
  document.querySelectorAll('.nav-links a').forEach(link=>link.addEventListener('click',()=>{if(window.innerWidth<=1050){navLinks.classList.remove('open');menu.textContent='☰'}}));
}
document.querySelectorAll('.dropdown-toggle').forEach(toggle=>toggle.addEventListener('click',e=>{if(window.innerWidth<=1050){e.preventDefault();toggle.parentElement.querySelector('.dropdown-menu')?.classList.toggle('open')}}));
const filterButtons=document.querySelectorAll('.filter');
const collectionItems=document.querySelectorAll('.collection-item');
filterButtons.forEach(button=>button.addEventListener('click',()=>{filterButtons.forEach(b=>b.classList.remove('active'));button.classList.add('active');const filter=button.dataset.filter;collectionItems.forEach(item=>item.classList.toggle('hidden',filter!=='all'&&item.dataset.category!==filter));}));
const modal=document.getElementById('modal');
if(modal){const title=document.getElementById('modalTitle'),text=document.getElementById('modalText'),close=document.getElementById('modalClose');document.querySelectorAll('.details').forEach(link=>link.addEventListener('click',e=>{e.preventDefault();title.textContent=link.dataset.title;text.textContent=link.dataset.text;modal.classList.add('open');modal.setAttribute('aria-hidden','false')}));const closeModal=()=>{modal.classList.remove('open');modal.setAttribute('aria-hidden','true')};close?.addEventListener('click',closeModal);modal.addEventListener('click',e=>{if(e.target===modal)closeModal()});document.addEventListener('keydown',e=>{if(e.key==='Escape')closeModal()});}
const contactForm=document.getElementById('contactForm');
if(contactForm)contactForm.addEventListener('submit',e=>{e.preventDefault();const name=document.getElementById('name').value.trim();const email=document.getElementById('email').value.trim();const subject=document.getElementById('subject').value;const message=document.getElementById('message').value.trim();const body=`Name: ${name}\nEmail: ${email}\nSubject: ${subject}\n\nMessage:\n${message}`;window.location.href=`mailto:arthur.bukenya@uppc.go.ug?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`});
const newsletterForm=document.getElementById('newsletterForm');
if(newsletterForm)newsletterForm.addEventListener('submit',e=>{e.preventDefault();const email=document.getElementById('newsletterEmail').value.trim();window.location.href=`mailto:arthur.bukenya@uppc.go.ug?subject=Newsletter%20Subscription&body=${encodeURIComponent('Please add this email to the museum newsletter: '+email)}`});
const year=document.getElementById('year');if(year)year.textContent=new Date().getFullYear();
