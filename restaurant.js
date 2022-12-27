var items=document.querySelector(".Items");
var itemslist=document.querySelector(".leftside");
var Itemdata=document.querySelector(".itemdata");
var tableContent=document.querySelector(".tableBody");
var list;
var amount;
var totalamount=0;
var tax=0;
var discount=0;
var totalBill=document.querySelector(".totalbill");
var Tax=document.querySelector(".tamount");
var Discount=document.querySelector(".damount");
var Tdata=document.querySelector(".tdata");
var sum=0;
var placeorder=[];
var num;
var orde=document.querySelector(".show");
orde.addEventListener('click',pay);
var Current=document.querySelector(".hide");
Current.addEventListener("click",current);
var Tabular=document.querySelector(".tabular");

async function getData()
{
    let res=await fetch("http://localhost:3000/items")
     list=await res.json();
    console.log(list);
    for(let i=0;i<list.length;i++){
  //let res=await fetch(`http://localhost:3000/items`);
  itemslist.innerHTML+=`<button class="Items" onclick="displaydata(${i})">
   
      <p>${list[i].name}</p>
     <p>${list[i].price}</p>
    
      </button>`
}}
getData();
 
async function displaydata(id)
{
 
 /* let res=await fetch(`http://localhost:3000/items`);
     list=await res.json();
    console.log(list); 
    console.log(list[i].name); 
    
    Tdata.innerHTML+=
    `<tr>
    <td>${list[i].name}</td>
    <td>${1}</td>
    <td>${list[i].price}</td>
    </tr>`
   amount= `${list[i].price}`;
   totalamount=parseInt(totalamount)+parseInt(amount);
   console.log(totalamount);
   tax=(totalamount/100)*4;
   console.log(tax);
   discount=(totalamount/100)*3;
   totalBill.innerHTML=totalamount+tax;
Tax.innerHTML=tax;
Discount.innerHTML=discount;
   amount=totalamount-sum+tax;
//totalBill.value=amount;
console.log(amount);*/


placeorder.push({
  name:`${list[id].name}`,
  price:`${list[id].price}`,
   quantity:1
});
table(id);
console.log(placeorder);
}
function table(){
  Tdata.innerHTML="";
  for(let j=0;j<placeorder.length;j++){

  Tdata.innerHTML+=
  `<tr>
  <td>${placeorder[j].name}</td>
  <td><input type="number" class="q" onchange="quantity('${j}')"></td>
  <td>${(placeorder[j].price)*(placeorder[j].quantity)}</td>
  </tr>`
  amount= `${placeorder[j].price}`;
  totalamount=parseInt(totalamount)+parseInt(amount);
   console.log(totalamount);
  }
   tax=(totalamount/100)*4;
   console.log(tax);
   discount=(totalamount/100)*3;
   
Tax.innerHTML=tax;
Discount.innerHTML=discount;
   amount=totalamount-sum+tax;
totalBill.innerHTML=amount;
console.log(amount);
  
}

function clearli()
{
  Itemdata.innerHTML="";
  amount=0;
  totalBill.innerHTML="";
  
}

  document.querySelector(".placeorder").addEventListener("click",postdata);
//placeorder.addEventListener("click",post);
async function postdata(){
  var data=document.querySelector(".num").value;
  console.log(placeorder);
  var tableprint={
  
    customerName:data,
    order:placeorder,
    billamount:amount,
    disct:discount,
   
    

  
  }
let posting=await fetch(`http://localhost:3000/charges`,{
  method:"POST",
  headers:{"Content-Type":"application/json"},
  body:JSON.stringify(tableprint)
})
let datatotal=await posting.json();
console.log(datatotal);
placeorder=[]
displayTableData();
}
// placeorder.addEventListener("click",tabular);
// let tabul=document.getElementsByClassName(".rightcontainer");
// let main=document.querySelector(".mainbody")
// async function tabular(){
//   Tdata.style.display="block";
//   main.style.display="none";
//   console.log(itemslist);
//   let t=await fetch(`http://localhost:3000/items`);
//   let ta=await t.json();
//   console.log(ta);
//   for(let i=0;i<ta.length;i++){
//     tableprint.innerHTML+=
//     `<tr>
//     <td>${ta[i].customerName}</td>
//     <td>${ta[i].discountamount}</td>
//     <td>${ta[i].taxamount}</td>
//     <td>${ta[i].billamount}</td>
    
    
//     <td><button onclick="printamount(${ta[i].id})" id="vu">view </button></td>
//     </tr>`
//   }
//   console.log(ta.length);
//   ordernum.innerHTML+=ta.length;
// }
function pay(){
  document.querySelector(".mainbody").style.display="none";
document.querySelector(".tabular").style.display="block";
} 
 function current(){
  document.querySelector(".mainbody").style.display="block";
  document.querySelector(".tabular").style.display="none";
 }
 async function displayTableData(){
  let displayTable= await fetch('http://localhost:3000/charges')
  let responce= await displayTable.json();
  console.log(responce);
  for(let i=0;i<responce.length;i++){
    tableContent.innerHTML+=
        `<tr>
        <td>${responce[i].id}</td>
        <td>${responce[i].customerName}</td>
        <td>${responce[i].billamount}</td>
        <td><button  class="history" onclick="summary(${responce[i].id})">view</button></td>
        
        </tr>`
      }

 }
//  async function  table(){
//   let tabledata=await fetch("http://localhost:3000/items");
//   let tadata=await tabledata.json();
//   console.log(tadata);
//   for(let i=0;i<tadata.length;i++){
//     Tabular.innerHTML+=
//     `<tr>
//     <td>${tadata[i].customerName}</td>
//     <td>${tadata[i].discountamount}</td>
//     <td>${tadata[i].taxamount}</td>
//     <td>${tadata[i].billamount}</td>
    
//     </tr>`
//   }
//  }
async function summary(customers)
{
  document.querySelector(".modals").innerHTML="";
  document.querySelector(".modals").style.display="block";
  console.log(customers);
  let customerOrder=await fetch(`http://localhost:3000/charges/${customers}`);
  let details =await customerOrder.json();
  console.log(details);
  document.querySelector(".modals").innerHTML+=
 `<div class="detail">
  <p class="money">cash</p><br>
  <table>
  <tr>
  <th class="value">${details.customerName}</th>
  </tr>
  <tr>
  <td> <p class="para">Items:<br><span class="cusItems"></span>
  </p></td>
  <th class="value">${details.billamount}</th>
  </tr>
  <tr>
  <th class="value"><b>Discount:</b>${details.disct}</th>
  </tr>
  </table>
 
  </div>`;
  for(let k=0;k<details.order.length;k++){
    document.querySelector(".cusItems").innerHTML+=`${details.order[k].name}=${details.order[k].price}*${details.order[k].quantity}<br>`
console.log(`${details.order[k].name}`);
  }
}
function quantity(idval){
var uservalue=document.querySelectorAll(".q");
placeorder[idval].quantity=uservalue[idval].value;
  table();
}