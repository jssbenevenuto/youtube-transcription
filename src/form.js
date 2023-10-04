import axios from 'axios'
import { startLoading, stopLoading, loadingMessage } from './loader'
import { loadVideo, getLoadVideo } from './youtube-api'
import { transcribeAudio } from './transcribe'
import { renderText } from './render'

const form = document.querySelector('#form')

form.addEventListener('submit', async (e) => {
    e.preventDefault()

    try {
        loadingMessage('Iniciando a aplicação...')
        startLoading()

        const formData = new FormData(form)
        const url = formData.get('url')
        await loadVideo(url)

        //loadingMessage('Descarregando e traduzindo...')
        //await axios.get('http://localhost:3333/audio?v=' + getLoadVideo(url))

        const data = await transcribeAudio()
        console.log(data)

        renderText(data)
    } catch(error) {
        console.log('[SUBMIT_ERROR]', error)
    } finally {
        stopLoading()
    }
})