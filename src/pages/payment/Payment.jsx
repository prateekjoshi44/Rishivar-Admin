
import { useParams } from 'react-router-dom'
import Button from '../../components/form/Button'
import Page from '../../layout/Page'
import { usePatchAstroPaymentMutation } from '../../services/astroPayment'

const Payment = () => {

  const { id } = useParams
  const [patchAstroPayment, patchAstroPaymentres] = usePatchAstroPaymentMutation()

  return (
    <Page>

      <div className='p-5'>
        <Button res={patchAstroPaymentres} onClick={() => patchAstroPayment({ id })} >Complete Payment</Button>
      </div>
    </Page>
  )
}

export default Payment