import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import PrimeVue from 'primevue/config';
import Material from '@primeuix/themes/material';
import { definePreset } from '@primeuix/themes';

const app = createApp(App);

const SaoJudas = definePreset(Material, {
    semantic: {
        primary: { 
            50: '#fdf0f0ff', 
            100: '#fcdcdcff', 
            200: '#f7bbbbff', 
            300: '#ef8686ff', 
            400: '#de4a4aff', 
            500: '#c52222ff', 
            600: '#a31616ff', 
            700: '#801515ff', 
            800: '#651616ff', 
            900: '#531414ff', 
            950: '#2e0505ff' 
        },
        colorScheme: {
            light: {
                surface: { 
                    0: '#ffffff', 
                    50: '#fbfcfc', 
                    100: '#F7F9F8', 
                    200: '#EFF3F2', 
                    300: '#DADEDD', 
                    400: '#B1B7B6', 
                    500: '#828787', 
                    600: '#5F7274', 
                    700: '#415B61', 
                    800: '#29444E', 
                    900: '#183240', 
                    950: '#0c1920' 
                }
            },
            dark: {
                surface: { 
                    0: '#ffffff', 
                    50: '#fbfcfc', 
                    100: '#F7F9F8', 
                    200: '#EFF3F2', 
                    300: '#DADEDD', 
                    400: '#B1B7B6', 
                    500: '#828787', 
                    600: '#5F7274', 
                    700: '#415B61', 
                    800: '#29444E', 
                    900: '#183240', 
                    950: '#0c1920' 
                }
            }
        }
    }
});


app.use(PrimeVue, {
    theme: {
        preset: SaoJudas,
        initialScheme: 'light', // Define o tema padrão como claro
        options: {
        prefix: 'p',
        darkModeSelector: 'none',
        cssLayer: {
            name: 'primevue',
            order: 'theme, base, primevue'
        }
    }
    },
    ripple: true,
});
app.mount('#app')
