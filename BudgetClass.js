// class

class HtmlUi{

    addToListsFromLocalStorage(){

     let entery=budget.getEnteryListFromLocalStorage()
     let allList=document.querySelector(".all-list")

     entery.forEach((element) =>{

        let name=element.name
        let amount=element.amount
        if (element.type==='expense') {
            let expenseList=document.querySelector(".expenses-list")
    expenseList.insertAdjacentHTML("afterbegin", `<li class="orange">
    
    <div>${name}: $${amount}</div> ${`<ul><img class="edit" src="images/edit.png"><img class="delete delete-expense" src="images/delete.png"></ul>`}
    
    </li>`)

    allList.insertAdjacentHTML("afterbegin", `<li class="orange">
    
    <div>${name}: $${amount}</div> ${`<ul><img class="delete delete-all" src="images/delete.png"></ul>`}
    
    </li>`)


            
        }

        if (element.type==='income') {
            let incomeList=document.querySelector(".income-list")
 incomeList.insertAdjacentHTML("afterbegin", `<li>
 
 <div>${name}: $${amount}</div> ${`<ul><img class="edit" src="images/edit.png"><img class="delete delete-income" src="images/delete.png"></ul>`}
 
 </li>`)
    allList.insertAdjacentHTML("afterbegin", `<li>
    
    <div>${name}: $${amount}</div> ${`<ul><img class="delete delete-all" src="images/delete.png"></ul>`}
    
    </li>`)

            
        }
        





     })





    }

 addToExpenseList(e){

  
    let textInput=e.target.parentElement.children[0]
    let numberInput=e.target.parentElement.children[1]
    if (textInput.value==='' || numberInput.value==='') { //validating inputs
        textInput.value=''
        numberInput.value=''
        return
        
    }
    let expenseList=document.querySelector(".expenses-list")
    expenseList.insertAdjacentHTML("afterbegin", `<li class="orange">
    
    <div>${textInput.value}: $${numberInput.value}</div> ${`<ul><img class="edit" src="images/edit.png"><img class="delete delete-expense" src="images/delete.png"></ul>`}
    
    </li>`)

    let allList=document.querySelector(".all-list")
    allList.insertAdjacentHTML("afterbegin", `<li class="orange">
    
    <div>${textInput.value}: $${numberInput.value}</div> ${`<ul><img class="delete delete-all" src="images/delete.png"></ul>`}
    
    </li>`)
    textInput.value=''
    numberInput.value=''
 }

 addToIncomeList(e){

 let textInput=e.target.parentElement.children[0]
 let numberInput=e.target.parentElement.children[1]
 if (textInput.value==='' || numberInput.value==='') { //validating inputs
    textInput.value=''
    numberInput.value=''
    return
    
}
 let incomeList=document.querySelector(".income-list")
 incomeList.insertAdjacentHTML("afterbegin", `<li>
 
 <div>${textInput.value}: $${numberInput.value}</div> ${`<ul><img class="edit" src="images/edit.png"><img class="delete delete-income" src="images/delete.png"></ul>`}
 
 </li>`)
 let allList=document.querySelector(".all-list")
    allList.insertAdjacentHTML("afterbegin", `<li>
    
    <div>${textInput.value}: $${numberInput.value}</div> ${`<ul><img class="delete delete-all" src="images/delete.png"></ul>`}
    
    </li>`)
    textInput.value=''
    numberInput.value=''
 }

deleteFromCurrentList(e){ e.target.parentElement.parentElement.remove()}

deleteFromOtherList(e,classname){

        //gets the classname as an argument and delete element from that list too
        let List=document.querySelectorAll("." +classname+ ' ' +'div'); //div contents
        let element=e.target.parentElement.parentElement.children[0];
        let values=element.textContent.split(": $");
        let name=values[0]
        let amount=values[1].trim()
        List.forEach((ListDiv,index)=>
        {
            let Listvalues=ListDiv.textContent.split(": $");
        let Listname=Listvalues[0]
        let Listamount=Listvalues[1].trim()
        if (name===Listname && amount===Listamount) {
            ListDiv.parentElement.remove();
            
        }


        })
}

setExpense(expense){document.querySelector(".outcome-amount").textContent=expense}
setBalance(balance){document.querySelector(".balance-amount").textContent=balance}
setIncome(income){document.querySelector(".income-amount").textContent=income}
edit(e){

    let content=e.target.parentElement.parentElement.children[0].textContent; //content that is going to be edited
    let values=content.split(": $")
    let name=values[0]
    let amount=parseInt(values[1].trim())
    let textbox=e.target.parentElement.parentElement.parentElement.nextElementSibling.nextElementSibling.nextElementSibling.children[0]
    let numberbox=e.target.parentElement.parentElement.parentElement.nextElementSibling.nextElementSibling.nextElementSibling.children[1]
    textbox.value=name
    numberbox.value=amount
}
}
class Budget {

    getEnteryListFromLocalStorage(){
     
        let entery=localStorage.getItem("entery-list")
        if(entery===null)
        entery=[]
        else
        entery=JSON.parse(entery)

        return entery

    }

    addIncomeToLocalStorage(){
        let text=document.querySelector(".add-income input[type='text']").value
        let number=document.querySelector(".add-income input[type='number']").value
        if (text==='' || number==='') { //validating inputs
            text=''
            number=''
            return
        }
        let entery=this.getEnteryListFromLocalStorage()
        
     entery.unshift({
         type:"income",
         name:text,
         amount:number
     })
localStorage.setItem("entery-list",JSON.stringify(entery))

    }
    addExpenseToLocalStorage(){

        let text=document.querySelector(".add-expense input[type='text']").value
        let number=document.querySelector(".add-expense input[type='number']").value
        if (text==='' || number==='') { //validating inputs
            text=''
            number=''
            return
        }
        let entery=this.getEnteryListFromLocalStorage()

     entery.unshift({
         type:"expense",
         name:text,
         amount:number
     })
     localStorage.setItem("entery-list",JSON.stringify(entery))

    }

    deleteFromLocalStorage(e){
        let element=e.target.parentElement.parentElement.children[0];
        let values=element.textContent.split(": $");
        let name=values[0]
        let amount=values[1].trim()
        let entery=this.getEnteryListFromLocalStorage()
        entery.forEach((element,index) => {
            if (element.name===name && element.amount===amount) {
                
                entery.splice(index,1)
                
            }
            localStorage.setItem("entery-list", JSON.stringify(entery))
            
        });
   
    }

calculateTotal(name){
    let entery=this.getEnteryListFromLocalStorage()
    let total=0;
    entery.forEach(element => {
        if (element.type===name) {

            total+=parseInt(element.amount)
        }
    });
        return total
}

calculateBalance(){

let expense=this.calculateTotal('expense')
let income= this.calculateTotal('income')
let balance= income-expense
return balance

}

}