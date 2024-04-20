import { foods } from "./foods.js";
import { cart, removeFromCart, saveToStorage } from "./carts.js";

function orderSummary()
{    
    let cartHTML = '';

    cart.forEach((cartItem)=>
    {
        const foodId = cartItem.id;

        let matchingProduct;

        foods.forEach((food)=>
        {
            if (foodId === food.id)
            {
                matchingProduct = food;
            }
        });

        cartHTML += 
        `
            <div class="order-item-grid js-cart-item-container-${matchingProduct.id}">
                <img src="${matchingProduct.image}" class="food-img">
                <div class="order-name js-cart-item-container-${matchingProduct.id}">
                    <p class="tacos-name">${matchingProduct.name}</p>
                    <div class="quantity-container">
                        <div class="quantity-left-section">
                            <button class="add-btn-container-${matchingProduct.id} update-quantity" data-food-id=${matchingProduct.id}>+</button>
                        </div>
                        <div class="quantity-middle-section js-middle-section-${matchingProduct.id}" data-food-id=${matchingProduct.id}>${cartItem.quantity}</div>
                        <div class="quantity-right-section">
                            <button class="reduce-btn-container-${matchingProduct.id} reduce-quantity" data-food-id=${matchingProduct.id}>-</button>
                        </div>
                    </div>
                    <p class="taco-quantity quantity-${matchingProduct.id}" data-food-id="${matchingProduct.id}">Quantity : ${cartItem.quantity}</p>
                    <p class="price js-price-container${matchingProduct.id}" data-food-id="${matchingProduct.id}">Price : $${(matchingProduct.priceCents/100).toFixed(2)}</p>
                </div>
                <div class="delete-order">
                    <img src="./pic/icons8-delete.gif" class="delete-quantity js-delete-quantity" data-food-id="${matchingProduct.id}">
                </div>
            </div>
        ` 
    });

    document.querySelector('.order-item').innerHTML = cartHTML;
    renderCheckoutHeader();
    payment()
    saveToStorage();

    document.querySelectorAll('.update-quantity').forEach((btn)=>
    {
        btn.addEventListener('click',()=>
        {
            const foodId = btn.dataset.foodId;
            const container = document.querySelector(`.js-middle-section-${foodId}`);
            const tacoQuantity = document.querySelector(`.quantity-${foodId}`);
            const priceContainer        = document.querySelector(`.js-price-container${foodId}`);
            let matchingItem;
            let matchingProduct;
            let foodPriceCent = 0;
            cart.forEach((cartItem)=>
            {
                if (cartItem.id === foodId)
                {
                    matchingItem = cartItem;
                    matchingItem.quantity+=1;
                }

                foods.forEach((food)=>
                {
                    if (food.id === foodId)
                    {
                        matchingProduct = food;
                        foodPriceCent  += matchingProduct.priceCents * cartItem.quantity;
                    }
                });
            })
            renderCheckoutHeader();
            payment();
            saveToStorage();
            container.innerHTML = matchingItem.quantity;
            tacoQuantity.innerHTML = `Quantity : ${matchingItem.quantity}`;
            priceContainer.innerHTML = `Price : $${(Math.round(foodPriceCent/100).toFixed(2))}`
        })
    })

    
    document.querySelectorAll('.reduce-quantity').forEach((btn)=>
    {
        btn.addEventListener('click',()=>
        {
            const foodId = btn.dataset.foodId;
            const container = document.querySelector(`.js-middle-section-${foodId}`);
            const tacoQuantity = document.querySelector(`.quantity-${foodId}`);
            const priceContainer        = document.querySelector(`.js-price-container${foodId}`);
            let matchingItem;
            let matchingProduct;
            let foodPriceCent = 0;
            cart.forEach((cartItem)=>
            {
                if (cartItem.id === foodId)
                {
                    matchingItem = cartItem;

                    if (matchingItem.quantity > 0)
                    {
                        matchingItem.quantity -=1;
                    }
                    if (matchingItem.quantity <= 0)
                    {
                        const container = document.querySelector(`.js-cart-item-container-${foodId}`)
                        container.remove();
                        saveToStorage();
                    }
                }

                foods.forEach((food)=>
                {
                    if (food.id === foodId)
                    {
                        matchingProduct = food;
                        foodPriceCent  += matchingProduct.priceCents * cartItem.quantity;
                    }
                });
            })
            renderCheckoutHeader();
            payment();
            saveToStorage();
            container.innerHTML = matchingItem.quantity;
            tacoQuantity.innerHTML = `Quantity : ${matchingItem.quantity}`;
            priceContainer.innerHTML = `Price : $${(Math.round(foodPriceCent/100).toFixed(2))}`
        })
    })

    document.querySelectorAll('.js-delete-quantity').forEach((link)=>
    {
        link.addEventListener('click',()=>
        {
           const foodId = link.dataset.foodId;
           removeFromCart(foodId);
           renderCheckoutHeader();
           const container = document.querySelector(`.js-cart-item-container-${foodId}`)
           container.remove();
           payment();
        })
    })
};

