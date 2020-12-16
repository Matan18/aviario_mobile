import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import AntDesignIcons from "@expo/vector-icons/build/AntDesign";

interface IFloatButtonProps {
  buttonStyles: StyleProp<ViewStyle>;
  size?: number;
  onPress: (pointerInside: boolean) => void;
}

const FloatButton: React.FC<IFloatButtonProps> = ({ buttonStyles, size = 10, onPress }) => {
  return (
    <RectButton style={buttonStyles} onPress={onPress} >
      <AntDesignIcons name="pluscircle" size={size} />
    </RectButton>
  )
}

export default FloatButton;