import React, {useContext, useState} from "react";
import {Button, TextInput, ToastAndroid, View, Text, ActivityIndicator} from "react-native";
import NetInfo from '@react-native-community/netinfo';
import {addEvent, deleteActivity, getEvents} from "../client/Client";
import {ModelContext} from "../context/ModelContext";


const AddScreen: React.FC = ({route, navigation}) => {
    const {modelList} = useContext(ModelContext)
    const [loading, setLoading] = useState(false);

    const [name, setName] = useState("");
    const [team, setTeam] = useState("");
    const [details, setDetails] = useState("");
    const [status, setStatus] = useState("");
    const [participants, setParticipants] = useState("");
    const [type, setType] = useState("");
    const generateUID = () => {
        const timestamp = Date.now().toString(36); // Convert current timestamp to base36
        const randomString = Math.random().toString(36).substr(2, 5); // Generate a random string
        return timestamp + randomString;
    }
    const checkConnectivity = async () => {
        const conn = await NetInfo.fetch();
        return conn.isConnected;
    }

    const handleAdd = async () => {
        try {
            if (await checkConnectivity()) {
                setLoading(true);
                const response = await addEvent({
                    name: name,
                    team: team,
                    details: details,
                    status: status,
                    participants: participants,
                    type: type
                })
                const model = {
                    id: response.data.id as number,
                    name: name,
                    team: team,
                    details: details,
                    status: status,
                    participants: participants as number,
                    type: type
                };
                setLoading(false);
                navigation.navigate('MainScreen', {model});
                navigation.goBack();
            } else {
                const model = {
                    id: generateUID() as number,
                    name: name,
                    team: team,
                    details: details,
                    status: status,
                    participants: participants as number,
                    type: type
                };
                navigation.navigate('MainScreen', {model});
            }
        } catch (e) {
            ToastAndroid.show('Error!: ' + e, ToastAndroid.SHORT);
        }
        console.log('added entity!');
    }

    return (
        <View style={{margin: 20}}>
            {loading ? (
                <ActivityIndicator size="large" color="#0000ff"/>
            ) : (<>
                <Text style={{color: 'black'}}>Name:</Text>
                <TextInput
                    value={name}
                    onChangeText={setName}
                    color={'black'}

                    style={{borderWidth: 1, padding: 10, marginBottom: 10}}
                />
                <Text style={{color: 'black'}}>Team:</Text>
                <TextInput
                    value={team}
                    onChangeText={setTeam}
                    color={'black'}

                    style={{borderWidth: 1, padding: 10, marginBottom: 10}}
                />
                <Text style={{color: 'black'}}>Details:</Text>
                <TextInput
                    value={details}
                    onChangeText={setDetails}
                    color={'black'}

                    style={{borderWidth: 1, padding: 10, marginBottom: 10}}
                />
                <Text style={{color: 'black'}}>Status:</Text>
                <TextInput
                    value={status}
                    onChangeText={setStatus}
                    color={'black'}

                    style={{borderWidth: 1, padding: 10, marginBottom: 10}}
                />
                <Text style={{color: 'black'}}>Participants:</Text>
                <TextInput
                    value={participants}
                    onChangeText={setParticipants}
                    color={'black'}

                    style={{borderWidth: 1, padding: 10, marginBottom: 10}}
                />
                <Text style={{color: 'black'}}>Description:</Text>
                <TextInput
                    value={type}
                    onChangeText={setType}
                    color={'black'}

                    style={{borderWidth: 1, padding: 10, marginBottom: 10}}
                />

                <Button title="Add" onPress={handleAdd} style={{color: 'black'}}/>
            </>)}
        </View>
    );


};

export default AddScreen;
