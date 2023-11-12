import { QueryClient, QueryClientProvider } from 'react-query';
import './globals.css';
import Header from './components/Header';

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <Header />
      </div>
    </QueryClientProvider>
  );
}

export default App;
