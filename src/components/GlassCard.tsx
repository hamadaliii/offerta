import { View, ViewProps } from 'react-native';

export function GlassCard({ children, style, ...props }: ViewProps) {
  return (
    <View
      style={[
        { 
          backgroundColor: 'rgba(255, 255, 255, 0.12)', 
          borderRadius: 32, 
          borderWidth: 1, 
          borderColor: 'rgba(255, 255, 255, 0.2)',
          overflow: 'hidden'
        },
        style
      ]}
      {...props}
    >
      {children}
    </View>
  );
}
