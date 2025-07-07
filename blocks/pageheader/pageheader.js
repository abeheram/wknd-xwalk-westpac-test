export default function decorate(block) {
  const pageHeader = block.querySelector('.pageheader'); // Select the page-header div
  if (pageHeader) {
    // Create the <blockquote> element
    const blockquote = document.createElement('blockquote');
    blockquote.innerHTML = `<strong>test content</strong>`;

    // Append the <blockquote> to the pageHeader
    pageHeader.insertAdjacentHTML('beforeend', blockquote.outerHTML);
  }
}

