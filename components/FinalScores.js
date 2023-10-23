import React from 'react'
import { View, Text } from 'react-native'

const FinalScores = ({ navigation, route }) => {
    const {totalScore, correct, incorrect } = route.params
    return (
        <View>
        <Text>{totalScore}</Text>
        <Text>{correct}</Text>
        <Text>{incorrect}</Text>
        </View>
    )
}

export default FinalScores