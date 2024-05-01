import {create} from 'zustand';//global store
import {produce} from 'immer';//update store
import {persist, createJSONStorage} from 'zustand/middleware';
//allows you to persist your store data (e.g., to local storage),
import AsyncStorage from '@react-native-async-storage/async-storage';
import CoffeeData from '../data/CoffeeData';
import BeansData from '../data/BeansData';
//data files exist in those locations.

export const useStore = create( //useStore variable will hold the state and provide methods to update it.
  persist(//persist function wraps the store,
    (set, get) => ({ //set: A function to update the state.
     // get: A function to retrieve the current state.

     //Initialized with...
      CoffeeList: CoffeeData,
      BeanList: BeansData,
      CartPrice: 0,
      FavoritesList: [],//empty array 
      CartList: [],
      OrderHistoryList: [],


      // Check if the item being added already exists in the cart.
      // If it does, update the quantity if the size matches; otherwise, add a new price entry for the size.
      // Sort the prices array based on size.
      // If the item is not found in the cart, add it to the cart.
     
      addToCart: (cartItem: any) =>
        set(
          produce(state => {
            let found = false;
            for (let i = 0; i < state.CartList.length; i++) {
              if (state.CartList[i].id == cartItem.id) {
                found = true;
                let size = false;
                for (let j = 0; j < state.CartList[i].prices.length; j++) {
                  if (
                    state.CartList[i].prices[j].size == cartItem.prices[0].size
                  ) {
                    size = true;
                    state.CartList[i].prices[j].quantity++;
                    break;
                  }
                }
                if (size == false) {
                  state.CartList[i].prices.push(cartItem.prices[0]);
                }//based on six=ze it wil add S M L
                state.CartList[i].prices.sort((a: any, b: any) => {
                  if (a.size > b.size) {
                    return -1;
                  }
                  if (a.size < b.size) {
                    return 1;
                  }
                  return 0;
                });
                break;
              }
            }
            if (found == false) {
              state.CartList.push(cartItem);
            }
          }),
        ),

        // For each item in the cart:
        // Calculate the total price by multiplying the price of each size by its quantity.
        // Update the ItemPrice property for that item with the calculated total price (rounded to 2 decimal places).
        // Accumulate the total price for all items in the cart and update the CartPrice property in the state.

      calculateCartPrice: () =>
        set(
          produce(state => {
            let totalprice = 0;
            for (let i = 0; i < state.CartList.length; i++) {
              let tempprice = 0;
              for (let j = 0; j < state.CartList[i].prices.length; j++) {
                tempprice =
                  tempprice +
                  parseFloat(state.CartList[i].prices[j].price) *
                    state.CartList[i].prices[j].quantity;
              }
              state.CartList[i].ItemPrice = tempprice.toFixed(2).toString();
              totalprice = totalprice + tempprice;
            }
            state.CartPrice = totalprice.toFixed(2).toString();
          }),
        ),

// Iterate through the IcecreamList.
// If an item with the specified id is found:
// If it is not already marked as a favorite, set it as a favorite and add it to the beginning of the FavoritesList.
// Otherwise, remove it from the favorites.


      addToFavoriteList: (type: string, id: string) =>
        set(
          produce(state => {
            if (type == 'Coffee') {
              for (let i = 0; i < state.CoffeeList.length; i++) {
                if (state.CoffeeList[i].id == id) {

                  // If it is not already marked as a favorite, set it as a favorite and add it to the beginning of the FavoritesList.
// Otherwise, remove it from the favorites.
                  if (state.CoffeeList[i].favourite == false) {

                    state.CoffeeList[i].favourite = true;
                    state.FavoritesList.unshift(state.CoffeeList[i]);
                  } else {
                    state.CoffeeList[i].favourite = false;
                  }
                  break;
                }
              }
            } else if (type == 'Bean') {
              for (let i = 0; i < state.BeanList.length; i++) {
                if (state.BeanList[i].id == id) {
                  if (state.BeanList[i].favourite == false) {
                    state.BeanList[i].favourite = true;
                    state.FavoritesList.unshift(state.BeanList[i]);
                  } else {
                    state.BeanList[i].favourite = false;
                  }
                  break;
                }
              }
            }
          }),
        ),



      deleteFromFavoriteList: (type: string, id: string) =>
        set(
          produce(state => {
            if (type == 'Coffee') {
              for (let i = 0; i < state.CoffeeList.length; i++) {
                if (state.CoffeeList[i].id == id) {
                  if (state.CoffeeList[i].favourite == true) {
                    state.CoffeeList[i].favourite = false;
                  } else {
                    state.CoffeeList[i].favourite = true;
                  }
                  break;
                }
              }
            } else if (type == 'Beans') {
              for (let i = 0; i < state.BeanList.length; i++) {
                if (state.BeanList[i].id == id) {
                  if (state.BeanList[i].favourite == true) {
                    state.BeanList[i].favourite = false;
                  } else {
                    state.BeanList[i].favourite = true;
                  }
                  break;
                }
              }
            }
            //Find the index of the item with the specified id in the FavoritesList.
// Remove that item from the FavoritesList using splice.
            let spliceIndex = -1;
            for (let i = 0; i < state.FavoritesList.length; i++) {
              if (state.FavoritesList[i].id == id) {
                spliceIndex = i;
                break;
              }
            }
            state.FavoritesList.splice(spliceIndex, 1);
          }),
        ),


//iterate through cartlist check id of items if item name and size matches then increment
      incrementCartItemQuantity: (id: string, size: string) =>
        set(
          produce(state => {
            for (let i = 0; i < state.CartList.length; i++) {
              if (state.CartList[i].id == id) {
                for (let j = 0; j < state.CartList[i].prices.length; j++) {
                  if (state.CartList[i].prices[j].size == size) {
                    state.CartList[i].prices[j].quantity++;
                    break;
                  }
                }
              }
            }
          }),
        ),

        // decrementCartItemQuantity function decreases the quantity of a specific item in the cart. If the item has multiple price entries (sizes), it decrements the quantity for the specified size. If the item has only one price entry, it removes the entire item from the cart if the quantity reaches zero.
      decrementCartItemQuantity: (id: string, size: string) =>
        set(
          produce(state => {
            for (let i = 0; i < state.CartList.length; i++) {
              if (state.CartList[i].id == id) {
                for (let j = 0; j < state.CartList[i].prices.length; j++) {
                  if (state.CartList[i].prices[j].size == size) {
                    if (state.CartList[i].prices.length > 1) {
                      if (state.CartList[i].prices[j].quantity > 1) {
                        state.CartList[i].prices[j].quantity--;
                      } else {
                        state.CartList[i].prices.splice(j, 1);
                      }
                    } else {
                      if (state.CartList[i].prices[j].quantity > 1) {
                        state.CartList[i].prices[j].quantity--;
                      } else {
                        state.CartList.splice(i, 1);
                      }
                    }
                    break;
                  }
                }
              }
            }
          }),
        ),




      addToOrderHistoryListFromCart: () =>
        set(
          produce(state => {
            // Use reduce to accumulate the total price by adding the ItemPrice of each cart item.
            let temp = state.CartList.reduce(
              (accumulator: number, currentValue: any) =>
                accumulator + parseFloat(currentValue.ItemPrice),
              0,
            );

// If the OrderHistoryList is not empty, add a new order entry with details to the beginning.



            if (state.OrderHistoryList.length > 0) {
              state.OrderHistoryList.unshift({
                OrderDate:
                  new Date().toDateString() +
                  ' ' +
                  new Date().toLocaleTimeString(),
                CartList: state.CartList,
                CartListPrice: temp.toFixed(2).toString(),
              });
            } else {// If the OrderHistoryList is empty, create a new order entry and add it.
              // Clear the CartList by emptying it.
              state.OrderHistoryList.push({
                OrderDate:
                  new Date().toDateString() +
                  ' ' +
                  new Date().toLocaleTimeString(),
                CartList: state.CartList,
                CartListPrice: temp.toFixed(2).toString(),
              });
            }
            state.CartList = [];
          }),
        ),
    }),
    {
      name: 'coffee-app',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
