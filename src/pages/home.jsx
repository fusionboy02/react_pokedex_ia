import { useState, useEffect } from 'react'
import getPokemons from "../services/pokeApiSerive"


function Home() {

    const [count, setCount] = useState(0)

    
    useEffect(() => {
        getPokemons().then((response) => {
            console.log("Promesaaaaaaaaaaaaa->");
            console.log(response);
        });

        console.log("Codigo despues de la promesa");
    });

    return (
        <>
            <h1>hola page1</h1>

        </>
    )

}

export default Home