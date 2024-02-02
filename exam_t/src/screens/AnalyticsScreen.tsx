import React, {useEffect, useState} from "react";
import {View, Text, ToastAndroid, ActivityIndicator, FlatList} from "react-native";
import {getAllEvents} from "../client/Client";

const AnalyticsScreen: React.FC = ({route, navigation}) => {
    const [topEvents, setTopEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);

    const getTopEvents = async () => {
        try {
            const response = await getAllEvents();
            console.log('fetched events!');
            const allEvents = response.data;

            const sortedEvents = allEvents.sort((a, b) => {
                if (a.status === b.status) {
                    return b.participants - a.participants;
                }
                return a.status.localeCompare(b.status);
            });

            const top5Events = sortedEvents.slice(0, 5);

            setTopEvents(top5Events);
            setLoading(false);
        } catch (error) {
            ToastAndroid.show('Error loading top events: ' + error, ToastAndroid.SHORT);
        }
    };

    useEffect(() => {
        getTopEvents().then();
    }, []);

    return (
        <View>
            {loading ? <ActivityIndicator /> : null}

            <FlatList
                data={topEvents}
                renderItem={({ item }) => (
                    <View>
                        <Text>{item.id}</Text>
                        <Text>{item.name}</Text>
                        <Text>{item.team}</Text>
                        <Text>{item.type}</Text>
                        <Text>{item.status}</Text>
                        <Text>participants: {item.participants}</Text>
                    </View>
                )}
                keyExtractor={(item) => item.id.toString()}
            />
        </View>
    );
}

export default AnalyticsScreen;