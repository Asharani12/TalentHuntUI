import { ThemeProvider } from "@material-ui/core";
import "./App.css";
import theme from "./theme/";
import { BrowserRouter as Router } from "react-router-dom";
import { SessionProvider } from "./context/SessionContext";
import Routes from "./routes/";  // routes has index file, so no need to write filename here. but slash at the end should be there
import { SnackbarAlertContainer } from "./components/SnackbarAlert";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <SessionProvider>
        <Router>{Routes}</Router>
      </SessionProvider>
      <SnackbarAlertContainer />
    </ThemeProvider>
  );
};

export default App;