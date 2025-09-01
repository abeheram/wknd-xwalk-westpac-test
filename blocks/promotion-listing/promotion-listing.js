export default async function decorate(block) {
 // Remove all inner content
  block.innerHTML = '';
  // Add the filters and grid divs
  block.innerHTML = `
    <h2>Latest offers</h2>
    <div class="grid offers-container" id="promotionGrid">
      <div class="offer-card">
        <div class="offer-card-content pink">
          <p>Credit Card</p>
          <h3>EARN UP TO 180,000 BONUS ALTITUDE POINTS</h3>
          <div class="cta-container">
            <button class="cta-button">
              <span>Apply Now</span>
              <!-- Example SVG icon (arrow) -->
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
              </svg>
            </button>
          </div>
        </div>
      </div>

      <!-- Card 2 -->
      <div class="offer-card ">
        <div class="offer-card-content white">
          <p>Credit Card</p>
          <h3>Earn 120,000 bonus points</h3>
          <img src="https://author-p51202-e1639255.adobeaemcloud.com/content/dam/westpac/credit-cards/Credit%20cards.png" alt="Westpac Credit Card" class="credit-card-image"/>
        </div>
      </div>

      <!-- Card 3 -->
      <div class="offer-card">
        <div class="offer-card-content image" style="background-image: url('https://author-p51202-e1639255.adobeaemcloud.com/content/dam/westpac/headless-is-here.png');"> 
          <p>Credit Card</p>
          <h3>GET REWARD WITH $50 CASHBACK</h3>
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
      
      grid.innerHTML = promotions.map(p => `
        <div class="offer-card ${p.defaultBackgroundColour}">
        <div class="offer-card-content">
          <p>Credit Card</p>
          <h3>${p.heading}</h3>
          <img src="${p.image._authorUrl}" alt="Westpac Credit Card" class="credit-card-image"/>
        </div>
      </div>
      `).join('');
    }

  

    // Fetch data from endpoint
    fetch('https://author-p51202-e1639255.adobeaemcloud.com/graphql/execute.json/westpac/promotions')
      .then(res => res.json())
      .then(data => {
        promotions = data.data.promotionModelList.items;
        //renderPromotions();
      })
      .catch(err => {
        grid.innerHTML = '<div style="color:red">Failed to load products.</div>';
      });
}
