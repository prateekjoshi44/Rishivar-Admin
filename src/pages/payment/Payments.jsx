import { Link } from 'react-router-dom';
import Page from '../../layout/Page';
import { useGetAstroPaymentsQuery } from '../../services/astroPayment';
import PageLoading from '../../components/PageLoading';
import ApiErrorModal from '../../components/modal/ApiErrorModal';
import ReactTable from '../../components/ReactTable';

const Payments = () => {

  const astroPaymentres = useGetAstroPaymentsQuery()

  if (astroPaymentres.isLoading) return <PageLoading />
  if (astroPaymentres.isError) return <ApiErrorModal res={astroPaymentres} />

  const columns = [
    { Header: '#', accessor: 'id', Cell: ({ value }) => <Link to={`./${value}`} className='link-success'>{value}</Link> },
    { Header: 'status', accessor: 'status' },
    { Header: 'amount', accessor: 'amount' },
    { Header: 'monthYear', accessor: 'monthYear' },
    { Header: 'createdAt', accessor: 'createdAt' },
    { Header: 'updatedAt', accessor: 'updatedAt' },
    { Header: 'astroId', accessor: 'astroId' },
  ]

  return (
    <Page>
      <ReactTable columns={columns} data={astroPaymentres.data} />
    </Page>
  )

}

export default Payments