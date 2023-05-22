describe('template spec', () => {
  // Scenariusz 1
  // it('Profil', () => {
  //   // Login
  //   cy.visit('http://localhost:3000/', { timeout: 10000 });
  //   cy.get('.NavigationBar_login-btn__CymT2', { timeout: 10000 }).click();
  //   cy.get('#inputEmail').type('sotabec997@carpetra.com');
  //   cy.get('#inputPassword').type('Haslo123');
  //   cy.get('.CompanyProfileForm_yellow-blck-btn__aXWdr').click();
  //   cy.pause();

  //   // Create profile
  //   cy.get('.pull-right', {
  //     timeout: 10000,
  //   }).click();
  //   cy.get('.text-black').click();
  //   cy.get('[aria-controls="candidateSubMenu"]').click({ force: true });
  //   cy.get('[href="/user-panel/dane-osobowe"]').click({ force: true });
  //   cy.get(':nth-child(1) > :nth-child(1) > .form-group > .form-control').type(
  //     'Jasiek',
  //     { force: true }
  //   );
  //   cy.get(
  //     '.col-8 > :nth-child(1) > :nth-child(2) > .form-group > .form-control'
  //   ).type('Mclovin', { force: true });
  //   cy.get(':nth-child(2) > .col-md-5 > .form-group > .form-control').type(
  //     'Bema 12',
  //     { force: true }
  //   );
  //   cy.get(':nth-child(2) > .col-md-2 > .form-group > .form-control').type(
  //     '10-693',
  //     { force: true }
  //   );
  //   cy.get(':nth-child(2) > .col-md-4 > .form-group > .form-control').type(
  //     'Olsztyn',
  //     { force: true }
  //   );
  //   cy.get(':nth-child(3) > :nth-child(1) > .form-group > .form-control').type(
  //     '00223344556',
  //     { force: true }
  //   );
  //   cy.get(':nth-child(3) > :nth-child(2) > .form-group > .form-control').type(
  //     '+48503903108',
  //     { force: true }
  //   );
  //   cy.get('.CompanyProfileForm_yellow-btn__hpVle').click({ force: true });
  //   cy.pause();
  //   cy.reload();
  //   cy.pause();

  //   // Create experience
  //   cy.get('[aria-controls="candidateSubMenu"]').click({ force: true });

  //   cy.get('[href="/user-panel/doświadczenie"] > .nav-item').click({
  //     force: true,
  //   });
  //   cy.get('.CandidateInfo_doc-btn__Xm7JX').click({ force: true });
  //   cy.get(':nth-child(1) > .form-group > .form-control').type('Kopacz', {
  //     force: true,
  //   });
  //   cy.get(':nth-child(1) > :nth-child(2) > .form-group > .form-control').type(
  //     'Stary Obóz',
  //     { force: true }
  //   );
  //   cy.get(
  //     ':nth-child(1) > .form-group > .react-datepicker-wrapper > .react-datepicker__input-container > .form-control'
  //   ).click({ force: true });
  //   cy.get(':nth-child(1) > .react-datepicker__day--001').click();
  //   cy.get(
  //     ':nth-child(2) > .form-group > .react-datepicker-wrapper > .react-datepicker__input-container > .form-control'
  //   ).click();
  //   cy.get('.react-datepicker__day--006').click();
  //   cy.get('.mt-3 > .btn').click();
  //   cy.get('.d-flex.my-2 > .form-control').type('Kopać', { force: true });
  //   cy.get(':nth-child(6) > :nth-child(2) > .form-group > .form-control').type(
  //     'Nowobozowa',
  //     { force: true }
  //   );
  //   cy.get(':nth-child(6) > :nth-child(3) > .form-group > .form-control').type(
  //     '14-530',
  //     { force: true }
  //   );
  //   cy.get(':nth-child(4) > .form-group > .form-control').type('Frombork', {
  //     force: true,
  //   });
  //   cy.get('.btn-warning').click({ force: true });
  //   cy.pause();

  //   // Create education
  //   cy.get('[aria-controls="candidateSubMenu"]').click({ force: true });
  //   cy.get('[href="/user-panel/wykształcenie"] > .nav-item').click({
  //     force: true,
  //   });
  //   cy.get('.CandidateInfo_doc-btn__Xm7JX').click({ force: true });
  //   cy.get('form > :nth-child(1) > .form-group > .form-control').type(
  //     'Wyższa szkoła robienia hałasu'
  //   );
  //   cy.get('form > :nth-child(2) > .form-group > .form-control').select(
  //     'Zawodowe'
  //   );
  //   cy.get(':nth-child(3) > :nth-child(1) > .form-group > .form-control').type(
  //     'Wymuszanie haraczy'
  //   );
  //   cy.get(
  //     ':nth-child(1) > .form-group > .react-datepicker-wrapper > .react-datepicker__input-container > .form-control'
  //   ).click({ force: true });
  //   cy.get(':nth-child(1) > .react-datepicker__day--002').click({
  //     force: true,
  //   });
  //   cy.get(
  //     ':nth-child(2) > .form-group > .react-datepicker-wrapper > .react-datepicker__input-container > .form-control'
  //   ).click({ force: true });
  //   cy.get('.react-datepicker__day--015').click({ force: true });
  //   cy.get('.btn-warning').click({ force: true });
  //   cy.pause();

  //   // Create skill
  //   cy.get('[aria-controls="candidateSubMenu"]').click({ force: true });
  //   cy.get('[href="/user-panel/umiejętności"] > .nav-item').click({
  //     force: true,
  //   });
  //   cy.get('.CandidateInfo_doc-btn__Xm7JX').click({ force: true });
  //   cy.get('form > :nth-child(1) > .form-group > .form-control').select(
  //     'Inny',
  //     { force: true }
  //   );
  //   cy.get(':nth-child(2) > :nth-child(1) > .form-group > .form-control').type(
  //     'Siła',
  //     { force: true }
  //   );
  //   cy.get(':nth-child(3) > :nth-child(1) > .form-group > .form-control').type(
  //     'Wszystko',
  //     { force: true }
  //   );
  //   cy.get('.btn-warning').click({ force: true });
  //   cy.pause();

  //   // Create course
  //   cy.get('[aria-controls="candidateSubMenu"]').click({ force: true });
  //   cy.get('[href="/user-panel/kursy"] > .nav-item').click({ force: true });
  //   cy.get('.CandidateInfo_doc-btn__Xm7JX').click({ force: true });
  //   cy.get(':nth-child(1) > :nth-child(1) > .form-group > .form-control').type(
  //     'Super kurs'
  //   );
  //   cy.get(
  //     ':nth-child(1) > .form-group > .react-datepicker-wrapper > .react-datepicker__input-container > .form-control'
  //   ).click({ force: true });
  //   cy.get('.react-datepicker__day--008').click({ force: true });
  //   cy.get(
  //     ':nth-child(2) > .form-group > .react-datepicker-wrapper > .react-datepicker__input-container > .form-control'
  //   ).click({ force: true });
  //   cy.get('.react-datepicker__day--010').click({ force: true });
  //   cy.get(':nth-child(3) > .form-control').type('Super kursik');
  //   cy.get('.btn-warning').click({ force: true });
  //   cy.pause();

  //   // Create link
  //   cy.get('[aria-controls="candidateSubMenu"]').click({ force: true });
  //   cy.get('[href="/user-panel/linki"] > .nav-item').click({ force: true });
  //   cy.get('.CandidateInfo_doc-btn__Xm7JX').click({ force: true });
  //   cy.get(':nth-child(1) > .form-group > .form-control').select('Portfolio');
  //   cy.get(':nth-child(2) > .form-group > .form-control').type(
  //     'https://www.google.com'
  //   );
  //   cy.get('.btn-warning').click({ force: true });
  //   cy.pause();
  // });

  // Scenariusz 2
  it('Aplikacja', () => {
    // Login
    cy.visit('http://localhost:3000/');
    cy.get('.NavigationBar_login-btn__CymT2', { timeout: 10000 }).click();
    cy.get('#inputEmail').type('sotabec997@carpetra.com');
    cy.get('#inputPassword').type('Haslo123');
    cy.get('.CompanyProfileForm_yellow-blck-btn__aXWdr', {
      timeout: 10000,
    }).click();
    cy.pause();

    // Search for offer
    cy.get('.mx-auto > [href="/oferty"]', { timeout: 10000 }).click();
    cy.pause();

    // Choose offer
    cy.get('[class="btn mx-2"]', { timeout: 10000 })
      .first()
      .click({ force: true });
    cy.contains('Konserwator powierzchni płaskich').should('be.visible');
    cy.pause();

    // Apply
    cy.get('.OfferDetailsScreen_apply-btn__8lb9z').click({ force: true });
    cy.pause();
    cy.get('.d-flex > .btn-warning').click();
    cy.pause();
  });
});

