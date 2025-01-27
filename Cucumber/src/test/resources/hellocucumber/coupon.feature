Feature: A set of scenarios for testing the Presta Shop coupon application by user and management by admin.

  @Customer
  Scenario Outline: Customer uses a coupon that lowers the cost in the cart.
    Given Customer is logged in with "<Email>" and "<Password>"
    And Customer has a product in the cart
    And Customer is on Payment Page with Promo code open
    When Customer uses a coupon "<Coupon>"
    Then the cost in the cart is lowered "<PrecentLowered>"

    Examples:
      | Email                             | Password     | Coupon | PrecentLowered |

      | rudikkukuliev123@gmail.com        | acegh0211Or  | SoftwareQuality | 0.2            |

  @Admin
  Scenario Outline: Admin cancels the coupon.
    Given Admin is logged in the system with "<Email>" and "<Password>"
    And Admin is on the Cart Rules page within Catalog-Discounts
    And There is a coupon that we want to cancel with "<id>"
    When Admin change status of the coupon to canceled
    Then the coupon is disabled

    Examples:
      | Email                      | Password         | id   |

      | demo@prestashop.com        | prestashop_demo  | 1    |