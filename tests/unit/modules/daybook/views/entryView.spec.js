import { shallowMount } from '@vue/test-utils'
import { createStore } from 'vuex'

import Swal from "sweetalert2";

import  journal    from '@/modules/daybook/store/journal'
import { journalState } from '../../../mocks-data/test-journal-state'
import EntryView  from '@/modules/daybook/views/EntryView.vue'


const createVuexStore = ( initialState ) => 
    createStore({
    modules: {
        journal: {
            ...journal,
            state: { ...initialState }
        }
    }

})
jest.mock('sweetalert2', () => ({
    fire: jest.fn(),
    showLoading: jest.fn(),
    close: jest.fn()
}))



describe('Pruebas en el EntryView', () => {


    const store = createVuexStore( journalState )
    store.dispatch = jest.fn()

    const mockRouter = {
        push: jest.fn()
    }

    let wrapper

    beforeAll((() => {
        jest.clearAllMocks()

        wrapper = shallowMount( EntryView, {
            props: {
                id: '-MiX0dQyNgncRvQV5taZ'
            },
            global: {
                mocks: {
                    $router: mockRouter
                },
                plugins: [ store ]
            }
       })

    }))  


    test('debe de sacar al usuario porque el id no existe', () => {
        
        const wrapper = shallowMount( EntryView, {
            
            props: {
                id: 'Este ID no existe en el STORE'
            },
            global: {
                mocks: {
                    $router: mockRouter
                },
                plugins: [ store ],

            }
        })
        
        expect( mockRouter.push ).toHaveBeenCalledWith({ name: "no-entry" })

    })

    test('debe de mostrar la entrada correctamente', () => {

        console.log( wrapper.html())
        
        expect( wrapper.html()).toMatchSnapshot()
        expect( mockRouter.push ).not.toHaveBeenCalledWith()

    })

    test('debe de borrar la entrada y salir', (done) => {

        Swal.fire.mockReturnValueOnce( Promise.resolve({isConfirmed: true }))

        wrapper.find('.btn-danger').trigger('click')

        expect( Swal.fire ).toHaveBeenCalledWith({
            title: 'Está seguro?',
            text: 'Una vez borrado, no se puede recuperar',
            showDenyButton: true,
            confirmButtonText: 'Sí, estoy seguro'
        })

        setTimeout( () => {
            
            expect( store.dispatch ).toHaveBeenCalledWith("journal/deleteEntry", "-MiX0dQyNgncRvQV5taZ")
            expect( mockRouter.push ).toHaveBeenCalled()
            done()
        },1)
    })
})