import axios from 'axios'
import Constant from '../constant'

// let local = "http://localhost:8090/scrum/api/"
// let remot = "https://pi2sis.icesi.edu.co/scrum/api/"



	export default axios.create({
		baseURL: Constant.BASE_URL,
		headers: {
			'Accept': 'application/json',
          	'Access-Control-Allow-Origin': '*'
		}
	})
