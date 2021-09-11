import axios from "axios";

const hostApi = `${process.env.REACT_APP_URL_API}`;

export default axios.create({
	baseURL: hostApi,
});
