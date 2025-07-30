export default async function decorate(block) {
 // Remove all inner content
  block.innerHTML = '';
  // Add the filters and grid divs
  block.innerHTML = `
    <div class="filters" id="filters"></div>
    <div class="grid" id="productGrid"></div>
  `;
 // Sample JSON data from graphql endpoint
    const data = {
      "data": {
        "productsList_2": {
          "items": [
            {
              "productName": "Altitude Platinum",
              "description": {
                "html": "<ul><li>$30 Annual card fee</li><li>20.99% p.a purchase rate</li><li>$500 minimum credit card</li></ul>"
              },
              "image": {
                "_dmS7Url": "https://smartimaging.scene7.com/is/image/AEMHOL2/Credit cards"
              },
              "productTag": [
                "products:credit-card"
              ],
              "featureTag": [
                "features:latest-offers",
                "features:rewards"
              ],
              "ctaLabel": "Find out more",
              "ctaUrl": "https://www.westpac.com.au"
            },
            {
              "productName": "Low Fee Card",
              "description": {
                "html": "<ul><li>$30 Annual card fee</li><li>20.99% p.a purchase rate</li><li>$500 minimum credit card</li></ul>"
              },
              "image": {
                "_dmS7Url": "https://smartimaging.scene7.com/is/image/AEMHOL2/Credit cards"
              },
              "productTag": [
                "products:credit-card"
              ],
              "featureTag": [
                "features:low-fee"
              ],
              "ctaLabel": "Find out more",
              "ctaUrl": "https://www.westpac.com.au"
            }
          ]
        }
      }
    };

    // Extract products
    const products = data.data.productsList_2.items;

    // Get unique feature tags and format them
    function formatFeatureTag(tag) {
      return tag.replace('features:', '')
                .replace(/-/g, ' ')
                .toUpperCase();
    }
    const allFeatureTags = Array.from(new Set(products.flatMap(p => p.featureTag || [])));
    const allTags = allFeatureTags.map(formatFeatureTag);

    // Render filter buttons
    const filtersDiv = document.getElementById('filters');
    filtersDiv.innerHTML = `<button class="active" data-tag="All">All</button>` +
      allTags.map((tag, i) => `<button data-tag="${tag}">${tag}</button>`).join('');

    // Render products
    function renderProducts(filterTag = "All") {
      const grid = document.getElementById('productGrid');
      let filtered = products;
      if (filterTag !== "All") {
        // Find the original featureTag value for the selected filter
        const idx = allTags.indexOf(filterTag);
        const originalTag = allFeatureTags[idx];
        filtered = products.filter(p => (p.featureTag || []).includes(originalTag));
      }
      grid.innerHTML = filtered.map(p => `
        <div class="product">
          <img src="${p.image._dmS7Url}" alt="${p.productName}" style="width:100%;height:auto;border-radius:4px;margin-bottom:10px;" />
          <h3>${p.productName}</h3>
          <div>${p.description.html}</div>
          <div class="tags">
            ${(p.featureTag || []).map(tag => `<span class="tag">${formatFeatureTag(tag)}</span>`).join('')}
          </div>
          <a href="${p.ctaUrl}" target="_blank" style="display:inline-block;margin-top:12px;padding:8px 20px;background:#0072c6;color:#fff;border-radius:999px;text-decoration:none;">${p.ctaLabel}</a>
        </div>
      `).join('');
    }

    // Filter click handler
    filtersDiv.addEventListener('click', function(e) {
      if (e.target.tagName === 'BUTTON') {
        document.querySelectorAll('.filters button').forEach(btn => btn.classList.remove('active'));
        e.target.classList.add('active');
        renderProducts(e.target.dataset.tag);
      }
    });

    // Initial render
    renderProducts();
}
