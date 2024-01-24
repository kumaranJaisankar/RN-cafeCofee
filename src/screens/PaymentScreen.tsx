import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {COLORS, FONTFAMILY, FONTSIZE, SPACING} from '../theme/theme';
import GradientBGIcon from '../components/GradientBGIcon';
import PaymentMethod from '../components/PaymentMethod';
import PaymentFooter from '../components/PaymentFooter';
import {useStore} from '../store/store';
import PopUpAnimation from '../components/PopUpAnimation';

const paymentList = [
  {name: 'Wallet', icon: 'icon', isIcon: true},
  {
    name: 'Google Pay',
    icon: require('../assets/app_images/gpay.png'),
    isIcon: false,
  },
  {
    name: 'Phone Pe',
    icon: require('../assets/app_images/phonepelogoicon.png'),
    isIcon: false,
  },
  {
    name: 'Amazon Pay',
    icon: require('../assets/app_images/amazonpay.png'),
    isIcon: false,
  },
  {
    name: 'PayTm',
    icon: require('../assets/app_images/paytmicon.png'),
    isIcon: false,
  },
];

const PaymentScreen = ({navigation, route}: any) => {
  const CartPrice = useStore((state: any) => state.CartPrice);
  const addToOrderHistoryListFromCart = useStore(
    (state: any) => state.addToOrderHistoryListFromCart,
  );
  const [paymentMode, setPaymentMode] = useState(paymentList[0].name);
  const [showAnimation, setShowAnimation] = useState(false);

  const buttonPressHandler = () => {
    setShowAnimation(true);
    addToOrderHistoryListFromCart();
    setTimeout(() => {
      setShowAnimation(false);
      navigation.navigate('History');
    }, 2000);
  };
  return (
    <View style={styles.ScreenContainer}>
      <StatusBar backgroundColor={COLORS.primaryBlackHex} />
      {showAnimation ? (
        <PopUpAnimation
          style={{flex: 1}}
          source={require('../lottie/successful.json')}
        />
      ) : (
        <></>
      )}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.ScrollViewFlex}>
        <View style={styles.Headerbar}>
          <TouchableOpacity onPress={() => navigation.pop()}>
            <GradientBGIcon
              name="left"
              color={COLORS.primaryLightGreyHex}
              size={FONTSIZE.size_16}
            />
          </TouchableOpacity>
          <Text style={styles.HeaderTitleText}>Payments</Text>
          <View style={{width: SPACING.space_10}}></View>
        </View>
        <View style={styles.PaymentOptionsContainer}>
          {paymentList.map((data: any) => {
            return (
              <TouchableOpacity
                key={data.name}
                onPress={() => setPaymentMode(data.name)}>
                <PaymentMethod
                  paymentMode={paymentMode}
                  name={data.name}
                  icon={data.icon}
                  isIcon={data.isIcon}
                />
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
      <PaymentFooter
        buttonTitle={`Pay from ${paymentMode}`}
        price={{price: CartPrice, currency: '¤'}}
        buttonPressHandler={() => {
          buttonPressHandler();
        }}
      />
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
  Headerbar: {
    paddingHorizontal: SPACING.space_24,
    paddingVertical: SPACING.space_15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: SPACING.space_20,
  },
  HeaderTitleText: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_20,
    color: COLORS.primaryWhiteHex,
  },
  PaymentOptionsContainer: {
    padding: SPACING.space_15,
    gap: SPACING.space_15,
  },
});
export default PaymentScreen;
