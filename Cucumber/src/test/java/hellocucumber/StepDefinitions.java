package hellocucumber;

import io.cucumber.java.en.*;

import org.junit.jupiter.api.Assertions;
import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.TimeoutException;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.time.Duration;
import java.util.List;
import java.util.NoSuchElementException;

public class StepDefinitions {

    private final static String CHROME_DRIVER_PATH = "C:\\Users\\asafb\\Desktop\\הנדסת איכות תוכנה\\4\\2025-mbt-t\\Selenium\\chromedriver.exe";
    private ChromeDriver driver;
    private WebDriverWait wait;

    double costBefore = 0; // to make sure the cost has changed after entering the coupon.
    double costAfter = 0; // to make sure the cost has changed after entering the coupon.

    double shippingCost = 0; // to make sure the discount is correct ( it doesn't include the shipping )

    double totalCartCostBefore = 0; // to save the cart cost without the shipping

    double totalCartCostAfter = 0;// to save the cart cost without the shipping

    // Starts a new session for the customer, logging him in and placing him in the home page of PrestaShop
    @Given("Customer is logged in with {string} and {string}")
    public void customerIsLoggedInWithAnd(String email, String password) {
        System.setProperty("webdriver.chrome.driver", CHROME_DRIVER_PATH);
        this.driver = new ChromeDriver();
        this.wait = new WebDriverWait(driver, Duration.ofSeconds(60));
        driver.manage().window().maximize();
        driver.get("http://localhost:8080");

        // From home page to sign-in (top right)
        driver.findElement(By.xpath("//div[2]/div[1]/a[1]/span[1]")).click();

        // Enter email and password
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//*[@id='field-email']"))).sendKeys(email);
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//*[@id='field-password']"))).sendKeys(password);

        // Sign in
        driver.findElement(By.xpath("//*[@id='submit-login']")).click();
        try {
            Thread.sleep(2000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }

    // Chooses a product and adds it to the customer's cart.
    @And("Customer has a product in the cart")
    public void customerHasAProductInTheCart() {
        // scroll down to popular products
        JavascriptExecutor js = driver;
        js.executeScript("window.scrollBy(0, 500);");

        // enter Hummingbird printed sweater product page
        driver.findElement(By.xpath("//section[1]/div[1]/div[2]/article[1]/div[1]/div[2]/h3[1]/a[1]")).click();

        // add the product to the cart
        driver.findElement(By.xpath("//div[1]/div[2]/button[1]")).click();

    }

    // Placing the customer in the payment page with the promo code window open.
    @And("Customer is on Payment Page with Promo code open")
    public void customerIsOnPaymentPageWithPromoCodeOpen() {
        // select proceed to check out, wait a bit to load the modal first.
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
        WebElement proceedToCheckoutButton = wait.until(
                ExpectedConditions.elementToBeClickable(By.xpath("//*[@id='blockcart-modal']/div[1]/div[1]/div[2]/div[1]/div[2]/div[1]/div[1]/a[1]"))
        );
        proceedToCheckoutButton.click();

        // open promo code insert window
        driver.findElement(By.xpath("//div[1]/div[1]/div[3]/div[1]/p[1]/a[1]")).click();


    }

    // Customer enters the coupon code in the promo code window.
    @When("Customer uses a coupon {string}")
    public void customerUsesACoupon(String coupon_code) {
        // save the cost before the coupon use for the test later
        WebElement cartTotalElement = wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//div[1]/div[2]/div[1]/div[1]/div[2]/div[1]/span[2]")));
        String priceBeforeCoupon = cartTotalElement.getText();
        costBefore = parsePrice(priceBeforeCoupon);

        // Enter coupon code
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//form[1]/input[3]"))).sendKeys(coupon_code);

        // click on Add to add the coupon

        driver.findElement(By.xpath("//form[1]/button[1]/span[1]")).click();
    }

    // Checks that the coupon lowered the cost in the cart.
    @Then("the cost in the cart is lowered {string}")
    public void theCostInTheCartIsLowered(String precent) {
        double discountPrecent = Double.parseDouble(precent);
        // find the shipping price to subtract it from the total cart cost to find the price that the discount effects.
        WebElement cartShippingElement = wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//div[1]/div[3]/span[2]")));
        String shippingPrice = cartShippingElement.getText();
        shippingCost = parsePrice(shippingPrice);

        // price of the items in the cart without shipping before the coupon

        totalCartCostBefore = costBefore - shippingCost;

        // save the cost after the coupon use
        WebElement cartTotalElementAfter = wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//div[1]/div[2]/div[1]/div[1]/div[2]/div[1]/span[2]")));
        String priceAfterCoupon = cartTotalElementAfter.getText();
        costAfter = parsePrice(priceAfterCoupon);

        // price of the items in the cart without shipping after the coupon
        totalCartCostAfter = costAfter - shippingCost;

        // Calculate the expected discount
        double expectedDiscount = totalCartCostBefore * discountPrecent;

        // Calculate the actual discount
        double actualDiscount = totalCartCostBefore - totalCartCostAfter;

        // Assert that the actual discount matches the expected discount (allow for a small margin of error for rounding)
        double epsilon = 0.01; // margin of error four rounding
        Assertions.assertTrue(Math.abs(actualDiscount - expectedDiscount) <= epsilon,
                "Expected a discount of " + expectedDiscount + " but got " + actualDiscount
                        + ". Before: " + totalCartCostBefore + ", After: " + totalCartCostAfter);
    }

    private double parsePrice(String priceBeforeString) // Remove currency symbols
    {

        String sanitized = priceBeforeString.replaceAll("[^\\d.]", "");
        return Double.parseDouble(sanitized);
    }

    //===============================================================================================================//


    @Given("Admin is logged in the system with {string} and {string}")
    public void AdminIsExistInTheSystemWithAnd(String email, String password) {
        System.setProperty("webdriver.chrome.driver", CHROME_DRIVER_PATH);
        this.driver = new ChromeDriver();
        this.wait = new WebDriverWait(driver, Duration.ofSeconds(60));
        driver.manage().window().maximize();
        driver.get("http://localhost:8080/admina");
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//*[@id='email']"))).sendKeys(email);
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//*[@id='passwd']"))).sendKeys(password);
        driver.findElement(By.xpath("//button[1]/span[1]")).click();
    }

    @And("Admin is on the Cart Rules page within Catalog-Discounts")
    public void AdminNavigatesToTheCatalogDiscountsPage() {
        Duration val = Duration.ofSeconds(10);
        WebDriverWait wait = new WebDriverWait(driver, val);  // Wait for up to 10 seconds
        WebElement catalogElement = wait.until(ExpectedConditions.elementToBeClickable(By.xpath("//*[@id='subtab-AdminCatalog']/a")));
        catalogElement.click();
        WebElement discountsElement = wait.until(ExpectedConditions.elementToBeClickable(By.xpath("//*[@id='subtab-AdminParentCartRules']/a[1]")));
        ((JavascriptExecutor) driver).executeScript("arguments[0].scrollIntoView(true);", discountsElement);
        discountsElement.click();
    }
    @And("There is a coupon that we want to cancel with {string}")
    public void ThereIsExistCouponThatWeWantToCancelWith(String id) {
        //In case there is more than one coupon
        try {
            int int_id = Integer.parseInt(id);
            String dynamicXPath = "//div[2]/table[1]/tbody[1]/tr[" + int_id + "]/td[3]";
            WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10)); // Adjust the wait time as needed
            WebElement elementSort = wait.until(ExpectedConditions.elementToBeClickable(By.xpath("//th[2]/span[1]/a[2]/i[1]")));
            elementSort.click();
            driver.findElement(By.xpath(dynamicXPath)).click();
            //If failed there is one coupon than enter it
        } catch (TimeoutException e) {
            driver.findElement(By.xpath("//td[2]")).click();
        }
    }
    @When("Admin change status of the coupon to canceled")
    public void AdminChangeStatusOfTheCouponToCanceled() {
        driver.findElement(By.xpath("//*[@id='active_off']")).click();
    }
    @Then("the coupon is disabled")
    public void TheCouponIsDisabled() {
        WebElement activeOffButton = driver.findElement(By.id("active_on"));
        Assertions.assertFalse(activeOffButton.isSelected());
    }
}
