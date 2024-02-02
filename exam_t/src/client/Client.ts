import axios from 'axios';

const baseURL = 'http://172.30.118.47:2426/';

const api = axios.create({
    baseURL,
});

export const getEvents = () => api.get('/events');
export const addEvent = (item: any) => api.post('/event', item);
export const getEventFromOnline = (id: number) => api.get('/event/'+id);
export const getEventsInProgress = () => api.get('/inProgress');
export const getAllEvents = () => api.get('/allEvents');
export const enrollParticipant = (eventId: number) => api.put('/enroll/'+eventId);
export const deleteActivity = (itemId: number) => api.delete(`/activity/${itemId}`);
