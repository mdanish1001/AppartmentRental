import React from 'react';
import { SafeAreaView, StyleSheet, StatusBar } from 'react-native';
import { StackNavigation } from './src/Navigation/StackNavigation';
import { Provider } from 'react-redux';
import { persister, store } from './src/redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import ColorCodes from './src/utilities/ColorCodes';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persister}>
        <SafeAreaView style={styles.container}>
          <StatusBar backgroundColor={ColorCodes.white} barStyle={'dark-content'} />
          <StackNavigation />
        </SafeAreaView>
      </PersistGate>
    </Provider >
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: ColorCodes.white },
})

export default App;
