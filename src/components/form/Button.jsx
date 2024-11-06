

const Button = ({ res, children, loadingText, color, outline, className, ...attributes }) => {

  const btnClassName = ` btn btn${outline ? "-outline" : ""}-${color || "primary"} ${className}`

  if (res.isLoading) {
    return (
      <div className="col">
        <button className={btnClassName} type="button" disabled>
          <span className="spinner-grow spinner-grow-sm" aria-hidden="true"></span>
          <span role="status">{loadingText || "Loading"}...</span>
        </button>
      </div>
    )
  }


  return (
    <div className="col">

      <button
        className={btnClassName}
        {...attributes}
      > {children}</button >
    </div>
  )
}

export default Button