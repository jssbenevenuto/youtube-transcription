import axios from 'axios'
import { startLoading, stopLoading, loadingMessage } from './loader'
import { loadVideo, getLoadVideo } from './youtube-api'

const form = document.querySelector('#form')

form.addEventListener('submit', async (e) => {
    e.preventDefault()

    try {
        loadingMessage('Iniciando a aplicação...')
        startLoading()

        const formData = new FormData(form)
        const url = formData.get('url')
        await loadVideo(url)

        loadingMessage('Downloading...')
        await axios.get('http://localhost:3333/audio?v=' + getLoadVideo(url))
    } catch(error) {
        console.log('[SUBMIT_ERROR]', error)
    } finally {
        stopLoading()
    }
})