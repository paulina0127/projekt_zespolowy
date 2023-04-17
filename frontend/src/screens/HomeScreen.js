import styles from './HomeScreen.module.css'

const HomeScreen = () => {
  return (
    <>
  <section className={styles["hero-image"]}>
    <div className={styles["hero-image-container"]}>
        <div className={styles["hero-text"]}>
            <h1 className={styles["hero-title"]}>Jakiś tytuł może</h1>
            <p className={styles["hero-p"]}>Znajdź swoją wymarzoną ofertę i Aplikuj z nami!</p>
            {/* <a href="" className={styles["hero-butt"]}>Button</a> */}
        </div>    
    </div>
  </section>
  <section className={styles["search-sec"]}>
    <div className="container">
        <form action="#" method="post" novalidate="novalidate">
            <div className="row">
                <div className="col-lg-12">
                    <div className="d-flex flex-row justify-content-center">
                        <div className="col-lg-5 col-md-3 col-sm-12 p-0 mx-2">
                            <input type="text" className="form-control rounded-pill" placeholder="Słowa kluczowe"/>
                        </div>
                        <div className="col-lg-3 col-md-3 col-sm-12 p-0 mx-2">
                            <input type="text" className="form-control rounded-pill" placeholder="Lokalizacja"/>
                        </div>
                        <div className="col-lg-2 col-md-3 col-sm-12 p-0 mx-2">
                            <select className="form-control rounded-pill" id="exampleFormControlSelect1">
                                <option>Kategoria</option>
                                <option>Example one</option>
                                <option>Example one</option>
                                <option>Example one</option>
                                <option>Example one</option>
                                <option>Example one</option>
                                <option>Example one</option>
                            </select>
                        </div>
                        <div className="col-lg-2 col-md-3 col-sm-12 p-0">
                            <button type="button" className="btn btn-warning rounded-pill">Wyszukaj</button>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    </div>
</section>
  <div className="container mt-5">
      <div className="row">
      <h1 className='justify-content-center mb-5'>Znalezione oferty pracy</h1>
        <ul className="col-12" id="job-list">
          <li className={styles["job-card"]}>
            <div className={styles["job-card__info"]}>
              <div className="d-md-flex align-items-center">
                <div className={styles["img-c"]}><img src="http://projects.lollypop.design/job-listing/photosnap.svg"/></div>
                <div>
                  <div className="d-flex align-items-center">
                    <p>Photosnap</p>
                  </div>
                    <h6>Senior Frontend Developer</h6>
                  <ul>
                    <li>wczoraj</li>
                    <li>pół etatu</li>
                    <li>4900zł netto</li>
                  </ul>
                </div>
              </div>
            </div>
            <ul className={styles["offer-btn"]}>
              <button className='btn'>Szczegóły</button>
              <button className='btn' style={{backgroundColor: '#E7B822'}}>Aplikuj</button>
              {/* <li>Szczegóły</li>
              <li>Aplikuj</li> */}
            </ul>
          </li>
          <li className={styles["job-card"]}>
            <div className={styles["job-card__info"]}>
              <div className="d-md-flex align-items-center">
                <div className={styles["img-c"]}><img src="http://projects.lollypop.design/job-listing/photosnap.svg"/></div>
                <div>
                  <div className="d-flex align-items-center">
                    <p>Photosnap</p>
                  </div>
                    <h6>Senior Frontend Developer</h6>
                  <ul>
                    <li>wczoraj</li>
                    <li>pół etatu</li>
                    <li>4900zł netto</li>
                  </ul>
                </div>
              </div>
            </div>
            <ul className={styles["offer-btn"]}>
              <button className='btn'>Szczegóły</button>
              <button className='btn' style={{backgroundColor: '#E7B822'}}>Aplikuj</button>
              {/* <li>Szczegóły</li>
              <li>Aplikuj</li> */}
            </ul>
          </li>
        </ul>
      </div>
    </div> 

</>


  )
}

export default HomeScreen