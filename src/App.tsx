import './App.css';
import Form from './components/Form';

function App() {
  return (
    <div className="App">
      <h1>Digite seu CEP para <br></br> buscarmos seu endereço</h1>
      <Form 
        type='number'
        text='CEP:'
        placeholder='Digite seu CEP'
      />
    </div>
  );
}

export default App;
