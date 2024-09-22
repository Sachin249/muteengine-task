import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter,HashRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './components/store/index.jsx'
import { productsFetch } from './components/store/features/ProductSlide.jsx'

store.dispatch(productsFetch())

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
  <HashRouter >
    <App />
  </HashRouter>
  </Provider>,
)
