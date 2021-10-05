import cloudinary from 'cloudinary'

import uploadImage from '@/modules/daybook/helpers/uploadImage'

import axios from 'axios'

cloudinary.config({
    cloud_name: 'ddn278n2q',
    api_key: '572743778958815',
    api_secret: 'fTs5frkkibWDJbG1cGYCtbKEpm0'
})

describe('Pruebas en el uploadImage', () => {

    test('debe de cargar un archivo y retornar el url', async( done ) => {

        const {data } = await axios.get('https://res.cloudinary.com/ddn278n2q/image/upload/v1628803547/jrk71lzzk540txpyft9n.jpg', {
            responseType: 'arraybuffer'
        })

        const file = new File ([ data ], 'foto.png')

        const url = await uploadImage( file )

        expect( typeof url).toBe('string')

        // Tomar el ID
        const segments = url.split('/')
        const imageId = segments[ segments.length - 1 ].replace('.jpg', '')
        cloudinary.v2.api.delete_resources( imageId, {}, () => {
            done()
        } )
    })

})