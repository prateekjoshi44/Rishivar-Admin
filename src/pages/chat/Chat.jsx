
import { useGetChatQuery } from '../../services/chatSlice'
import { useParams } from 'react-router-dom'
import Page from '../../layout/Page'
import ApiErrorModal from '../../components/modal/ApiErrorModal'
import PageLoading from '../../components/PageLoading'
import ObjectRenderer from '../../components/ObjectRenderer'

const Chat = () => {
  const { id } = useParams()

  const response = useGetChatQuery(id)

  if (response.isLoading) return <PageLoading />
  if (response.isError) return <ApiErrorModal res={response} />

  const chat = response.data

  return (
    <Page>
      <div className='row row-cols-1'>
        <div className='cols'>

          <ObjectRenderer obj={chat} />

        </div>
      </div>


    </Page>
  )
}

export default Chat