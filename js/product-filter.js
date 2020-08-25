
let products = [
    {
        id: 1,
        img: "images/mask-1.jpg",
        title: "surgical mask without nosebar",
        price: 10,
        category: "mask"
    },
    {
        id: 2,
        img: "images/mask-2.jpg",
        title: "surgical mask with nosebar",
        price: 12,
        category: "mask"
    },
    {
        id: 3,
        img: "images/mask-3.jpg",
        title: "kn95 mask",
        price: 550,
        category: "mask"
    },
    {
        id: 4,
        img: "images/ppe.jpg",
        title: "ppe",
        price: 2500,
        category: "ppe"
    },
    {
        id: 5,
        img: "images/glove.jpg",
        title: "surgical gloves",
        price: 20,
        category: "glove"
    },
    {
        id: 6,
        img: "images/handsanitizer.jpg",
        title: "handsanitizer",
        price: 120,
        category: "sanitizer"
    }
]
let showcartlist = [];
const storeContainer = document.querySelector('.store-items');
const filterbtn = document.querySelectorAll('.sortBtn button');
const search = document.querySelector('#search-item');
const shop = document.querySelector('.cart');
const container = document.querySelector('.cart .allAdd');
let clearAll = document.getElementById('cart-items-clear');
let proceed = document.getElementById('checkout');
console.log(clearAll);
let totalQunatity = 0;
let totalCost = 0;
//showing cart
const cartMainBtn = document.getElementById('cart-info');
const cart = document.getElementById('cart');
    //press cart option
    cartMainBtn.addEventListener('click',function(){
        cart.classList.toggle('show-cart');
        window.scrollTo(0,0);
        if(showcartlist.length == 0){
            container.innerHTML = "No product to show";
        }
    });

function check(){
    filterbtn.forEach(c =>{
      if( c.classList.contains('active')){
          c.classList.remove('active');
      }
    });
}
 
//showing all products first when page loaded
window.addEventListener('DOMContentLoaded',() =>{
    displayAllProducts(products);
    
});

//Activity for filter button
filterbtn.forEach(function(btn){
     btn.addEventListener('click', function(e) {
        const cate = e.currentTarget.dataset.id;
        //console.log(cate);
        let proCategory = products.filter(function(proItem){
           if(cate === proItem.category){
               return proItem;
           }
        });
        //console.log(proCategory);
        if(cate === "all"){
            displayAllProducts(products);
        }
        else{
            displayAllProducts(proCategory);
        }
     });
});

//activity for search
search.addEventListener('keyup',(event)=>{
    let getValue = search.value;
    if(event.key === 'Enter'){
        getValue = getValue.trim().toLowerCase();
        if(getValue != ""){
            let proSearch = products.filter(function(sItem){
                if(sItem.title.includes(getValue)){
                    return sItem;
                }
            });
            if(proSearch.length == 0){
                storeContainer.innerHTML = `
                <div class="col-sm-8 col-md-6 col-lg-4 col-xl-4 store-item my-3 mx-auto">
                  <p class="text-center text-uppercase">Nothing Found</p>
                </div>`;
               
            }
            else{
                displayAllProducts(proSearch);
            }
           
        }
        check();
        
    }
    else{
        if(getValue === ""){
            displayAllProducts(products);
            document.getElementById('btns').classList.add('active');
        }
  }
  
});

//function for display product in store items section
function displayAllProducts(itemall){
    let displayProduct = itemall.map(function(item){
        
        return `
        <div class="col-sm-8 mx-auto col-md-6 col-lg-4 col-xl-4 store-item my-3">
        <div class="card">
           <div class="img-container">
            <a href="${item.img}" target= "_blank"><img src="${item.img}" class="card-img-top store-img" alt="${item.title}" height="274px"></a>
            <span class="store-item-icon"><i class="fas fa-shopping-cart"></i></span>
           </div>
            <div class="card-body bg-color">
                <div class="card-text d-flex justify-content-between text-capitalize">
                    <h5 id="store-item-name">${item.title}</h5>
                    <h5 class="store-item-value">&#x9f3 <strong id="store-item-price" class="font-weight-bold">${item.price}</strong></h5>
                </div>
            </div>
          </div>
        </div>
        `;
    });
    displayProduct = displayProduct.join("");
    storeContainer.innerHTML = displayProduct;
    addCartFunc();
 }

 //add to cart functionality
 function setItemCart(items){
     let index;
     if(showcartlist.length > 0){
        showcartlist.filter(function(item){
            if(items.title === item.title){
                index = showcartlist.indexOf(item);
            }
        });
        if(index == undefined){
            showcartlist.push(items);
        }
        else{
            showcartlist[index].qunatity +=1;
        }
    
     }
     else{
         showcartlist.push(items);
     }
     //display inCart section
     displayinCart(showcartlist);
     showItemsinCart(showcartlist);
  }