// Scenariusz 3
// it('Pracodawca', () => {
//   cy.visit('http://localhost:3000/', { timeout: 5000 });
//   cy.get('.NavigationBar_login-btn__ARogx', { timeout: 5000 }).click();
//   cy.get('#inputEmail').type('telorid265@dekaps.com');
//   cy.get('#inputPassword').type('Haslo123');
//   cy.get('.CompanyProfileForm_yellow-blck-btn__FOu9-').click();
//   cy.get('.pull-right').click();
//   cy.get('.text-black').click();
//   cy.get('[href="/user-panel/profil-pracodawcy"] > .nav-item').click({
//     force: true,
//   });
//   cy.get(':nth-child(1) > :nth-child(1) > .form-group > .form-control').type(
//     'Stary Obóz',
//     { force: true }
//   );
//   cy.get(':nth-child(1) > :nth-child(2) > .form-group > .form-control').type(
//     '5821627760',
//     { force: true }
//   );
//   cy.get(':nth-child(2) > :nth-child(1) > .form-group > .form-control').type(
//     'Górnicza 12',
//     { force: true }
//   );
//   cy.get('.col-md-2 > .form-group > .form-control').type('11-223', {
//     force: true,
//   });
//   cy.get(':nth-child(2) > :nth-child(3) > .form-group > .form-control').type(
//     'Ciechocinek',
//     { force: true }
//   );
//   cy.get(':nth-child(3) > :nth-child(1) > .form-group > .form-control').type(
//     '+48500999321',
//     { force: true }
//   );
//   cy.get(':nth-child(3) > :nth-child(2) > .form-group > .form-control').type(
//     'https://www.google.com',
//     { force: true }
//   );
//   cy.get('.col-md-5 > .form-group > .form-control').type(
//     'telorid265@dekaps.com',
//     { force: true }
//   );
//   cy.get('.col-md-8 > .form-group > .form-control').type('kopać rudę', {
//     force: true,
//   });
//   cy.get('.CompanyProfileForm_yellow-btn__jUt5q').click();
//   cy.get('[href="/user-panel/nowa-oferta"] > .nav-item > .ms-2').click({
//     force: true,
//   });
//   cy.get(':nth-child(1) > :nth-child(1) > .form-group > .form-control').type(
//     'Kopacz',
//     { force: true }
//   );
//   cy.get(':nth-child(1) > :nth-child(2) > .form-group > .form-control').select(
//     'Asystent',
//     { force: true }
//   );
//   cy.get(':nth-child(1) > :nth-child(3) > .form-group > .form-control').type(
//     '10000',
//     { force: true }
//   );
//   cy.get('.react-datepicker__input-container > .form-control').click({
//     force: true,
//   });
//   cy.get('.react-datepicker__day--024').click({ force: true });
//   cy.get(':nth-child(2) > :nth-child(1) > .form-group > .form-control').type(
//     'Górnicza 13',
//     { force: true }
//   );
//   cy.get(':nth-child(2) > :nth-child(2) > .form-group > .form-control').type(
//     '11-234',
//     { force: true }
//   );
//   cy.get(':nth-child(2) > :nth-child(3) > .form-group > .form-control').type(
//     'Ciechocinek',
//     { force: true }
//   );
//   cy.get(':nth-child(4) > .form-group > .form-control').select(
//     'Praca fizyczna',
//     { force: true }
//   );
//   cy.get(
//     ':nth-child(1) > .form-group > .checkbox-group > :nth-child(2) > .mx-2'
//   ).click({ force: true });
//   cy.get(
//     ':nth-child(2) > .form-group > .checkbox-group > :nth-child(3) > .mx-2'
//   ).click({ force: true });
//   cy.get(
//     ':nth-child(3) > .form-group > .checkbox-group > :nth-child(1) > .mx-2'
//   ).click({ force: true });
//   cy.get('.mt-5 > :nth-child(1) > :nth-child(1) > .btn').click({
//     force: true,
//   });
//   cy.get('.my-2 > .form-control').type('Kopać', { force: true });
//   cy.get(':nth-child(2) > :nth-child(1) > .btn').click({ force: true });
//   cy.get(':nth-child(2) > .my-2 > .form-control').type('Zupka', {
//     force: true,
//   });
//   cy.get('.col-md-12 > .d-flex > .btn').click({ force: true });
//   cy.get('.gap-4 > :nth-child(1) > .form-group > .form-control').select(
//     'Inny',
//     { force: true }
//   );
//   cy.get('.gap-4 > :nth-child(2) > .form-group > .form-control').type('Kilof', {
//     force: true,
//   });
//   cy.get('.gap-4 > :nth-child(3) > .form-group > .form-control').type('90', {
//     force: true,
//   });
// });
