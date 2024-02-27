import { Button, Form, InputGroup } from 'react-bootstrap';
import { useContext, useEffect, useRef, useState } from "react";
import { DataContext } from "../context/DataContext";
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

const ProductsFilters = ({ filter, setFilter }) => {
    const { formatPrice, categories } = useContext(DataContext);
    const [text, setText] = useState(filter.text);
    const [price, setPrice] = useState(filter.price);
    
    const onFilterChange = (e) => {
        setFilter({ ...filter, ...{
            [e.target.name] : e.target.value,
            "price"         : price,
            "text"          : text
        }});
    };
    
    const onPriceChange = (values) => {
        setPrice(values);

        setFilter({ ...filter, ...{
            "text"  : text,
            "price" : values
        }});
    };

    const onTextChange = (e) => {
        setText(e.target.value);

        /*
        setFilter({ ...filter, ...{
            "text"  : e.target.value,
            "price" : price
        }});
        */
    };

    const Search = (e) => {
        e.preventDefault();
        setFilter({ ...filter, ...{
            "text"  : text,
            "price" : price
        }});
    };

    const searchBoxRef = useRef(null);

    useEffect(() => {
        searchBoxRef.current.focus();
    }, []);

    return (
        <Form onSubmit={Search}>
            <div className="d-flex flex-wrap justify-content-center justify-content-lg-end align-items-center">
                <Form.Group className="me-2 text-center">
                    <Form.Label><b>Categorías</b></Form.Label>
                    <Form.Select name="id_category" onChange={onFilterChange} value={filter.id_category}>
                        <option value="">Todas</option>
                        {categories.sort((a, b) => a.name.localeCompare(b.name)).map((category) => (
                            <option key={category.id_category} value={category.id_category}>{category.name}</option>
                        ))}
                    </Form.Select>
                </Form.Group>


                <Form.Group className="mx-4 text-center">
                    <Form.Label className="">
                        <b>Precio</b><br/>
                        {formatPrice(price[0])} - {formatPrice(price[1])}
                    </Form.Label>
                    <Slider
                        min={0}
                        max={100000}
                        step={5000}
                        range
                        value={price}
                        onChange={onPriceChange} />
                </Form.Group>

                <Form.Group className="me-2 d-none d-sm-block text-center">
                    <Form.Label><b>Ordenar por</b></Form.Label>
                    <Form.Select name="order" onChange={onFilterChange} value={filter.order}>
                        <option value="name_asc">Nombre A-Z</option>
                        <option value="price_asc">Precio Menor</option>
                        <option value="price_desc">Precio Mayor</option>
                        <option value="date_add_desc">Más recientes</option>
                    </Form.Select>
                </Form.Group>
                
                <Form.Group className="me-2 text-center">
                    <Form.Label>&nbsp;</Form.Label>
                    <InputGroup>
                        <Form.Control name="text" type="text" ref={searchBoxRef} onInput={onTextChange} value={text} placeholder="" />
                        <Button type="submit" variant="light">
                            <i className="bi bi-search"></i>
                        </Button>
                    </InputGroup>
                </Form.Group>
            </div>
        </Form>
    );
};

export default ProductsFilters;