import React, { useState, useEffect } from "react";
import { AuthProvider } from "./contexts/AuthContext";
import {
  Products,
  Navbar,
  Cart,
  Checkout,
  Login,
  Orders,
  Logout,
} from "./components";
import { commerece } from "./lib/commerce";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

const App = () => {
  const [categories, setCategories] = useState([]);
  const [cart, setCart] = useState({});
  const [order, setOrder] = useState({});
  const [errorMessage, setErrorMessage] = useState("");

  const fetchProducts = async () => {
    const { data: products } = await commerece.products.list();
    const { data: categoriesData } = await commerece.categories.list();
    const productPerCategory = categoriesData.reduce((acc, category) =>{
      return [
        ...acc, {
          ...category,
          productsData: products.filter((product) =>
          product.categories.find((cat) => cat.id === category.id)
          ),
        },
      ];
    }, [ ])
     
    setCategories(productPerCategory);
  };

  const fetchCart = async () => {
    setCart(await commerece.cart.retrieve());
  };
  const handleAddToCart = async (productId, quantity) => {
    const { cart } = await commerece.cart.add(productId, quantity);
    setCart(cart);
  };
  const handleUpdateCartQty = async (productId, quantity) => {
    const { cart } = await commerece.cart.update(productId, { quantity });
    setCart(cart);
  };
  const onRemoveFromCart = async (productId) => {
    const { cart } = await commerece.cart.remove(productId);
    setCart(cart);
  };
  const handleEmptyCart = async () => {
    const { cart } = await commerece.cart.empty();
    setCart(cart);
  };
  const refreshCart = async () => {
    const newCart = await commerece.cart.refresh();

    setCart(newCart);
  };
  const onCaptureCheckout = async (checkoutTokenId, newOrder) => {
    try {
      const incomingOrder = await commerece.checkout.capture(
        checkoutTokenId,
        newOrder
      );
      setOrder(incomingOrder);
      
      refreshCart();
    } catch (error) {
      setErrorMessage(error.data.error.message);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, []);

  return (
    <Router>
      <div>
        <AuthProvider>
          <Navbar totalItems={cart.total_items} />
          <Switch>
            <Route exact path="/">
              <Products categories={categories} onAddToCart={handleAddToCart} />
            </Route>
            <Route exact path="/cart">
              <Cart
                cart={cart}
                handleUpdateCartQty={handleUpdateCartQty}
                handleEmptyCart={handleEmptyCart}
                handleRemoveFromCart={onRemoveFromCart}
              />
            </Route>
            <Route exact path="/checkout">
              <Checkout
                cart={cart}
                order={order}
                onCaptureCheckout={onCaptureCheckout}
                error={errorMessage}
              />
            </Route>
            <Route exact path="/login">
              <Login />
            </Route>
            <Route exact path="/orders">
              <Orders  categories={categories} onAddToCart={handleAddToCart}/>
            </Route>
            <Route exact path="/logout">
              <Logout  refreshCart={refreshCart}/>
            </Route>
          </Switch>
        </AuthProvider>
      </div>
    </Router>
  );
};
export default App;
