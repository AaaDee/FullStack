import { useSelector } from "react-redux"

const Notification = () => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  const notification = useSelector(state => state.notification)

  if (!notification.value) return null;

  return (
    <div style={style}>
      {notification.value}
    </div>
  )
}

export default Notification