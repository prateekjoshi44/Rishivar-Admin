

const Input = ({ name, prefix, ...attributes }) => {

  if (prefix) {
    return (
      <div className="col">
        <label htmlFor={name} className="form-label text-capitalize">{name}</label>
        <div className="input-group">
          <span className="input-group-text">{prefix}</span>
          <input
            className="form-control"
            name={name}
            id={name}
            {...attributes}
          />
        </div>
      </div>

    )
  }
  else if (attributes.type === "textarea") {
    return (
      <div className="col">
        <label htmlFor={name} className="form-label text-capitalize">{name}</label>
        <textarea
          className="form-control"
          name={name}
          id={name}
          {...attributes}
        />
      </div>
    )
  }

  return (
    <div className="col">
      <label htmlFor={name} className="form-label text-capitalize">{name}</label>
      <input
        className="form-control"
        name={name}
        id={name}
        {...attributes}
      />
    </div>
  )
}

export default Input