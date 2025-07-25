export default async function decorate(block) {
 // Remove all inner content
  block.innerHTML = '';
  // Add the filters and grid divs
  block.innerHTML = `
    <div class="filters" id="filters"></div>
    <div class="grid" id="productGrid"></div>
  `;
}
