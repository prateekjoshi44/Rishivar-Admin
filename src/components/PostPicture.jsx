
import Api from '../constants/Api'

const PostPicture = ({ picture }) => {



  const src = Api.RISHIVAR_BACKEND_URL + picture
  if (picture) return <img className="w-100" src={src} alt="mdo" />
  else return <></>
}

export default PostPicture