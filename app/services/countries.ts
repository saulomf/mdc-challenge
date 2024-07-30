import axios from 'axios';

const api = axios.create({
    baseURL: "https://restcountries.com/v3.1/all",
});

export const getCountries = async () => {
    try {
        const response = await api.get('');

        return response.data;
    } catch (error) {
        throw new Error(JSON.stringify(error))
    }
}