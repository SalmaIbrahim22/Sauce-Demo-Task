import{expect, test} from '@playwright/test'
import { text } from 'stream/consumers';
test.describe("login test cases",async () => {
    
    test.beforeEach("should have the correct title",async ({page})=> {
        await page.goto("https://www.saucedemo.com");
        
       // await page.pause();
        

    });
    test("login by valid username and password",async({page})=> {
         //await page.goto("https://www.saucedemo.com/v1/index.html");
          
          const username =  page.locator('[data-test="username"]');
          await(username).fill("standard_user");
          const password =  page.locator('[data-test="password"]');
          await(password).fill("secret_sauce");
          const login_button =page.locator(".btn_action")
          await(login_button).click();
          await expect(page).toHaveURL("https://www.saucedemo.com/v1/inventory.html");
     //const url = await page.url();

     //console.log(url);
     await page.pause()
    });

    test("sorting the products",async({page})=> {
      await page.goto("https://www.saucedemo.com/v1/inventory.html");
       const inventory_containor =  page.locator(".product_sort_container");
       await(inventory_containor).selectOption("za");
       await(inventory_containor).click();
       
  //const url = await page.url();
 // console.log(url);
  await page.pause()
 });
 test("user can add products to card",async({page})=> {
  await page.goto("https://www.saucedemo.com/v1/inventory.html");
   const addToCartButtons = page.locator('.inventory_item button');
   const numberOfProductsToAdd = 4;
for(let i=0; i<numberOfProductsToAdd;i++){
  await addToCartButtons.nth(i).click();
  
}
await expect(page.locator('.shopping_cart_badge')).toHaveText(String(numberOfProductsToAdd));
const removeCartfromButtons = page.locator('.inventory_item button');
   const numberOfProductsToRemove = 3;
for(let i=0; i<numberOfProductsToRemove;i++){
  await removeCartfromButtons.nth(i).click();
}
await expect(page.locator('.shopping_cart_badge')).toHaveText(String(numberOfProductsToRemove)); 
   
   
//await expect(username).toBeVisible();
//const url = await page.url();
//console.log(url);
await page.pause()
});
test("remove products from card",async({page})=> {
  await page.goto("https://www.saucedemo.com/v1/inventory.html");
   const removeCartfromButtons = page.locator('.inventory_item button');
   const numberOfProductsToRemove = 3;
for(let i=0; i<numberOfProductsToRemove;i++){
  await removeCartfromButtons.nth(i).click();
}
   
   
   
//await expect(username).toBeVisible();
//const url = await page.url();
//console.log(url);
await page.pause()
});
test("view card products",async({page})=> {
  //await page.goto("https://www.saucedemo.com/v1/inventory.html");
  await page.fill('#user-name', 'standard_user');
  await page.fill('#password', 'secret_sauce');
  await page.click('#login-button');
  
  // Add a product to the cart
  await page.locator('.inventory_item button').first().click();
  
  // View cart
  await page.click('.shopping_cart_link');
  
  // Verify cart contains product
  const cartItem = await page.locator('.cart_item').count();
  expect(cartItem).toBeGreaterThan(0);
  await page.click('.btn_secondary');
  await page.click('.checkout_button');
 // const removeCart = page.locator('.btn_secondary');
  //await (removeCart).click();
//const url = await page.url();
//console.log(url);
await page.pause()
});

test("fill checkout",async({page})=> {
  //await page.goto("https://www.saucedemo.com/v1/inventory.html");
  await page.fill('#user-name', 'standard_user');
  await page.fill('#password', 'secret_sauce');
  await page.click('#login-button');
  
  // Add a product to the cart
  await page.locator('.inventory_item button').first().click();
  
  // View cart
  await page.click('.shopping_cart_link');
  
  // Verify cart contains product
  const cartItem = await page.locator('.cart_item').count();
  expect(cartItem).toBeGreaterThan(0);
  const check_out_but= await page.locator('.checkout_button');
 await  (check_out_but).click();
 await page.fill('#first-name', 'salma');
  await page.fill('#last-name', 'ebrahim');
  await page.fill('#postal-code', '00012');
const cancel_button = await page.locator('.cart_cancel_link');
  await (cancel_button).click();
  await page.click('#react-burger-menu-btn');
  await page.click('#logout_sidebar_link');

//const url = await page.url();
//console.log(url);
await page.pause()
});
  
   test("should able to fill the search",async({page})=> {
    await page.goto("https://www.booktime.org/ar/");
     
   const searchbutton =  page.locator(".medium");
    searchbutton.click();
   const searchField =  page.locator("#keyword");   
   await searchField.fill("حكاية");
   await page.pause()
   await expect(searchField).toHaveValue("حكاية");

//const url = await page.url();
//console.log(url);
});
test("should able to see search result",async({page})=> {
  await page.goto("https://www.booktime.org/ar/");
   //expect(page).toHaveURL("booktime.org");
 const searchbutton =  page.locator(".medium");
  await searchbutton.click();
 const searchField =  page.locator("#keyword");   
 await searchField.fill("حكاية");
 await searchField.dblclick();
 await page.pause();
 await expect(searchField).toHaveValue("حكاية");
 const searchsubmit=page.locator("#btnSearch");
 await searchsubmit.click();
 const searchresult =  page.locator('h1:has-text("ابحث")');
 await expect(searchresult).toHaveText("ابحث");
//const url = await page.url();
//console.log(url);
});

   
});

    
