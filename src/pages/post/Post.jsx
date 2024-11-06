import { useEffect, useState } from 'react'
import { useGetPostQuery, usePatchPostMutation } from '../../services/postSlice'
import { useParams } from 'react-router-dom'
import Page from '../../layout/Page'
import ApiErrorModal from '../../components/modal/ApiErrorModal'
import PageLoading from '../../components/PageLoading'
import PostPicture from '../../components/PostPicture'

const Post = () => {

  const { id } = useParams()

  const [patchStatus, patchStatusRes] = usePatchPostMutation()
  const postRes = useGetPostQuery(id)

  const [status, setStatus] = useState(null)

  useEffect(() => {
    if (status) {
      const body = { id, status }
      patchStatus(body)
        .then((res) => {
          if (res.error) {
            console.log("Status Error: ", res.error);
          }
          postRes.refetch()
        });
    }
  }, [status])

  if (postRes.isLoading || patchStatusRes.isLoading) return <PageLoading />
  if (postRes.isError) return <ApiErrorModal res={postRes} />
  if (patchStatusRes.isError) return <ApiErrorModal res={patchStatusRes} />

  const post = postRes.data

  return (
    <Page>
      <div className="card   overflow-hidden mx-auto d-flex align-items-center p-3">
        <div className='text-center'>


          <PostPicture picture={post?.upload?.src} />

        </div>
        <div className="card-body ">
          <h5 className="card-title">Astro: {post.astro.name}</h5>
          <p className="card-text">{post.text}</p>
          <p className="card-text  bg-warning text-center rounded-pill">{post.status}</p>
        </div>
      </div>


      <select className="form-select mt-5 shadow" style={{ width: 200 }} onChange={(e) => { setStatus(e.target.value) }} aria-label="Default select example">
        <option selected disabled>Change Status</option>
        <option value="Pending">Pending</option>
        <option value="Verified">Verified</option>
        <option value="Rejected">Rejected</option>
      </select>

    </Page>
  )
}

export default Post