const FileCheckbox = ({ file, selectedFiles, setSelectedFiles }) => {
  return (
    <div className="dropdown-item">
      <div className="form-check">
        <input
          type="checkbox"
          className="form-check-input"
          name="category"
          id={`file-${file.id}`}
          value={Number(file.id)}
          checked={selectedFiles.includes(file.id)}
          onChange={() => setSelectedFiles(file.id)}
        />
        <label className="form-check-label" htmlFor={`file-${file.id}`}>
          {file.name}
        </label>
      </div>
    </div>
  )
}
export default FileCheckbox