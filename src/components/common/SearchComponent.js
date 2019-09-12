import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { SearchBar, Card, Input, Icon } from 'react-native-elements';
import styles from '../../Constants/Styles';
import PickerCheckbox from './PickerCheckBox/PickerCheckbox';
import { FilterButton } from '../common/Buttons';


export default class SearchComponent extends React.Component {
    state = {
        search: '',
    };

    updateSearch = search => {
        this.setState({ search });
    };

    handleConfirm(pItems) {
        console.log('pItems =>', pItems);
    }
    render() {
        const { search } = this.state;
        const items = [
            {
                itemKey: 1,
                itemDescription: 'Doktor'
            },
            {
                itemKey: 2,
                itemDescription: 'Dietisyen'
            },
            {
                itemKey: 3,
                itemDescription: 'Psikolog'
            },
            {
                itemKey: 4,
                itemDescription: 'Eğitim Danışmanı'
            }
        ];

        return (
            <View
                style={[styles.fullScreenSearchComponent]}
            >
                <PickerCheckbox
                    data={items}
                    headerComponent={<Text style={{ fontSize: 25 }} >items</Text>}
                    OnConfirm={(pItems) => this.handleConfirm(pItems)}
                    ConfirmButtonTitle='OK'
                    DescriptionField='itemDescription'
                    KeyField='itemKey'
                    placeholder='Branş seçiniz'
                    arrowColor='green'
                    arrowSize={10}
                    placeholderSelectedItems='$count selected item(s)'
                />

                {/* <ListPicker
                    selectedValue={this.props.branch}
                    // onValueChange={(branch, itemIndex) => this.props.selectBranch({ branch })}
                    options={['Doktor', 'Dietisyen', 'Psikolog', 'Eğitim Danışmanı']}/>  */}

                <SearchBar
                    inputStyle={{ backgroundColor: 'white' }}
                    containerStyle={{ backgroundColor: 'white', borderWidth: 1, borderRadius: 15, marginTop: 20 }}
                    placeholder="Ara..."
                    platform="android"
                    onChangeText={this.updateSearch}
                    value={search}
                    clearIcon={true}
                    searchIcon={true}
                />

                {/* <Card>
                    <Card>
                        <Slider
                            style={{ marginTop: 10 }}
                            value={this.state.value}
                            onValueChange={value => this.setState({ value, value1: value + 5 })}
                            step={5}
                            animationType='timing'
                            minimumValue={0}
                            maximumValue={100}
                        />
                        <Text>En düşük fiyat: {this.state.value}</Text>
                    </Card>
                    <Card>
                        <Slider
                            style={{ marginTop: 10 }}
                            value={this.state.value1}
                            onValueChange={value1 => {
                                if (this.state.value > value1)
                                    this.setState({ value1, value: value1 - 5 })
                                else
                                    this.setState({ value1 })
                            }}
                            step={5}
                            animationType='timing'
                            minimumValue={0}
                            maximumValue={100}
                        />
                        <Text>En yüksek fiyat: {this.state.value1}</Text>
                    </Card>
                </Card>

                <Card>
                    <Text>Fiyat araliği:  {this.state.value} : {this.state.value1}</Text>
                </Card> */}
                <View style={{ padding: 10, flexDirection: 'column' }}>
                    <Text
                        style={{ marginTop: 20 }}
                    >Fiyat araliği seçiniz:  </Text>
                    <View style={{ flex: 1, flexDirection: 'row' }}>
                        <View style={{ alignItems: 'flex-start' }}>
                            <Card
                                containerStyle={{ borderWidth: 1, borderRadius: 6, height: 80, width: 90 }}
                            >
                                <Input
                                    label={'MIN TL'}
                                    multiline={false}
                                    maxLength={3}
                                    labelStyle={{ fontSize: 8, color: 'black' }}
                                    keyboardType='phone-pad'
                                    value={this.state.text}
                                    onChangeText={(text) => this.setState({ text })}
                                />
                            </Card>
                        </View>
                        <View style={{ alignItems: 'flex-end' }}>
                            <Card
                                containerStyle={{ borderWidth: 1, borderRadius: 6, height: 80, width: 90 }}
                            >
                                <Input
                                    label={'MAX TL'}
                                    labelStyle={{ fontSize: 8, color: 'black' }}
                                    multiline={false}
                                    maxLength={3}
                                    keyboardType='phone-pad'
                                    value={this.state.text1}
                                    onChangeText={(text1) => this.setState({ text1 })}
                                />
                            </Card>
                        </View>

                    </View>
                    <Card>
                        <View style={{ flex: 1, flexDirection: 'row' }}>
                            <View style={{ alignContent: 'flex-start' }}>
                                <Text>Fiyat araliği:  {this.state.text} : {this.state.text1}</Text>
                            </View>
                            <View style={{ alignSelf: 'flex-end' }}>
                                <Icon
                                    containerStyle={{ marginLeft: 5 }}
                                    name="turkish-lira"
                                    type='font-awesome'
                                    size={14} />
                            </View>
                        </View>
                    </Card>
                </View>
                
                <View style= {{ flex: 1, alignItems: 'flex-end' }}>
                <FilterButton
                    //onPress={() => this.props()}
                    />
                </View>

            </View>
        );
    }
}