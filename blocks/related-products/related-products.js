
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
  

}
