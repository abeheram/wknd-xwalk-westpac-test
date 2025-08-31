export default async function decorate(block) {

  const props = [...block.children];
  const style = props[0]?.textContent?.trim() || 'default';
  const tag = props[1]?.textContent?.trim() || '';
 // Remove all inner content
  block.innerHTML = '';
  // Add the filters and grid divs
  block.innerHTML = `
    <div class="product-cards-inner" style="max-width:1200px;margin:0 auto;">
      <div class="filters-row">
        <div class="filters-label">Quick filter:</div>
        <div class="filters" id="filters"></div>
      </div>
      <div class="grid" id="productGrid"></div>
    </div>
  `;  let products = [];
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

    // Variables for the first card
    const firstCardTitle = "Retrieve your altitude platinum credit card application";
    const firstCardButtonLabel = "Continue";
    const firstCardImage = "https://smartimaging.scene7.com/is/image/AEMHOL2/Altitude%20Platinum-2"; // Example image
    const firstCardButtonUrl = "#";

    function renderProducts(filterTag = "All") {
      let filtered = products;
      if (filterTag !== "All") {
        // Find the original featureTag value for the selected filter
        const idx = allTags.indexOf(filterTag);
        const originalTag = allFeatureTags[idx];
        filtered = products.filter(p => (p.featureTag || []).includes(originalTag));
      }
      // Boolean to control first card display
      const showFirstCard = true; // Set to false to hide first card

      let gridHTML = '';
      if (showFirstCard) {
        gridHTML += `
          <div class="product first-card">
            <h3>${firstCardTitle}</h3>
            <span class="first-card-btn">
              <span>${firstCardButtonLabel}</span>
              <a href="${firstCardButtonUrl}" target="_blank" style="display:inline-block;margin-left:8px;background:none;border:none;padding:0;">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M4 12H20M20 12L14 6M20 12L14 18" stroke="#DA1710" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
              </a>
            </span>
            <div class="first-card-img-wrapper">
              <img src="${firstCardImage}" alt="Altitude Platinum" class="first-card-img" />
            </div>
          </div>
        `;
      }
      const tickSVG = `<svg xmlns='http://www.w3.org/2000/svg' width='24' height='25' viewBox='0 0 24 25' fill='none'><path d='M8.6 15.9617L4.4 11.7617L3 13.1617L8.6 18.7617L20.6 6.76169L19.2 5.36169L8.6 15.9617Z' fill='#1F1C4F'/></svg>`;
      gridHTML += filtered.map(p => {
        const imgUrl = p.image._dmS7Url || p.image._publishUrl || '';
        let descHtml = p.description.html.replace(/<li>(.*?)<\/li>/g, `<li style='display:flex;align-items:center;gap:8px;'>${tickSVG}<span>$1</span></li>`);
        return `
         <div class="product">
           <div class="product-top-row">
             ${(p.promotionTag && p.promotionTag.length) ? `<span class="offer-tag"><svg xmlns=\"http://www.w3.org/2000/svg\" width=\"12\" height=\"12\" viewBox=\"0 0 12 12\" fill=\"none\"><path d=\"M6 0L4.5 4.5H0L3.75 7.125L2.25 11.625L6 8.62463L9.75 11.625L8.24963 7.125L12 4.5H7.5L6 0Z\" fill=\"#DA1710\"/></svg>${formatTag(p.promotionTag[0], 'offer')}</span>` : ''}
             <label class="compare-checkbox" style="margin-left:auto;display:flex;align-items:center;gap:4px;font-size:13px;z-index:2;background:#fff;padding:2px 8px;border-radius:4px;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
               <input type="checkbox" style="margin:0;">
                 COMPARE
             </label>
           </div>
           <div class="product-second-row">
             <div class="product-img-wrapper">
               <img src="${imgUrl}" alt="${p.productName}" />
             </div>
             <h3>${p.productName}</h3>
           </div>
           <div class="product-third-row">
             <div>${descHtml}</div>
             <a href="${p.ctaUrl}" target="_blank">${p.ctaLabel}</a>
           </div>
         </div>
        `;
      }).join('');
      grid.innerHTML = gridHTML;
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
    //const tag = 'credit-card'; // Example: set dynamically as needed
    // Fetch from GraphQL endpoint with dynamic query param categoryname tag
    const url = `https://author-p51202-e1639255.adobeaemcloud.com/graphql/execute.json/westpac/productDetailsByProdTag;producttag=${tag}`;
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
