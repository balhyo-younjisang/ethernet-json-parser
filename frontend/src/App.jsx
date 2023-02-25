import { BrowserRouter, Route, Routes } from "react-router-dom";
import { MainContainer } from "./container/indexContainer/index";
import { QueryClientProvider, QueryClient } from "react-query";
import GlobalStyle from "./style/globalStyle";
import "./App.css";

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <GlobalStyle />
          <Routes>
            <Route path="/" element={<MainContainer />} />
          </Routes>
        </BrowserRouter>
        <GlobalStyle />
      </QueryClientProvider>
    </>
  );
}
export default App;
