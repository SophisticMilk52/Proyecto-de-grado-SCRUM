import axios from 'axios'

let local = "http://localhost:8090/scrum/api/"
let remot = "http://pi2sis.icesi.edu.co/scrum/api/"


	export default axios.create({
		baseURL: local,
		headers: {
			'Accept': 'application/json'
		}
	})
