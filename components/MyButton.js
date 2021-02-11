import React, { useState } from 'react'
import { TouchableOpacity, View, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { MainStyle } from '../assets/style'


export default function MyButton(props) {



    return (
        <TouchableOpacity onPress={() => props.setValue(props.value)} style={[MainStyle.button, styles.numberButton]}>
            {props.icon != null ?
                <Icon name={props.icon} size={20} color={'white'}></Icon> :
                <Text style={MainStyle.textButton}>{props.value}</Text>
            }
        </TouchableOpacity>
    )


}

const styles = StyleSheet.create({
    numberButton: {
        backgroundColor: '#000',
    },
})