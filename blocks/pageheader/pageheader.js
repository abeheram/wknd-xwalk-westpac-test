export default function decorate(block) {
   const innerDiv = block.querySelector("div > div"); // Select the inner <div> inside the "pageheader block"
    if (innerDiv) {
       const htmlContent = "<strong>test12 content</strong>";
      // Append the HTML content
      innerDiv.insertAdjacentHTML("beforeend", htmlContent);
    }
}

