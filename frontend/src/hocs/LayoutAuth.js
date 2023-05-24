const LayoutAuth = ({ children, bgImage }) => {
  
  const bgImageStyle = {
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
    backgroundImage: `url(${bgImage})`
  }

  return (
    <div className="container-fluid">
      <div className="row no-gutter">
        <div className="col-md-4 bg-light">
          <div className="d-flex align-items-center py-5"
          style={ {  minHeight: '100vh'} }>
            <div className="container">
              <div className="row">
                <div className="col-lg-10 col-xl-7 mx-auto">
                  { children }
                </div>
              </div>
            </div>
          </div>
        </div>
        <div 
          className="col-md-8 d-none d-md-flex"
          style={ bgImageStyle }>
        </div>
      </div>
    </div>
  )
}

export default LayoutAuth