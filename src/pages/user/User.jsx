
import { useGetUserQuery } from '../../services/userSlice'
import { useParams } from 'react-router-dom'
import Page from '../../layout/Page'
import ApiErrorModal from '../../components/modal/ApiErrorModal'
import PageLoading from '../../components/PageLoading'
import ObjectRenderer from '../../components/ObjectRenderer'
import ProfilePicture from '../../components/ProfilePicture'

const User = () => {
  const { id } = useParams()

  const response = useGetUserQuery(id)

  if (response.isLoading) return <PageLoading />
  if (response.isError) return <ApiErrorModal res={response} />

  const user = response.data

  return (
    <Page>

      <div className="row mb-3">
        <div className="col d-flex justify-content-center  ">
          <ProfilePicture size={100} name={user.name} picture={user?.userPicture?.src} />
        </div>
      </div>

      <div className='row row-cols-1'>
        <div className='cols'>

          <ObjectRenderer obj={user} />

        </div>
      </div>


    </Page>
  )
}

export default User