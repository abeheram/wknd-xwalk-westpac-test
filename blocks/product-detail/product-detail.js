export default async function decorate(block) {
 // Remove all inner content
  block.innerHTML = '';
  // Add the filters and grid divs
  block.innerHTML = `<section class="product-carousel customclass-1753769204140-37 "
    data-carousel-custom-class="customclass-1753769204140-37" aria-labelledby="carouselheading">
    <div class="container-fluid">
        <div class="row">
            <h2 id="carouselheading" class="col-xs-12">You might be interested in</h2>
            <ul class="product-carousel__list col-xs-12">
                <li class="product-carousel__list__item col-xs-12 col-sm-6 col-lg-4">
                    <div class="product-card-wrapper">
                        <div class="row">
                            <div class="col-xs-12">
                                <div class="product-card-heading-wrapper" style="height: 226px;">
                                    <!-- Image -->
                                    <div class="product-card-image-wrapper ">
                                        <img class="img-responsive promo-img"
                                            src="/content/dam/public/wbc/images/home/PerformanceTesting/spend-save-pod-320x200.jpg"
                                            alt="">
                                    </div>
                                    <!--Heading -->
                                    <h3 class="product-card-heading no-top-margin-xs no-bottom-margin-xs">
                                        Spend&save
                                    </h3>
                                    <!-- Exclusivity-->
                                    <div class="exclusivity-wrapper">
                                        <span class="icon icon-star1 icon-small icon-star1-fill" aria-hidden="true"
                                            style="background-image: none;"><svg aria-labelledby="title-icon-star1"
                                                xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                viewBox="0 0 24 24" focusable="false">
                                                <title id="title-icon-star1" lang="en">Star1</title>
                                                <polygon fill="#575f65" class="icons-background" fill-rule="evenodd"
                                                    points="12 0 9 9 0 9 7.5 14.25 4.5 23.25 12 17.249 19.5 23.25 16.499 14.25 24 9 15 9">
                                                </polygon>
                                            </svg></span>
                                        <span class="exclusive-label">You could get $30 on a new account</span>
                                    </div>
                                    <!-- Supporting text-->
                                </div>
                                <hr class="product-card-separator">
                                <!-- Numbers -->
                                <div class="product-card-offer-wrapper no-number" style="display: none; height: 48px;">
                                    <!-- Numbers 1 & 2  for dual or multiple-->
                                    <!-- Numbers 3 & 4 for multiple -->
                                    <!-- Numbers for Single -->
                                    <!-- Number fine print-->
                                </div>
                                <hr class="product-card-separator no-number" style="display: none;">
                                <div class="product-card-feature-wrapper" style="height: 120px;">
                                    <!-- Feature-heading and Feature list -->
                                    <ul
                                        class="product-card-feature-list lists lists-tick no-top-margin-xs no-bottom-margin-xs">
                                        <li class="product-card-feature-item"><span class="sr-only">Tick -
                                            </span>Aged 18-29? Team up a Life savings and a Choice bank account. Then, you could earn up to 5.00% p.a. variable interest on your first $30,000 savings</li>
                                    </ul>
                                </div>
                                <hr class="product-card-separator">
                                <!-- offer CTAs -- primary btn and secondary btn -->
                                <div class="product-card-cta-wrapper" style="height: 60px;">
                                    <div class="cta-btn-wrapper">
                                        <div class="button-wrapper text-left">
                                            <a href="https://www.westpac.com.au/personal-banking/bank-accounts/savings-accounts/spend-save-ntb/"
                                                class="btn btn-primary btn-md btn-soft hidden-xs">
                                                Find out more
                                                <!-- Removed span to resolve issue CMCT-1854 -->
                                                <!-- span class="hide-spinner btn-icon icon icon-size-sm icon-refresh" data-grunticon-embed></span-->
                                            </a>
                                            <a href="https://www.westpac.com.au/personal-banking/bank-accounts/savings-accounts/spend-save-ntb/"
                                                class="btn btn-primary btn-md btn-soft visible-xs-block">
                                                Find out more
                                                <!-- Removed span to resolve issue CMCT-1854 -->
                                                <!-- span class="hide-spinner btn-icon icon icon-size-sm icon-refresh" data-grunticon-embed></span-->
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </li>
                <li class="product-carousel__list__item col-xs-12 col-sm-6 col-lg-4">
                    <div class="product-card-wrapper">
                        <div class="row">
                            <div class="col-xs-12">
                                <div class="product-card-heading-wrapper" style="height: 226px;">
                                    <!-- Image -->
                                    <div class="product-card-image-wrapper ">
                                        <img class="img-responsive promo-img"
                                            src="/content/dam/public/wbc/images/home/PerformanceTesting/shopback-pod-320x200.jpg"
                                            alt="">
                                    </div>
                                    <!--Heading -->
                                    <h3 class="product-card-heading no-top-margin-xs no-bottom-margin-xs">
                                        ShopBack
                                    </h3>
                                    <!-- Exclusivity-->
                                    <!-- <div class="exclusivity-wrapper">
                                        <span class="icon icon-star1 icon-small icon-star1-fill" aria-hidden="true"
                                            style="background-image: none;"><svg aria-labelledby="title-icon-star1"
                                                xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                viewBox="0 0 24 24" focusable="false">
                                                <title id="title-icon-star1" lang="en">Star1</title>
                                                <polygon fill="#575f65" class="icons-background" fill-rule="evenodd"
                                                    points="12 0 9 9 0 9 7.5 14.25 4.5 23.25 12 17.249 19.5 23.25 16.499 14.25 24 9 15 9">
                                                </polygon>
                                            </svg></span>
                                        <span class="exclusive-label">Spend $50 and you could get $50 cashback</span>
                                    </div> -->
                                    <!-- Supporting text-->
                                </div>
                                <hr class="product-card-separator">
                                <!-- Numbers -->
                                <div class="product-card-offer-wrapper no-number" style="display: none; height: 48px;">
                                    <!-- Numbers 1 & 2  for dual or multiple-->
                                    <!-- Numbers 3 & 4 for multiple -->
                                    <!-- Numbers for Single -->
                                    <!-- Number fine print-->
                                </div>
                                <hr class="product-card-separator no-number" style="display: none;">
                                <div class="product-card-feature-wrapper" style="height: 120px;">
                                    <!-- Feature-heading and Feature list -->
                                    <ul
                                        class="product-card-feature-list lists lists-tick no-top-margin-xs no-bottom-margin-xs">
                                        <li class="product-card-feature-item">Earn bonus Cashback on over 4,000 brands with ShopBack.</li>
                                        <li class="product-card-feature-item">Westpac customers can access exclusive bonus Cashback. Just shop via the new Westpac Lounge on Shopback</li>
                                    </ul>
                                </div>
                                <hr class="product-card-separator">
                                <!-- offer CTAs -- primary btn and secondary btn -->
                                <div class="product-card-cta-wrapper" style="height: 60px;">
                                    <div class="cta-btn-wrapper">
                                        <div class="button-wrapper text-left">
                                            <a href="https://www.westpac.com.au/personal-banking/online-banking/making-the-most/rewards-and-offers/offers/shopback/"
                                                class="btn btn-primary btn-md btn-soft hidden-xs">
                                                Find out more
                                                <!-- Removed span to resolve issue CMCT-1854 -->
                                                <!-- span class="hide-spinner btn-icon icon icon-size-sm icon-refresh" data-grunticon-embed></span-->
                                            </a>
                                            <a href="https://www.westpac.com.au/personal-banking/online-banking/making-the-most/rewards-and-offers/offers/shopback/"
                                                class="btn btn-primary btn-md btn-soft visible-xs-block">
                                                Find out more
                                                <!-- Removed span to resolve issue CMCT-1854 -->
                                                <!-- span class="hide-spinner btn-icon icon icon-size-sm icon-refresh" data-grunticon-embed></span-->
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </li>
                <li class="product-carousel__list__item col-xs-12 col-sm-6 col-lg-4">
                    <div class="product-card-wrapper">
                        <div class="row">
                            <div class="col-xs-12">
                                <div class="product-card-heading-wrapper" style="height: 226px;">
                                    <!-- Image -->
                                    <div class="product-card-image-wrapper ">
                                        <img class="img-responsive promo-img"
                                            src="/content/dam/public/wbc/images/home/PerformanceTesting/security-pod-320x200.jpg"
                                            alt="">
                                    </div>
                                    <!--Heading -->
                                    <h3 class="product-card-heading no-top-margin-xs no-bottom-margin-xs">
                                        LAYERS OF DEFENCE
                                    </h3>
                                    <!-- Exclusivity-->
                                    <!-- <div class="exclusivity-wrapper">
                                        <span class="icon icon-star1 icon-small icon-star1-fill" aria-hidden="true"
                                            style="background-image: none;"><svg aria-labelledby="title-icon-star1"
                                                xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                viewBox="0 0 24 24" focusable="false">
                                                <title id="title-icon-star1" lang="en">Star1</title>
                                                <polygon fill="#575f65" class="icons-background" fill-rule="evenodd"
                                                    points="12 0 9 9 0 9 7.5 14.25 4.5 23.25 12 17.249 19.5 23.25 16.499 14.25 24 9 15 9">
                                                </polygon>
                                            </svg></span>
                                        <span class="exclusive-label">Spend $50 and you could get $50 cashback</span>
                                    </div> -->
                                    <!-- Supporting text-->
                                </div>
                                <hr class="product-card-separator">
                                <!-- Numbers -->
                                <div class="product-card-offer-wrapper no-number" style="display: none; height: 48px;">
                                    <!-- Numbers 1 & 2  for dual or multiple-->
                                    <!-- Numbers 3 & 4 for multiple -->
                                    <!-- Numbers for Single -->
                                    <!-- Number fine print-->
                                </div>
                                <hr class="product-card-separator no-number" style="display: none;">
                                <div class="product-card-feature-wrapper" style="height: 120px;">
                                    <!-- Feature-heading and Feature list -->
                                    <ul
                                        class="product-card-feature-list lists lists-tick no-top-margin-xs no-bottom-margin-xs">
                                        <li class="product-card-feature-item">Digital Card with dynamic CVC</li>
                                        <li class="product-card-feature-item">Westpac ProtectTM Security Code</li>
                                        <li class="product-card-feature-item">Card Lock</li>
                                        <li class="product-card-feature-item">Smart Verify</li>
                                    </ul>
                                </div>
                                <hr class="product-card-separator">
                                <!-- offer CTAs -- primary btn and secondary btn -->
                                <div class="product-card-cta-wrapper" style="height: 60px;">
                                    <div class="cta-btn-wrapper">
                                        <div class="button-wrapper text-left">
                                            <a href="https://www.westpac.com.au/security/"
                                                class="btn btn-primary btn-md btn-soft hidden-xs">
                                                Find out more
                                                <!-- Removed span to resolve issue CMCT-1854 -->
                                                <!-- span class="hide-spinner btn-icon icon icon-size-sm icon-refresh" data-grunticon-embed></span-->
                                            </a>
                                            <a href="https://www.westpac.com.au/security/"
                                                class="btn btn-primary btn-md btn-soft visible-xs-block">
                                                Find out more
                                                <!-- Removed span to resolve issue CMCT-1854 -->
                                                <!-- span class="hide-spinner btn-icon icon icon-size-sm icon-refresh" data-grunticon-embed></span-->
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </li>
            </ul>
            <div class="product-carousel__controlls col-xs-12" style="display: flex;">
                <div class="product-carousel__controlls__slider" role="presentation">
                    <div class="scrollbar">
                        <div class="thumb" style="width: 585.333px; left: 0px;"></div>
                    </div>
                </div>
                <div class="product-carousel__controlls__arrows">
                    <div tabindex="-1" class="nav-btn arrow-left--disabled" aria-hidden="true" style="display: flex;">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g id="arrow-left">
                                <path id="arrow-left_2"
                                    d="M9.82435 12L16.4121 18.5878L15 20L7 12L15 4L16.4122 5.41218L9.82435 12Z"
                                    fill="#DEDEE1"></path>
                            </g>
                        </svg>
                    </div>
                    <div class="nav-btn arrow-left" role="button" aria-label="slide left" tabindex="0"
                        style="display: none;">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M9.82435 12L16.4121 18.5878L15 20L7 12L15 4L16.4122 5.41218L9.82435 12Z"
                                fill="#181B25"></path>
                        </svg>
                    </div>
                    <div class="nav-btn arrow-right" role="button" aria-label="slide right" tabindex="0"
                        style="display: flex;">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g id="arrow-right">
                                <path id="arrow-right_2"
                                    d="M14.5879 12L8.00006 18.5878L9.41223 20L17.4122 12L9.41218 4L8 5.41218L14.5879 12Z"
                                    fill="#181B25"></path>
                            </g>
                        </svg>
                    </div>
                    <div tabindex="-1" class="nav-btn arrow-right--disabled" aria-hidden="true" style="display: none;">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M14.5879 12L8.00006 18.5878L9.41223 20L17.4122 12L9.41218 4L8 5.41218L14.5879 12Z"
                                fill="#DEDEE1"></path>
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>`;
  
}
