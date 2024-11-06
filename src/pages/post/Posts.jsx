import { useGetPostsQuery } from '../../services/postSlice'
import { Link } from 'react-router-dom'
import PageLoading from '../../components/PageLoading'
import Page from '../../layout/Page'
import ApiErrorModal from '../../components/modal/ApiErrorModal'
import ProfilePicture from '../../components/ProfilePicture'
import PostPicture from '../../components/PostPicture'

const Posts = () => {

  const postRes = useGetPostsQuery()
  console.log(postRes.data)


  if (postRes.isLoading) return <PageLoading />
  if (postRes.isError) return <ApiErrorModal res={postRes} />

  const posts = postRes.data

  return (
    <Page >

      <div>
        <div className="container-fluid">
          <div className="row row-cols-1 row-cols-lg-3 g-3 ">
            {
              posts?.map(({ id, upload, astro, text, status }) =>
                <Link to={"./" + id} className="col card-group p-0 text-decoration-none" key={id}>
                  <div className="card  overflow-hidden">
                    <div className="d-flex p-3 align-items-center">
                      <ProfilePicture size={50} name={astro.name} picture={astro?.astroPicture?.src} />
                      <h5 className='ms-3 fw-bold'> {astro.name}</h5>
                    </div>
                    <PostPicture picture={upload?.src} />

                    <div className="card-body ">

                      <p className="card-text">{text}</p>
                      <p className="card-text  bg-warning text-center rounded-pill">{status}</p>
                    </div>
                  </div>
                </Link>
              )
            }

          </div>
        </div>

      </div>
    </Page>
  )
}

export default Posts