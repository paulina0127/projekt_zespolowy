# Categories

### GET: /categories

Returns list of all categories

### Parameters

#### is_main: true, false

- true: returns only main categories
- false: returns only subcategories

#### main_category: {id}

Returns subcategories of main category

#### search: {name}

Searches by category name

#### ordering: id, -id, name, -name

Orders list by id or name

### GET: /categories/{id}

Returns single category

# Skills

### GET: /skills

Returns list of all skills

### Parameters

#### type: {name}

Returns skills for type

#### search: {name}

Searches by skill name

#### ordering: id, -id, name, -name

Orders list by id or name

### GET: /skills/{id}

Returns single skill

# Offers

### GET: /offers

Returns list of active and verified offers

### Parameters

#### location: {city}

Returns offers for city

#### search: {position, company name}

Searches by postion and company name

#### ordering: id, -id

Orders list by id

### GET: /offers/category/{category_name}

Returns list of offers in category

### GET: /offers/{id}

Returns single offer

# Users

### GET: /auth/users/{id}

Returns single user

### POST: /auth/users/{id}/company_profile/create

Creates company profile for user

### POST: auth//users/{id}/candidate_profile/create

Creates candidate profile for user

### GET, PUT, DELETE: /auth/users/{id}/company_profile

Returns, updates and deletes company profile for user

### GET, PUT, DELETE: /users/{id}/candidate_profile

Returns, updates, and deletes candidate profile for user

### GET, POST: /auth/users/{id}/offers

Returns offer list for user and creates offer

### GET, PUT, DELETE: /users/{id}/offers/{id}

Returns, updates, and deletes single offer for user

# Companies

### GET: /companies

Returns list of companies

### Parameters

#### location: {city}

Returns companies for city

#### search: {name}

Searches by name

#### ordering: id, -id, name, -name

Orders list by id and name

### GET: /companies/{id}

Returns single company
