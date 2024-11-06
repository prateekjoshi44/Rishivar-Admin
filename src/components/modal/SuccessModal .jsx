import { useEffect } from 'react'

const SuccessModal = ({ title, message, data }) => {
  const id = "SuccessModal"
  const btnId = id + "Button"

  useEffect(() => {
    document.getElementById(btnId).click()
  }, [])

  const copyToClipboard = () => {
    navigator.clipboard.writeText(data).then(() => {
      alert('Password copied to clipboard!');
    }).catch((err) => {
      console.error('Failed to copy: ', err);
    });
  };

  return (
    <>
      <button type="button" className="d-none" id={btnId} data-bs-toggle="modal" data-bs-target={"#" + id}>
        Launch demo modal
      </button>

      <div className="modal fade" id={id} tabIndex="-1" aria-labelledby={id + "Label"} aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5 text-success" id={id + "Label"}>{title || "Success!!!"}</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              {message}
              {
                data &&
                <div className='p-3'>
                  <div className='mb-3 rounded-3 p-3 border text-dark fw-bold'>{data}</div>
                  <button type='button' className='btn btn-primary btn-sm m-2' onClick={copyToClipboard}>Copy Password</button>
                </div>
              }
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              {/* <button type="button" className="btn btn-primary">Save changes</button> */}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default SuccessModal