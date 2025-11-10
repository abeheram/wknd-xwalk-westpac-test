
export default async function decorate(block) {

  const props = [...block.children];
  const tag = props[0]?.textContent?.trim() || 'prod:category/credit-card';
  const label = props[1]?.textContent?.trim() || 'Heading';
  const noOfCards = props[2]?.textContent?.trim() || 3;
 // Remove all inner content
  block.innerHTML = '';
  // Add the filters and grid divs
  block.innerHTML = `
    <div class="related-products-inner" style="max-width:1200px;margin:0 auto;">
      <h2 id="relatedHeading" style="margin-bottom:24px;"></h2>
      <div class="grid" id="productGrid"></div>
    </div>
  `;
   // Fetch data from endpoint
    let relatedHeadingText = label ;
    document.getElementById('relatedHeading').textContent = relatedHeadingText;
    let products = [];
    let allFeatureTags = [];
    let allTags = [];
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
    // Filter logic removed
   // Hardcoded JSON data (implementation kept for reference)
    
    const data = {
      "data": {
        "productModelList": {
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
              "promotionTag": [
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
              "promotionTag": [
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
              "promotionTag": [
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
              "promotionTag": [
                "prod:offers/cashback-offer"
              ],
              "ctaLabel": "Find out more",
              "ctaUrl": "https://www.westpac.com.au"
            }
          ]
        }
      }
    };
  /*
    products = data.data.productModelList.items;
    allFeatureTags = Array.from(new Set(products.flatMap(p => p.featureTag || [])));
    allTags = allFeatureTags.map(tag => formatTag(tag, 'feature'));
    // Number of products to show (can be changed)
    let showCount = noOfCards;
    // Heading text for related cards (can be changed)
     let relatedHeadingText = label;
    document.getElementById('relatedHeading').textContent = relatedHeadingText;
    grid.innerHTML = products.slice(0, showCount).map(p => {
      const imgUrl = p.image._dmS7Url || p.image._publishUrl || 'https://smartimaging.scene7.com/is/image/AEMHOL2/Credit cards-1';
      return `
      <div class="related-product">
        ${(p.promotionTag && p.promotionTag.length) ? `<span class="offer-tag"><svg viewBox="0 0 20 20"><polygon points="10,2 12.59,7.26 18.18,7.27 13.64,11.14 15.23,16.63 10,13.77 4.77,16.63 6.36,11.14 1.82,7.27 7.41,7.26"/></svg>${formatTag(p.promotionTag[0], 'offer')}</span>` : ''}
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
    */
  // Fetch JSON data from endpoint
  let showCount = noOfCards;
  function renderProducts() {
      let filtered = products.slice(0, showCount);
      let gridHTML = '';
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
  // Fetch products from dynamic GraphQL endpoint 
    const url = `https://author-p167311-e1795988.adobeaemcloud.com/graphql/execute.json/westpac/productDetailsByProdTag;producttag=${tag}`;
    fetch(url)
      .then(res => res.json())
      .then(data => {
        products = data.data.productModelList.items;
        allFeatureTags = Array.from(new Set(products.flatMap(p => p.featureTag || [])));
        allTags = allFeatureTags.map(tag => formatTag(tag, 'feature'));
        renderProducts();
      })
      .catch(err => {
        grid.innerHTML = '<div style="color:red">Failed to load products.</div>';
      });
}
