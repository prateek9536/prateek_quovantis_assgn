import React, { Component } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, Modal } from 'react-native';
import styles from './style';
import FoodsList from '../FoodsList';
import AsyncStorage from '@react-native-community/async-storage';

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isFoodListVisible: false
        }
    }

    componentWillUnmount() {
        this.clearStorage();
    }

    clearStorage = async () => {
        try {
            await AsyncStorage.clear();
        } catch (e) {
            console.warn('Failed to clear the async storage.')
        }
    }

    openCloseFoodsList(value) {
        this.setState({ isFoodListVisible: value });
    }    

    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                {this.state.isFoodListVisible &&
                    <Modal
                        animationType="fade"
                        onRequestClose={this.openCloseFoodsList.bind(this, false)}>
                        <FoodsList subscriber={this} />
                    </Modal>
                }
                <View style={styles.container}>
                    <TouchableOpacity
                        style={styles.button} onPress={this.openCloseFoodsList.bind(this, true)}>
                        <Text style={{ color: '#ffffff' }}>Approved Foods List</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        )
    }
}
