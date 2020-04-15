import Reactotron from 'reactotron-react-native';

if (__DEV__) {
  const tron = Reactotron.configure({ host: '192.168.0.12' })
    .useReactNative()
    .connect();

  console.tron = tron;

  tron.clear();
}
// Reactotron.setAsyncStorageHandler(AsyncStorage) // AsyncStorage would either come from `react-native` or `@react-native-community/async-storage` depending on where you get it from
//   .configure({
//     name: 'React Native Demo',
//   })
//   .useReactNative({
//     asyncStorage: false, // there are more options to the async storage.
//     networking: {
//       // optionally, you can turn it off with false.
//       ignoreUrls: /symbolicate/,
//     },
//     editor: false, // there are more options to editor
//     errors: { veto: stackFrame => false }, // or turn it off with false
//     overlay: false, // just turning off overlay
//   })
//   .connect();
