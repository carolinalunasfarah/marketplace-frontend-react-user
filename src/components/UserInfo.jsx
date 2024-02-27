import { useState, useContext, useEffect } from "react";
import { useOutletContext } from "react-router-dom";

// context
import { DataContext } from '../context/DataContext';

// react-bootstrap
import { Form, InputGroup, Button, Alert, Image } from "react-bootstrap";

// resources
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import Select from 'react-select'


const UserInfo = () => {
  const { user, setIsLinkClicked } = useOutletContext()
  const { setUserObjective, users, setUsers } = useContext(DataContext)
  const [showAlert, setShowAlert] = useState('')
  const [userFirstname, setUserFirstname] = useState(user.firstname)
  const [userLastname, setUserLastname] = useState(user.lastname)
  const [userAddress, setUserAddress] = useState(user.address)
  const [userPhone, setUserPhone] = useState(user.phone)
  const [userAvatar, setUserAvatar] = useState(user.avatar_url)
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const avatars = [
    { value: 1, label: "dinosaurio", imgSrc: "/assets/img/avatar_icons/avatar1.webp" },
    { value: 2, label: "cóndor", imgSrc: "/assets/img/avatar_icons/avatar2.webp" },
    { value: 3, label: "chinchilla", imgSrc: "/assets/img/avatar_icons/avatar3.webp" },
    { value: 4, label: "puma", imgSrc: "/assets/img/avatar_icons/avatar4.webp" }
  ]

  useEffect(() => {
    const selectedOption = avatars.find(option => option.imgSrc === userAvatar);
    setSelectedAvatar(selectedOption);
  }, [userAvatar]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedUsers = users.map(actualUser =>
      actualUser.id_user === user.id_user ? {
        ...actualUser,
        firstname: userFirstname,
        lastname: userLastname,
        address: userAddress,
        phone: userPhone,
        avatar_url: userAvatar
      } : actualUser
    );
    setUsers(updatedUsers);
    setShowAlert(true);
  };

  // Temporizador para Alert
  useEffect(() => {
    let timer
    if (showAlert) {
      timer = setTimeout(() => {
        setShowAlert(false)
      }, 3000)
    }
    return () => clearTimeout(timer)
  }, [showAlert]);


  useEffect(() => {
    if (
      [user.address, user.avatar_url, user.phone].every(value => value !== '' && value !== undefined && value !== null)
    ) {
      setUserObjective(prevState => ({ ...prevState, hasInfo: true }))
    }
  }, [user]);


  return (
    <>
      <section>
        <h1>Mis Datos</h1>
        <p>¡Hola {user.firstname}! Completa tu perfil y recibe tu primera estrella.</p>
      </section>
      <section>
        <Form onSubmit={handleSubmit}>
        <InputGroup className="mb-3">
          <InputGroup.Text className="fs-6 ps-1 ps-lg-3 w-25">Nombre</InputGroup.Text>
          <Form.Control
            type="text"
            id="firstname"
            name="firstname"
            value={userFirstname}
            onChange={(e) => setUserFirstname(e.target.value)}
            required
          />
        </InputGroup>
        <InputGroup className="mb-3">
          <InputGroup.Text className="fs-6 ps-1 ps-lg-3 w-25">Apellido</InputGroup.Text>
          <Form.Control
            type="text"
            id="lastname"
            name="lastname"
            value={userLastname}
            onChange={(e) => setUserLastname(e.target.value)}
            required
          />
        </InputGroup>
        <InputGroup className="mb-3">
          <InputGroup.Text className="fs-6 ps-1 ps-lg-3 w-25">E-mail</InputGroup.Text>
          <Form.Control
            type="email"
            id="email"
            name="email"
            value={user.email}
            required
            disabled
          />
        </InputGroup>
        <InputGroup className="mb-3">
          <InputGroup.Text className="fs-6 ps-0 ps-lg-3 w-25">Dirección</InputGroup.Text>
          <Form.Control
            as="textarea"
            type="text"
            id="address"
            name="address"
            value={userAddress}
            onChange={(e) => setUserAddress(e.target.value)}
          />
        </InputGroup>
        <InputGroup size="lg" className="mb-3">
          <InputGroup.Text className="fs-6 ps-1 ps-lg-3 w-25">
            Teléfono
          </InputGroup.Text>
          <div className="flex-grow-1">
            <PhoneInput
              containerClass="w-100"
              inputClass="form-control w-100"
              country={"cl"}
              onlyCountries={["ar", "bo", "br", "cl", "co", "cr", "cu", "do", "ec", "sv", "gt", "hn", "mx", "ni", "pa", "py", "pe", "pr", "es", "uy", "ve"]}
              value={userPhone}
              onChange={(value) => setUserPhone(value)}
            />
          </div>
        </InputGroup>
        <InputGroup className="mb-3">
          <InputGroup.Text className="fs-6 px-3 w-25">Foto</InputGroup.Text>
          <Select
            value={selectedAvatar}
            onChange={(option) => {
              setSelectedAvatar(option)
              setUserAvatar(option.imgSrc)
            }}
            options={avatars}
            getOptionValue={(option) => option.imgSrc}
            formatOptionLabel={(option) => (
              <div className="avatar-option">
                <Image src={option.imgSrc} alt="imagen perfil" width={30} />
                <span className="text-capitalize ms-4">{option.label}</span>
              </div>
            )}
            className="flex-grow-1"
            placeholder="Selecciona una foto perfil"
          />
        </InputGroup>
        <Button type="submit" className="btn-primar border-0 w-100">Actualizar</Button>
      </Form>
        {showAlert && (
          <Alert variant="success" onClose={() => setShowAlert(false)} dismissible className="mt-4">
            Tu datos se han actualizados con éxito.
          </Alert>
        )}
        </section>
        <section className="d-flex justify-content-end mt-4">
        <Link className="bg-transparent text-black border-0" onClick={() => setIsLinkClicked(false)}>
          <i className="bi bi-arrow-left me-1"></i>Volver a Mi Perfil
          </Link>
      </section>
    </>
  )
}

export default UserInfo