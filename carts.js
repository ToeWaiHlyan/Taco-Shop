export let cart = JSON.parse(localStorage.getItem('cart'));

if(!cart)
{
    cart = 
    [
        {
            id : '1',
            quantity : 1,
        }
    ];
}

export function saveToStorage()
{
    localStorage.setItem('cart',JSON.stringify(cart));
}

export function removeFromCart(foodId)
{
    const newCart = [];

    cart.forEach((cartItem)=>
    {
        if (cartItem.id !== foodId)
        {
            newCart.push(cartItem);
        }
    });
    
    cart = newCart;
    saveToStorage();
}
