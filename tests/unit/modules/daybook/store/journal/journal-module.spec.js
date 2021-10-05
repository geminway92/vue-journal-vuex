import { createStore } from "vuex"
import journal         from '@/modules/daybook/store/journal'
import { journalState } from "../../../../mocks-data/test-journal-state"

import  authApi  from "@/api/authApi"

const createVuexStore = ( initialState ) => 
    createStore({
        modules: {
            journal: {
                ...journal,
                state: { ...initialState }
            }
        }
    })

describe('Vuex - Pruebas en el Journal Module', () => {
    
    beforeAll( async() => {

        const { data } = await authApi.post(':signInWithPassword', {
            email: 'test@test.com',
            password: '123456',
            returnSecureToken: true,
        })

        localStorage.setItem('idToken', data.idToken )

    })


    //Basicas
    test('este es el estado inicial, debe de tener este state', () => {
        
       const store = createVuexStore( journalState ) 
       const { isLoading, entries } = store.state.journal

       expect( isLoading ).toBeFalsy()
       expect( entries ).toEqual( journalState.entries)
    })

    // Mutations
    test('mutation: setEntries', () => {

       const store = createVuexStore( { isLoading: true, entries: [] }) 

       store.commit('journal/setEntries', journalState.entries)

       expect( store.state.journal.entries.length ).toBe(2)
       expect( store.state.journal.isLoading ).toBeFalsy()

    })

    test('Mutation: updateEntry', () => {

        //create store con entries
       const store = createVuexStore( journalState ) 

        //  updateEntry
        const updateEntry = {
            id: '-MiX0dQyNgncRvQV5taZ',
            date: 1630510935723,
            text: 'Hola mundo, es una prueba',
        }

        // commit de la mutación
        store.commit('journal/updateEntry', updateEntry)

        // Expects
        // entries.length = 2
        expect( store.state.journal.entries.length).toBe(2)
        // entries  tiene que existir updateEntry toEqual
        expect( store.state.journal.entries.find( e => e.id === updateEntry.id)).toEqual( updateEntry )

    })

    test('mutation: addEntry deleteEntry', () => {
       const store = createVuexStore( journalState ) 

        store.commit('journal/addEntry', {id: 'ABC-123', text: 'Hola mundo' })

        const stateEntries = store.state.journal.entries

        expect( stateEntries.length).toBe(3)
        expect( stateEntries.find( e => e.id === 'ABC-123')).toBeTruthy()
    
        store.commit('journal/deleteEntry','ABC-123')
        expect( store.state.journal.entries.length).toBe(2)
        expect( store.state.journal.entries.find( e => e.id === 'ABC-123')).toBeFalsy()
    })

    //Getters ====================================
    test('getters: getEntriesByTerm getEntryById', () => {

       const store = createVuexStore( journalState ) 

       const [ entry1, entry2 ] = journalState.entries

       expect( store.getters['journal/getEntriesByTerm']('').length).toBe(2)
       expect( store.getters['journal/getEntriesByTerm']('funciona').length).toBe(1)
       
       expect( store.getters['journal/getEntriesByTerm']('funciona')).toEqual([entry2])
       
       expect( store.getters['journal/getEntryById']('-MiX0dQyNgncRvQV5taZ')).toEqual(entry1)

      
    })

    // Actions ======
    test('actions: loadEntries', async() => {

       const store = createVuexStore( { isLoading: true, entries: [] }) 

       await store.dispatch('journal/loadEntries')

       expect( store.state.journal.entries.length ).toBe(2)
        

    })
    
    test('actions: updateEntry', async() => {

        const store = createVuexStore( journalState ) 

        const updateEntry = {
            id:"-MiX0dQyNgncRvQV5taZ", 
            date: 1630510935723,
            picture: "https://res.cloudinary.com/ddn278n2q/image/upload/v1630511703/mnpxj8ul0xgagmliswa4.png",
            text: "Hola mundo, es una prueba",
            otroCAmpo: true,
            otroMas: { a: 1},
        }
 
        await store.dispatch('journal/updateEntry', updateEntry)
 
        expect( store.state.journal.entries.length ).toBe(2)
        expect(
            store.state.journal.entries.find(e => e.id === updateEntry.id )
        ).toEqual( {
            id:"-MiX0dQyNgncRvQV5taZ", 
            date: 1630510935723,
            picture: "https://res.cloudinary.com/ddn278n2q/image/upload/v1630511703/mnpxj8ul0xgagmliswa4.png",
            text: "Hola mundo, es una prueba",
        } )
         
 
    })

    test('actions: createEntry deletryEntry', async() => {

        // CreateStore
        const store = createVuexStore( journalState ) 

        // newEntry = { date: 13234324233, text: 'Nueva entrada desde las pruebas'}
        const newEntry = {
            data: 1245335343243,
            text: 'Esto es una prueba de crear una entrada',
        }
        // dispatch de la acción createEntry
        // obtener el id de la nueva entrada 
        const id = await store.dispatch('journal/createEntry', newEntry)

        // el ID debe de ser un string
        expect( typeof id ).toBe('string')

        // la nueva entrada debe de existir en el state.journal.entries...
        expect(store.state.journal.entries.find( e => e.id === id)).toBeTruthy()


        // # Segunda parte
        // dispath deleteEntry
        await store.dispatch('journal/deleteEntry', id)
        
        // la nueva entrada NO debe de existir en el state.journal.entries...
        expect(store.state.journal.entries.find( e => e.id === id)).toBeFalsy()
        
        
    }) 
    


})