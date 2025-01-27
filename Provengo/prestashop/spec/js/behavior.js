
/* @provengo summon selenium */

// this bthread takes care of the first use case, when a customer tries to apply a coupon to lower their cart total cost.
bthread("CustomerLoginAndAddProductToCartAndCustomerAppliesCoupon", function () {
  let s = new SeleniumSession("customerSession")
      s.start(URLprestashop);
 
  sync({request: Event("End(CustomerLogin)")}, CustomerLogin(s, {email: 'rudikkukuliev123@gmail.com', password: 'acegh0211Or'}));
  sync({request: Event("End(AddProductToCart)")}, AddProductToCart(s));
  sync({request: Event("End(OpenPromoCodeWindow)")}, OpenPromoCodeWindow(s));
  interrupt(Event("Start(ChangeCouponStatusToCanceled)"), function (){
    sync({request:Event("End(ApplyCoupon)")}, ApplyCoupon(s, {code: couponCode}));
  })
});


// this bthread takes care of the second use case, when an admin tries to delete a coupon from the shop.
bthread("AdminLoginAndCancelCoupon", function () {
  let s2 = new SeleniumSession("adminSession")
      s2.start(URLprestashopAdmin);

  sync({request: Event("End(AdminLogin)")}, AdminLogin(s2, {email: 'demo@prestashop.com', password: 'prestashop_demo'}));
  sync({request: Event("End(NavigateToCatalogDiscounts)")}, NavigateToCatalogDiscounts(s2));
  sync({request: Event("End(SelectCouponToCancel)")}, SelectCouponToCancel(s2,{id: couponID}));
  sync({request: Event("End(ChangeCouponStatusToCanceled)")}, ChangeCouponStatusToCanceled(s2));
});


// the following 2 bthreads are taking care of an event in which a customer tries to apply a disabled coupon.
bthread("VerifyCustomerDontApplyDisabledCoupon", function() {

  sync({waitFor:Event("Start(ChangeCouponStatusToCanceled)")});
  sync({block:Event("Start(ApplyCoupon)")});
})

bthread("VerifyCustomerDontApplyDisabledCoupon2", function() {

  sync({waitFor:Event("End(ChangeCouponStatusToCanceled)")});
  sync({waitFor:Event("End(OpenPromoCodeWindow)")});
})

