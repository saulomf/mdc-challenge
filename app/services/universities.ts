import axios from 'axios';

const api = axios.create({
    baseURL: "http://universities.hipolabs.com/",
});

export const getUniversityByCountry = async (countryName: string) => {
    try {
        const response = await api.get(`search?country=${countryName}`);

        return response.data;
    } catch (error) {
        throw new Error(JSON.stringify(error))
    }
}