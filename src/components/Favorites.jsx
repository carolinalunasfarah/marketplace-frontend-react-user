import { useContext } from "react"
import { Button } from 'react-bootstrap'
import { DataContext } from "../context/DataContext"

const Favorites = ({productId}) => {
  const { favorites, setFavorites } = useContext(DataContext)
  const isFavorite = favorites.some(favorite => favorite.id_product === productId)

  const handleFavorite = (productId) => {
    if (isFavorite) {
      setFavorites(favorites.filter(favorite => favorite.id_product !== productId))
    } else {
      setFavorites([...favorites, { id_user: 1, id_product: productId }])
    }
  }

  return (
    <Button variant="link" className="p-0 border-0 bg-transparent" onClick={() => handleFavorite(productId)}>
      { isFavorite ? 
      <i className="bi bi-suit-heart-fill text-primary fs-3"></i>
      :
      <i className="bi bi-suit-heart text-primary fs-3"></i>
      }
    </Button>
  )
}

export default Favorites