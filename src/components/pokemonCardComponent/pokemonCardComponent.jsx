import "./pokemonCardComponent.css"
import { Col } from "react-bootstrap"
import {getPokemonDetails} from "../../services/pokeApiSerive"
import {formatPokedexPosition} from "../../services/helperService"
import { useState, useEffect } from "react";

function PokemonCardComponent({name, url}){

    const [hp, setHp] = useState(0);
    const [pokedexPosition, setPokedexPosition] = useState("");
    const [image, setImage] = useState("");
    const [types, setTypes] = useState([]);
    const [primaryType, setPrimaryType] = useState("");

    useEffect(() => {
        getPokemonDetails(url).then((response) => {
            setHp(response.stats[0].base_stat);
            setPokedexPosition(formatPokedexPosition(response.order));
            setImage(response.sprites.other['official-artwork'].front_default);
            const pokemonTypes = response.types.map(type => type.type.name);
            setTypes(pokemonTypes);
            setPrimaryType(pokemonTypes[0]);
        });
    }, [url]);

    return (
        <>
            <Col lg={4} md={6} sm={12} className="mb-4">
                <div className="pokemon-card-main">
                    <div className={`pokemon-card-container bg-type-${primaryType}`}>
                        <div className="pokemon-card-header">
                            <div>
                                <h4 className="pokemon-name">{name}</h4>
                            </div>
                            <div className="pokemon-stats">
                                <label className="life-stat">HP {hp}</label>
                                <label className="pokedex-position">#{pokedexPosition}</label>
                            </div>
                        </div>
                        <div className="pokemon-card-image-container">
                            {image && (
                                <img 
                                    src={image} 
                                    alt={name} 
                                    className="pokemon-image"
                                />
                            )}
                        </div>
                        <div className="pokemon-card-description">
                            <div className="pokemon-types">
                                {types.map((type, index) => (
                                    <span key={index} className={`type-badge type-${type}`}>
                                        {type}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </Col>
        </>
    )
}

export default PokemonCardComponent