export default async function decorate(block) {

  const props = [...block.children];
  const style = props[0]?.textContent?.trim() || 'default';
  const tag = props[1]?.textContent?.trim() || '';
 // Remove all inner content
  block.innerHTML = '';
  // Add the filters and grid divs
  block.innerHTML = `
    <div class="filters-row">
    <div class="filters-label">Quick filter:</div>
    <div class="filters" id="filters"></div>
  </div>
  <div class="grid" id="productGrid"></div>
  `; let products = [];
    let allFeatureTags = [];
    let allTags = [];
    const filtersDiv = document.getElementById('filters');
    const grid = document.getElementById('productGrid');

    function formatTag(tag, type) {
      let prefix = '';
      if (type === 'product') prefix = 'prod:category/';
      if (type === 'feature') prefix = 'prod:category/credit-card/';
      if (type === 'offer') prefix = 'prod:offers/';
      return tag.replace(prefix, '')
                .replace(/-/g, ' ')
                .replace(/_/g, ' ')
                .toUpperCase();
    }

     function renderFilters() {
      filtersDiv.innerHTML = `<button class="active" data-tag="All">All <span class='tick'><svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none'><path d='M8.6 15.6L4.4 11.4L3 12.8L8.6 18.4L20.6 6.4L19.2 5L8.6 15.6Z' fill='#1F1C4F'/></svg></span></button>` +
        allTags.map((tag, i) => `<button data-tag="${tag}">${tag} <span class='tick'><svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none'><path d='M8.6 15.6L4.4 11.4L3 12.8L8.6 18.4L20.6 6.4L19.2 5L8.6 15.6Z' fill='#1F1C4F'/></svg></span></button>`).join('');
    }

    function renderProducts(filterTag = "All") {
      let filtered = products;
      if (filterTag !== "All") {
        // Find the original featureTag value for the selected filter
        const idx = allTags.indexOf(filterTag);
        const originalTag = allFeatureTags[idx];
        filtered = products.filter(p => (p.featureTag || []).includes(originalTag));
      }
      grid.innerHTML = filtered.map(p => {
        // Use _dmS7Url if available, else fallback to _publishUrl
        const imgUrl = p.image._dmS7Url || p.image._publishUrl || '';
        // Replace all <li> in description with tick SVG
        const tickSVG = `<svg xmlns='http://www.w3.org/2000/svg' width='24' height='25' viewBox='0 0 24 25' fill='none'><path d='M8.6 15.9617L4.4 11.7617L3 13.1617L8.6 18.7617L20.6 6.76169L19.2 5.36169L8.6 15.9617Z' fill='#1F1C4F'/></svg>`;
        let descHtml = p.description.html.replace(/<li>(.*?)<\/li>/g, `<li style='display:flex;align-items:center;gap:8px;'>${tickSVG}<span>$1</span></li>`);
        return `
         <div class="product">
          ${(p.promotionTag && p.promotionTag.length) ? `<span class="offer-tag"><svg viewBox="0 0 20 20"><polygon points="10,2 12.59,7.26 18.18,7.27 13.64,11.14 15.23,16.63 10,13.77 4.77,16.63 6.36,11.14 1.82,7.27 7.41,7.26"/></svg>${formatTag(p.promotionTag[0], 'offer')}</span>` : ''}
          <img src="${imgUrl}" alt="${p.productName}" style="width:100%;height:auto;border-radius:4px;margin-bottom:10px;" />
          <h3>${p.productName}</h3>
          <div>${descHtml}</div>
          <div class="tags">
            ${(p.productTag || []).map(tag => `<span class="tag">${formatTag(tag, 'product')}</span>`).join('')}
            ${(p.featureTag || []).map(tag => `<span class="tag">${formatTag(tag, 'feature')}</span>`).join('')}
          </div>
          <a href="${p.ctaUrl}" target="_blank" style="display:inline-block;margin-top:12px;padding:8px 20px;background:#fff;color:#000;border-radius:3px;text-decoration:none;border:2px solid #d32f2f;">${p.ctaLabel}</a>
        </div>
        `;
      }).join('');
    }

    filtersDiv.addEventListener('click', function(e) {
      if (e.target.tagName === 'BUTTON') {
        document.querySelectorAll('.filters button').forEach(btn => btn.classList.remove('active'));
        e.target.classList.add('active');
        renderProducts(e.target.dataset.tag);
        // Show tick only on active button
        document.querySelectorAll('.filters button .tick').forEach(tick => tick.style.display = 'none');
        const tick = e.target.querySelector('.tick');
        if (tick) tick.style.display = 'inline-block';
      }
    });

  // Show tick on initial active button
    setTimeout(() => {
      const activeBtn = document.querySelector('.filters button.active');
      if (activeBtn) {
        const tick = activeBtn.querySelector('.tick');
        if (tick) tick.style.display = 'inline-block';
      }
    }, 0);
    //const url = `https://author-p51202-e1639255.adobeaemcloud.com/graphql/execute.json/wknd-shared/product-details;categoryname=${tag}`;
    const url = `https://author-p51202-e1639255.adobeaemcloud.com/graphql/execute.json/westpac/productDetailsByProdTag;producttag=${tag}`;
    // Fetch from grapgql endpoint with dynamic quryparam categoryname tag
    //fetch('https://author-p51202-e1639255.adobeaemcloud.com/graphql/execute.json/wknd-shared/product-details;categoryname=prod:category/credit-card')
    fetch(url)
      .then(res => res.json())
      .then(data => {
        products = data.data.productModelList.items;
        allFeatureTags = Array.from(new Set(products.flatMap(p => p.featureTag || [])));
        allTags = allFeatureTags.map(tag => formatTag(tag, 'feature'));
        renderFilters();
        renderProducts();
      })
      .catch(err => {
        grid.innerHTML = '<div style="color:red">Failed to load products.</div>';
      });

}
