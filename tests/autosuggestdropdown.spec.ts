import {test,expect,Locator} from '@playwright/test'
//Static Dropdown (Select Tag) --> 1.Single Select DropDown 2. Multi Select Dropdown
//Dynamic DropDown --> 1.Auto Suggest DropDown(options Keep Changing) 2. Hidden DropDown or Boot Strap Down (options not visible) 

test("Auto Suggest Dropdown" , async({page})=>{
    await page.goto("https://www.flipkart.com/");
    const closeICon:Locator= page.locator('//span[@role="button"]');
    await closeICon.waitFor({state: 'visible', timeout: 10000});
    await closeICon.click();

    const searchInput = page.locator('input[name="q"]').first();
    await searchInput.fill("smart");

    const options:Locator = page.locator('ul>li');
    await options.first().waitFor({state: 'visible', timeout: 10000});

    const count = await options.count();
    console.log("Number of Suggested Options:",count);
    console.log("Printing all the auto suggestions.....");

    for(let i=0;i<count;i++){
        const option = options.nth(i);
        const optionText = (await option.textContent())?.trim();
        console.log("Suggested Option:", optionText);
    }

    // for(let i=0;i<count;i++){
    //     const option = options.nth(i);
    //     const optionText = (await option.textContent())?.trim();
    //     if(optionText && optionText.toLowerCase().includes("smart tv")){
    //         await option.waitFor({state: 'visible', timeout: 10000});
    //         await option.scrollIntoViewIfNeeded();
    //         await option.click();
    //         break;
    //     }
    // }
    for(let i=0;i<count;i++){
        const text = await options.nth(i).innerText();
      if(text==="smartphone"){
       await options.nth(i).click();
       break;

      }
    }


})