import React, { Component } from 'react';
import { View } from 'react-native';
import { SearchBar } from 'react-native-elements';
import styles from '../../Constants/Styles';
import { ListPicker } from './Pickers';


export default class SearchComponent extends React.Component {
    state = {
        search: '',
    };

    updateSearch = search => {
        this.setState({ search });
    };

    render() {
        const { search } = this.state;

        return (
            <View
                style={[styles.fullScreen]}
            >
                <ListPicker
                    selectedValue={this.props.branch}
                   // onValueChange={(branch, itemIndex) => this.props.selectBranch({ branch })}
                    options={['Doktor', 'Dietisyen', 'Psikolog', 'Eğitim Danışmanı']}
                />
                <SearchBar
                    inputStyle={{ backgroundColor: 'white' }}
                    containerStyle={{ backgroundColor: 'white', borderWidth: 1, borderRadius: 50, marginTop: 10 }}
                    placeholder="Ara..."
                    platform="android"
                    onChangeText={this.updateSearch}
                    value={search}
                    clearIcon={true}
                    searchIcon={true}
                />

            </View>
        );
    }
}