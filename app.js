
// Simple theme toggle
const themeToggle = document.getElementById('themeToggle');
if (themeToggle){
  const current = localStorage.getItem('theme') || 'dark';
  if (current === 'light') document.body.classList.add('light');
  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light');
    localStorage.setItem('theme', document.body.classList.contains('light') ? 'light' : 'dark');
  });
}

// Render product cards
const grid = document.getElementById('productGrid');
const searchInput = document.getElementById('searchInput');
const pills = document.querySelectorAll('.pill');

function money(idr){ return new Intl.NumberFormat('id-ID', { style:'currency', currency:'IDR', maximumFractionDigits:0 }).format(idr); }

function cardTemplate(p){
  return `
  <article class="card" data-cat="${p.category}" data-title="${p.title.toLowerCase()}">
    ${p.badge ? `<div class="badge">${p.badge}</div>` : ''}
    <div class="title">${p.title}</div>
    <p class="desc">${p.desc}</p>
    <div class="price">${money(p.price)}</div>
    <div class="cta">
      <a class="btn btn-primary" href="https://t.me/username?start=${encodeURIComponent(p.id)}">${p.cta}</a>
      <a class="btn btn-ghost" href="#faq">Detail</a>
    </div>
  </article>`;
}

function render(products){
  grid.innerHTML = products.map(cardTemplate).join('');
}

render(window.PRODUCTS);

// Filtering
let activeCat = 'all';
pills.forEach(p=>p.addEventListener('click', () => {
  pills.forEach(x=>x.classList.remove('active'));
  p.classList.add('active');
  activeCat = p.dataset.cat;
  applyFilters();
}));

searchInput && searchInput.addEventListener('input', applyFilters);

function applyFilters(){
  const q = (searchInput?.value || '').trim().toLowerCase();
  const cards = Array.from(grid.children);
  cards.forEach(card => {
    const title = card.dataset.title;
    const cat = card.dataset.cat;
    const matchCat = (activeCat === 'all') || (cat === activeCat);
    const matchQuery = !q || title.includes(q);
    card.style.display = (matchCat && matchQuery) ? '' : 'none';
  });
}
