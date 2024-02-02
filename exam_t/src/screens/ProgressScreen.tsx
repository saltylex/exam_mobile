import React, {useEffect, useState} from "react";
import {ActivityIndicator, Button, FlatList, ToastAndroid, TouchableOpacity, View, Text} from "react-native";
import {enrollParticipant, getEventsInProgress} from "../client/Client";

const ProgressScreen: React.FC = ({route, navigation}) => {
    const [inProgressEvents, setInProgressEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);
    const [offline, setOffline] = useState(false);

    const viewInProgressEvents = async () => {
        try {
            const response = await getEventsInProgress();
            setInProgressEvents(response.data);
            setLoading(false);
            setOffline(false);
            ToastAndroid.show('In-progress events loaded successfully!', ToastAndroid.SHORT);
        } catch (error) {
            ToastAndroid.show('Error loading in-progress events: ' + error, ToastAndroid.SHORT);
            setOffline(true);
        }
    };

    const enrollInEvent = async (eventId: number) => {
        try {
            await enrollParticipant(eventId);
            console.log('enrolled');
            ToastAndroid.show('Enrolled in the event successfully!', ToastAndroid.SHORT);
            navigation.goBack();
        } catch (error) {
            ToastAndroid.show('Error enrolling in the event: ' + error, ToastAndroid.SHORT);
        }
    };

    useEffect(() => {
        viewInProgressEvents().then();
    }, []);

    const renderOfflineMessage = () => (
        <View>
            <Text>Offline mode. Please check your internet connection and retry.</Text>
            <TouchableOpacity onPress={viewInProgressEvents}>
                <Text>Retry</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <View>
            {loading ? <ActivityIndicator /> : null}

            {offline && renderOfflineMessage()}

            <FlatList
                data={inProgressEvents}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => {}}>
                        <Text>{item.id}</Text>
                        <Text>{item.name}</Text>
                        <Text>{item.team}</Text>
                        <Text>{item.type}</Text>
                        <Button title="Enroll" onPress={() => enrollInEvent(item.id)} />
                    </TouchableOpacity>
                )}
                keyExtractor={(item) => item.id.toString()}
            />
        </View>
    );
};

export default ProgressScreen;