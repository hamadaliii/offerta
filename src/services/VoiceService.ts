import { Audio } from 'expo-av';

let recording: Audio.Recording | null = null;

export const startRecording = async () => {
  try {
    if (recording) {
      await recording.stopAndUnloadAsync();
      recording = null;
    }
    const permission = await Audio.requestPermissionsAsync();
    if (permission.status === 'granted') {
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      const { recording: newRecording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      recording = newRecording;
      return true;
    }
    return false;
  } catch (err: any) {
    if (err.message && err.message.includes("already prepared")) {
      throw new Error("Recording module is stuck due to hot-reload. Please force quit the Expo Go app and open it again.");
    }
    console.error('Failed to start recording', err);
    throw err;
  }
};

export const stopRecording = async () => {
  if (!recording) return null;
  try {
    await recording.stopAndUnloadAsync();
    const uri = recording.getURI();
    recording = null;
    
    // Reset audio mode to play audio back if needed
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
    });
    
    return uri;
  } catch (err) {
    console.error('Failed to stop recording', err);
    recording = null;
    return null;
  }
};
