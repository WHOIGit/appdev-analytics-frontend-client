// Material UI imports
import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "./theme";

import Dashboard from "./dashboard/Dashboard.js";

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div>
        <Dashboard />
      </div>
    </ThemeProvider>
  );
}
