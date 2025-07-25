export default async function decorate(block) {
 // Remove all inner content
  block.innerHTML = '';
  // Add the filters and grid divs
  block.innerHTML = `
    <div class="filters" id="filters"></div>
    <div class="grid" id="productGrid"></div>
  `;
 // Sample JSON data from graphql endpoint
    const products = [
      { name: "Altitute Platinum", description: "Description 1", tags: ["Latest Offers", "Rewards"] },
      { name: "Altitute Black", description: "Description 2", tags: ["Rewards"] },
      { name: "Westpac Lite", description: "Description 3", tags: ["Latest Offers"] },
      { name: "Low Rate Card", description: "Description 4", tags: ["Low Rate","Rewards"] },
      { name: "Low Fee Card", description: "Description 5", tags: ["Low Fee"] }
    ];
  // Get unique tags
    const allTags = Array.from(new Set(products.flatMap(p => p.tags)));

    // Render filter buttons
    const filtersDiv = document.getElementById('filters');
    filtersDiv.innerHTML = `<button class="active" data-tag="All">All</button>` +
      allTags.map(tag => `<button data-tag="${tag}">${tag}</button>`).join('');

    // Render products
    function renderProducts(filterTag = "All") {
      const grid = document.getElementById('productGrid');
      const filtered = filterTag === "All" ? products : products.filter(p => p.tags.includes(filterTag));
      grid.innerHTML = filtered.map(p => `
        <div class="product">
          <h3>${p.name}</h3>
          <p>${p.description}</p>
          <div class="tags">
            ${p.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
          </div>
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
