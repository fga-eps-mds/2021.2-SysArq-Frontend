import axios from "axios";

const hostApiProfile = `${process.env.REACT_APP_URL_API_PROFILE}`;
const hostApiArchives = `${process.env.REACT_APP_URL_API_ARCHIVES}`;

const axiosProfile = axios.create({
	baseURL: hostApiProfile,
});

const axiosArchives = axios.create({
	baseURL: hostApiArchives,
	headers: { Authorization: `JWT ${localStorage.getItem("tk")}` },
});

export { axiosProfile, axiosArchives };
