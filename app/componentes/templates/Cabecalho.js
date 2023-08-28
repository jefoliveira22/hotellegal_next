export default function Cabecalho(props) {
    return (
        <header className="bg-secondary p-4 d-flex justify-content-center">
                <h1><font color="white">{props.titulopagina || "SISTEMA DE HOTELARIA - HotelLegal"}</font></h1>
        </header>
    );
}