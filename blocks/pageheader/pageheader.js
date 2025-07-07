export default function decorate(block) {
  const pageHeader = block.querySelector('.pageheader');  // Select the page-header div
  if (pageHeader) {
     const blockquote = document.createElement('blockquote');
      blockquote.innerHTML = `<strong>test content</strong>`;
      pageHeader.appendChild(blockquote);
  }
   
}

