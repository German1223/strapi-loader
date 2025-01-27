require('dotenv').config();
const fs = require('fs');
const axios = require('axios');

const API_URL = `${process.env.STRAPI_URL}/amenities`;
const API_TOKEN = process.env.STRAPI_TOKEN;
const INPUT_FILE = 'amenities_pt.json';

async function saveData(obj) {

    try {
        const response = await axios.put(`${API_URL}/${obj.documentId}?locale=pt`, {
            headers: {
                Authorization: `Bearer ${API_TOKEN}`,
                
            },
            data: {
                    name: obj.name,
                    allowFilter: obj.allowFilter ? true : false
                
            }
        });

        const data = response.data;
        console.log(data)

    } catch (error) {
        console.error('Error:', error.message);
        if (error.response) {
            console.error('Server response', error.response.data);
        }
    }
}

const save =  async () => {
    const file = JSON.parse(fs.readFileSync(INPUT_FILE, 'utf-8'))
    for (const record of file) {
        await saveData(record);
    }
}

save()


