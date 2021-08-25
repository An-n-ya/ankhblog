import '@fortawesome/fontawesome-free/css/all.css'
import Vue from 'vue'
import Vuetify from 'vuetify/lib/framework'

Vue.use(Vuetify)

export default new Vuetify({
    icons: {
        iconfont: 'fa'
    },
    theme: {
        themes: {
            light: {
                primary: '#ff8ba7',
                background: '#faeee7',
                headline: '#33272a',
                para: '#594a4e',
                btntext: '#33272a',
                secondary: "#ffc6c7"
            }
        }
    }
})
