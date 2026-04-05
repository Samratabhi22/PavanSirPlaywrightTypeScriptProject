import {test,expect,Locator} from '@playwright/test'
//Static Dropdown (Select Tag) --> 1.Single Select DropDown 2. Multi Select Dropdown
//Dynamic DropDown --> 1.Auto Suggest DropDown(options Keep Changing) 2. Hidden DropDown or Boot Strap Down (options not visible) 

test("Auto Suggest Dropdown" , async({page})=>{
    await page.goto("https://www.flipkart.com/");
    await page.locator('xpath=//input[@name="q"]').fill("smart");
    //Get all the suggested options --> ctrl+shift+P on DOM -->emulate focussed page
    const options:Locator=page.locator("ul>li a");
    await page.waitForTimeout(5000);

    const count = await options.count();
    console.log("Number of Suggested Options:",count);
    await page.waitForTimeout(5000);

})