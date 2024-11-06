import PageLoading from "../components/PageLoading"
import ApiErrorModal from "../components/modal/ApiErrorModal"
import Page from "../layout/Page"
import { useProfileQuery } from "../services/authSlice"


const Dashboard = () => {


  const profileRes = useProfileQuery()
  if (profileRes.isLoading) return <PageLoading />
  if (profileRes.isError) return <ApiErrorModal res={profileRes} />

  return (
    <Page>{profileRes.data.email}
      Dashboard


    </Page>



  )
}

export default Dashboard