import { MutationTree, ActionTree } from 'vuex'
import { Game, Year } from 'interfaces/Game'
import { orderBy } from 'lodash'

export const state = () => ({
  user: null,
  gameSelected: {} as Game,
  selectedYear: undefined as string | undefined
})

export type RootState = ReturnType<typeof state>

export const mutations: MutationTree<RootState> = {
  SET_USER:(s, user) => (s.user = user),
  SET_GAME_SELECTED: (s, gameSelected) => (s.gameSelected = gameSelected),
  SELECT_YEAR: (s, selectedYear) => (s.selectedYear = selectedYear)
}

export const getters = {
  selectedGameYearsSorted: (state: RootState) => {
    if (!state.gameSelected) { return [] }
    const years = Object.entries(state.gameSelected.years).map(([key, val]) => ({
      ...val as Year, id: key
    }))
    return orderBy(years, 'name')
  },
  getGameSelected: (state:RootState) => {
    return state.gameSelected
  },
  getUser: (state:RootState) => {
    return state.user
  },
  getSelectedYear: (state:RootState) => {
    return state.selectedYear
  }
}

export const actions: ActionTree<RootState, RootState>= {
  async getGames() {
    const gamesSnap = await this.$fire.firestore.collection('games').get()
    const games = await gamesSnap.docs.map(g => ({ ...g.data(), id: g.id }))
    return games 
    
  },

  async setGameSelected({commit}, id) {
    const gameSelected = await this.$fire.firestore.collection('games').doc(id).get()
    commit('SET_GAME_SELECTED', {...gameSelected.data(), id})
  },

  async logout({commit}) {
    await this.$fire.auth.signOut()
    await commit('SET_USER', null)
    await commit('SELECT_YEAR', undefined)

      this.$router.push({
        path: '/login'
      })
    commit('SET_GAME_SELECTED', {})
  },
  //////////
  async onAuthStateChangedAction({commit, dispatch}, { authUser }){
    if (!authUser) {
      dispatch('logout')
    } else {
      const {uid, email} = authUser
      await commit('SET_USER', {
        uid, 
        email
      })
    }
  }
}

