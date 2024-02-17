import React, { Component } from "react";
import { client } from "./shopifyStore";
const ShopContext = React.createContext();

class ShopProvider extends Component {
  state = {
    products: [],
    product: {},
    checkout: {},
    isCartOpen: false
  };
  componentDidMount() {
    this.setProducts()
    if (localStorage.checkout_id) {
      this.fetchCheckout(localStorage.checkout_id);
    } else {
      this.createCheckout()
    }
  }

  getProducts = async () => {
    const products = client.product.fetchAll()
    return products
  }

  setProducts = async () => {
    const products = await this.getProducts()
    this.setState({ products: products });
  }

  getProduct = async (productId)=>{
    const product = client.product.fetch(productId)
    return product
  }

  getProductByHandle = async (handle)=>{
    const product = client.product.fetchByHandle(handle)
    return product
  }

  getCheckoutUrl = ()=>{
    return this.state.checkout.webUrl
  }

  createCheckout = async () => {
    const checkout = await client.checkout.create();
    localStorage.setItem("checkout_id", checkout.id);
    this.setState({ checkout: checkout });
  };
  fetchCheckout = async (checkoutId) => {
    client.checkout.fetch(checkoutId).then((checkout) => {
      this.setState({ checkout: checkout });
    });
  };
  addItemToCheckout = async (variantId, quantity) => {
    const lineItemToAdd = [
      {
        variantId,
        quantity: parseInt(quantity, 10),
      },
    ];
    const checkout = await client.checkout.addLineItems(
      this.state.checkout.id,
      lineItemToAdd
    );
    this.setState({ checkout: checkout });
    console.log("added", checkout);
  };
  removeLineItem = async (checkoutItemId) => {
    const lineItemsToRemove = [
      checkoutItemId
    ];
    const checkout = await client.checkout.removeLineItems(
      this.state.checkout.id,
      lineItemsToRemove
    );
    this.setState({ checkout: checkout });
    console.log("removed", checkout);
  };
  updateItemQuantity = async (checkoutItemId, quantity) => {
    const lineItemsToUpdate = [
      {
        id: checkoutItemId,
        quantity: parseInt(quantity),
      },
    ];
    const checkout = await client.checkout.updateLineItems(
      this.state.checkout.id,
      lineItemsToUpdate
    );
    this.setState({ checkout: checkout });
    console.log("updated", checkout);
  };
  closeCart = () => {
    this.setState({ isCartOpen: false });
  };
  openCart = () => {
    this.setState({ isCartOpen: true });
  };
  render() {
    return (
      <ShopContext.Provider
        value={{
          ...this.state,
          removeLineItem: this.removeLineItem,
          updateItemQuantity: this.updateItemQuantity,
          closeCart: this.closeCart,
          openCart: this.openCart,
          getProducts: this.getProducts,
          getProduct: this.getProduct,
          getProductByHandle: this.getProductByHandle,
          addItemToCheckout: this.addItemToCheckout,
          getCheckoutUrl: this.getCheckoutUrl
        }}
      >
        {this.props.children}
      </ShopContext.Provider>
    );
  }
}
const ShopConsumer = ShopContext.Consumer;
export { ShopConsumer, ShopContext };
export default ShopProvider;