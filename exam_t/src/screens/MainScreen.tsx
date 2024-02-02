import React, {useState, useEffect, useContext} from 'react';
import {View, Text, FlatList, TouchableOpacity, ActivityIndicator, ToastAndroid, Button} from 'react-native';
import {getEvents} from '../client/Client';
import {addEventToDatabase, getEventsFromDb} from '../utils/ModelDatabase'
import {ModelContext} from "../context/ModelContext";
import { useIsFocused } from "@react-navigation/native";

const MainSectionScreen: React.FC = ({route, navigation}) => {

    const {model} = route.params?.model || {};
    const {modelList} = useContext(ModelContext)
    const isFocused = useIsFocused();
    const [event, setEvent] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);
    const [offline, setOffline] = useState(false);
    const ws = new WebSocket("ws://172.30.118.47:2426");
    ws.onmessage = async (event) => {
        const newData = JSON.parse(event.data);
        ToastAndroid.show(`New event received, named: ${newData.name}`, ToastAndroid.SHORT);
    }

        const fetchEvents = async () => {
        try {
            const response = await getEvents();
            console.log('fetched events');
            if(modelList.db) {
                const getDb = await getEventsFromDb(modelList.db);
                console.log('fetched from db');
                if(getDb.length === 0)
                for(const ev of response.data){
                    await addEventToDatabase(modelList.db, ev);
                    console.log('added');
                }
            }
                setEvent(response.data);
            setLoading(false);
            setOffline(false);
            ToastAndroid.show('Events loaded successfully!', ToastAndroid.SHORT);
        } catch (error) {
            if(modelList.db){
                const getDb = await getEventsFromDb(modelList.db);
                setEvent(getDb);
            }
            ToastAndroid.show('Error!: '+error, ToastAndroid.SHORT);
            setLoading(false);
            setOffline(true);
        }

        if(model){
            setEvent([...event, model]);
            await addEventToDatabase(modelList.db, model);
        }
    };

    const handleEventPress = (model: number) => {
        navigation.navigate('ModelScreen', model);
    }

    const navigateToAdd = () => {
        navigation.navigate('AddScreen');
    }
    const navigateToAnalytics = () => {
        navigation.navigate('AnalyticsScreen');
    }
    const navigateToProgress = () => {
        navigation.navigate('ProgressScreen');
    }

    useEffect(() => {
        if(isFocused)
            fetchEvents().then();
    }, [isFocused, modelList.db]);

    const renderOfflineMessage = () => (
        <View>
            <Text>Offline mode. Please check your internet connection and retry.</Text>
            <TouchableOpacity onPress={fetchEvents}>
                <Text>Retry</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <View>
            {loading ? <ActivityIndicator/> : null}

            {offline &&
                renderOfflineMessage()}
            <Button title="Add Event" onPress={navigateToAdd} />
            <Button title="In Progress" onPress={navigateToProgress} />
            <Button title="Analytics" onPress={navigateToAnalytics} />


            <FlatList
                    data={event}
                    renderItem={({item}) => (
                        <TouchableOpacity onPress={() => handleEventPress(item.id)}>
                            <Text>{item.id}</Text>
                            <Text>{item.name}</Text>
                            <Text>{item.team}</Text>
                            <Text>{item.type}</Text>
                        </TouchableOpacity>
                    )}
                    keyExtractor={(item) => item}
                />
            <View style={{ flexDirection: 'row', justifyContent: 'space-around', padding: 10 }}>
            </View>
        </View>
    );
};

export default MainSectionScreen;
