// RPInfoCare — script.js
document.addEventListener('DOMContentLoaded',function(){
  const navToggle = document.getElementById('navToggle');
  const mainNav = document.getElementById('mainNav');
  // toggle mobile nav by adding/removing `.open` for CSS-driven animation
  if(navToggle){
    navToggle.setAttribute('aria-expanded','false');
    navToggle.addEventListener('click', ()=>{
      if(mainNav){
        const isOpen = mainNav.classList.toggle('open');
        navToggle.setAttribute('aria-expanded', String(isOpen));
        navToggle.textContent = isOpen ? '✕' : '☰';
        navToggle.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
        document.body.classList.toggle('nav-open', isOpen);
      }
    });
  }
  if(mainNav){
    mainNav.querySelectorAll('a').forEach(link=>{
      link.addEventListener('click', ()=>{
        if(mainNav.classList.contains('open')){
          mainNav.classList.remove('open');
          navToggle.textContent = '☰';
          navToggle.setAttribute('aria-expanded', 'false');
          navToggle.setAttribute('aria-label', 'Open navigation');
          document.body.classList.remove('nav-open');
        }
      });
    });
  }
  window.addEventListener('resize', ()=>{
    if(window.innerWidth > 860 && mainNav?.classList.contains('open')){
      mainNav.classList.remove('open');
      navToggle?.setAttribute('aria-expanded','false');
      if(navToggle) navToggle.textContent = '☰';
      navToggle?.setAttribute('aria-label','Open navigation');
      document.body.classList.remove('nav-open');
    }
  });

  // simple counter animation
  const statEls = document.querySelectorAll('.stat-value');
  statEls.forEach(el=>{
    const val = el.textContent.trim();
    if(val.endsWith('+')){
      const num = parseInt(val.replace('+',''))||0;
      let start=0; const dur=1200; const stepTime=Math.max(20,Math.floor(dur/num));
      const timer = setInterval(()=>{
        start+=1; el.textContent = start+"+";
        if(start>=num) clearInterval(timer);
      },stepTime);
    }
  });

  // simple smooth anchors
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click',function(e){
      const href = this.getAttribute('href');
      if(href.length>1){
        e.preventDefault();
        document.querySelector(href)?.scrollIntoView({behavior:'smooth',block:'start'});
      }
    });
  });
});
