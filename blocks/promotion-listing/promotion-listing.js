export default async function decorate(block) {
 // Remove all inner content
  block.innerHTML = '';
  // Add the filters and grid divs
  block.innerHTML = `
    <h2>Latest offers</h2>
    <div class="grid offers-container" id="promotionGrid"></div>
  `;
  // Fetch data from endpoint and render UI
    const grid = document.getElementById('promotionGrid');

    function formatFeatureTag(tag) {
      return tag.replace('prod:category/', '')
                .replace(/-/g, ' ');
    }

    let promotions = [];
    function renderPromotions() {
      let filtered = products;
      
      grid.innerHTML = promotions.map(p => `
        <div class="offer-card ${p.defaultStyle} ${p.defaultBackgroundColour}">
          <div class="offer-card-content">
            ${p.image ? `<img src="${p.image._dmS7Url}" alt="${p.heading}" style="width:100%;height:auto;border-radius:4px;margin-bottom:10px;" />` : ''}
            <p>${(p.productTag || []).map(tag => `<span class="tag">${formatFeatureTag(tag)}</span>`).join('')}</p>
            <h3>${p.heading}</h3>
            <a href="${p.ctaUrl}" target="_blank" style="display:inline-block;margin-top:12px;padding:8px 20px;background:#0072c6;color:#fff;border-radius:999px;text-decoration:none;">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" class="tap-tile-carousel__list__item-arrow">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M24 12C24 18.627 18.6278 24 12 24C5.37225 24 0 18.627 0 12C0 5.373 5.37225 0 12 0C18.6278 0 24 5.373 24 12ZM12 2C6.47714 2 2 6.47714 2 12C2 17.5229 6.47714 22 12 22C17.5229 22 22 17.5229 22 12C22 6.47714 17.5229 2 12 2Z" fill="#181B25"></path>
              <path d="M11.293 7.66421L14.5858 10.957H6V12.957H14.5859L11.293 16.25L12.7072 17.6642L18.4143 11.9571L12.7072 6.25L11.293 7.66421Z" fill="#181B25"></path>
            </svg>
          </a>
          </div>
        </div>
      `).join('');
    }

  

    // Fetch data from endpoint
    fetch('https://author-p51202-e1639255.adobeaemcloud.com/graphql/execute.json/westpac/promotions')
      .then(res => res.json())
      .then(data => {
        promotions = data.data.promotionModelList.items;
        renderPromotions();
      })
      .catch(err => {
        grid.innerHTML = '<div style="color:red">Failed to load products.</div>';
      });
}
