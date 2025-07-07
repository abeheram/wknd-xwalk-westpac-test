export default function decorate(block) {
   const innerDiv = block.querySelector("div > div"); // Select the inner <div> inside the "pageheader block"
    if (innerDiv) {
      // Append the HTML content
      innerDiv.insertAdjacentHTML("beforeend", "<strong>test content</strong>");
    }
}

