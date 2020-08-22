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
const storeContainer = document.querySelector('.store-items');
const filterbtn = document.querySelectorAll('.sortBtn button');
const search = document.querySelector('#search-item');

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
 }
