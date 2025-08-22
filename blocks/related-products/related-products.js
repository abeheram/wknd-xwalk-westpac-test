
export default async function decorate(block) {

  const props = [...block.children];
  const tag = props[0]?.textContent?.trim() || '';
 // Remove all inner content
  block.innerHTML = '';
  // Add the filters and grid divs
  block.innerHTML = `
    <div class="related-container">
      <h2 id="relatedHeading" style="margin-bottom:24px;"></h2>
      <div class="grid" id="productGrid"></div>
    </div>
  `;
  // Fetch JSON data from endpoint
    const tag = 'credit-card'; // Set dynamically as needed
    fetch(`https://author-p51202-e1639255.adobeaemcloud.com/graphql/execute.json/westpac/productDetailsByProdTag;producttag=${tag}`)
      .then(res => res.json())
      .then(data => {
        products = data.data.productModelList.items;
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
      })
      .catch(err => {
        grid.innerHTML = '<div style="color:red">Failed to load products.</div>';
      });

}
