import AsyncStorage from '@react-native-async-storage/async-storage';
import { Model } from '../models/Pokemon';
import {Event} from "../models/Event";

const STORAGE_KEY = 'modelData';

export const getAllItems = async (): Promise<Event[]> => {
    try {
        const storedData = await AsyncStorage.getItem(STORAGE_KEY);
        return storedData ? JSON.parse(storedData) : [];
    } catch (error) {
        console.error('Error retrieving Pokemon data:', error);
        return [];
    }
};

export const getModelsByCategory = async (category: string): Promise<Event[]> => {
    try {
        const storedData = await AsyncStorage.getItem(STORAGE_KEY);
        const modelData = JSON.parse(storedData) ?? [];
        return modelData.filter(model => model.category === category);
    } catch (error) {
        console.error('Error retrieving Model data:', error);
        return [];
    }
};

export const getModelById = async (id: number): Promise<Event | undefined> => {
    try {
        const storedData = await AsyncStorage.getItem(STORAGE_KEY);
        const modelData: Event[] = storedData ? JSON.parse(storedData) : [];
        return modelData.find(model => model.id === id);
    } catch (error) {
        console.error('Error retrieving Model by ID:', error);
        return undefined;
    }
};

export const addModelService = async (model: Event): Promise<void> => {
    try {
        const storedData = await AsyncStorage.getItem(STORAGE_KEY);
        const modelData: Event[] = storedData ? JSON.parse(storedData) : [];
        model.id = modelData.length > 0 ? modelData[modelData.length - 1].id + 1 : 1;
        modelData.push(model);
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(modelData));
    } catch (error) {
        console.error('Error adding Model:', error);
    }
};

export const updateModelService = async (updatedModel: Event): Promise<void> => {
    try {
        const storedData = await AsyncStorage.getItem(STORAGE_KEY);
        let modelData: Event[] = storedData ? JSON.parse(storedData) : [];
        modelData = modelData.map(model => (model.id === updatedModel.id ? updatedModel : model));
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(modelData));
    } catch (error) {
        console.error('Error updating Model:', error);
    }
};

export const deleteModelService = async (id: number): Promise<void> => {
    try {
        const storedData = await AsyncStorage.getItem(STORAGE_KEY);
        let modelData: Event[] = storedData ? JSON.parse(storedData) : [];
        modelData = modelData.filter(model => model.id !== id);

        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(modelData));
    } catch (error) {
        console.error('Error deleting Model:', error);
    }
};
