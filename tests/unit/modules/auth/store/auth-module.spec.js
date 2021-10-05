import axios from "axios";
import  createVuexStore  from "../../../mocks-data/mock-store";

describe('Vuex: Pruebas en el auth-module', () => {

    test('estado inicial', () => {

        const store = createVuexStore({
            status: 'authenthicating', // 'authenthicated', 'not-authenticated', 'authenthicating'
            user: null,
            idToken: null,
            refreshToken: null,
        })
        
        const { status, user, idToken, refreshToken } = store.state.auth
        expect(status).toBe('authenthicating')
        expect(user).toBe(null)
        expect(idToken).toBe(null)
        expect(refreshToken).toBe(null)    
        
    })

    // Mutations
    test('Mutations loginUser', () => {

        const store = createVuexStore({
            status: 'authenthicating', // 'authenthicated', 'not-authenticated', 'authenthicating'
            user: null,
            idToken: null,
            refreshToken: null,
        })

        const payload = {
            user: { name: 'Gema', email: 'gema@gmail.com' },
            idToken: 'ABC-123',
            refreshToken: 'XYZ-123'
        }

        store.commit('auth/loginUser', payload )
        
        const { status, user, idToken, refreshToken } = store.state.auth
        expect(status).toBe('authenthicated')
        expect(user).toEqual({ name: 'Gema', email: 'gema@gmail.com' })
        expect(idToken).toBe('ABC-123')
        expect(refreshToken).toBe('XYZ-123')   

    })

    test('Mutation: logout', () => {

        localStorage.setItem('idToken', 'ABC-123')
        localStorage.setItem('refreshToken','XA2-123')

        const store = createVuexStore({
            status: 'authenthicated', // 'authenthicated', 'not-authenticated', 'authenthicating'
            user: { name: 'Gema', email: 'gema@gmail.com' },
            idToken: 'ABC-123',
            refreshToken: 'XYZ-123'
        })
        
        store.commit('auth/logout')

        const { status, user, idToken, refreshToken } = store.state.auth
        expect(status).toBe('not-authenticated')
        expect(user).toBe(null)
        expect(idToken).toBe(null)
        expect(refreshToken).toBe(null)
        expect(localStorage.getItem('idToken')).toBeFalsy()
        expect(localStorage.getItem('refreshToken')).toBeFalsy()

    })

    //Getters
    test('Getters: username, currentState', () => {
    
        const store = createVuexStore({
            status: 'authenthicated', // 'authenthicated', 'not-authenticated', 'authenthicating'
            user: { name: 'Gema', email: 'gema@gmail.com' },
            idToken: 'ABC-123',
            refreshToken: 'XYZ-123'
        })

        expect( store.getters['auth/currentState']).toBe('authenthicated')
        expect( store.getters['auth/username']).toBe('Gema')

    })


    //Actions
    test('Actions: createUser - Error usuario ya existe', async() => {

        const store = createVuexStore({
            status: 'not-authenticated', // 'authenthicated', 'not-authenticated', 'authenthicating'
            user: null,
            idToken: null,
            refreshToken: null
        })

        const newUser = { name: 'Test User', email: 'test@test.com', password: '123456'}

        const resp = await store.dispatch('auth/createUser', newUser )
        expect( resp ).toEqual({ ok: false, message: 'EMAIL_EXISTS' })

        const { status, user, idToken, refreshToken } = store.state.auth

        expect(status).toBe('not-authenticated') 
        expect(user).toBeFalsy()
        expect(idToken).toBeFalsy()
        expect(refreshToken).toBeFalsy()

    })

    test('Actions: createUser singInUser- Crea el usuario', async() => {

        const store = createVuexStore({
            status: 'not-authenticated', // 'authenthicated', 'not-authenticated', 'authenthicating'
            user: null,
            idToken: null,
            refreshToken: null
        })

        const newUser = { name: 'Test User', email: 'test2@test.com', password: '123456'}

        // SignIn
        await store.dispatch('auth/signInUser', newUser)
        const { idToken } = store.state.auth
        
        // Borrar el usuario
        const deleteResp = await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:delete?key=AIzaSyABSwNSpFpO_kMNAM9C1MoiC8hc1xPyJ1I`, {
            idToken,
        })

        // Crear el usuario
        const resp = await store.dispatch('auth/createUser', newUser)
        expect( resp ).toEqual({"ok": true})
        
        const { status, user, idToken:token, refreshToken } = store.state.auth

        expect(status).toBe('authenthicated') 
        expect(user).toMatchObject({ name: 'Test User', email: 'test2@test.com'})
        expect( typeof token).toBe('string')
        expect( typeof refreshToken ).toBe('string')

    })

    test('Actions: checkAuthentication - POSITIVA', async() => {
        const store = createVuexStore({
            status: 'not-authenticated', // 'authenthicated', 'not-authenticated', 'authenthicating'
            user: null,
            idToken: null,
            refreshToken: null
        })

        // SignInToken   para que genere un idToke
        const signInResp = await store.dispatch('auth/signInUser', { email: 'test@test.com', password: '123456'})
        const { idToken } = store.state.auth

        localStorage.setItem('idToken', idToken)

        const checkResp = await store.dispatch('auth/checkAuthentication')

        expect(checkResp).toEqual( { ok: true })

        const { status, user, idToken:token } = store.state.auth

        expect(status).toBe('authenthicated') 
        expect(user).toMatchObject({ name: 'User Test', email: 'test@test.com'})
        expect( typeof token).toBe('string')

    })

    test('Actions: checkAuthentication - NEGATIVA', async() => {

        const store = createVuexStore({
            status: 'not-authenticated', // 'authenthicated', 'not-authenticated', 'authenthicating'
            user: null,
            idToken: null,
            refreshToken: null
        })

        localStorage.removeItem('idToken')
        const checkReps1 = await store.dispatch('auth/checkAuthentication')

        expect(checkReps1).toEqual({ ok: false, message: 'No hay token' })
        expect( store.state.auth.user ).toBeFalsy()        
        expect( store.state.auth.idToken ).toBeFalsy()        
        expect( store.state.auth.status ).toBe('not-authenticated')    
        
        localStorage.setItem('idToken', 'ABC-123')
        const checkReps2 = await store.dispatch('auth/checkAuthentication')
        expect(checkReps2).toEqual( { ok: false, message: 'INVALID_ID_TOKEN' })
        expect( store.state.auth.status ).toBe('not-authenticated')    

    })


})