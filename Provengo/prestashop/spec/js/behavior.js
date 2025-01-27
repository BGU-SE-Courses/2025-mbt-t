
/* @provengo summon selenium */


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



bthread("AdminLoginAndCancelCoupon", function () {
  let s2 = new SeleniumSession("adminSession")
      s2.start(URLprestashopAdmin);

  sync({request: Event("End(AdminLogin)")}, AdminLogin(s2, {email: 'demo@prestashop.com', password: 'prestashop_demo'}));
  sync({request: Event("End(NavigateToCatalogDiscounts)")}, NavigateToCatalogDiscounts(s2));
  sync({request: Event("End(SelectCouponToCancel)")}, SelectCouponToCancel(s2,{id: couponID}));
  sync({request: Event("End(ChangeCouponStatusToCanceled)")}, ChangeCouponStatusToCanceled(s2));
});



bthread("VerifyCustomerDontApplyDisabledCoupon", function() {

  sync({waitFor:Event("Start(ChangeCouponStatusToCanceled)")});
  sync({block:Event("Start(ApplyCoupon)")});
})

bthread("VerifyCustomerDontApplyDisabledCoupon2", function() {

  sync({waitFor:Event("End(ChangeCouponStatusToCanceled)")});
  sync({waitFor:Event("End(OpenPromoCodeWindow)")});
})

