import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {COLORS, FONTFAMILY, FONTSIZE, SPACING} from '../theme/theme';
import GradientBGIcon from './GradientBGIcon';
import ProfilePic from './ProfilePic';

interface HeaderBarProps {
  title?: string;
}
//HeaderBar component accepts a single prop called title
const HeaderBar: React.FC<HeaderBarProps> = ({title}) => {
  return (//View with the style defined in style
    <View style={styles.HeaderContainer}>
      {/* //Inside this view:
A GradientBGIcon component is used to display an icon */}
      <GradientBGIcon
        name="menu"
        color={COLORS.primaryLightGreyHex}
        size={FONTSIZE.size_16}
      />
      {/*  Text component displays the title.
A ProfilePic component */}
      <Text style={styles.HeaderText}>{title}</Text>
      <ProfilePic />
    </View>
  );
};

const styles = StyleSheet.create({
  HeaderContainer: {
    padding: SPACING.space_30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  HeaderText: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_20,
    color: COLORS.primaryWhiteHex,
  },
});

export default HeaderBar;
