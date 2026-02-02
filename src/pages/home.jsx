import { useState, useEffect } from 'react'
import PokemonCardComponent from '../components/pokemonCardComponent/pokemonCardComponent';
import {getPokemons} from "../services/pokeApiSerive"
import { Row, Pagination } from 'react-bootstrap';

function Home() {
    const [pokemons, setPokemons] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const pokemonsPerPage = 12; // 12 cartas por página

    useEffect(() => {
        getPokemons(151).then((response) => {
          setPokemons(response.results)
        });
    }, []);

    // Calcular pokémons a mostrar
    const indexOfLastPokemon = currentPage * pokemonsPerPage;
    const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage;
    const currentPokemons = pokemons.slice(indexOfFirstPokemon, indexOfLastPokemon);

    // Cambiar de página
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Calcular número total de páginas
    const totalPages = Math.ceil(pokemons.length / pokemonsPerPage);

    // Generar items de paginación
    const paginationItems = [];
    const maxVisiblePages = 5;
    
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
    if (endPage - startPage < maxVisiblePages - 1) {
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    return (
        <>
            <Row>
                {currentPokemons.map((pokemon, key) => (
                    <PokemonCardComponent 
                        key={key} 
                        name={pokemon.name} 
                        url={pokemon.url}
                    />
                ))}
            </Row>

            {/* Paginación */}
            <Row className="mt-4 mb-4">
                <div className="d-flex justify-content-center">
                    <Pagination>
                        <Pagination.First 
                            onClick={() => paginate(1)} 
                            disabled={currentPage === 1}
                        />
                        <Pagination.Prev 
                            onClick={() => paginate(currentPage - 1)} 
                            disabled={currentPage === 1}
                        />
                        
                        {startPage > 1 && <Pagination.Ellipsis disabled />}
                        
                        {Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i).map(number => (
                            <Pagination.Item
                                key={number}
                                active={number === currentPage}
                                onClick={() => paginate(number)}
                            >
                                {number}
                            </Pagination.Item>
                        ))}
                        
                        {endPage < totalPages && <Pagination.Ellipsis disabled />}
                        
                        <Pagination.Next 
                            onClick={() => paginate(currentPage + 1)} 
                            disabled={currentPage === totalPages}
                        />
                        <Pagination.Last 
                            onClick={() => paginate(totalPages)} 
                            disabled={currentPage === totalPages}
                        />
                    </Pagination>
                </div>
            </Row>

            {/* Información de página */}
            <Row className="mb-4">
                <div className="text-center text-muted">
                    <small>
                        Mostrando {indexOfFirstPokemon + 1} - {Math.min(indexOfLastPokemon, pokemons.length)} de {pokemons.length} Pokémon
                    </small>
                </div>
            </Row>
        </>
    )
}

export default Home