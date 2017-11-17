import Vibrant from './browser'
import WebWorker from './quantizer/worker'

((ns: any) => {
    ns.Vibrant = Vibrant
    Vibrant.Quantizer.WebWorker = WebWorker
})((typeof window === 'object' && window instanceof Window) ? window: module.exports)