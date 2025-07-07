export default function decorate(block) {
   const innerDiv = block.querySelector("div > div"); // Select the inner <div> inside the "pageheader block"
    if (innerDiv) {
       const htmlContent = `<div class="page-header-complex header-complex-red-type js-page-header">
<!-- Image -->
<div class="headers-img-wrapper ">
<div class="headers-image">
<img class="headers-img" src="https://www.westpac.com.au/content/dam/public/wbc/images/security/wbc-ph-security_home-1920x600.jpg" alt="You’re in safe hands with Westpac">
</div>
</div>
<div class="header-text-wrapper-parent">
<div class="container-fluid">
<div class="row">
<div class="col-md-6 col-lg-6">
<div class="header-text-wrapper">
<div class="headers-text">
 
<h1 class="headers-complex-headline">WESTPAC CHOICE BANK ACCOUNT WITH DEBIT CARD</h1>
<div class="headers-lead lead  ">
<p>Westpac Choice is our most popular account. A simple-to-use everyday bank account packed with features. Open now, spend $50 and you could get $50 cashback! Read on to find out how.</p>
</div>
 
<div>
<!-- primary secondary CTAs -->
<div class="header-cta-group">
<div class="cta-wrapper">
<div class="cta-btn-wrapper text-left">
<a href="/personal-banking/bank-accounts/transaction/choice/summary?fid=choice:header:cta" class="btn btn-white">
Open now
</a></div>
</div>
</div>
 
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>`;
      // Append the HTML content
      innerDiv.insertAdjacentHTML("beforeend", htmlContent);
    }
}

