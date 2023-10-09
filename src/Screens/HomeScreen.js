import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, ImageBackground, Modal, Image, StatusBar} from 'react-native';
import {Button} from 'react-native-paper';
import NfcManager from 'react-native-nfc-manager';
import Swiper from 'react-native-swiper';

function HomeScreen(props) {
    const {navigation} = props;
    const [hasNfc, setHasNfc] = React.useState(null);
    const [enabled, setEnabled] = React.useState(null);
    const [modalVisible, setModalVisible] = React.useState();
    const showModal = () => setModalVisible(true);
    const hideModal = () => setModalVisible(false);

    React.useEffect(() => {
        async function checkNfc() {
            const supported = await NfcManager.isSupported();
            if(supported) {
                await NfcManager.start();
                setEnabled(await NfcManager.isEnabled());
            }
            setHasNfc(supported);
        }

        checkNfc();
    }, []);

    function renderNfcButtons() {
      
      if (hasNfc === null){
        return null;
      } else if (!hasNfc) {
        return (
          <View style={styles.wrapper}>
              <Text>Your device doesn't support NFC</Text>
          </View>
        );
      } else if (!enabled){
        return (
          <View style={styles.wrapper}>
            <Text>Your NFC is not enabled!</Text>

            <TouchableOpacity
              onPress={() => {
                NfcManager.goToNfcSetting();
              }}>
              <Text>GO TO NFC SETTINGS</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={async () => {
                setEnabled(await NfcManager.isEnabled());
              }}>
              <Text>CHECK AGAIN</Text>
              </TouchableOpacity>
          </View>
        )

      }

      return(

        <View>
          <StatusBar style='auto'/>
          <Swiper>

            <Image
              source={require('../assets/tutart1.png')}
              style={styles.image}
            />
            <Image
              source={require('../assets/tutart2.png')}
              style={styles.image}
            />
            <Image
              source={require('../assets/tutart3.png')}
              style={styles.image}
            />

          </Swiper>

          <View style={styles.bottom}>

            <Button 
            mode="contained" 
            style={[styles.btn]}
            onPress={() => {
              navigation.navigate('Account Portal 1');
            }}>
              <Text style={styles.buttonText}>
                  Account Portal
              </Text>
            </Button>

            <Button 
            mode="contained" 
            style={styles.btn} 
            onPress={() => {
              navigation.navigate('Raw Keys');
            }}>
              <Text style={styles.buttonText}>
                  Export Keys
              </Text>
            </Button>

            <Button 
            mode="contained" 
            style={[styles.btn]}
            onPress={() => {
              navigation.navigate('Create Access Card');
            }}>
              <Text style={styles.buttonText}>
                  Create Access Card
              </Text>
            </Button>
          </View>
        </View>
      )

    }

  return (

      <View style={styles.wrapper}>
        <View style={styles.wrapper}>
          <Modal  
          visible = {modalVisible}>
            <View 
              backgroundColor={'white'}
              style={styles.wrapper}
              borderRadius={10}>
            <Text style={styles.bannerText}>
              ***For Maximum Security***
              Set Your Phone To Airplane Mode
              Before Creating Or Viewing Keys
            </Text>
            <Button 
              mode="contained"
              style={styles.btn}
              onPress={hideModal}>
              <Text style={styles.buttonText}>
                Enter App
              </Text>
            </Button>
            </View>
          </Modal>
        </View>
        {renderNfcButtons()}
      </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  bannerText: {
    fontSize: 30,
    textAlign: 'center',
    color: 'black',
    fontVariant: 'small-caps',
    fontWeight: 'bold',
  },
  buttonText: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
    fontVariant: 'small-caps',
  },
  bottom: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 5,
  },
  btn: {
    width: 250,
    height: 70,
    marginBottom: 15,
    color: 'white',
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
});

export default HomeScreen;