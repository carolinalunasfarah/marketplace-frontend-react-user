import { useNavigate } from "react-router-dom";

// react-bootstrap
import { Carousel, Image, Button } from 'react-bootstrap';

// banners carousel
import Banner1 from "/assets/img/banners/banner1.jpg";
import Banner2 from "/assets/img/banners/banner2.jpg";
import Banner3 from "/assets/img/banners/banner3.jpg";
import Banner4 from "/assets/img/banners/banner4.jpg";

const CarouselHome = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/productos');
  }

  return (
    <Carousel>
      <Carousel.Item>
        <Image src={Banner1} text="Mi Market Latino" fluid className="carousel-img" />
        <Carousel.Caption className="carousel-caption">
          <h2 className="title fs-1">Bienestar</h2>
          <p>Date un tiempo y cuida tu salud. <br />Esencias y Aceites Naturales</p>
          <Button onClick={handleClick} className="btn btn-secondary box-shadow text-white cursor-pointer">Ver más</Button>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <Image src={Banner2} text="Mi Market Latino" fluid className="carousel-img" />
        <Carousel.Caption>
          <h2 className="title fs-2">Manualidades</h2>
          <p>Dile adiós al estrés con estos hobbies.  <br />Bordados y Pinturas.</p>
          <Button  onClick={handleClick} className="btn btn-secondary box-shadow text-white cursor-pointer">Ver más</Button>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <Image src={Banner3} text="Mi Market Latino" fluid className="carousel-img" />
        <Carousel.Caption>
          <h2 className="title fs-1">Música</h2>
          <p>
            Vive la pasión de la música. <br />
            Instrumentos, micrófonos y sintetizadores.
          </p>
          <Button onClick={handleClick} className="btn btn-secondary box-shadow text-white cursor-pointer">Ver más</Button>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <Image src={Banner4} text="Mi Market Latino" fluid className="carousel-img" />
        <Carousel.Caption>
          <h2 className="title fs-1 text-left text-black">Plantas</h2>
          <p className="text-black">
            Dale un toque selvático a tu hogar. <br />Planta de interior y exterior.
          </p>
          <Button onClick={handleClick} className="btn btn-secondary box-shadow text-white cursor-pointer">Ver más</Button>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default CarouselHome;