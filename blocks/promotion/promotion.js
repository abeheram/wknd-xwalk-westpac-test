export default async function decorate(block) {
 // Remove all inner content
 console.log(block.innerHTML);
  const cfPath = block.querySelector('.button-container a').innerHTML;
  //const style=  block.querySelector('div[data-aue-prop=style]').innerHTML;
  //const background=  block.querySelector('div:nth-child(2) div').innerHTML;

  const props = [...block.children];
  const style = props[0]?.textContent?.trim();
  const background = props[1]?.textContent?.trim();

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
  // Fetch data from endpoint and render UI
    const grid = document.getElementById('promotionGrid');

    function formatFeatureTag(tag) {
      return tag.replace('prod:category/', '')
                .replace(/-/g, ' ');
    }

    let promotions = [];
    function renderPromotions() {
      
      grid.innerHTML = `
        <div class="offer-card ${style || promotions.defaultStyle}" >
          <div class="offer-card-content ${background || promotions.defaultBackground}" style="background-image: url('${promotions.image ? promotions.image._authorUrl : ""}');">
            <p>Credit Card</p>
            <h3>${promotions.heading}</h3>
            
         </div>
       </div>`;
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
