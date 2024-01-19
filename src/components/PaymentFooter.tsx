import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from '../theme/theme';

interface PriceProps {
  price: String;
  currency: String;
}

interface PaymentFooterPops {
  price: PriceProps;
  buttonPressHandler: any;
  buttonTitle: any;
}

const PaymentFooter: React.FC<PaymentFooterPops> = ({
  price,
  buttonPressHandler,
  buttonTitle,
}) => {
  return (
    <View style={styles.AddToCartContainer}>
      <View style={styles.PriceDetailContainer}>
        <Text style={styles.PriceLable}>Price</Text>
        <Text style={styles.PriceText}>
          ₹ <Text style={{color: COLORS.primaryWhiteHex}}>{price.price}</Text>
        </Text>
      </View>
      <TouchableOpacity
        style={styles.AddToCartButton}
        onPress={() => buttonPressHandler()}>
        <Text style={styles.FunctionalButton}>{buttonTitle}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  AddToCartContainer: {
    padding: SPACING.space_20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: SPACING.space_20,
  },
  PriceDetailContainer: {
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  PriceText: {
    color: COLORS.primaryOrangeHex,
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_24,
  },
  PriceLable: {
    color: COLORS.primaryWhiteHex,
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_14,
  },
  AddToCartButton: {
    flex: 1,
    height: 50,
    backgroundColor: COLORS.primaryOrangeHex,
    borderRadius: BORDERRADIUS.radius_20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  FunctionalButton: {
    color: COLORS.primaryWhiteHex,
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_18,
  },
});
export default PaymentFooter;
