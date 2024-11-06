
import { useGetCallQuery } from '../../services/callSlice'
import { useParams } from 'react-router-dom'
import Page from '../../layout/Page'
import ApiErrorModal from '../../components/modal/ApiErrorModal'
import PageLoading from '../../components/PageLoading'
import ObjectRenderer from '../../components/ObjectRenderer'

const Call = () => {
  const { id } = useParams()

  const response = useGetCallQuery(id)

  if (response.isLoading) return <PageLoading />
  if (response.isError) return <ApiErrorModal res={response} />

  const call = response.data

  return (
    <Page>
      <div className='row row-cols-1'>
        <div className='cols'>

          <ObjectRenderer obj={call} />

        </div>
      </div>


    </Page>
  )
}

export default Call