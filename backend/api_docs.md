# Categories

### GET: /categories

Returns list of all categories

### GET: /categories/{id}

Returns a single category

### Parameters

#### is_main: true, false

- true: returns only main categories
- false: returns only subcategories

#### main_category: {id}

#### search: {name}

#### ordering: id, name

# Skills

### GET: /skills

Returns list of all skills

### GET: /skills/{id}

Returns a single skill

### Parameters

#### type: {name}

#### search: {name}

#### ordering: id, name

# Offers

### GET, POST: /offers

Returns list of active and verified offers, creates offer

### GET, POST: /offers?all=true&company={id}

Returns list of all offers for logged in company

### GET, PUT, DELETE: /offers/{id}

Returns, updates, deletes a single offer

### GET, POST: /offers/{id}/requirements

Returns list of requirements for offer and creates requirement

### GET, PUT, DELETE: /offers/{id}/requirements/{id}

Returns, updates, deletes a single requirement

### Parameters

#### all: true, false

- true: with company filter returns all offers
- false: default

#### location: {city}

#### company: {id}

#### category: {id}

#### position_level: {name}

#### contract_type: {name}

#### working_mode: {name}

#### working_time: {name}

#### search: {position, company name}

#### ordering: id, created_date, expiration_date

# Companies

### GET, POST: /companies

Returns list of companies and creates company

### GET, PUT, DELETE: /companies/{id}

Returns, updates, deletes a single company

### Parameters

#### location: {city}

Returns companies for city

#### search: {name}

Searches by name

#### ordering: id, name

Orders list by id and name

# Candidates

### GET, POST: /candidates

Returns candidate for current user and creates candidate

### GET, PUT, DELETE: /candidates/{id}

Returns, updates, and deletes candidate

### GET, POST: /candiates/{id}/files

Returns list of files for current user and creates document

### GET, PUT, DELETE: /candidates/{id}/files/{id}

Returns, updates, and deletes files for current user

### GET, POST: /candiates/{id}/experience

Returns list of experiences for current user and creates experience

### GET, PUT, DELETE: /candiates/{id}/experience/{id}

Returns, updates, and deletes experience for current user

### GET, POST: /candiates/{id}/education

Returns list of educations for current user and creates education

### GET, PUT, DELETE: /candiates/{id}/education/{id}

Returns, updates, and deletes education for current user

### GET, POST: /candiates/{id}//skills

Returns list of skills for current user and creates skill

### GET, PUT, DELETE: /candiates/{id}/skills/{id}

Returns, updates, and deletes skill for current user

### GET, POST: /candiates/{id}/courses

Returns list of courses for current user and creates course

### GET, PUT, DELETE: /candiates/{id}/courses/{id}

Returns, updates, and deletes course for current user

### GET, POST: /candiates/{id}/links

Returns list of links for current user and creates link

### GET, PUT, DELETE: /candiates/{id}/links/{id}

Returns, updates, and deletes link for current user

# Applications

### GET, POST: /applications

Returns list of all applications, creates application

### GET, POST: /applications?candidate={id}

Returns list of all applications for candidate

### GET, POST: /applications?offer={id}

Returns list of all applications for offer

### GET, POST: /applications?company={id}

Returns list of all applications for company

### GET, PUT: /applications/{id}

Returns, updates, deletes a single application

### GET, POST: /applications/{id}/attachments

Returns list all attachments for application

### GET: /applications/{id}/attachments/{id}

Returns, updates, deletes a single attachment

### Parameters

#### candidate: {id}

#### offer: {id}

#### company: {id}

#### ~~search: {candidate, offer, company}~~

#### ordering: id, created_date
