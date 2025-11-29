import Body from "./components/Body.jsx";
import appStore from "./utils/app.Store.jsx";
import { Provider } from "react-redux";
function App() {
  return (
    <Provider store={appStore}>
        <Body/>  
    </Provider>
);

}

export default App
