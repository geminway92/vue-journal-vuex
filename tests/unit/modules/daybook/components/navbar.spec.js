import { shallowMount } from '@vue/test-utils'
import Nabvar from '@/modules/daybook/components/NavBar.vue'
import createVuexStore from '../../../mocks-data/mock-store'


describe('Pruebas en el Nabvar component', () => {

    const store = createVuexStore({
        user: {
            name: 'Juan Carlos',
            email: 'juan@gmail.com'
        },
        status: 'authenticathed',
        idToken: 'ABC-123',
        refreshToken: 'XYZ'
    })

    test('debe de mostrar el componente correctamente', () => {

        const wrapper = shallowMount( Nabvar, {
            global: {
                plugins: [ store ]
            }
        })

        expect(wrapper.html()).toMatchSnapshot()

    })


    test('click en logout, debe de cerrar sesión y redireccionar', async() => {

        const wrapper = shallowMount( Nabvar, {
            global: {
                plugins: [ store ]
            }
        })
        await wrapper.find('button').trigger('click')

        expect( wrapper.router.push ).toHaveBeenCalledWith( {name: 'login' })

        expect( store.state.auth ).toEqual({
            user: null,
            status: 'not-authenticated', // 'authenthicated', 'not-authenticated', 'authenthicating'
            idToken: null,
            refreshToken: null
        })

        beforeEach(() => jest.clearAllMocks() )
        

    })
})