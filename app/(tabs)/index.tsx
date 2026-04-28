import { View, Text, ScrollView, Alert, Dimensions, StyleSheet } from 'react-native';
import { GlassCard } from '../../src/components/GlassCard';
import { Button } from '../../src/components/Button';
import { MicIcon, DocumentIcon, CheckIcon } from '../../src/components/Icons';
import { useState } from 'react';
import { startRecording, stopRecording } from '../../src/services/VoiceService';
import { processAudioToJSON } from '../../src/services/SpeechToJSON';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

export default function Dashboard() {
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const router = useRouter();

  const handleRecordPress = async () => {
    if (isRecording) {
      setIsRecording(false);
      setIsProcessing(true);
      try {
        const audioUri = await stopRecording();
        if (audioUri) {
          const json = await processAudioToJSON(audioUri);
          if (json.error) {
            Alert.alert("Speech Error", json.error);
          } else {
            router.push({ pathname: '/quote/[id]', params: { id: 'new', data: JSON.stringify(json) } });
          }
        }
      } catch (err: any) {
        Alert.alert("Error", err.message);
      } finally {
        setIsProcessing(false);
      }
    } else {
      try {
        const started = await startRecording();
        if (started) {
          setIsRecording(true);
        } else {
          Alert.alert("Permission Error", "Microphone access is required.");
        }
      } catch (e: any) {
        Alert.alert("Error", e.message || "Please force-quit the app and try again.");
      }
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <LinearGradient
        colors={['#1E293B', '#0F172A', '#020617']}
        style={StyleSheet.absoluteFill}
      />
      <SafeAreaView style={{ flex: 1 }} edges={['top']}>
        <ScrollView contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 140 }}>
          
          <View style={{ marginTop: 20, marginBottom: 30, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
             <Text style={{ fontFamily: 'Inter_600SemiBold', fontSize: 24, color: '#FFFFFF' }}>Vox-Offert</Text>
             <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(255,255,255,0.1)', alignItems: 'center', justifyContent: 'center' }}>
                <DocumentIcon stroke="#FFF" width={20} height={20} />
             </View>
          </View>

          <Text style={{ fontFamily: 'Inter_700Bold', fontSize: 40, color: '#FFFFFF', lineHeight: 48, marginBottom: 16 }}>
            Reach the Summit{"\n"}of your Sales
          </Text>
          <Text style={{ fontFamily: 'Inter_400Regular', fontSize: 16, color: 'rgba(255,255,255,0.7)', marginBottom: 40, lineHeight: 24 }}>
            Skapa och skicka B2B-offerter direkt med AI-röst.
          </Text>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 }}>
            <GlassCard style={{ width: (width - 50) / 2, padding: 24, minHeight: 160 }}>
              <View style={{ marginBottom: 'auto' }}>
                <Text style={{ fontFamily: 'Inter_700Bold', fontSize: 36, color: '#FFFFFF' }}>12</Text>
                <Text style={{ fontFamily: 'Inter_500Medium', fontSize: 14, color: 'rgba(255,255,255,0.7)', marginTop: 8 }}>Väntande</Text>
              </View>
              <View style={{ alignSelf: 'flex-start', padding: 8, backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 16, marginTop: 16 }}>
                <DocumentIcon stroke="#FFF" width={20} height={20} />
              </View>
            </GlassCard>

            <GlassCard style={{ width: (width - 50) / 2, padding: 24, minHeight: 160 }}>
              <View style={{ marginBottom: 'auto' }}>
                <Text style={{ fontFamily: 'Inter_700Bold', fontSize: 36, color: '#FFFFFF' }}>45</Text>
                <Text style={{ fontFamily: 'Inter_500Medium', fontSize: 14, color: 'rgba(255,255,255,0.7)', marginTop: 8 }}>Godkända</Text>
              </View>
              <View style={{ alignSelf: 'flex-start', padding: 8, backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 16, marginTop: 16 }}>
                <CheckIcon stroke="#FFF" width={20} height={20} />
              </View>
            </GlassCard>
          </View>

          <GlassCard style={{ width: '100%', padding: 24, marginBottom: 40 }}>
            <Text style={{ fontFamily: 'Inter_600SemiBold', fontSize: 18, color: '#FFFFFF', marginBottom: 24 }}>Senaste Aktivitet</Text>
            {[1, 2, 3].map((i) => (
              <View key={i} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 16, borderBottomWidth: i === 3 ? 0 : 1, borderBottomColor: 'rgba(255,255,255,0.1)' }}>
                <View>
                  <Text style={{ fontFamily: 'Inter_500Medium', fontSize: 16, color: '#FFFFFF' }}>Offert #{1042 + i}</Text>
                  <Text style={{ fontFamily: 'Inter_400Regular', fontSize: 14, color: 'rgba(255,255,255,0.5)', marginTop: 4 }}>{i * 2} timmar sedan</Text>
                </View>
                <View style={{ backgroundColor: 'rgba(255,255,255,0.15)', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 16 }}>
                  <Text style={{ fontFamily: 'Inter_600SemiBold', fontSize: 12, color: '#FFFFFF' }}>Skickad</Text>
                </View>
              </View>
            ))}
          </GlassCard>

        </ScrollView>
      </SafeAreaView>

      {/* Floating Record Pill */}
      <View style={{ position: 'absolute', bottom: 100, left: 0, right: 0, alignItems: 'center' }}>
        <GlassCard style={{ flexDirection: 'row', alignItems: 'center', padding: 8, paddingRight: 24, borderRadius: 999 }}>
          <Button 
            variant="primary" 
            onPress={handleRecordPress} 
            style={{ height: 64, width: 64, borderRadius: 32, backgroundColor: isRecording ? '#EF4444' : '#FFFFFF', alignItems: 'center', justifyContent: 'center', marginRight: 16, paddingHorizontal: 0, paddingVertical: 0 }}
            icon={<MicIcon stroke={isRecording ? "#FFFFFF" : "#0F172A"} width={28} height={28} />}
          />
          <Text style={{ fontFamily: 'Inter_600SemiBold', fontSize: 16, color: '#FFFFFF' }}>
            {isProcessing ? 'Bearbetar...' : isRecording ? 'Spelar in...' : 'Håll in för att tala'}
          </Text>
        </GlassCard>
      </View>
    </View>
  );
}
