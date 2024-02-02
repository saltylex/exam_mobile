import React, {useEffect, useState} from "react";
import {ToastAndroid, View, Text} from "react-native";
import {getEventFromOnline, getEvents} from "../client/Client";
import {Event} from "../models/Event";

const ModelScreen = ({route, navigation}) => {
    const modelId = route.params;
    const [model, setModel] = useState<Event>()

    const getModelFromOnline = async () => {
        try {
            const response = await getEventFromOnline(modelId);
            console.log('fetched events!');
            setModel(response.data);
        } catch (e) {
            ToastAndroid.show('Error!: ' + e, ToastAndroid.SHORT);
            navigation.goBack();
        }
    }

    useEffect(() => {
        getModelFromOnline().then();
    },[])
    return (
        <View style={{margin: 20}}>
            <Text style={{color: 'black'}}>Name: {model?.name}</Text>
            <Text style={{color: 'black'}}>Details: {model?.details}</Text>
            <Text style={{color: 'black'}}>Team: {model?.team}</Text>
            <Text style={{color: 'black'}}>Type: {model?.type}</Text>
            <Text style={{color: 'black'}}>Participants: {model?.participants}</Text>
            <Text style={{color: 'black'}}>Status: {model?.status}</Text>
            <Text style={{color: 'black'}}>Id: {model?.id}</Text>
        </View>
    );

}

export default ModelScreen;