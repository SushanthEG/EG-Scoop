import React from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,//TouchableOpacity, the opacity of the view decreases, giving it a dimmed effect
} from 'react-native';

// using a custom hook called useStore from the ../store/store module. This hook likely manages state or data related to your app.
import {useStore} from '../store/store';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import {COLORS, SPACING} from '../theme/theme';
import HeaderBar from '../components/HeaderBar';
import EmptyListAnimation from '../components/EmptyListAnimation';
import PaymentFooter from '../components/PaymentFooter';
import CartItem from '../components/CartItem';

const CartScreen = ({navigation, route}: any) => {
//CartList: This likely represents the list of items in the user’s shopping cart.


  const CartList = useStore((state: any) => state.CartList);
  
// CartPrice: It probably holds the total price of the items in the cart

  const CartPrice = useStore((state: any) => state.CartPrice);

  //increasing and decreasing the quantity of a specific item in the cart.
  const incrementCartItemQuantity = useStore(
    (state: any) => state.incrementCartItemQuantity,
  );
  const decrementCartItemQuantity = useStore(
    (state: any) => state.decrementCartItemQuantity,
  );

  // total cart price 
  const calculateCartPrice = useStore((state: any) => state.calculateCartPrice);
  const tabBarHeight = useBottomTabBarHeight();
//navigates to the 'Payment' screen, passing the cart total amount as a parameter.
  const buttonPressHandler = () => {
    navigation.push('Payment', {amount: CartPrice});
  };

  //functions that handle increasing or decreasing the quantity of a specific item in the cart.

  const incrementCartItemQuantityHandler = (id: string, size: string) => {
    incrementCartItemQuantity(id, size);
    calculateCartPrice();
  };

  const decrementCartItemQuantityHandler = (id: string, size: string) => {
    decrementCartItemQuantity(id, size);
    calculateCartPrice();
  };
  return (
    <View style={styles.ScreenContainer}>
      <StatusBar backgroundColor={COLORS.primaryBlackHex} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.ScrollViewFlex}>
        <View
          style={[styles.ScrollViewInnerView, {marginBottom: tabBarHeight}]}>
          <View style={styles.ItemContainer}>
            <HeaderBar title="Cart" />
{/* carlist empty=animation */}
            {CartList.length == 0 ? (
              <EmptyListAnimation title={'Cart is Empty'} />
            ) : (
              <View style={styles.ListItemContainer}>
                {/* cartlist=press==>details screen */}
                {CartList.map((data: any) => (
                  <TouchableOpacity
                    onPress={() => {
                      navigation.push('Details', {
                        index: data.index,
                        id: data.id,
                        type: data.type,
                      });
                    }}
                    key={data.id}>
                    <CartItem
                      id={data.id}
                      name={data.name}
                      imagelink_square={data.imagelink_square}
                      special_ingredient={data.special_ingredient}
                      roasted={data.roasted}
                      prices={data.prices}
                      type={data.type}
                      incrementCartItemQuantityHandler={
                        incrementCartItemQuantityHandler
                      }
                      decrementCartItemQuantityHandler={
                        decrementCartItemQuantityHandler
                      }
                    />
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
{/* If the cart is not empty, it displays a payment footer using the PaymentFooter component. */}
          {CartList.length != 0 ? (
            <PaymentFooter
              buttonPressHandler={buttonPressHandler}
              buttonTitle="Pay"
              //  total cart price (formatted as currency) is also displayed.
              price={{price: CartPrice, currency: '$'}}
            />
          ) : (
            <></>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  ScreenContainer: {
    flex: 1,
    backgroundColor: COLORS.primaryBlackHex,
  },
  ScrollViewFlex: {
    flexGrow: 1,
  },
  ScrollViewInnerView: {
    flex: 1,
    justifyContent: 'space-between',
  },
  ItemContainer: {
    flex: 1,
  },
  ListItemContainer: {
    paddingHorizontal: SPACING.space_20,
    gap: SPACING.space_20,
  },
});

export default CartScreen;
