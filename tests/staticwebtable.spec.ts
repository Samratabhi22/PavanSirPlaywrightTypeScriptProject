import {test,expect,Locator} from '@playwright/test'

test("Static Web Table",async({page})=>{
await page.goto("https://testautomationpractice.blogspot.com/");
const table:Locator = page.locator("table[name ='BookTable'] tbody");
await expect(table).toBeVisible();

//1) Count number of rows in table
const rows:Locator = table.locator("tr");
await expect(rows).toHaveCount(7);//7 //approach 1

const rowCount:number =await rows.count();
console.log("Number of rows in table:",rowCount);
expect(rowCount).toBe(7);//approach 2

//2) Count number of headers/columns
const columnsHeader:Locator = table.locator("th");
await expect(columnsHeader).toHaveCount(4);//4 //approach 1

const columnHeaderCount:number =await columnsHeader.count();
console.log("Number of columns in table:",columnHeaderCount);
expect(columnHeaderCount).toBe(4);//approach 2

//3) read All the datas from second row of the table
const secondRow:Locator = rows.nth(2);
const secondRowData:Locator = secondRow.locator("td");
const secondRowDataCount:number = await secondRowData.count();
expect(secondRowDataCount).toBe(4);
console.log("Number of data in second row:",secondRowDataCount);
const secondRowsCellsText:string[] = await secondRowData.allTextContents();
console.log("All data in second row:",secondRowsCellsText);
expect(secondRowsCellsText).toEqual(["Learn Java", "Mukesh", "Java", "500"]);
expect(secondRowData).toHaveText(["Learn Java", "Mukesh", "Java", "500"]);//approach 2

console.log("Printing Second Row data one by one by the help of for-of loop...")
for(let cellText of secondRowsCellsText)
{
    console.log(cellText);
}

//4) read all the datas from the table except Header/columns
console.log("Printing all data from the table except Header/columns...");
const allRowsData:Locator[] = await rows.all();
console.log("BookName Author Subject Price");
for(let row of allRowsData.slice(1))//slice(1) used to skip first row which is header
{
    const rowCellsText:string[] = await row.locator("td").allInnerTexts();
    console.log("Data in row:", rowCellsText.join('\t'));//join('\t') used to separate cell data with tab space
}

//5) Print the book Names whose author is Mukesh
console.log("Printing book names whose author is Mukesh...");
const mukeshBooks:string[] = [];
for(let row of allRowsData.slice(1))//slice(1) used to skip first row which is header
{
    const rowCellsText:string[] = await row.locator("td").allInnerTexts();
    const authorName:string = rowCellsText[1];
    const bookName:string = rowCellsText[0];
    if(authorName === "Mukesh")
    {
        console.log(`Author: ${authorName}, Book Name: ${bookName}`);
        mukeshBooks.push(bookName);
    }
}
expect(mukeshBooks).toEqual(["Learn Java", "Master In Selenium"]);//approach 1
expect(mukeshBooks).toHaveLength(2);//approach 2

//7) Print the price of all the books present in the Table
console.log("Printing price of all the books present in the table...");
let totalBookPrice:number = 0;
for(let row of allRowsData.slice(1))//slice(1) used to skip first row which is header
{
    const rowCellsText:string[] = await row.locator("td").allInnerTexts();
    const bookPrice:number = parseInt(rowCellsText[3]);
    totalBookPrice += bookPrice;
}
console.log(`Total Book Price: ${totalBookPrice}`);
expect(totalBookPrice).toBe(7100);
})