import { BrowserRouter } from "react-router-dom";
import Router from "./routes/router";
import { Provider } from "react-redux";
import store from "./redux/store";
import { NotificationContainer } from "react-notifications";
import "react-notifications/lib/notifications.css";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
      <NotificationContainer />
    </Provider>
  );
}

export default App;
