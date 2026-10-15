// Basic interactions: before/after slider, testimonial carousel, form submission feedback, year update

document.addEventListener('DOMContentLoaded', function(){
  // Year in footer
  const year = new Date().getFullYear();
  document.getElementById('year').textContent = year;

  // BEFORE/AFTER SLIDER
  (function(){
    const slider = document.getElementById('ba-slider');
    if(!slider) return;
    const after = slider.querySelector('.ba-after');
    const handle = slider.querySelector('.ba-handle');

    let dragging = false;
    const update = (clientX) => {
      const rect = slider.getBoundingClientRect();
      let pct = (clientX - rect.left) / rect.width;
      pct = Math.max(0, Math.min(1, pct));
      const clip = pct * 100;
      after.style.clipPath = `inset(0 ${100-clip}% 0 0)`;
      handle.style.left = (pct*100) + '%';
      handle.setAttribute('aria-valuenow', Math.round(pct*100));
    };

    handle.addEventListener('mousedown', (e) => { dragging = true; e.preventDefault(); });
    window.addEventListener('mouseup', () => dragging = false);
    window.addEventListener('mousemove', (e) => { if(dragging) update(e.clientX); });

    // Touch
    handle.addEventListener('touchstart', () => dragging = true);
    window.addEventListener('touchend', () => dragging = false);
    window.addEventListener('touchmove', (e) => { if(dragging && e.touches.length) update(e.touches[0].clientX); });

    // Keyboard accessibility
    handle.addEventListener('keydown', (e) => {
      const step = 0.05;
      let val = parseFloat(handle.getAttribute('aria-valuenow'))/100 || 0.5;
      if(e.key === 'ArrowLeft' || e.key === 'ArrowDown'){ val = Math.max(0, val-step); update(slider.getBoundingClientRect().left + val*slider.getBoundingClientRect().width); }
      if(e.key === 'ArrowRight' || e.key === 'ArrowUp'){ val = Math.min(1, val+step); update(slider.getBoundingClientRect().left + val*slider.getBoundingClientRect().width); }
    });

    // Set initial
    update(slider.getBoundingClientRect().left + slider.getBoundingClientRect().width * 0.5);
  })();

  // TESTIMONIAL CAROUSEL (simple auto-rotate with pause on hover)
  (function(){
    const carousel = document.getElementById('testimonial-carousel');
    if(!carousel) return;
    const items = carousel.querySelectorAll('.testimonial');
    let idx = 0;
    const show = (i) => {
      items.forEach((it, n) => it.classList.toggle('active', n===i));
    };
    show(idx);
    let interval = setInterval(()=>{ idx = (idx+1)%items.length; show(idx); }, 6000);
    carousel.addEventListener('mouseenter', ()=> clearInterval(interval));
    carousel.addEventListener('mouseleave', ()=> { interval = setInterval(()=>{ idx = (idx+1)%items.length; show(idx); }, 6000); });
  })();

  // FORM HANDLING (Netlify-friendly) — shows a friendly confirmation and resets form
  (function(){
    const form = document.getElementById('quote-form');
    const feedback = document.getElementById('form-feedback');
    if(!form) return;

    form.addEventListener('submit', function(e){
      // Let Netlify handle POST if deployed; show client-side confirmation here for the showroom
      e.preventDefault();
      const submitBtn = form.querySelector('button[type="submit"]');
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending…';

      // Simple client-side validation (required fields)
      const name = form.name.value.trim();
      const phone = form.phone.value.trim();
      const postcode = form.postcode.value.trim();
      const service = form.service.value;

      if(!name || !phone || !postcode || !service){
        feedback.textContent = 'Please complete the required fields (name, phone, postcode and service).';
        submitBtn.disabled = false;
        submitBtn.textContent = 'Send request';
        return;
      }

      // Simulate submission (replace this with your own POST to a server or service when live)
      setTimeout(() => {
        form.reset();
        submitBtn.disabled = false;
        submitBtn.textContent = 'Send request';
        feedback.innerHTML = 'Thanks — your request is sent. Calum will get back to you shortly. <strong>We’ll reply within 48 hours if not sooner.</strong>';
      }, 900);
    });
  })();

  // Smooth in-page link scrolling for accessibility
  (function(){
    document.querySelectorAll('a[href^="#"]').forEach(a=>{
      a.addEventListener('click', function(e){
        const href = this.getAttribute('href');
        if(href.length>1){
          e.preventDefault();
          const el = document.querySelector(href);
          if(el) el.scrollIntoView({behavior:'smooth',block:'start'});
        }
      });
    });
  })();

});
