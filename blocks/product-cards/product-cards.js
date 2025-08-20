export default async function decorate(block) {
 // Remove all inner content
  block.innerHTML = '';
  // Add the filters and grid divs
  block.innerHTML = `
    <div class="filters" id="filters"></div>
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
      filtersDiv.innerHTML = `<button class="active" data-tag="All">All</button>` +
        allTags.map((tag, i) => `<button data-tag="${tag}">${tag}</button>`).join('');
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
        return `
        <div class="product">
          <img src="${imgUrl}" alt="${p.productName}" style="width:100%;height:auto;border-radius:4px;margin-bottom:10px;" />
          <h3>${p.productName}</h3>
          <div>${p.description.html}</div>
          <div class="tags">
            ${(p.productTag || []).map(tag => `<span class="tag">${formatTag(tag, 'product')}</span>`).join('')}
            ${(p.featureTag || []).map(tag => `<span class="tag">${formatTag(tag, 'feature')}</span>`).join('')}
            ${(p.offerTag || []).map(tag => `<span class="tag" style="background:#d32f2f;color:#fff;">${formatTag(tag, 'offer')}</span>`).join('')}
          </div>
          <a href="${p.ctaUrl}" target="_blank" style="display:inline-block;margin-top:12px;padding:8px 20px;background:#0072c6;color:#fff;border-radius:999px;text-decoration:none;">${p.ctaLabel}</a>
        </div>
        `;
      }).join('');
    }

    filtersDiv.addEventListener('click', function(e) {
      if (e.target.tagName === 'BUTTON') {
        document.querySelectorAll('.filters button').forEach(btn => btn.classList.remove('active'));
        e.target.classList.add('active');
        renderProducts(e.target.dataset.tag);
      }
    });

    // Fetch from endpoint
    fetch('https://author-p51202-e1639255.adobeaemcloud.com/graphql/execute.json/wknd-shared/credit-card')
      .then(res => res.json())
      .then(data => {
        products = data.data.productsList_2.items;
        allFeatureTags = Array.from(new Set(products.flatMap(p => p.featureTag || [])));
        allTags = allFeatureTags.map(tag => formatTag(tag, 'feature'));
        renderFilters();
        renderProducts();
      })
      .catch(err => {
        grid.innerHTML = '<div style="color:red">Failed to load products.</div>';
      });

}
