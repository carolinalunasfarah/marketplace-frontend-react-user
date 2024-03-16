const CartEmpty = () => {
    return (
        <>
            <section className="d-flex flex-column justify-content-center mx-1 mx-lg-0 py-2 px-4">
                <h2 className="cursor-default">Tu carrito está vacío</h2>
                <article className="cursor-default d-flex justify-content-start align-content-center"><i className="bi bi-tag fs-5 me-2"></i>Compra ahora y consigue el envío
                gratis ¡por tiempo limitado!</article>
            </section>
        </>
    );
};

export default CartEmpty;
