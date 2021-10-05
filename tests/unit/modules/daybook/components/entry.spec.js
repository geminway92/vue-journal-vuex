import { shallowMount } from "@vue/test-utils";
import Entry from "@/modules/daybook/components/Entry.vue";
import { journalState } from "../../../mocks-data/test-journal-state"

describe("Pruebas en el Entry Component", () => {
  // mockRouter
  const mockRouter = {
    push: jest.fn()
  };

  const wrapper = shallowMount(Entry, {
    props: {
      entry: journalState.entries[0]
    },
    global: {
      mocks: {
        $router: mockRouter

      }
    }
  });

    test("debe de hacer match con el snapchot", () => {
      expect(wrapper.html()).toMatchSnapshot()
    }),

    test("debe de redireccionar al hacer click en el entry-container", () => {

      const entryContainer = wrapper.find('.entry-container')
      entryContainer.trigger('click')

      expect( mockRouter.push ).toHaveBeenCalledWith(
        {   name: 'entry',
            params: {
            id: journalState.entries[0].id
        
          }
      
        }
      )

    });

    test("pruebas en las propiedades computadas", () => {
      // wrapper.vm. <------- ver las porpiedades computadas
      // day: 21
      // month: Septiembre
      // yearDay: '2021, Viernes'

      expect(wrapper.vm.day).toBe(1)
      expect(wrapper.vm.month).toBe('Septiembre')
      expect(wrapper.vm.yearDay).toBe('2021, Miércoles')
    })
})
