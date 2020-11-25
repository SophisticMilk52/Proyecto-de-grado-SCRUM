import axios from 'axios'

let local = "http://localhost:8090/scrum/api/"
let remot = "https://pi2sis.icesi.edu.co/scrum/api/"


	export default axios.create({
		baseURL: remot,
		headers: {
			'Accept': 'application/json'
		}
	})
