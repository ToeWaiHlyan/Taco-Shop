import { foods} from './foods.js';
import { cart, saveToStorage } from './carts.js';

let foodsHTML = '';

foods.forEach((food)=>
{
    foodsHTML+=
    `
    <div class="foods-container" data-item="${food.item}">
        <div class="foods-image-container">
            <img src="${food.image}">
        </div>
        <div class="foods-name-container">
            <p>${food.name}</p>
        </div>
        <div class="foods-price-container">
            <p>$${(food.priceCents/100).toFixed(2)}</p>
        </div>
        <div class="added-message added-message-${food.id}">
            <img src="./pic/checkmark.png">Added
        </div>
        <div class="add-to-order-container">
            <button class="add-to-order" data-food-id='${food.id}'>Add To Order</button>
        </div>
    </div>
    `
});

document.querySelector('.menu-foods-container').innerHTML = foodsHTML;

function updateCartQuantity()
{
    let cartQuantity = 0;

    cart.forEach((cartItem)=>
    {
        cartQuantity+=cartItem.quantity;
    });

    document.querySelector('.quantity').innerHTML = cartQuantity;
}

document.querySelectorAll('.add-to-order').forEach((button)=>
{
    button.addEventListener('click',()=>
    {
        const foodId = button.dataset.foodId;

        let addedMessageId;
        const addedMessage = document.querySelector(`.added-message-${foodId}`);
        addedMessage.classList.add('added-message-visible');

        if(addedMessageId)
        {
            clearTimeout(timeoutId)
        }

        const timeoutId = setTimeout(()=>
        {
            addedMessage.classList.remove('added-message-visible')
        },2000);

        addedMessageId = timeoutId;

        let matchingItem;
        cart.forEach((cartItem)=>
        {
            if (foodId === cartItem.id)
            {
                matchingItem = cartItem
            }
        });

        if(matchingItem)
        {
            matchingItem.quantity += 1;
        }

        else
        {
            cart.push({id : foodId , quantity : 1})
        }

        console.log(cart)

        saveToStorage();
        updateCartQuantity();
    })
});

/*Search Foods*/
const searchInput = document.querySelector('.menu-search');
const notFoundMessage = document.querySelector('.not-found-message');

searchInput.addEventListener('keyup',handleSearch)

function handleSearch()
{
    const search = searchInput.value.toLowerCase().trim();

    let filteredFoods;

    filteredFoods = foods.filter((food)=>
    {
        return food.name.toLowerCase().includes(search);
    });

    if(filteredFoods.length === 0)
    {
        notFoundMessage.style.display = 'block';
    }
    
    else
    {
        notFoundMessage.style.display = 'none'
    }


    let filteredFoodsHTML = '';

    filteredFoods.forEach((food)=>
    {
        filteredFoodsHTML +=
        `
        <div class="foods-container">
        <div class="foods-image-container">
            <img src="${food.image}">
        </div>
        <div class="foods-name-container">
            <p>${food.name}</p>
        </div>
        <div class="foods-price-container">
            <p>$${(food.priceCents/100).toFixed(2)}</p>
        </div>
        <div class="added-message added-message-${food.id}">
            <img src="./pic/checkmark.png">Added
        </div>
        <div class="add-to-order-container">
            <button class="add-to-order">Add To Order</button>
        </div>
        </div>
        `
    });

    document.querySelector('.menu-foods-container').innerHTML = filteredFoodsHTML;
};



/*Filter Button*/
const buttons = document.querySelectorAll('.btn');
const foodsContainer = document.querySelectorAll('.foods-container');

buttons.forEach((button)=>
{
    button.addEventListener('click',(event)=>
    {
        event.preventDefault();
        setActiveBtn(event);

        const btnFilter = event.target.dataset.filter;
        console.log(btnFilter)

        foodsContainer.forEach((foods)=>
        {
            const foodsFilter = foods.dataset.item;

            if(btnFilter === 'all')
            {
                foods.style.display = 'block';
            }
            else if (btnFilter === foodsFilter)
            {
                foods.style.display = 'block';
            }
            else
            {
                foods.style.display = 'none';
            }
        })
    })
});

function setActiveBtn(event)
{
    buttons.forEach((button)=>
    {
        button.classList.remove('btn-clicked');
    });
    
    event.target.classList.add('btn-clicked');
};