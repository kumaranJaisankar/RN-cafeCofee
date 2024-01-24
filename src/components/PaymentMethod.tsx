import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from '../theme/theme';
import CustomIcons from './CustomIcons';

interface PyamentMethodProps {
  paymentMode: string;
  name: string;
  icon: any;
  isIcon: boolean;
}
const PaymentMethod: React.FC<PyamentMethodProps> = ({
  paymentMode,
  name,
  icon,
  isIcon,
}) => {
  return (
    <View style={styles.PaymentCardContainer}>
      {isIcon ? (
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
          colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}
          style={[
            styles.WalletContainer,
            {
              borderColor:
                paymentMode === name
                  ? COLORS.primaryOrangeHex
                  : COLORS.primaryGreyHex,
            },
          ]}>
          <View style={styles.IconAndBalanceConatiner}>
            <View style={styles.IconContainer}>
              <CustomIcons
                name="wallet"
                size={FONTSIZE.size_28}
                color={COLORS.primaryOrangeHex}
              />
              <Text style={styles.PaymentName}>{name}</Text>
            </View>
            <Text style={styles.BalanceText}>₹ 200</Text>
          </View>
        </LinearGradient>
      ) : (
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
          colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}
          style={[
            styles.WalletContainer,
            {
              borderColor:
                paymentMode === name
                  ? COLORS.primaryOrangeHex
                  : COLORS.primaryGreyHex,
            },
          ]}>
          <View style={styles.IconAndBalanceConatiner}>
            <View style={styles.IconContainer}>
              <Image source={icon} style={styles.PaymentServiceLogo} />
              <Text style={styles.PaymentName}>{name}</Text>
            </View>
          </View>
        </LinearGradient>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  PaymentCardContainer: {},
  WalletContainer: {
    padding: SPACING.space_15,
    borderRadius: BORDERRADIUS.radius_20,
    borderWidth: 3,
  },
  IconContainer: {
    flexDirection: 'row',
    gap: SPACING.space_10,
    alignItems: 'center',
  },
  PaymentName: {
    fontFamily: FONTFAMILY.poppins_medium,
    color: COLORS.primaryWhiteHex,
    fontSize: FONTSIZE.size_16,
  },
  IconAndBalanceConatiner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  BalanceText: {
    fontFamily: FONTFAMILY.poppins_light,
    color: COLORS.primaryWhiteHex,
    fontSize: FONTSIZE.size_14,
  },
  PaymentServiceLogo: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
});
export default PaymentMethod;
