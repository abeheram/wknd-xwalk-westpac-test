
export default async function decorate(block) {

  const props = [...block.children];
  const tag = props[0]?.textContent?.trim() || '';
  const label = props[1]?.textContent?.trim() || '';
 // Remove all inner content
  block.innerHTML = '';
  // Add the filters and grid divs
  block.innerHTML = `
    <div class="related-container">
      <h2 id="relatedHeading" style="margin-bottom:24px;">${tag}</h2>
      <div class="grid" id="productGrid"></div>
    </div>
  `;
   // Fetch data from endpoint
    let products = [];
    let allFeatureTags = [];
    let allTags = [];
    // const filtersDiv = document.getElementById('filters');
    const grid = block.getElementById('productGrid');

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
  // Hardcoded JSON data (implementation kept for reference)
    
    const data = {
      "data": {
        "productsList_2": {
          "items": [
            {
              "productName": "Altitude Black",
              "description": {
                "html": "<ul><li>$295 annual card fee</li><li>20.99% p.a. purchase rate</li><li>Choose to earn Qantas points, Velocity points or Altitude Rewards</li></ul>"
              },
              "image": {
                "_dmS7Url": "https://smartimaging.scene7.com/is/image/AEMHOL2/Credit cards"
              },
              "productTag": [
                "prod:category/credit-card"
              ],
              "featureTag": [
                "prod:category/credit-card/latest-offers"
              ],
              "offerTag": [
                "prod:offers/bonus-points"
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
                "_publishUrl": "https://smartimaging.scene7.com/is/image/AEMHOL2/Credit cards"
              },
              "productTag": [
                "prod:category/credit-card"
              ],
              "featureTag": [
                "prod:category/credit-card/low-fee"
              ],
              "offerTag": [
                "prod:offers/cashback-offer"
              ],
              "ctaLabel": "Find out more",
              "ctaUrl": "https://www.westpac.com.au"
            },
            {
              "productName": "Low Fee Card 1",
              "description": {
                "html": "<ul><li>$30 Annual card fee</li><li>20.99% p.a purchase rate</li><li>$500 minimum credit card</li></ul>"
              },
              "image": {
                "_publishUrl": "https://smartimaging.scene7.com/is/image/AEMHOL2/Credit cards"
              },
              "productTag": [
                "prod:category/credit-card"
              ],
              "featureTag": [
                "prod:category/credit-card/low-fee"
              ],
              "offerTag": [
                "prod:offers/cashback-offer"
              ],
              "ctaLabel": "Find out more",
              "ctaUrl": "https://www.westpac.com.au"
            },
            {
              "productName": "Low Fee Card 2",
              "description": {
                "html": "<ul><li>$30 Annual card fee</li><li>20.99% p.a purchase rate</li><li>$500 minimum credit card</li></ul>"
              },
              "image": {
                "_publishUrl": "https://smartimaging.scene7.com/is/image/AEMHOL2/Credit cards"
              },
              "productTag": [
                "prod:category/credit-card"
              ],
              "featureTag": [
                "prod:category/credit-card/low-fee"
              ],
              "offerTag": [
                "prod:offers/cashback-offer"
              ],
              "ctaLabel": "Find out more",
              "ctaUrl": "https://www.westpac.com.au"
            }
          ]
        }
      }
    };
products = data.data.productsList_2.items;
    allFeatureTags = Array.from(new Set(products.flatMap(p => p.featureTag || [])));
    allTags = allFeatureTags.map(tag => formatTag(tag, 'feature'));
    // Number of products to show (can be changed)
    let showCount = 3;
    // Heading text for related cards (can be changed)
    let relatedHeadingText = "You might be interested in";
    document.getElementById('relatedHeading').textContent = relatedHeadingText;
    grid.innerHTML = products.slice(0, showCount).map(p => {
      const imgUrl = p.image._dmS7Url || p.image._publishUrl || '';
      return `
      <div class="product">
        ${(p.offerTag && p.offerTag.length) ? `<span class="offer-tag"><svg viewBox="0 0 20 20"><polygon points="10,2 12.59,7.26 18.18,7.27 13.64,11.14 15.23,16.63 10,13.77 4.77,16.63 6.36,11.14 1.82,7.27 7.41,7.26"/></svg>${formatTag(p.offerTag[0], 'offer')}</span>` : ''}
        <img src="${imgUrl}" alt="${p.productName}" />
        <h3>${p.productName}</h3>
        <div>${p.description.html}</div>
        <div class="tags">
          ${(p.productTag || []).map(tag => `<span class="tag">${formatTag(tag, 'product')}</span>`).join('')}
          ${(p.featureTag || []).map(tag => `<span class="tag">${formatTag(tag, 'feature')}</span>`).join('')}
        </div>
        <a href="${p.ctaUrl}" target="_blank">${p.ctaLabel}</a></div>
      </div>
      `;
    }).join('');
}
