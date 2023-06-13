import LoadingPageProvider from "./context/LoaderContext";
import { BrowserRouter as Router } from "react-router-dom";
import IndexRoute from "./routes";

function App() {
  return (
    <LoadingPageProvider>
      <Router>
        <IndexRoute />
      </Router>
    </LoadingPageProvider>
  );
}

export default App;
