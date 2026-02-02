import "./pokemonCardComponent.css"
import { Col, Modal } from "react-bootstrap"
import {getPokemonDetails} from "../../services/pokeApiSerive"
import {formatPokedexPosition} from "../../services/helperService"
import { useState, useEffect } from "react";

function PokemonCardComponent({name, url}){

    const [hp, setHp] = useState(0);
    const [pokedexPosition, setPokedexPosition] = useState("");
    const [image, setImage] = useState("");
    const [types, setTypes] = useState([]);
    const [primaryType, setPrimaryType] = useState("");
    const [attack, setAttack] = useState(0);
    const [defense, setDefense] = useState(0);
    const [specialAttack, setSpecialAttack] = useState(0);
    const [specialDefense, setSpecialDefense] = useState(0);
    const [speed, setSpeed] = useState(0);
    const [abilities, setAbilities] = useState([]);
    const [moves, setMoves] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [pokemonData, setPokemonData] = useState(null);
    const [height, setHeight] = useState(0);
    const [weight, setWeight] = useState(0);

    useEffect(() => {
        getPokemonDetails(url).then((response) => {
            setHp(response.stats[0].base_stat);
            setPokedexPosition(formatPokedexPosition(response.order));
            setImage(response.sprites.other['official-artwork'].front_default);
            const pokemonTypes = response.types.map(type => type.type.name);
            setTypes(pokemonTypes);
            setPrimaryType(pokemonTypes[0]);
            setAttack(response.stats[1].base_stat);
            setDefense(response.stats[2].base_stat);
            setSpecialAttack(response.stats[3].base_stat);
            setSpecialDefense(response.stats[4].base_stat);
            setSpeed(response.stats[5].base_stat);
            setAbilities(response.abilities);
            setMoves(response.moves.slice(0, 4)); // Primeros 4 ataques
            setPokemonData(response);
            setHeight(response.height / 10); // Convertir a metros
            setWeight(response.weight / 10); // Convertir a kg
        });
    }, [url]);

    const handleCardClick = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <>
            <Col lg={3} md={4} sm={6} xs={12} className="mb-4">
                <div className="pokemon-card-tcg" onClick={handleCardClick}>
                    <div className={`pokemon-card-inner bg-type-${primaryType}`}>
                        {/* Header de la carta */}
                        <div className="card-header-tcg">
                            <div className="card-name-section">
                                <h3 className="pokemon-name-tcg">{name}</h3>
                                <div className="hp-display">
                                    <span className="hp-text">HP</span>
                                    <span className="hp-number">{hp}</span>
                                </div>
                            </div>
                            <div className={`energy-symbol energy-${primaryType}`}></div>
                        </div>

                        {/* Imagen del Pokémon */}
                        <div className="card-image-section">
                            {image && (
                                <img 
                                    src={image} 
                                    alt={name} 
                                    className="pokemon-image-tcg"
                                />
                            )}
                        </div>

                        {/* Tipo y descripción */}
                        <div className="card-type-line">
                            <span className="pokemon-stage">Basic Pokémon</span>
                            <div className="pokemon-types-tcg">
                                {types.map((type, index) => (
                                    <span key={index} className={`type-badge-small type-${type}`}>
                                        {type}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Habilidad */}
                        {abilities.length > 0 && (
                            <div className="ability-section">
                                <div className="ability-header">
                                    <span className="ability-label">Ability</span>
                                    <span className="ability-name">
                                        {abilities[0].ability.name.replace(/-/g, ' ')}
                                    </span>
                                </div>
                            </div>
                        )}

                        {/* Ataques */}
                        <div className="attacks-section">
                            {moves.slice(0, 2).map((move, index) => (
                                <div key={index} className="attack-item">
                                    <div className="attack-cost">
                                        <div className={`energy-icon energy-${primaryType}`}></div>
                                        {index === 1 && <div className={`energy-icon energy-${primaryType}`}></div>}
                                    </div>
                                    <div className="attack-info">
                                        <span className="attack-name">
                                            {move.move.name.replace(/-/g, ' ')}
                                        </span>
                                    </div>
                                    <div className="attack-damage">
                                        {index === 0 ? attack : specialAttack}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Stats */}
                        <div className="card-footer-stats">
                            <div className="footer-stat">
                                <span className="stat-label-small">Weakness</span>
                                <div className="stat-icons">
                                    <div className="weakness-icon">×2</div>
                                </div>
                            </div>
                            <div className="footer-stat">
                                <span className="stat-label-small">Resistance</span>
                                <div className="stat-icons">
                                    <span className="resistance-text">-30</span>
                                </div>
                            </div>
                            <div className="footer-stat">
                                <span className="stat-label-small">Retreat</span>
                                <div className="stat-icons">
                                    <div className={`energy-icon-tiny energy-${primaryType}`}></div>
                                </div>
                            </div>
                        </div>

                        {/* Número de Pokédex */}
                        <div className="card-footer-number">
                            <span>#{pokedexPosition}</span>
                        </div>
                    </div>
                </div>
            </Col>
            <Modal 
                show={showModal} 
                onHide={handleCloseModal} 
                size="lg"
                centered
                className="pokemon-modal"
            >
                <Modal.Header closeButton className={`modal-header-${primaryType}`}>
                    <Modal.Title>
                        <span className="modal-pokemon-name">{name}</span>
                        <span className="modal-pokemon-number">#{pokedexPosition}</span>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="pokemon-modal-body">
                    <div className="modal-content-grid">
                        {/* Columna izquierda - Imagen e info básica */}
                        <div className="modal-left">
                            <div className="modal-image-container">
                                {image && <img src={image} alt={name} className="modal-pokemon-image" />}
                            </div>
                            <div className="modal-types">
                                {types.map((type, index) => (
                                    <span key={index} className={`type-badge-modal type-${type}`}>
                                        {type}
                                    </span>
                                ))}
                            </div>
                            <div className="modal-physical-stats">
                                <div className="physical-stat">
                                    <span className="physical-label">Height</span>
                                    <span className="physical-value">{height} m</span>
                                </div>
                                <div className="physical-stat">
                                    <span className="physical-label">Weight</span>
                                    <span className="physical-value">{weight} kg</span>
                                </div>
                            </div>
                        </div>

                        {/* Columna derecha - Stats y habilidades */}
                        <div className="modal-right">
                            <h5 className="modal-section-title">Base Stats</h5>
                            <div className="stats-list">
                                <div className="stat-bar">
                                    <span className="stat-name">HP</span>
                                    <div className="stat-bar-bg">
                                        <div className="stat-bar-fill" style={{width: `${(hp/255)*100}%`}}></div>
                                    </div>
                                    <span className="stat-value">{hp}</span>
                                </div>
                                <div className="stat-bar">
                                    <span className="stat-name">Attack</span>
                                    <div className="stat-bar-bg">
                                        <div className="stat-bar-fill stat-attack" style={{width: `${(attack/255)*100}%`}}></div>
                                    </div>
                                    <span className="stat-value">{attack}</span>
                                </div>
                                <div className="stat-bar">
                                    <span className="stat-name">Defense</span>
                                    <div className="stat-bar-bg">
                                        <div className="stat-bar-fill stat-defense" style={{width: `${(defense/255)*100}%`}}></div>
                                    </div>
                                    <span className="stat-value">{defense}</span>
                                </div>
                                <div className="stat-bar">
                                    <span className="stat-name">Sp. Atk</span>
                                    <div className="stat-bar-bg">
                                        <div className="stat-bar-fill stat-sp-attack" style={{width: `${(specialAttack/255)*100}%`}}></div>
                                    </div>
                                    <span className="stat-value">{specialAttack}</span>
                                </div>
                                <div className="stat-bar">
                                    <span className="stat-name">Sp. Def</span>
                                    <div className="stat-bar-bg">
                                        <div className="stat-bar-fill stat-sp-defense" style={{width: `${(specialDefense/255)*100}%`}}></div>
                                    </div>
                                    <span className="stat-value">{specialDefense}</span>
                                </div>
                                <div className="stat-bar">
                                    <span className="stat-name">Speed</span>
                                    <div className="stat-bar-bg">
                                        <div className="stat-bar-fill stat-speed" style={{width: `${(speed/255)*100}%`}}></div>
                                    </div>
                                    <span className="stat-value">{speed}</span>
                                </div>
                            </div>

                            <h5 className="modal-section-title mt-4">Abilities</h5>
                            <div className="abilities-list">
                                {abilities.map((ability, index) => (
                                    <div key={index} className="ability-item-modal">
                                        <span className="ability-name-modal">
                                            {ability.ability.name.replace(/-/g, ' ')}
                                        </span>
                                        {ability.is_hidden && <span className="hidden-badge">Hidden</span>}
                                    </div>
                                ))}
                            </div>

                            <h5 className="modal-section-title mt-4">Moves</h5>
                            <div className="moves-grid">
                                {moves.map((move, index) => (
                                    <div key={index} className="move-chip">
                                        {move.move.name.replace(/-/g, ' ')}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default PokemonCardComponent