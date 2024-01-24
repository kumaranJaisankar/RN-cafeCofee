import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {useStore} from '../store/store';
import {COLORS, SPACING} from '../theme/theme';
import HeaderBar from '../components/HeaderBar';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import EmptyListAnimation from '../components/EmptyListAnimation';
import PaymentFooter from '../components/PaymentFooter';
import CartItem from '../components/CartItem';

const CartScreen = ({navigation, route}: any) => {
  const tabBarHight = useBottomTabBarHeight();
  const CartList = useStore((state: any) => state.CartList);
  const CartPrice = useStore((state: any) => state.CartPrice);
  const incrementCartItemQuantity = useStore(
    (state: any) => state.incrementCartItemQuantity,
  );
  const decrementCartItemQuantity = useStore(
    (state: any) => state.decrementCartItemQuantity,
  );
  const calculateCartPrice = useStore((state: any) => state.calculateCartPrice);

  const incrementCartItemQuantityHandler = (id: string, size: string) => {
    incrementCartItemQuantity(id, size);
    calculateCartPrice();
  };
  const decrementCartItemQuantityHandler = (id: string, size: string) => {
    decrementCartItemQuantity(id, size);
    calculateCartPrice();
  };

  const buttonPressHandler = () => {
    navigation.push('Payment');
  };
  console.log(CartList.length);
  return (
    <View style={styles.ScreenContainer}>
      <StatusBar backgroundColor={COLORS.primaryBlackHex} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.ScrollViewFlex}>
        <View style={[styles.ScrollViewInnerView, {marginBottom: tabBarHight}]}>
          <View style={styles.ItemContainer}>
            <HeaderBar title="Cart" />
            {CartList.length == 0 ? (
              <EmptyListAnimation title="Cart is Empty" />
            ) : (
              <View style={styles.ListItemContainer}>
                {CartList.map((data: any) => {
                  return (
                    <TouchableOpacity
                      key={Math.random().toString()}
                      onPress={() => {}}>
                      <CartItem
                        id={data.id}
                        title={data.name}
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
                  );
                })}
              </View>
            )}
          </View>
          {CartList.length != 0 ? (
            <PaymentFooter
              buttonTitle={'pay'}
              price={{price: CartPrice, currency: '¤'}}
              buttonPressHandler={() => {
                buttonPressHandler();
              }}
            />
          ) : (
            <></>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  ScreenContainer: {
    flex: 1,
    backgroundColor: COLORS.primaryBlackHex,
  },
  ScrollViewFlex: {flexGrow: 1},
  ScrollViewInnerView: {flex: 1, justifyContent: 'space-between'},
  ItemContainer: {
    flex: 1,
  },
  ListItemContainer: {
    paddingHorizontal: SPACING.space_20,
    gap: SPACING.space_20,
  },
});
