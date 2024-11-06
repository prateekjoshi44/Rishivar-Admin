import { Link } from 'react-router-dom';
import Page from '../../layout/Page';
import { useGetAstrosQuery } from '../../services/astroSlice';
import ApiErrorModal from '../../components/modal/ApiErrorModal';
import PageLoading from '../../components/PageLoading';
import ReactTable from '../../components/ReactTable';

const Astros = () => {
  const response = useGetAstrosQuery()

  if (response.isLoading) return <PageLoading />
  if (response.isError) return <ApiErrorModal res={response} />

  const columns = [
    { Header: '#', accessor: 'id', Cell: ({ value }) => <Link to={`./${value}`} className='link-success'>{value}</Link> },
    { Header: 'Name', accessor: 'name' },
    { Header: 'DOB', accessor: 'dob', Cell: ({ value }) => (new Date(value)).toDateString() },
    { Header: 'Description', accessor: 'description' },
    { Header: 'Status', accessor: 'status' },
  ]

  return (
    <Page>
      <Link to={"./create"} className="btn btn-primary text-decoration-none mb-3">Create Astrologer</Link>
      <ReactTable columns={columns} data={response.data} />
    </Page>
  )
}

export default Astros