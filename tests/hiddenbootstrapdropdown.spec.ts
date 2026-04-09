import{test,expect,Locator} from '@playwright/test'
test("Boot Strap hidden dropdown",async({page})=>{
 await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");

 //Login Steps
 await page.locator('input[name="username"]').fill("Admin");
 await page.locator('input[name="password"]').fill("admin123");
 await page.locator('button[type="submit"]').click();

 //click on PIM
 await page.getByText("PIM").click();

 //click on Job Title Dropdown
 await page.locator('form i').nth(2).click();
 await page.waitForTimeout(3000);

 //capture all the ptions from dropdown and count
 const options:Locator = page.locator("div[role='listbox'] span")

 const count:number = await options.count();
 console.log("Number of options in dropdown:",count);

 //Print all the options from dropdown
console.log("All text Contents :",await options.allTextContents());
console.log("Printing all the options from dropdown.....");
for(let i=0;i<count;i++)
{
    const optionText = await options.nth(i).textContent();
    console.log("Option",i," : ",optionText);
}

//Select or click on option
for(let i=0;i<count;i++)
{
    const optionText = await options.nth(i).textContent();
    if(optionText==='Automation Tester')
    {
     await options.nth(i).click();
     break;
    }
}
await page.waitForTimeout(3000);


})
