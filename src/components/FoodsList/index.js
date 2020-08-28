import React, { Component } from 'react';
import { View, Text, SafeAreaView, Image, TouchableOpacity, TextInput, FlatList } from 'react-native';
import styles from './style';
import AsyncStorage from '@react-native-community/async-storage';
import FoodWidget from '../FoodWidget';

const STORAGE_KEY = '@FOODS_LIST'
export default class FoodsList extends Component {

    searchText = '';

    constructor(props) {
        super(props);
        this.state = {
            foodsList: [],
        }
    }

    componentDidMount() {
        this.loadFoodsList();
    }

    loadFoodsList = async () => {
        try {
            const foodsList = await AsyncStorage.getItem(STORAGE_KEY)
            if (foodsList !== null) {
                this.setState({ foodsList: JSON.parse(foodsList) });
            } else {
                this.getFoodsListData();
            }
        } catch (e) {
            console.warn('Failed to fetch the data from storage')
        }
    }

    getFoodsListData() {
        fetch('https://api.jsonbin.io/b/5f2c36626f8e4e3faf2cb42e')
            .then((response) => response.json())
            .then((json) => {
                this.setState({ foodsList: json });
                this.setLocalStorage(json);
            })
            .catch((error) => console.error(error))
            .finally(() => this.setState({ isLoading: false }));
    }

    setLocalStorage = async (data) => {
        try {
            await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data))
        } catch (e) {
            console.warn('Failed to save the data to the storage')
        }
    }

    renderHeader = () => {
        return (
            <View>
                {/* Start:Close Section */}
                < View style={styles.closeSection} >
                    <TouchableOpacity onPress={() => { this.props.subscriber.openCloseFoodsList(false) }} style={styles.close}>
                        <Image source={require('../../assets/images/close.webp')} resizeMode={'contain'} style={styles.close} />
                    </TouchableOpacity>
                </View>
                {/* End:Close Section */}

                {/* Start:Heading Section */}
                <View style={styles.headingSection}>
                    <Text style={styles.heading}>Approved Foods List</Text>
                </View>
                {/* End:Heading Section */}

                {/* Start:searchSection */}
                <View style={styles.searchSection}>
                    <View style={{ justifyContent: 'center' }}>
                        <Image source={require('../../assets/images/search.webp')} resizeMode={'contain'} style={{ width: 25, height: 25 }} />
                    </View>
                    <View style={{ justifyContent: 'center' }}>
                        <TextInput
                            style={{ padding: 0, marginLeft: 5 }}
                            onChangeText={(value) => this.search(value)}
                            placeholder={'Try searching fat,sauces names...'}
                        />
                    </View>
                </View>
                {/* End:searchSection */}
            </View>
        );
    };

    renderFoodsList = (item) => {
        item = item.item;
        var collapse = this.searchText == '';
        return (
            <FoodWidget category={item.category} collapse={!collapse} />
        )
    }

    search = async (searchText) => {
        this.searchText = searchText;
        if (searchText.length <= 0) {
            this.loadFoodsList();
        } else {
            let data = await AsyncStorage.getItem(STORAGE_KEY);
            data = JSON.parse(data);
            let filteredData = [];
            filteredData = data.categories.filter((item) => {
                var filteredSubCategories = [];
                filteredSubCategories = item.category.subcategories.filter((row, indexOfRow) => {
                    var filteredItems = [];
                    filteredItems = row.items.filter((itemToBeInserted) => {
                        if (itemToBeInserted.includes(searchText)) {
                            return itemToBeInserted
                        }
                    })
                    if (filteredItems.length <= 0) {
                    } else {
                        row.items = filteredItems;
                        return row;
                    }
                });
                item.category.subcategories = filteredSubCategories;
                if (item.category.subcategories.length > 0) {
                    return item;
                }
            });
            var foodlist = this.state.foodsList;
            foodlist.categories = filteredData;
            this.setState({ foodsList: foodlist });
        }
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <View style={styles.container}>

                    <View style={styles.chatSection}>
                        <Image source={require('../../assets/images/chat.webp')} resizeMode={'contain'} style={styles.chatIcon} />
                    </View>

                    <FlatList
                        style={{ paddingHorizontal: 10 }}
                        data={this.state.foodsList.categories}
                        renderItem={this.renderFoodsList}
                        ListHeaderComponent={this.renderHeader}
                        keyboardShouldPersistTaps={'handled'}
                        keyExtractor={(item, index) => index.toString() + index}
                    />

                </View>
            </SafeAreaView>
        )
    }
}
