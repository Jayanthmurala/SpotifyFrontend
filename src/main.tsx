import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Provider } from 'react-redux'
import store from './StateManagement/Redux/store.ts';

createRoot(document.getElementById("root")!).render(
    <Provider store={store}>
<App />
    </Provider>
);
