import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import styles from './style';

export default class FoodWidget extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isSubcategoriesVisible: false
        }
    }
    render() {

        var { category } = this.props;
        return (
            <View style={styles.widget}>
                <TouchableOpacity style={styles.categorySection} onPress={() => {
                    this.setState({ isSubcategoriesVisible: !this.state.isSubcategoriesVisible });
                }}>
                    <View style={{ justifyContent: 'center', width: 30, height: 30 }}>
                        <Image source={require('../../assets/images/sample.png')} resizeMode={'contain'} style={{ width: 35, height: 35 }} />
                    </View>
                    <View style={{ justifyContent: 'center', flex: 1, marginLeft: 10 }}>
                        <Text style={{ color: category.colorCode }}>{category.categoryName}&nbsp;
                            {category.servingSize && <Text style={{ color: '#000' }}>({category.servingSize})</Text>}
                        </Text>
                    </View>
                    <View style={{ justifyContent: 'center' }}>
                        <Image source={require('../../assets/images/arrow-down.webp')} resizeMode={'contain'} style={{ width: 30, height: 15 }} />
                    </View>
                </TouchableOpacity>
                {
                    (this.state.isSubcategoriesVisible || this.props.collapse) &&
                    <View style={styles.subCategorySection}>
                        {category.subcategories && category.subcategories.map((item, index) => {
                            return (
                                <View key={index}   >
                                    <View>
                                        {item.subCategoryname != '' &&
                                            <Text style={{ color: category.colorCode, fontWeight: '700', paddingTop: 10 }}>{item.subCategoryname.toUpperCase()}</Text>
                                        }
                                        {
                                            item.items && item.items.map((subcategoryItem, i) => {
                                                return (
                                                    <Text key={i} style={{ paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: '#e5e5e5' }}>{subcategoryItem}</Text>
                                                )
                                            })
                                        }
                                    </View>
                                </View>
                            )
                        })}
                        {
                            category.quote != '' &&
                            <View style={styles.quoteSection}>
                                <Text style={styles.quote}>{category.quote}</Text>
                            </View>
                        }
                    </View>
                }
            </View>
        )
    }
}
