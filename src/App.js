import { useState, useEffect } from "react"
import Game from "./game"
import './App.css';

function App() {
	const [dark, setDark] = useState(false)

	useEffect(() => {
		setDark(localStorage.getItem("dark"))
	}, [])

	useEffect(() => {
		if (dark) {
			localStorage.setItem("dark", "true")
		} else {
			localStorage.removeItem("dark")
		}
	})

  return (
    <div className={dark ? "center__all dark" : "center__all"}>
    	<Game dark={dark} setDark={() => setDark(!dark)} />
    	<div className="dark__mode" />
    </div>
  );
}

export default App;
