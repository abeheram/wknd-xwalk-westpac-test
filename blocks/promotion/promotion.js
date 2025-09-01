export default async function decorate(block) {
 // Remove all inner content
 console.log(block.innerHTML);
  const cfPath = block.querySelector('.button-container a').innerHTML;
  //const style=  block.querySelector('div[data-aue-prop=style]').innerHTML;
  //const background=  block.querySelector('div:nth-child(2) div').innerHTML;

  const props = [...block.children];
  const type = props[0]?.textContent?.trim();
  var style = props[1]?.textContent?.trim();
  if(type == "incontext") {
    style = props[2]?.textContent?.trim();
  } 
  const background = props[3]?.textContent?.trim();

  block.innerHTML = '';
  // Add the filters and grid divs
  block.innerHTML = `
    <div class="grid offers-container" id="promotionGrid">
      <div class="offer-card pink">
        <div class="offer-card-content">
          <p>Credit Card</p>
          <h3>EARN UP TO 180,000 BONUS ALTITUDE POINTS</h3>
        </div>
      </div>
    </div>
  `;

    let promotions = [];
    function renderPromotions() {
      block.innerHTML = `<div class="grid offers-container ${type}">
        <div class="offer-card ${style || promotions.style}" >
          <div class="offer-card-content ${background || promotions.defaultBackground}" style="background-image: url('${promotions.image ? promotions.image._authorUrl : ""}');">
            <p class=${type == "incontext" ? "hidden" : ""}>Credit Card</p>
            <h3>${promotions.heading}</h3>
            <p>${promotions.description}</p>
            <span class="disclaimer">${promotions.tcLabel}</span>
            <span class="cta-button ${type != "promotion" ? "hidden" : ""}">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="33" viewBox="0 0 32 33" fill="none">
                <path d="M16 22.7234L22 16.7234M22 16.7234L16 10.7234M22 16.7234H10M31 16.7234C31 25.0076 24.2842 31.7234 16 31.7234C7.71572 31.7234 1 25.0076 1 16.7234C1 8.43911 7.71572 1.72339 16 1.72339C24.2842 1.72339 31 8.43911 31 16.7234Z" stroke="#181B25" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </span>
         </div>
       </div> </div>`;
    }

  

    // Fetch data from endpoint
    fetch('https://author-p51202-e1639255.adobeaemcloud.com/graphql/execute.json/westpac/promotionbypath;path='+cfPath)
      .then(res => res.json())
      .then(data => {
        promotions = data.data.promotionModelByPath.item;
        renderPromotions();
      })
      .catch(err => {
        grid.innerHTML = '<div style="color:red">Failed to load products.</div>';
      });
}
