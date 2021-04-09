import axios from 'axios'

const getAllPropertyData = () => {
    return axios.get('https://g6rosry6sj.execute-api.us-west-2.amazonaws.com/prod/properties')
}

export default getAllPropertyData