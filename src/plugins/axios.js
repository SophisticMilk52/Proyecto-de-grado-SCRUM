import axios from 'axios'

	export default axios.create({
		baseURL: "http://pi2sis.icesi.edu.co/scrum/api/",
		headers: {
			'Accept': 'application/json'
		}
	})