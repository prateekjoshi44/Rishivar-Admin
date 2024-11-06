import { Link } from 'react-router-dom';
import Page from '../../layout/Page';
import { useGetUsersQuery } from '../../services/userSlice';
import ApiErrorModal from '../../components/modal/ApiErrorModal';
import PageLoading from '../../components/PageLoading';
import ReactTable from '../../components/ReactTable';

const Users = () => {

  const userRes = useGetUsersQuery()

  if (userRes.isLoading) return <PageLoading />;
  if (userRes.isError) return <ApiErrorModal res={userRes} />;

  const columns = [
    { Header: '#', accessor: 'id', Cell: ({ value }) => <Link to={`./${value}`} className='link-success'>{value}</Link> },
    { Header: 'Name', accessor: 'name' },
    { Header: 'Email', accessor: 'email' },
  ]

  return (
    <Page>
      <ReactTable columns={columns} data={userRes.data} />
    </Page>
  )

}

export default Users