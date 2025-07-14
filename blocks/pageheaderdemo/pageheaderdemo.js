export default function decorate(block) {
  /*const quoteDiv = block.querySelector('div:last-of-type');
  const blockquote = document.createElement('blockquote');
  blockquote.innerHTML = `<strong>${quoteDiv.innerHTML}</strong>`;
  quoteDiv.replaceWith(blockquote);

  const authorDiv = block.querySelector('div:nth-child(2)');
  if (authorDiv) {
    const author = document.createElement('p');
    author.innerHTML = `<b><i>${authorDiv.innerHTML}</i></b>`;
    authorDiv.replaceWith(author);
  }*/

   const firstChildDiv = block.querySelector('div:first-child');
  if (firstChildDiv) {
    // Check if the first child div contains a <p> tag
    const hasPTag = firstChildDiv.querySelector('p');

    if (!hasPTag) {
      // If no <p> tag is found, add class 'demo1'
      firstChildDiv.classList.add('pageheaderdemo-headline');
    } else {
      // If a <p> tag is found, add class 'demo2'
      firstChildDiv.classList.add('pageheaderdemo-byline');
    }
  }
}
