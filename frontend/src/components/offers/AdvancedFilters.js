const AdvancedFilters = ({ searchParams, onCheckboxChange, isOpen }) => {
  return (
    <div className={`collapse ${isOpen ? 'show' : ''}`} id="collapseFilters">
    <div className="row mt-3">
      <div className="col-md-4">
        <label htmlFor="working_time" className="mb-3 fw-bold">Wymiar etatu</label>
        <div className="my-2">
          <input
            className="mx-2"
            type="checkbox"
            name="working_time"
            value="Pełny etat"
            onChange={onCheckboxChange}
            checked={searchParams.working_time.includes('Pełny etat')}
          />
          <span>Pełny etat</span>
        </div>
        <div className="my-2">
          <input
            className="mx-2"
            type="checkbox"
            name="working_time"
            value="Część etatu"
            onChange={onCheckboxChange}
            checked={searchParams.working_time.includes('Część etatu')}
          />
          Część etatu
        </div>
        <div className="my-2">
          <input
            className="mx-2"
            type="checkbox"
            name="working_time"
            value="Praca dodatkowa / tymczasowa"
            onChange={onCheckboxChange}
            checked={searchParams.working_time.includes('Praca dodatkowa / tymczasowa')}
          />
          Praca dodatkowa / tymczasowa
        </div>
      </div>
      <div className="col-md-4">
        <label htmlFor="contract_type" className="mb-3 fw-bold">Rodzaj umowy:</label>
        <div className="my-2">
          <input
            className="mx-2"
            type="checkbox"
            name="contract_type"
            value="Umowa o pracę"
            onChange={onCheckboxChange}
            checked={searchParams.contract_type.includes('Umowa o pracę')}
          />
          Umowa o pracę
        </div>
        <div className="my-2">
          <input
            className="mx-2"
            type="checkbox"
            name="contract_type"
            value="Umowa zlecenie"
            onChange={onCheckboxChange}
            checked={searchParams.contract_type.includes('Umowa zlecenie')}
          />
          Umowa zlecenie
        </div>
        <div className="my-2">
          <input
            className="mx-2"
            type="checkbox"
            name="contract_type"
            value="Umowa o dzieło"
            onChange={onCheckboxChange}
            checked={searchParams.contract_type.includes('Umowa o dzieło')}
          />
          Umowa o dzieło
        </div>
        <div className="my-2">
          <input
            className="mx-2"
            type="checkbox"
            name="contract_type"
            value="Umowa o pracę tymczasową"
            onChange={onCheckboxChange}
            checked={searchParams.contract_type.includes('Umowa o pracę tymczasową')}
          />
          Umowa o pracę tymczasową
        </div>
        <div className="my-2">
          <input
            className="mx-2"
            type="checkbox"
            name="contract_type"
            value="Umowa na zastępstwo"
            onChange={onCheckboxChange}
            checked={searchParams.contract_type.includes('Umowa na zastępstwo')}
          />
          Umowa na zastępstwo
        </div>
        <div className="my-2">
          <input
            className="mx-2"
            type="checkbox"
            name="contract_type"
            value="Umowa agencyjna"
            onChange={onCheckboxChange}
            checked={searchParams.contract_type.includes('Umowa agencyjna')}
          />
          Umowa agencyjna
        </div>
        <div className="my-2">
          <input
            className="mx-2"
            type="checkbox"
            name="contract_type"
            value="Kontrakt B2B"
            onChange={onCheckboxChange}
            checked={searchParams.contract_type.includes('Kontrakt B2B')}
          />
          Kontrakt B2B
        </div>
        <div className="my-2">
          <input
            className="mx-2"
            type="checkbox"
            name="contract_type"
            value="Staż / Praktyka"
            onChange={onCheckboxChange}
            checked={searchParams.contract_type.includes('Staż / Praktyka')}
          />
          Staż / Praktyka
        </div>
      </div>
      <div className="col-md-4">
        <label htmlFor="working_mode" className="mb-3 fw-bold">Tryb pracy</label>
        <div className="my-2">
          <input
            className="mx-2"
            type="checkbox"
            name="working_mode"
            value="Praca zdalna"
            onChange={onCheckboxChange}
            checked={searchParams.working_mode.includes('Praca zdalna')}
          />
          Praca zdalna
        </div>
        <div className="my-2">
          <input
            className="mx-2"
            type="checkbox"
            name="working_mode"
            value="Praca hybrydowa"
            onChange={onCheckboxChange}
            checked={searchParams.working_mode.includes('Praca hybrydowa')}
          />
          Praca hybrydowa
        </div>
        <div className="my-2">
          <input
            className="mx-2"
            type="checkbox"
            name="working_mode"
            value="Praca stacjonarna"
            onChange={onCheckboxChange}
            checked={searchParams.working_mode.includes('Praca stacjonarna')}
          />
          Praca stacjonarna
        </div>
        <div className="my-2">
          <input
            className="mx-2"
            type="checkbox"
            name="working_mode"
            value="Praca mobilna"
            onChange={onCheckboxChange}
            checked={searchParams.working_mode.includes('Praca mobilna')}
          />
          Praca mobilna
        </div>
      </div>
    </div>
  </div>
  )
}

export default AdvancedFilters