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
            <span class="cta-button">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="33" viewBox="0 0 32 33" fill="none">
                <path d="M16 22.7234L22 16.7234M22 16.7234L16 10.7234M22 16.7234H10M31 16.7234C31 25.0076 24.2842 31.7234 16 31.7234C7.71572 31.7234 1 25.0076 1 16.7234C1 8.43911 7.71572 1.72339 16 1.72339C24.2842 1.72339 31 8.43911 31 16.7234Z" stroke="#181B25" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </span>
          </div>
        </div>
      </div>

      <!-- Card 2 -->
      <div class="offer-card ">
        <div class="offer-card-content white">
          <p>Credit Card</p>
          <h3>Earn 120,000 bonus points</h3>
          <img src="https://author-p51202-e1639255.adobeaemcloud.com/content/dam/westpac/credit-cards/Credit%20cards.png" alt="Westpac Credit Card" class="credit-card-image"/>
          <div class="cta-container">
            <span class="cta-button">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="33" viewBox="0 0 32 33" fill="none">
                <path d="M16 22.7234L22 16.7234M22 16.7234L16 10.7234M22 16.7234H10M31 16.7234C31 25.0076 24.2842 31.7234 16 31.7234C7.71572 31.7234 1 25.0076 1 16.7234C1 8.43911 7.71572 1.72339 16 1.72339C24.2842 1.72339 31 8.43911 31 16.7234Z" stroke="#181B25" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </span>
          </div>
          </div>
      </div>

      <!-- Card 3 -->
      <div class="offer-card">
        <div class="offer-card-content image" style="background-image: url('https://author-p51202-e1639255.adobeaemcloud.com/content/dam/westpac/headless-is-here.png');"> 
          <p>Credit Card</p>
          <h3>GET REWARD WITH $50 CASHBACK</h3>
          <div class="cta-container">
            <span class="cta-button">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="33" viewBox="0 0 32 33" fill="none">
                <path d="M16 22.7234L22 16.7234M22 16.7234L16 10.7234M22 16.7234H10M31 16.7234C31 25.0076 24.2842 31.7234 16 31.7234C7.71572 31.7234 1 25.0076 1 16.7234C1 8.43911 7.71572 1.72339 16 1.72339C24.2842 1.72339 31 8.43911 31 16.7234Z" stroke="#181B25" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </span>
          </div>
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
    fetch('https://author-p167311-e1795988.adobeaemcloud.com/graphql/execute.json/westpac/promotions')
      .then(res => res.json())
      .then(data => {
        promotions = data.data.promotionModelList.items;
        //renderPromotions();
      })
      .catch(err => {
        grid.innerHTML = '<div style="color:red">Failed to load products.</div>';
      });
}
