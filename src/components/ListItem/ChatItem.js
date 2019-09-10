import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ListItem } from 'react-native-elements';

export class ChatItem extends Component {  
    constructor(props) {
        super(props);
        this.state = {
          date: '',
        };
      }

      componentDidMount() {
        var that = this;

        var hours = new Date().getHours(); //Current Hours
        var min = new Date().getMinutes(); //Current Minutes
    
        that.setState({
          date:
             hours + ':' + min
        });
      }

    render() {    
      return (
        <TouchableOpacity>
          <ListItem
            title = {this.props.title || "Title"}
            titleStyle={{ fontWeight: 'bold', fontSize: 17 }}
            subtitle={this.props.subtitle || "SubTitle"}
            leftAvatar={{
              icon: {name:'user', type: 'antdesign'},
              size: 'medium'
            }}
            rightTitle = {this.state.date}
            rightTitleStyle = {{position:'absolute', bottom: 5}}
            badge={{
                value: this.props.badge,
                textStyle: { color: 'white' },
                badgeStyle: {position:'absolute', left: -50, top: 0 }
                }}

            containerStyle={{  borderBottomWidth: 0.5, borderBottomEndRadius: 50, borderBottomStartRadius: 100 }}/>
        </TouchableOpacity>
      );
    }
  }