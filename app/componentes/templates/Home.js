"use client"
import React, { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { Container } from "react-bootstrap"


export default function HomeSection() {
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
    };
    return (
        <Container className='mb-3 mt-3 d-flex justify-content-center align-itens-center'>
            <Carousel activeIndex={index} onSelect={handleSelect}>
                <Carousel.Item>
                    <img
                        className="d-block w-auto img-thumbnail"
                        src="https://img.freepik.com/fotos-gratis/jovem-mulher-bonita-em-roupao-bebendo-cafe_171337-12756.jpg?w=900&t=st=1667421374~exp=1667421974~hmac=f18df676f0a61b5044e35063f479ef67d49f7fca960f03e046b648e7f9841363"
                        alt="Slide 1"
                    />
                    <Carousel.Caption>
                        <h3 style={{"textShadow": "2px 2px 4px #000000"}}>Hotel Galeria</h3>
                        <p style={{"textShadow": "2px 2px 4px #000000"}}>Viva uma nova experiência.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-auto img-thumbnail"
                        src="https://img.freepik.com/fotos-gratis/camareira-fazendo-cama-no-quarto-de-hotel_171337-12690.jpg?w=900&t=st=1667421254~exp=1667421854~hmac=70ccee1a7e3271f6c9a18515b4367f86461d3d43ee69c82ceef277392e8b4105"
                        alt="Slide 2"
                    />
                    <Carousel.Caption>
                        <h3 style={{"textShadow": "2px 2px 4px #000000"}}>Atendimento de qualidade.</h3>
                        <p style={{"textShadow": "2px 2px 4px #000000"}}>Equipe preparada para melhor atender.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-auto img-thumbnail"
                        src="https://img.freepik.com/fotos-gratis/interior-pequeno-do-quarto-de-hotel-com-cama-de-casal-e-banheiro_1262-12489.jpg?w=900&t=st=1667421285~exp=1667421885~hmac=bf9ebeeac4ac9f221b785dbc22bd1875aab1b57f33bd36a3a106fd52c3d69b18"
                        alt="Slide 3"
                    />
                    <Carousel.Caption>
                        <h3 style={{"textShadow": "2px 2px 4px #000000"}}>Ambiente aconchegante</h3>
                        <p style={{"textShadow": "2px 2px 4px #000000"}}>Viva uma nova experiência em hoteis.</p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
        </Container>
    );
}