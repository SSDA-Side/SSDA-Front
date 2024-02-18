import ReactDOM from 'react-dom/client';
import App from './App.tsx';

import '@Styles/designToken.css';
import '@Styles/fonts.css';
import '@Styles/global.css';

ReactDOM.createRoot(document.getElementById('root')!).render(<App />);
// ReactDOM.createRoot(document.getElementById('root')!).render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
// )
