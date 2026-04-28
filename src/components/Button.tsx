import { TouchableOpacity, Text, TouchableOpacityProps, View } from 'react-native';
import * as Haptics from 'expo-haptics';

interface ButtonProps extends TouchableOpacityProps {
  title?: string;
  variant?: 'primary' | 'secondary' | 'glass' | 'icon';
  icon?: React.ReactNode;
}

export function Button({ title, variant = 'primary', icon, style, onPress, ...props }: ButtonProps) {
  const handlePress = (e: any) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    if (onPress) onPress(e);
  };

  const getVariantStyles = (): any => {
    switch (variant) {
      case 'primary': return { backgroundColor: '#FFFFFF', paddingHorizontal: 24, paddingVertical: 16, borderRadius: 24 };
      case 'secondary': return { backgroundColor: 'rgba(255,255,255,0.1)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)', paddingHorizontal: 24, paddingVertical: 16, borderRadius: 24 };
      case 'glass': return { backgroundColor: 'transparent', paddingHorizontal: 24, paddingVertical: 16, borderRadius: 24 };
      case 'icon': return { backgroundColor: 'transparent', padding: 8 };
      default: return { backgroundColor: '#FFFFFF', paddingHorizontal: 24, paddingVertical: 16, borderRadius: 24 };
    }
  };

  const getTextStyles = (): any => {
    switch (variant) {
      case 'primary': return { color: '#0F172A' };
      case 'secondary': return { color: '#FFFFFF' };
      case 'glass': return { color: '#FFFFFF' };
      default: return { color: '#0F172A' };
    }
  };

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={handlePress}
      style={[{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }, getVariantStyles(), style]}
      {...props}
    >
      {icon && <View style={title ? { marginRight: 8 } : {}}>{icon}</View>}
      {title && <Text style={[{ fontFamily: 'Inter_600SemiBold', fontSize: 16 }, getTextStyles()]}>{title}</Text>}
    </TouchableOpacity>
  );
}
