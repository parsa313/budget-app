
// variables
let expenseButton = document.querySelector("#expense")
let incomeButton = document.querySelector("#income")
let allButton = document.querySelector("#all")
let expenseSign=document.querySelector(".add-expense-sign")
let incomeSign=document.querySelector(".add-income-sign")


// classes
let htmlUi=new HtmlUi();
let budget=new Budget();


// eventlisteners
eventlisteners()
function eventlisteners(){

    document.addEventListener("DOMContentLoaded", () =>{

     htmlUi.addToListsFromLocalStorage()
     let expense=budget.calculateTotal('expense')
     let income=budget.calculateTotal('income')
     let balance=budget.calculateBalance()
     htmlUi.setExpense(expense)
     htmlUi.setIncome(income)
     htmlUi.setBalance(balance)
    })
expenseButton.addEventListener("click",function ()
{
    if(!expenseButton.classList.contains("active"))
     expenseButton.classList.add("active") //activeing one button and deactiving other buttons
     incomeButton.classList.remove("active")
     allButton.classList.remove("active")
     document.querySelector(".income-list").style.display="none"
     document.querySelector(".all-list").style.display="none"
     document.querySelector(".expenses-list").style.display="block" //displaying list and adding box 
     document.querySelector(".add-income").style.display="none"
    document.querySelector(".add-expense").style.display="flex"
}
)
incomeButton.addEventListener("click", () =>

{
    incomeButton.classList.add("active")
    expenseButton.classList.remove("active")//activeing one button and deactiving other buttons
    allButton.classList.remove("active")
    document.querySelector(".expenses-list").style.display="none"
    document.querySelector(".all-list").style.display="none"
    document.querySelector(".income-list").style.display="block" //displaying list and adding box 
    document.querySelector(".add-expense").style.display="none"
    document.querySelector(".add-income").style.display="flex"
}
)
allButton.addEventListener("click", () =>
{

    allButton.classList.add("active")
    expenseButton.classList.remove("active")//activeing one button and deactiving other buttons
    incomeButton.classList.remove("active")
    document.querySelector(".expenses-list").style.display="none"
    document.querySelector(".add-expense").style.display="none"
    document.querySelector(".income-list").style.display="none"
    document.querySelector(".add-income").style.display="none"
    document.querySelector(".all-list").style.display="block" //displaying list

})


expenseSign.addEventListener("click",(e) =>{

    budget.addExpenseToLocalStorage()
    htmlUi.addToExpenseList(e)
    let expense=budget.calculateTotal("expense")
    let balance=budget.calculateBalance()
    htmlUi.setExpense(expense)
    htmlUi.setBalance(balance)




})

/*document.querySelector(".add-income-sign").addEventListener("click",htmlUi.addToIncomeList)*/
document.querySelector(".add-income-sign").addEventListener("click",(e) =>
{

   budget.addIncomeToLocalStorage()
   htmlUi.addToIncomeList(e)
   let income=budget.calculateTotal("income")
   let balance=budget.calculateBalance()
   htmlUi.setIncome(income)
   htmlUi.setBalance(balance)
   /*if (document.querySelector(".outcome-amount").value==='') {
       htmlUi.setExpense(0)
       
   }*/
}

)

document.addEventListener('click',function(e){
    if (e.target.classList.contains("edit")) {

        htmlUi.edit(e)
        
    }
    if( e.target.classList.contains('delete') ||  e.target.classList.contains('edit') ){ //event deligation for delete buttons
htmlUi.deleteFromCurrentList(e) 
budget.deleteFromLocalStorage(e)                                                    //element should be deleted too if edit clicked
let expense=budget.calculateTotal("expense")
let income=budget.calculateTotal("income")
let balance=budget.calculateBalance()
htmlUi.setExpense(expense)
htmlUi.setIncome(income)
htmlUi.setBalance(balance)

}

if(e.target.classList.contains("delete-expense") || e.target.classList.contains("delete-income") || e.target.classList.contains("edit")){ //event deligation for delete buttons
    htmlUi.deleteFromOtherList(e,'all-list')
    }

    if(e.target.classList.contains('delete-all')){ //event deligation for delete buttons
        htmlUi.deleteFromOtherList(e,'income-list') //making sure it will delete element wether its in income list or expense list
        htmlUi.deleteFromOtherList(e,'expenses-list')

        }

        
 });

    

 
   
}