//display in-cart function
function displayinCart(){
    //console.log(list);
    //fill cost in navbar and cart div
    let totalContainer = document.querySelector('.cart-info p .item-total');
    let totalCart = document.querySelector('.cart-total-container #cart-total');
    totalContainer.textContent = totalCost;
    totalCart.textContent = totalCost;
    //fill item in navbar
    let itemContainer = document.querySelector('.cart-info p #item-count');
    itemContainer.textContent = totalQunatity;
    
}
function showItemsinCart(listItem){
    var i=0;
    var j=0;
    var k=0;
    let showinCart = listItem.map(det =>{
        
        return `
        <div class="cart-item d-flex justify-content-between align-items-center my-1">
            <img src="${det.image}" class="rounded-circle" id="item-img" alt="cart-img" width="50px" height="50px">
            <!-- detail -->
            <div class="cart-item-text text-center">
                <p id="cart-item-title" class="mb-0 text-capitalize">${det.title}
                </p>
                <span>&nbsp &#x9f3</span>
                <span class="cart-item-price mb-0" id="cart-item-price">${det.price}</span>
            </div>
            <!--Quantity-->
            <div class="cart-item-quantity d-flex justify-content-between">
                <span class="mb-0 mr-2"><i class="fas fa-angle-left" onclick = "decOne(${j++})"></i></span>
                <p class="font-weight-bold" id="quan">${det.qunatity}</p>
                <span class="mb-0 ml-2"><i class="fas fa-angle-right" onclick = "incOne(${k++})"></i></span>
            </div>
            <span class="cart-item-remove" id="cart=item-remove"><i class="fas fa-trash-alt" onclick="delItem(${i++})"></i></span>
         </div>
        `
    });
    showinCart = showinCart.join("");
    container.innerHTML = showinCart;
}
//increase
function incOne(rec){
    let number = showcartlist[rec].qunatity;
    number += 1;
    //nav-info update
    totalQunatity +=1;
    let p = showcartlist[rec].price;
    totalCost += p;
    displayinCart();
    //incart Update
    showcartlist[rec].qunatity = number;
    showItemsinCart(showcartlist);
}
//decrease
function decOne(rec){
    //console.log(rec);
    let number = showcartlist[rec].qunatity;
    if(number>1){
        number -= 1;
        totalQunatity -=1;
        let p = showcartlist[rec].price;
        totalCost -= p;
        displayinCart();
        //incart Update
        showcartlist[rec].qunatity = number;
        showItemsinCart(showcartlist);
    }
    else{
        alert("You must keep 1 product");
    }
    
}
//delete
function delItem(take){
    let number = showcartlist[take].qunatity;
    let price = showcartlist[take].price;
    totalQunatity-=number;
    totalCost-=(number*price);
    displayinCart();
    showcartlist.splice(take,1);
    if(showcartlist.length == 0){
        container.innerHTML = "No product to show";
    }
    else{
        showItemsinCart(showcartlist);
    }
}
 //added when clicked
function addCartFunc(){
    const a = document.querySelectorAll('.store-item-icon');
    
    //event for add cart request
    a.forEach((addCart) => {
        addCart.addEventListener('click',function(event){
            //console.log(event.target.parentElement)
            let cartItems = {};
          if(event.target.parentElement.classList.contains("store-item-icon")){
            //   taking image here
              let imgPath = event.target.parentElement.previousElementSibling.firstElementChild.src;
              //slice the path before img folder
              let position = imgPath.indexOf("images"); 
              let image = imgPath.slice(position);
              cartItems.image = image;

              //taking title of product here
              let getName = event.target.parentElement.parentElement.nextElementSibling.firstElementChild.firstElementChild.textContent;
              cartItems.title = getName;

              //taking price
              let price = event.target.parentElement.parentElement.nextElementSibling.firstElementChild.
              lastElementChild.lastElementChild.textContent;
              price = parseInt(price);
              cartItems.price = price;
              //take quantity
              cartItems.qunatity = 1;
             //totalqunatity
              totalQunatity +=1;
            //total cost
              totalCost += price;
              //set to the showcartList
              getName = getName.toUpperCase();
              alert(getName+" added to the cart succesfully!")
              setItemCart(cartItems);
              
          }
        })
    });
 }
//procced btn
function proc(){
    proceed.addEventListener('click',function(){
        alert("Thank you for your order!");
        showcartlist.length = 0;
        container.innerHTML = "No product to show";
        totalCost =0;
        totalQunatity=0;
        displayinCart();
    });
}
//function clear
function removeall(){
    clearAll.addEventListener('click',function(){
        alert("Your products are removed");
        showcartlist.length = 0;
        totalCost =0;
        totalQunatity=0;
        displayinCart();
        container.innerHTML = "No product to show";
    });
}
proc();
removeall();