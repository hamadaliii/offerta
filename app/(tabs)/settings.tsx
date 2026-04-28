import React, { useState, useEffect } from 'react';
import { View, Text, Switch, StyleSheet, TextInput, ScrollView, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { GlassCard } from '../../src/components/GlassCard';
import { Button } from '../../src/components/Button';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { supabase } from '../../src/services/supabase';

export default function Settings() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [profile, setProfile] = useState({
    id: '',
    company_name: 'Vox-Offert AB',
    org_nr: '',
    address: '',
    contact_email: '',
    contact_phone: '',
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const { data, error } = await supabase.from('profiles').select('*').limit(1).single();
      if (data) {
        setProfile(data);
      }
    } catch (e) {
      console.log('No existing profile found, using defaults.');
    } finally {
      setLoading(false);
    }
  };

  const saveProfile = async () => {
    setSaving(true);
    try {
      if (profile.id) {
        const { error } = await supabase.from('profiles').update(profile).eq('id', profile.id);
        if (error) throw error;
      } else {
        const { data, error } = await supabase.from('profiles').insert([profile]).select();
        if (error) throw error;
        if (data && data[0]) setProfile(data[0]);
      }
      Alert.alert('Success', 'Company profile saved successfully!');
    } catch (error: any) {
      Alert.alert('Error', error.message);
    } finally {
      setSaving(false);
    }
  };

  const updateField = (field: string, value: string) => {
    setProfile(prev => ({ ...prev, [field]: value }));
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <LinearGradient
        colors={['#1E293B', '#0F172A', '#020617']}
        style={StyleSheet.absoluteFill}
      />
      <SafeAreaView style={{ flex: 1 }} edges={['top']}>
        <ScrollView contentContainerStyle={{ paddingHorizontal: 24, paddingTop: 20, paddingBottom: 100 }}>
          <Text style={{ fontFamily: 'Inter_600SemiBold', fontSize: 32, color: '#FFFFFF', marginBottom: 32 }}>Settings</Text>
          
          <GlassCard style={{ padding: 24, marginBottom: 20 }}>
            <Text style={{ fontFamily: 'Inter_600SemiBold', fontSize: 18, color: '#FFFFFF', marginBottom: 20 }}>Företagsuppgifter</Text>
            
            {loading ? (
              <Text style={{ color: '#fff' }}>Laddar...</Text>
            ) : (
              <View>
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Företagsnamn</Text>
                  <TextInput
                    style={styles.input}
                    value={profile.company_name}
                    onChangeText={(val) => updateField('company_name', val)}
                    placeholderTextColor="rgba(255,255,255,0.4)"
                    placeholder="T.ex. Vox-Offert AB"
                  />
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Organisationsnummer</Text>
                  <TextInput
                    style={styles.input}
                    value={profile.org_nr}
                    onChangeText={(val) => updateField('org_nr', val)}
                    placeholderTextColor="rgba(255,255,255,0.4)"
                    placeholder="T.ex. 556000-1111"
                  />
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Adress</Text>
                  <TextInput
                    style={styles.input}
                    value={profile.address}
                    onChangeText={(val) => updateField('address', val)}
                    placeholderTextColor="rgba(255,255,255,0.4)"
                    placeholder="Sveavägen 1, 111 22 Stockholm"
                  />
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.label}>E-post</Text>
                  <TextInput
                    style={styles.input}
                    value={profile.contact_email}
                    onChangeText={(val) => updateField('contact_email', val)}
                    placeholderTextColor="rgba(255,255,255,0.4)"
                    keyboardType="email-address"
                    placeholder="hello@voxoffert.se"
                  />
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Telefonnummer</Text>
                  <TextInput
                    style={styles.input}
                    value={profile.contact_phone}
                    onChangeText={(val) => updateField('contact_phone', val)}
                    placeholderTextColor="rgba(255,255,255,0.4)"
                    keyboardType="phone-pad"
                    placeholder="08-123 45 67"
                  />
                </View>

                <Button 
                  variant="primary" 
                  title={saving ? "Sparar..." : "Spara uppgifter"} 
                  onPress={saveProfile} 
                  disabled={saving}
                  style={{ marginTop: 12 }}
                />
              </View>
            )}
          </GlassCard>

          <GlassCard style={{ padding: 24 }}>
            <Text style={{ fontFamily: 'Inter_600SemiBold', fontSize: 18, color: '#FFFFFF', marginBottom: 20 }}>Preferences</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
              <Text style={{ fontFamily: 'Inter_500Medium', fontSize: 16, color: '#FFFFFF' }}>Dark Mode</Text>
              <Switch value={true} disabled trackColor={{ true: 'rgba(255,255,255,0.3)' }} />
            </View>
          </GlassCard>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontFamily: 'Inter_500Medium',
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    marginBottom: 8,
  },
  input: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    borderRadius: 12,
    padding: 12,
    color: '#FFFFFF',
    fontFamily: 'Inter_400Regular',
    fontSize: 16,
  }
});
