export default async function decorate(block) {
 // Remove all inner content
  block.innerHTML = '';
  // Add the filters and grid divs
  block.innerHTML = `<div id="ddBannerContent" attr-topstatus="ddAccTitle-1">
			<div id="ddBannerLeft">
				<div id="ddLeftContent" class="ddImageContainer ddFixed ddRelative">
					<div class="ddimg bannerimg-1">
						<img src="https://www.westpac.com.au//content/dam/public/wbc/images/home/PerformanceTesting/main-banner-image-650x500.jpg">
					</div>
				</div>
			</div>
			<div id="ddBannerRight">
				<div id="ddRightContent">
					<span id="ddCashbackBatch">
						<svg aria-labelledby="title-icon-star1" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" focusable="false">
							<title id="title-icon-star1" lang="en">Star1</title>
							<polygon fill="#DA1710" class="icons-background" fill-rule="evenodd" points="12 0 9 9 0 9 7.5 14.25 4.5 23.25 12 17.249 19.5 23.25 16.499 14.25 24 9 15 9"></polygon>
						</svg>
						<span>Cashback</span>
					</span>
					<h1>Westpac Choice bank account with debit card</h1>
					<p>Westpac Choice is our most popular account. A simple-to-use everyday bank account packed with features. Open now, spend $50 and you could get $50 cashback! Read on to find out how.</p>
					<div id="ddBannerImageContainer">
						<img src="https://www.westpac.com.au//content/dam/public/wbc/images/home/PerformanceTesting/main-banner-image-1920x1080.jpg">
					</div>
					<div class="ddTwoCol">
						<div class="ddLeftCol">
							<span class="ddZero">$0</span>
						</div>
						<div class="ddRightCol">
							<h4 class="ddh4Title ddZeroTitle">Monthly and withdrawal fees</h4>
							<p class="ddContent">No Account-keeping fees for at least 12 months. Then, for deposits of $2,000 a month or eligible customers. (details in fees section)</p>
						</div>
					</div>
					
				</div>
			</div>
		</div>`;
  
}
