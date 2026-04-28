import { View, Text, Switch, StyleSheet } from 'react-native';
import { GlassCard } from '../../src/components/GlassCard';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';

export default function Settings() {
  return (
    <View style={{ flex: 1 }}>
      <LinearGradient
        colors={['#1E293B', '#0F172A', '#020617']}
        style={StyleSheet.absoluteFill}
      />
      <SafeAreaView style={{ flex: 1 }} edges={['top']}>
        <View style={{ paddingHorizontal: 24, paddingTop: 20 }}>
          <Text style={{ fontFamily: 'Inter_600SemiBold', fontSize: 32, color: '#FFFFFF', marginBottom: 32 }}>Settings</Text>
          
          <GlassCard style={{ padding: 24, marginBottom: 20 }}>
            <Text style={{ fontFamily: 'Inter_600SemiBold', fontSize: 18, color: '#FFFFFF', marginBottom: 20 }}>Company Profile</Text>
            <View>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.1)', paddingBottom: 16 }}>
                <Text style={{ fontFamily: 'Inter_500Medium', fontSize: 16, color: '#FFFFFF' }}>Company Name</Text>
                <Text style={{ fontFamily: 'Inter_400Regular', fontSize: 16, color: 'rgba(255,255,255,0.7)' }}>Vox-Offert LLC</Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingTop: 16 }}>
                <Text style={{ fontFamily: 'Inter_500Medium', fontSize: 16, color: '#FFFFFF' }}>Default Tax Rate</Text>
                <Text style={{ fontFamily: 'Inter_400Regular', fontSize: 16, color: 'rgba(255,255,255,0.7)' }}>10%</Text>
              </View>
            </View>
          </GlassCard>

          <GlassCard style={{ padding: 24 }}>
            <Text style={{ fontFamily: 'Inter_600SemiBold', fontSize: 18, color: '#FFFFFF', marginBottom: 20 }}>Preferences</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
              <Text style={{ fontFamily: 'Inter_500Medium', fontSize: 16, color: '#FFFFFF' }}>Dark Mode</Text>
              <Switch value={true} disabled trackColor={{ true: 'rgba(255,255,255,0.3)' }} />
            </View>
          </GlassCard>
        </View>
      </SafeAreaView>
    </View>
  );
}
