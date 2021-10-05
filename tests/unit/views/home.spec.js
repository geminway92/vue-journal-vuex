import { shallowMount } from '@vue/test-utils'
import Home from '@/views/Home'


describe(' Pruebas en el Home view',() => {

    test('debe de renderizar el componente correctamente',  () => {
        
        const wrapper = shallowMount( Home )
        expect( wrapper.html() ).toMatchSnapshot()
    })

    test('hacer click en un botón debe de redireccionar a no-entry', () => {

        const mockRouter = {
            push: jest.fn()
        }

        const wrapper = shallowMount( Home, {
            global: {
                mocks: {
                    $router: mockRouter
                }
            }
        } )

        wrapper.find('button').trigger('click')

        expect( mockRouter.push ).toHaveBeenCalled()
        expect( mockRouter.push ).toHaveBeenCalledWith({ name: 'no-entry' })
    })

}) 