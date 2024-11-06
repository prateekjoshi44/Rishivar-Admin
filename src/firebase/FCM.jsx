import { getToken, onMessage } from "firebase/messaging";
import { useEffect, useState } from "react";
import { messaging, vapidKey } from "./firebase";
import { Toast as bootstrapToast } from 'bootstrap'
import { usePatchProfileMutation } from "../services/profileSlice";
import PageLoading from "../components/PageLoading";
import ApiErrorModal from "../components/modal/ApiErrorModal";




export default function FCM() {

  let toastBootstrap
  const [patchProfile, patchProfileRes] = usePatchProfileMutation()
  const [title, setTitle] = useState()
  const [body, setBody] = useState()

  const handleNotification = (payload) => {
    const data = payload?.data
    switch (data.subject + data.event) {
      default: showNotification(payload.notification)
    }

  }

  const showNotification = (notification) => {
    setTitle(notification.title)
    setBody(notification.body)
    toastBootstrap.show()
  }

  const onTokenReceived = async (fcmToken) => {
    try {
      await patchProfile({ fcmToken })
      onMessage(messaging, handleNotification)
    }
    catch (err) {
      console.log(err)
    }
  }


  useEffect(() => { getToken(messaging, { vapidKey }).then(onTokenReceived).catch(console.error) }, [])

  useEffect(() => {
    const toastLiveExample = document.getElementById('fcmToast')
    toastBootstrap = bootstrapToast.getOrCreateInstance(toastLiveExample)

  }, [])


  if (patchProfileRes.isLoading) return <PageLoading />;
  if (patchProfileRes.isError) return <ApiErrorModal res={patchProfileRes} />;

  return (
    <>



      <div className="toast-container position-fixed bottom-0 end-0 p-3">
        <div id="fcmToast" className="toast" role="alert" aria-live="assertive" aria-atomic="true">
          <div className="toast-header">
            {/* <img src="..." className="rounded me-2" alt="..."/> */}
            <strong className="me-auto">{title}</strong>
            <small>Just Now</small>
            <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
          </div>
          <div className="toast-body">{body}</div>
        </div>
      </div>
    </>
  )

}