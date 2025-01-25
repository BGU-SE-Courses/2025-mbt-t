/* @provengo summon selenium */

function CustomerLogin(session, e){
    sync({request:Event("Start(CustomerLogin)")})
    session.click(xpaths.userHomePageWindow.signInButton)
    session.writeText(xpaths.userSignInWindow.userInput, e.email)
    session.writeText(xpaths.userSignInWindow.passwordInput, e.password)
    session.click(xpaths.userSignInWindow.loginButton)
}


function AddProductToCart(session){
    sync({request: Event("Start(AddProductToCart)") });
    session.click(xpaths.userProductSelection.productHummingbirdPrintedSweater)
    session.click(xpaths.userProductSelection.productAddButton)
    session.click(xpaths.userProductSelection.proceedToCheckoutButton)
}

function OpenPromoCodeWindow(session){
    sync({request: Event("Start(OpenPromoCodeWindow)") });
    session.click(xpaths.userCheckOut.openPromoCodeButton)
}
function ApplyCoupon(session,e) {
    sync({request: Event("Start(ApplyCoupon)") });
    session.writeText(xpaths.userCheckOut.enterCouponCode,e.code)
    session.click(xpaths.userCheckOut.addCouponButton)
  }


function AdminLogin(session, e){
    sync({request:Event("Start(AdminLogin)")})
    session.writeText(xpaths.adminSignInWindow.adminInput, e.email)
    session.writeText(xpaths.adminSignInWindow.passwordInput, e.password)
    session.click(xpaths.adminSignInWindow.loginButton)
}

function NavigateToCatalogDiscounts(session){
    sync({request:Event("Start(NavigateToCatalogDiscounts)")})
    session.click(xpaths.adminNavigatesToDiscount.catalogButton)
    session.click(xpaths.adminNavigatesToDiscount.discountButton)
}
function UserInputDisabledCoupon(session){
    sync({request:Event("Start(UserInputDisabledCoupon)")})
    session.waitForVisibility(xpaths.userCouponError.disabledCoupon)
}

function SelectCouponToCancel(session, e){
    sync({request:Event("Start(SelectCouponToCancel)")})
    try {
         const dynamicXPath = xpaths.adminFindCoupon.part1CouponID + e.id + xpaths.adminFindCoupon.part2CouponID;
         session.click(xpaths.adminFindCoupon.sortButton);
         session.click(dynamicXPath);
     }
     catch(err){
         session.click(xpaths.adminFindCoupon.oneCouponExists);
     }
}

function ChangeCouponStatusToCanceled(session){
    sync({request:Event("Start(ChangeCouponStatusToCanceled)")})
     session.click(xpaths.adminChangeCouponStatusToCanceled.statusButton)
}