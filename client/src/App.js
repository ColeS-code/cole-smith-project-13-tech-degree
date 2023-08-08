
import './App.css';

function App() {

  const testAPI = async () => {
    const response = await fetch("http://localhost:5000/api/courses");
    const data = await response.json();
    console.dir(data)
  };
  testAPI();

  return <h1>Home Page</h1>;
}



export default App;
