import { BrowserRouter, Route, Routes } from "react-router-dom";
import { MainContainer } from "./container/indexContainer/index";
import { QueryClientProvider, QueryClient } from "react-query";
import { RecoilRoot } from "recoil";
import GlobalStyle from "./style/globalStyle";
import "./App.css";

const queryClient = new QueryClient();

// function App() {
//   return (
//     <>
//       <RecoilRoot>
//         <QueryClientProvider client={queryClient}>
//           <BrowserRouter>
//             <GlobalStyle />
//             <Routes>
//               <Route path="/" element={<MainContainer />} />
//             </Routes>
//           </BrowserRouter>
//           <GlobalStyle />
//         </QueryClientProvider>
//       </RecoilRoot>
//     </>
//   );
// }

function App() {
  return (
    <>
      <RecoilRoot>
        <QueryClientProvider client={queryClient}>
          <GlobalStyle />

          <MainContainer></MainContainer>

          <GlobalStyle />
        </QueryClientProvider>
      </RecoilRoot>
    </>
  );
}
export default App;
