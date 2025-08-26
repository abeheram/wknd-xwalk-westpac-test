export default async function decorate(block) {
 // Remove all inner content
  block.innerHTML = '';
  // Add the filters and grid divs
  block.innerHTML = `
    <h2>Latest offers</h2>
    <div class="grid offers-container" id="promotionGrid">
      <div class="offer-card pink-background">
      <div class="offer-card-content">
        <p>Credit Card</p>
        <h3>EARN UP TO 180,000 BONUS ALTITUDE POINTS</h3>
      </div>
    </div>

    <!-- Card 2 -->
    <div class="offer-card white-background">
      <img src="https://via.placeholder.com/300x200?text=Westpac+Card" alt="Westpac Credit Card" class="credit-card-image</p>
        <h3>Earn 120,000 bonus points</h3>
      </div>
    </div>

    <!-- Card 3 -->
    <div class="offer-card image-background">
      <div class="offer-card-content">
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
        <div class="offer-card ${p.defaultStyle} ${p.defaultBackgroundColour}">
          <div class="offer-card-content">
            <h3>${p.heading}</h3>
             <a href="${p.ctaUrl._authorUrl}" target="_blank" style="display:inline-block;margin-top:12px;padding:8px 20px;background:#0072c6;color:#fff;border-radius:999px;text-decoration:none;">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" class="tap-tile-carousel__list__item-arrow">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M24 12C24 18.627 18.6278 24 12 24C5.37225 24 0 18.627 0 12C0 5.373 5.37225 0 12 0C18.6278 0 24 5.373 24 12ZM12 2C6.47714 2 2 6.47714 2 12C2 17.5229 6.47714 22 12 22C17.5229 22 22 17.5229 22 12C22 6.47714 17.5229 2 12 2Z" fill="#181B25"></path>
              <path d="M11.293 7.66421L14.5858 10.957H6V12.957H14.5859L11.293 16.25L12.7072 17.6642L18.4143 11.9571L12.7072 6.25L11.293 7.66421Z" fill="#181B25"></path>
            </svg>
          </a>
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
