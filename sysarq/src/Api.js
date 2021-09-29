import axios from "axios";

const hostApiProfile = `${process.env.REACT_APP_URL_API_PROFILE}`;
const hostApiArchives = `${process.env.REACT_APP_URL_API_ARCHIVES}`;

export const axiosProfile = axios.create({
	baseURL: hostApiProfile,
});

export const axiosArchives = axios.create({
	baseURL: hostApiArchives,
});
