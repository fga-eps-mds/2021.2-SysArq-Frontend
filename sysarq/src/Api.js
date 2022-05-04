import axios from "axios";

const hostApiProfile = `${process.env.REACT_APP_URL_API_PROFILE}`;
const hostApiArchives = `${process.env.REACT_APP_URL_API_ARCHIVES}`;

const axiosProfile = axios.create({
	baseURL: hostApiProfile,
});

const axiosArchives = axios.create({
	baseURL: hostApiArchives,
});

const objectMap = (obj, fn) =>
	Object.fromEntries(Object.entries(obj).map(([k, v], i) => [k, fn(v, k, i)]));

axiosArchives.interceptors.request.use(
	(config) => {
		if (config.data) {
			config.data = objectMap(config.data, (item) => {
				if (typeof item === "string" && item !== "") {
					const newItem = item
						.split(" ")
						.map((w) => w.toUpperCase())
						.join(" ");
					return newItem;
				}
				return item;
			});
		}
		return config;
	},
	(error) => Promise.reject(error)
);

export { axiosProfile, axiosArchives };