function renderCheckoutHeader()
{
  let cartQuantity = 0 ;
  
  cart.forEach((cartItem)=>
  {
    cartQuantity+=cartItem.quantity;
  });


  const checkoutHeaderHTML = 
  `
    <div class="cart-container">
        <div class="cart-header-left-section">
            <a href="menu.html">
                <img src="./pic/main.1.png" class="cart-logo">
            </a>
        </div>
        <div class="cart-header-middle-section">
            <div class="order-cart">Order Items <span class="cart-quantity">(${cartQuantity})</span></div>
        </div>
        <div class="cart-header-right-section">
            <img src="./pic/pngtree-cartoon-taco-happy-png-free-vector-and-png-image_7553493.png"/>
        </div>
    </div>  
`
  document.querySelector('.cart-header').innerHTML = checkoutHeaderHTML;
};

function payment()
{
    let foodPrice = 0;
    cart.forEach((cartItem)=>
    {
        let matchingItem;
        foods.forEach((food)=>
        {
            if (food.id === cartItem.id)
            {
                matchingItem = food
            };
        });

        const food = matchingItem;
        foodPrice += food.priceCents * cartItem.quantity;
    });

    const totalBeforeTax = foodPrice;
    const tax            = totalBeforeTax * 0.1;
    const total          = totalBeforeTax + tax;

    let cartQuantity = 0;
    cart.forEach((cartItem)=>
    {
        cartQuantity += cartItem.quantity;
    });

    const paymentHTML = 
    `
    <div class="payment-title">Order</div>
    <div class="payment-quantity-grid">
        <div>Item (${cartQuantity}) : </div>
        <div class="payment-quantity-money">$${(Math.round(foodPrice)/100).toFixed(2)}</div>
    </div>
    <div class="payment-quantity-grid">
        <div>Estimated tax (10%)</div>
        <div class="payment-quantity-money">$${(Math.round(tax)/100).toFixed(2)}</div>
    </div>
    <div class="total-row">
        <div>Order Total</div>
        <div class="payment-quantity-money">$${(Math.round(total)/100).toFixed(2)}</div>
    </div>
    <button class="order-button">
        <img src="./pic/pngaaa.com-3867263.png">
        <span class="order">Place Your Order</span>
   </button>
    `
    document.querySelector('.payment-grid').innerHTML = paymentHTML;
    document.querySelector('.order-button').addEventListener('click',()=>
    {
      const order = document.querySelector('.order');

      if(order.innerHTML === 'Place Your Order')
        {
            setTimeout(()=>
            {
            order.innerHTML = `Order Confirmed Successfully`;
            },1000);
    
            setTimeout(()=>
            {
            order.innerHTML = `Thank For Your Order`;
            },5000);
        }
    })
}


document.addEventListener("DOMContentLoaded",()=>
{
    orderSummary();
});

