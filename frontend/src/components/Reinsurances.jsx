import reinsurances_icon1 from "../img/reinsurance_icons-01.svg";
import reinsurances_icon2 from "../img/reinsurance_icons-02.svg";
import reinsurances_icon3 from "../img/reinsurance_icons-03.svg";
import reinsurances_icon4 from "../img/reinsurance_icons-04.svg";

const Reinsurances = () => {
    return (
        <section className="d-flex justify-content-between">
            <article>
                <img
                    src={reinsurances_icon1}
                    className="reinsurance_icons"
                    alt="Ícono carro de compras"
                />
                <h6>Compra Rápida</h6>
            </article>
            <article>
                <img
                    src={reinsurances_icon2}
                    className="reinsurance_icons"
                    alt="Ícono carro de compras"
                />
                <h6>Envío Seguro</h6>
            </article>
            <article>
                <img
                    src={reinsurances_icon3}
                    className="reinsurance_icons"
                    alt="Ícono carro de compras"
                />
                <h6>Sitio Protegido</h6>
            </article>
            <article>
                <img
                    src={reinsurances_icon4}
                    className="reinsurance_icons"
                    alt="Ícono carro de compras"
                />
                <h6>Garantía</h6>
            </article>
        </section>
    );
};

export default Reinsurances;
