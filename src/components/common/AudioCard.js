import React, { Component } from 'react';
import { View, Text, ActivityIndicator, Platform } from 'react-native';
import { Slider } from 'react-native-elements';
import { PauseButton, PlayButton, ResetButton } from './Buttons';
import Sound from "react-native-sound";
import * as actions from '../../appstate/actions';
import { connect } from 'react-redux';
import styles from '../../Constants/Styles';

class AudioCard extends Component {

    state = {
        // sound 
        seconds: -1,
        minutes: 0,
        currentDuration: 0,
        loading: true,
        paused: false,
        playing: false,
        duration: "",
        sound: ''
    }

    timer = '';
    is_mounted = false;

    componentDidMount() {
        this.is_mounted = true;
    }
    constructor(props) {
        super(props);
        const date = new Date(this.props.createdAt);
        const dateh = date.getHours();
        var datem = date.getMinutes();
        if (datem < 10) {
            datem = '0' + datem
        }
        const sound = new Sound(this.props.audio, "", error => {
            var duration = sound.getDuration();
            if (!error) {
                if (this.is_mounted) {
                    this.setState({
                        sound: sound,
                        createdAt: dateh + ':' + datem,
                        duration: duration,
                        loading: false
                    })
                }
            }
            else {
                console.log("Ses oluşturulurken hata oluştu", this.props.audio);
            }
        })
    }

    render() {
        if (this.state.loading)
            return (
                <View style={styles.audioCardLoader}>
                    <ActivityIndicator size="small" color='#2fb4dc' />
                </View>
            )
        else {
            return (
                <View style={{
                    flexDirection: "row",
                    backgroundColor: 'rgb(220,220,220)',
                    height: Platform.OS == 'ios' ? 80 : 60,
                    width: "100%",
                    borderRadius: 10,
                    justifyContent: 'center',
                    padding: 8
                }}>
                    <View style={{ backgroundColor: 'transparent', flex: 1, alignItems: 'center' }}>
                        <View style={{ justifyContent: 'center', flex: 1 }}>
                            {this.renderPlayPause()}
                        </View>
                    </View>
                    <View style={{
                        flex: 2,
                        justifyContent: 'center',
                        flexDirection: 'column',
                    }}>
                        <View style={{ flex: Platform.OS == 'ios' ? 4 : 9, flexDirection: 'column', justifyContent: Platform.OS == 'ios' ? "flex-end" : 'center' }}>
                            <Slider
                                step={1}
                                minimumValue={0}
                                maximumValue={this.state.duration}
                                value={this.state.currentDuration}
                                minimumTrackTintColor="#2fb4dc"
                                thumbTintColor='#2fb4dc'
                                onValueChange={(ChangedValue) => { this.SliderValueChanged(ChangedValue) }}
                                style={{ marginLeft: 4, alignSelf: 'flex-end', width: '100%' }}
                            />
                        </View>
                        <View style={{ flex: 1, flexDirection: 'row' }} >
                            <Text style={{ flex: 1, marginLeft: 4, alignSelf: 'center', fontSize: 12 }}>{this.getPlayTimeText()}</Text>
                            <Text style={{ flex: 1, alignSelf: 'center', fontSize: 12 }}>{this.state.createdAt}</Text>
                        </View>
                    </View>
                </View>
            );
        }
    }

    SliderValueChanged = (ChangedValue) => {
        if (this.is_mounted) {
            this.setState({ currentDuration: ChangedValue });
        }
        this.state.sound.setCurrentTime(ChangedValue);
    }

    getPlayTimeText = () => {
        const { paused, duration, currentDuration, playing } = this.state;
        let mins = '';
        let secs = '';
        if (paused || playing) {
            mins = parseInt(currentDuration / 60);
            secs = parseInt(currentDuration % 60);
        } else {
            mins = parseInt(duration / 60);
            secs = parseInt(duration % 60);
        }
        if (secs < 10)
            secs = '0' + secs;
        return mins + ":" + secs;
    }

    // resetSound = () => {
    //     console.log("Reset Sound");
    //     this.props.setAudio("");
    //     const sound = this.state.sound;
    //     if (sound) {
    //         sound.stop();
    //         if (this.timer)
    //             clearInterval(this.timer);
    //         this.setState({
    //             seconds: 0,
    //             minutes: 0,
    //             paused: false,
    //             playing: false,
    //             currentDuration: 0
    //         })
    //     }
    // }

    renderPlayPause = () => {
        if (this.state.playing) {
            return <PauseButton onPress={this.pausePlaying} buttonStyle={{ marginHorizontal: '0%' }} />
        } else if (!this.state.playing) {
            return <PlayButton onPress={this.startPlaying} buttonStyle={{ marginHorizontal: '0%' }} />
        }
        if (this.props.currentAudio) {
            if (this.props.currentAudio.id === this.props.id) {
                return <PauseButton onPress={this.pausePlaying} buttonStyle={{ marginHorizontal: '0%' }} />
            } else {
                const sound = this.state.sound;
                if (sound) {
                    sound.pause();
                }
                return <PlayButton onPress={this.startPlaying} buttonStyle={{ marginHorizontal: '0%' }} />
            }
        }
        else
            return <PlayButton onPress={this.startPlaying} buttonStyle={{ marginHorizontal: '0%' }} />
    }


    startPlaying = () => {
        this.props.setAudio(this.props.id);
        if (this.is_mounted) {
            this.setState({
                playing: true,
            })
        }
        const sound = this.state.sound;
        if (sound) {
            console.log("Playing sound");
            this.timer = setInterval(() => {
                var { seconds, minutes } = this.state;
                seconds += 1;
                if (seconds >= 60) {
                    seconds = 0;
                    minutes += seconds / 60;
                }
                if (seconds < 10) {
                    tmpSeconds = '0' + seconds;
                }
                if (this.is_mounted) {
                    this.setState({
                        currentDuration: this.state.currentDuration + 1,
                        seconds: seconds,
                        minutes: minutes
                    })
                }
            }, 1000);
            sound.play(success = () => {
                if (success) {
                    console.log("Sound played")
                    clearInterval(this.timer);
                    if (this.is_mounted) {
                        this.setState({
                            seconds: -1,
                            minutes: 0,
                            paused: false,
                            playing: false,
                            currentDuration: 0
                        })
                        this.props.setAudio("");
                    }
                } else {
                    console.log("Sound could not played", success)
                }
            })
        }
    }

    incrementTimer = () => {
        var { seconds, minutes } = this.state;
        console.log("Incrementing timer ", seconds + '\n' + minutes)
        seconds += 1;
        if (seconds >= 60) {
            seconds = 0;
            minutes += seconds / 60;
        }
        if (seconds < 10) {
            tmpSeconds = '0' + seconds;
        }
        if (this.is_mounted) {
            this.setState({
                currentDuration: this.state.currentDuration + 1,
                seconds: seconds,
                minutes: minutes
            })
        }
    }

    pausePlaying = () => {
        if (this.is_mounted)
            this.setState({
                pause: true,
                playing: false
            })
        this.props.setAudio("");
        const sound = this.state.sound;
        if (sound) {
            sound.pause();
            if (this.timer)
                clearInterval(this.timer);
        }
    }
    stopPlaying = () => {
        this.props.setAudio("");
        const sound = this.state.sound;
        if (sound)
            sound.stop();
    }
    componentWillUnmount() {
        this.is_mounted = false;
        this.stopPlaying();
    }
}
const mapStateToProps = ({ chat }) => {
    return { currentAudio: chat.currentAudio };
}
export default connect(mapStateToProps, actions)(AudioCard);