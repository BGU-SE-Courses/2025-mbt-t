/*
 *  This is a good place to put common test data, project-wide constants, etc.
 */

const URLprestashop = "http://localhost:8080"
const URLprestashopAdmin = "http://localhost:8080/admina"
const couponCode = "BlackNovember"
const couponID = "1"
const expectedDiscount = 20



const xpaths = {
  userHomePageWindow: {
    signInButton: "//div[2]/div[1]/a[1]/span[1]",
  },
  userSignInWindow: {
    userInput: "//*[@id='field-email']",
    passwordInput: "//*[@id='field-password']",
    loginButton: "//*[@id='submit-login']"
  },
  userProductSelection: {
    productHummingbirdPrintedSweater: "//section[1]/div[1]/div[2]/article[1]/div[1]/div[2]/h3[1]/a[1]",
    productAddButton: "//div[1]/div[2]/button[1]",
    proceedToCheckoutButton: "//*[@id='blockcart-modal']/div[1]/div[1]/div[2]/div[1]/div[2]/div[1]/div[1]/a[1]"
  },
  userCheckOut:{
    openPromoCodeButton: "//div[1]/div[1]/div[3]/div[1]/p[1]/a[1]",
    enterCouponCode: "//form[1]/input[3]",
    addCouponButton: "//form[1]/button[1]/span[1]"
  },
  userVerifyDiscount:{
    costBeforeCoupon: "//div[1]/div[2]/div[1]/div[1]/div[2]/div[1]/span[2]",
    shippingPrice: "//div[1]/div[3]/span[2]",
    costAfterCoupon: "//div[1]/div[2]/div[1]/div[1]/div[2]/div[1]/span[2]"
  },
  userCouponError:{
    disabledCoupon: "//div[3]/div[1]/div[1]/div[1]/div[1]/span[1]"
  },
  adminSignInWindow: {
    adminInput: "//*[@id='email']",
    passwordInput: "//*[@id='passwd']",
    loginButton: "//button[1]/span[1]",
  },
  adminNavigatesToDiscount: {
    catalogButton: "//html/body/nav/div/ul/li[4]/a",
    discountButton: "//*[@id='subtab-AdminParentCartRules']/a[1]"
  },
  adminFindCoupon: {
    sortButton: "//th[2]/span[1]/a[2]/i[1]",
    part1CouponID: "//div[2]/table[1]/tbody[1]/tr[",
    part2CouponID: "]/td[3]",
    oneCouponExists: "//td[2]"
  },
  adminChangeCouponStatusToCanceled: {
    statusButton: "//*[@id='active_off']"
  },
  adminVerifyCouponIsDisabled: {
    verifyStatusButton: "//*[@id='active_on']"
  }
}