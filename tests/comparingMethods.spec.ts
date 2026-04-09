import {test,expect,Locator} from '@playwright/test'
test("Comparing Methods",async({page})=>{
    await page.goto ('https://demowebshop.tricentis.com/');
    const products:Locator = page.locator('.product-item');//6
    //1) innerText() Vs textContent()
    //console.log(await products.nth(1).innerText());
    console.log((await products.nth(1).textContent()).trim());

    const count = await products.count();
    for(let i=0;i<count;i++)
    {
    //   const productInnerText:string=await products.nth(i).innerText();  
    //   console.log("Product",i," : ",productInnerText);
      const productTextContent:string=await products.nth(i).textContent();  
      console.log("Product",i," : ",productTextContent.trim());
    }

    //2) allTextContents() Vs allInnerTexts()
    console.log("............allTextContents() Vs allInnerTexts()...........");
    const allTextContents = await products.allTextContents();
    console.log("All Text Contents:", allTextContents);

    const productNamestrimmed :string[]= allTextContents.map(text => text.trim());
    console.log("All Text Contents Trimmed:", productNamestrimmed);

    const allInnerTexts = await products.allInnerTexts();
    console.log("All Inner Texts:", allInnerTexts);

    //3) all() -> converts lOcator --> Array of locators {Locator[]}

    console.log("............all() method...........");
    const productLocators:Locator[] = await products.all();
   console.log("Product Locators:", productLocators);
   console.log("Product Locators Count:", productLocators.length);
   //for of loop used to iterate over array of locators
   for(let productLoc of productLocators)
   {
    console.log("Product Inner Text:", await productLoc.innerText());
   }

   //for in loop used to iterate over index of array of locators
   console.log("............for in loop...........");
   for(let index in productLocators)
   {
    console.log("Product Inner Text:", await productLocators[index].innerText());
   }
  
})