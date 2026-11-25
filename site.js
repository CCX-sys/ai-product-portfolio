const dialog = document.querySelector('#lightbox');
document.addEventListener('click', event => {
  const pick = event.target.closest('[data-pick]');
  if (pick) {
    const gallery = pick.closest('[data-gallery]');
    const image = gallery.querySelector('img');
    image.src = pick.dataset.img; image.alt = pick.dataset.title;
    image.width = Number(pick.dataset.w); image.height = Number(pick.dataset.h);
    gallery.querySelector('.zoom').setAttribute('aria-label','放大'+image.alt);
    gallery.querySelector('.image-stage').classList.toggle('tall',image.height/image.width>1.2);
    gallery.querySelectorAll('[data-pick]').forEach(b=>b.setAttribute('aria-pressed',String(b===pick)));
  }
  const zoom = event.target.closest('[data-zoom]');
  if (zoom) {
    const image=zoom.querySelector('img'), full=dialog.querySelector('img');
    dialog.querySelector('#zoom-title').textContent=image.alt;
    full.src=image.currentSrc || image.src; full.alt=image.alt;
    dialog.showModal();
  }
  if (event.target.closest('[data-close]') || event.target===dialog) dialog.close();
});
const toc=document.querySelector('.side details');
if (toc) {
  const mobile=matchMedia('(max-width:660px)');
  const update=()=>toc.open=!mobile.matches; update(); mobile.addEventListener('change',update);
  toc.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{if(mobile.matches)toc.open=false;}));
  const sections=[...document.querySelectorAll('.caseSection')];
  const links=[...toc.querySelectorAll('a')];
  let scheduled=false;
  function mark(){let current=0;sections.forEach((s,i)=>{if(s.getBoundingClientRect().top<innerHeight*.34)current=i;});links.forEach((a,i)=>{a.classList.toggle('current',i===current);if(i===current)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current');});scheduled=false;}
  addEventListener('scroll',()=>{if(!scheduled){scheduled=true;requestAnimationFrame(mark);}}, {passive:true});mark();
}
const imageArea = dialog.querySelector('.lightbody');
const sizeButton = dialog.querySelector('[data-size]');
sizeButton.addEventListener('click', () => {
  const original = imageArea.classList.toggle('original');
  sizeButton.setAttribute('aria-pressed', String(original));
  sizeButton.textContent = original ? '适应窗口' : '原始尺寸';
  if (!original) imageArea.scrollTo(0, 0);
});
dialog.addEventListener('close', () => {
  imageArea.classList.remove('original');
  sizeButton.setAttribute('aria-pressed', 'false');
  sizeButton.textContent = '原始尺寸';
  imageArea.scrollTo(0, 0);
});
