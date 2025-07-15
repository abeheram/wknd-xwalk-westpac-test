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

    // Select the second child div inside 'pageheaderdemo'
    const secondChildDiv = block.querySelector('div:nth-child(2)');
    if (secondChildDiv) {
      secondChildDiv.classList.add('pageheaderdemo-byline'); // Add class 'pageheaderdemo-byline'
    }

    // Select the third child div inside 'pageheaderdemo'
    const thirdChildDiv = block.querySelector('div:nth-child(3)');
    if (thirdChildDiv) {
      thirdChildDiv.classList.add('pageheader-img'); // Add class 'pageheader-img'
    }
    // Select the first and second child divs
    firstChildDiv = block.querySelector('div:nth-child(1)');
    secondChildDiv = block.querySelector('div:nth-child(2)');
    if (firstChildDiv && secondChildDiv) {
      // Create a new wrapper div
    const wrapperDiv = document.createElement('div');
    wrapperDiv.classList.add('pageheaderdemo-text-wrapper'); // Add class to the wrapper div

    // Append the first and second child divs to the wrapper div
    wrapperDiv.appendChild(firstChildDiv);
    wrapperDiv.appendChild(secondChildDiv);

    // Insert the wrapper div into 'pageheaderdemo'
    block.insertBefore(wrapperDiv, block.querySelector('div:nth-child(3)'));
    }
  }
}
