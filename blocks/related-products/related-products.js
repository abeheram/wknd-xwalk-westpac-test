
export default async function decorate(block) {

  const props = [...block.children];
  const tag = props[0]?.textContent?.trim() || '';
 // Remove all inner content
  block.innerHTML = '';
  // Add the filters and grid divs
  block.innerHTML = `
    <div class="related-container">
      <h2 id="relatedHeading" style="margin-bottom:24px;">${tag}</h2>
      <div class="grid" id="productGrid"></div>
    </div>
  `;
  // Hardcoded JSON data (implementation kept for reference)
    
    const data = {
      "data": {
        "productsList_2": {
          "items": [
            {
              "productName": "Altitude Black",
              "description": {
                "html": "<ul><li>$295 annual card fee</li><li>20.99% p.a. purchase rate</li><li>Choose to earn Qantas points, Velocity points or Altitude Rewards</li></ul>"
              },
              "image": {
                "_dmS7Url": "https://smartimaging.scene7.com/is/image/AEMHOL2/Credit cards"
              },
              "productTag": [
                "prod:category/credit-card"
              ],
              "featureTag": [
                "prod:category/credit-card/latest-offers"
              ],
              "offerTag": [
                "prod:offers/bonus-points"
              ],
              "ctaLabel": "Find out more",
              "ctaUrl": "https://www.westpac.com.au"
            },
            {
              "productName": "Low Fee Card",
              "description": {
                "html": "<ul><li>$30 Annual card fee</li><li>20.99% p.a purchase rate</li><li>$500 minimum credit card</li></ul>"
              },
              "image": {
                "_publishUrl": "https://smartimaging.scene7.com/is/image/AEMHOL2/Credit cards"
              },
              "productTag": [
                "prod:category/credit-card"
              ],
              "featureTag": [
                "prod:category/credit-card/low-fee"
              ],
              "offerTag": [
                "prod:offers/cashback-offer"
              ],
              "ctaLabel": "Find out more",
              "ctaUrl": "https://www.westpac.com.au"
            },
            {
              "productName": "Low Fee Card 1",
              "description": {
                "html": "<ul><li>$30 Annual card fee</li><li>20.99% p.a purchase rate</li><li>$500 minimum credit card</li></ul>"
              },
              "image": {
                "_publishUrl": "https://smartimaging.scene7.com/is/image/AEMHOL2/Credit cards"
              },
              "productTag": [
                "prod:category/credit-card"
              ],
              "featureTag": [
                "prod:category/credit-card/low-fee"
              ],
              "offerTag": [
                "prod:offers/cashback-offer"
              ],
              "ctaLabel": "Find out more",
              "ctaUrl": "https://www.westpac.com.au"
            },
            {
              "productName": "Low Fee Card 2",
              "description": {
                "html": "<ul><li>$30 Annual card fee</li><li>20.99% p.a purchase rate</li><li>$500 minimum credit card</li></ul>"
              },
              "image": {
                "_publishUrl": "https://smartimaging.scene7.com/is/image/AEMHOL2/Credit cards"
              },
              "productTag": [
                "prod:category/credit-card"
              ],
              "featureTag": [
                "prod:category/credit-card/low-fee"
              ],
              "offerTag": [
                "prod:offers/cashback-offer"
              ],
              "ctaLabel": "Find out more",
              "ctaUrl": "https://www.westpac.com.au"
            }
          ]
        }
      }
    };

}
