import { useState, useContext, useEffect } from "react"
import { useOutletContext } from "react-router-dom"
import { UserContext } from '../context/UserContext'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import Select from 'react-select'
import { Form, InputGroup, Button, Alert, Image } from "react-bootstrap"

const UserInfo = () => {
  const { user, setIsLinkClicked } = useOutletContext();
  const { users, setUsers } = useContext(UserContext)
  const [showAlert, setShowAlert] = useState('')
  const [userFirstname, setUserFirstname] = useState(user.firstname)
  const [userLastname, setUserLastname] = useState(user.lastname)
  const [userAddress, setUserAddress] = useState(user.address)
  const [userPhone, setUserPhone] = useState(user.phone)
  const [userAvatar, setUserAvatar] = useState(user.avatar_url)
  const avatars = [
    { value: 1, label: "dinosaurio", imgSrc: "/avatar1.webp" },
    { value: 2, label: "cóndor", imgSrc: "/avatar2.webp" },
    { value: 3, label: "chinchilla", imgSrc: "/avatar3.webp" },
    { value: 4, label: "puma", imgSrc: "/avatar4.webp" }
  ]

  const handleSubmit = (e) => {
    e.preventDefault();
    // Encuentra y actualiza el usuario en el contexto
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

  
  return (
    <>
      <h1>Mis Datos</h1>
      <p>¡Hola {user.firstname}! Completa tu perfil y recibe tu primera estrella.</p>
      <Form onSubmit={handleSubmit}>
        <InputGroup size="lg" className="mb-3">
          <InputGroup.Text id="inputGroup-sizing-lg" className="fs-6 px-3 w-25">Nombre</InputGroup.Text>
          <Form.Control
            type="text"
            id="firstname"
            name="firstname"
            value={userFirstname}
            onChange={(e) => setUserFirstname(e.target.value)}
            required
          />
        </InputGroup>
        <InputGroup size="lg" className="mb-3">
          <InputGroup.Text id="inputGroup-sizing-lg" className="fs-6 px-3 w-25">Apellido</InputGroup.Text>
          <Form.Control
            type="text"
            id="lastname"
            name="lastname"
            value={userLastname}
            onChange={(e) => setUserLastname(e.target.value)}
            required
          />
        </InputGroup>
        <InputGroup size="lg" className="mb-3">
          <InputGroup.Text id="inputGroup-sizing-lg" className="fs-6 px-3 w-25">E-mail</InputGroup.Text>
          <Form.Control
            type="email"
            id="email"
            name="email"
            value={user.email}
            required
            disabled
          />
        </InputGroup>
        <InputGroup size="lg" className="mb-3">
          <InputGroup.Text id="inputGroup-sizing-lg" className="fs-6 px-3 w-25">Dirección</InputGroup.Text>
          <Form.Control
            type="text"
            id="address"
            name="address"
            value={userAddress}
            onChange={(e) => setUserAddress(e.target.value)}
          />
        </InputGroup>
        <InputGroup size="lg" className="mb-3">
          <InputGroup.Text id="inputGroup-sizing-lg" className="fs-6 px-3 w-25">
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
        <InputGroup size="lg" className="mb-3">
          <InputGroup.Text className="fs-6 px-3 w-25">Foto</InputGroup.Text>
          <Select
            value={avatars.find(option => option.value === userAvatar)}
            onChange={(option) => setUserAvatar(option.imgSrc)}
            options={avatars}
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
        <Button type="submit" className="bg-primary border-0 w-100">Actualizar</Button>
      </Form>
      {showAlert && (
        <Alert variant="success" onClose={() => setShowAlert(false)} dismissible className="mt-4">
          Tu datos se han actualizados con éxito.
        </Alert>
      )}
<div className="d-flex justify-content-end mt-4"> <Button className="bg-transparent text-black border-0" onClick={() => setIsLinkClicked(false)}><i className="bi bi-arrow-left me-1"></i>Volver a Mi Perfil</Button>

  </div>    </>
  )
}

export default UserInfo