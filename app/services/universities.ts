import axios from 'axios';

const api = axios.create({
    baseURL: "http://universities.hipolabs.com/search?",
});

export const getUniversityByCountry = async (countryName: string) => {
    try {
        const response = await api.get(`country=${countryName}`);

        return response.data;
    } catch (error) {
        throw new Error(JSON.stringify(error))
    }
}