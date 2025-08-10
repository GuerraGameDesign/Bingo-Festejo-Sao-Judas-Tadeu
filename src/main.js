import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import PrimeVue from 'primevue/config';
import Material from '@primeuix/themes/material';
import { definePreset } from '@primeuix/themes';

const app = createApp(App);

const Fatima = definePreset(Material, {
    semantic: {
        colorScheme: {
            primary: {
                0: '#fff8f3',
                50: '#f5e9da',
                100: '#ecd9c6',
                200: '#e0c3a6',
                300: '#d2a87e',
                400: '#c08a54',
                500: '#a86f3a',
                600: '#8d582e',
                700: '#734423',
                800: '#5a321a',
                900: '#422312',
                950: '#2c160b'
            },
            light: {
                surface: {
                    0: '#fff8f3',
                    50: '#f5e9da',
                    100: '#ecd9c6',
                    200: '#e0c3a6',
                    300: '#d2a87e',
                    400: '#c08a54',
                    500: '#a86f3a',
                    600: '#8d582e',
                    700: '#734423',
                    800: '#5a321a',
                    900: '#422312',
                    950: '#2c160b'
                }
            },
            dark: {
                surface: {
                    0: '#2c160b',
                    50: '#422312',
                    100: '#5a321a',
                    200: '#734423',
                    300: '#8d582e',
                    400: '#a86f3a',
                    500: '#c08a54',
                    600: '#d2a87e',
                    700: '#e0c3a6',
                    800: '#ecd9c6',
                    900: '#f5e9da',
                    950: '#fff8f3'
                }
            }
        }
    }
});


app.use(PrimeVue, {
    theme: {
        preset: Fatima,
        initialScheme: 'light' // Define o tema padrão como claro
    },
    ripple: true,
    options: {
        prefix: 'p',
        darkModeSelector: 'none',
        cssLayer: {
            name: 'primevue',
            order: 'theme, base, primevue'
        }
    }
});
app.mount('#app')
