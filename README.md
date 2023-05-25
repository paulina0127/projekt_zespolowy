# Serwis rekrutacyjny “HireMeNow”
## Opis projektu:

Aplikacja “HireMeNow” to platforma webowa, której główną funkcją będzie możliwość publikacji ofert pracy, a następnie rekrutacji pracowników online (przez pracodawców), a z drugiej strony przeglądanie ofert pracy przez kandydatów w dogodnym dla nich czasie.

## Możliwości aplikacji:
### Kandydat
* Profil kandydata umożliwiający dodanie informacji o doświadczeniu zawodowyn, wykształceniu, posiadanych umiejętnościach, ukończonych kursach oraz umieszczeniu linków, np. do strony internetowej z portfolio
* Wyszukiwanie ofert pracy z możliwośćią filtracji wyników
* Aplikowanie na wybrane przez siebie stanowisko przy użyciu profilu kandydata lub pliku CV
* Przeglądanie profili pracodawców
* Załączenie plików oraz możliwość wskazania pliku potwierdzającego kwalifikacje, np. certyfikatu ukończenia kursu

### Pracodawca
* Profil pracodawcy umożliwiający dodanie informacji o firmie jak opis, lokalizacja, sposób kontaktu
* Publikowanie ofert pracy
* Ocena kompetencji i notatki dotyczące kandydata aplikującego na stanowisko
* Zaakceptowanie bądź odrzucenie aplikacji kandydata

## Wykorzystane technologie: 
* Backend: Django
* Frontend: React JS
* Baza danych: PostgreSQL

## Instalacja

1.  Wymagania wstępne
    -   Upewnij się, że masz zainstalowane Node.js oraz narzędzie npm (Node Package Manager).
    -   Sprawdź, czy Python oraz narzędzie pip (Python package installer) są zainstalowane na Twoim systemie.
    
2.  Sklonuj repozytorium
    -   Otwórz terminal lub wiersz polecenia.
    -   Przejdź do katalogu, w którym chcesz sklonować projekt.
    -   Uruchom polecenie: `git clone https://github.com/paulina0127/projekt_zespolowy.git`.
    -   Przejdź do katalogu projektu: `cd projekt_zespolowy`.
    
3.  Zainstaluj zależności frontendowe
    -   W katalogu projektu przejdź do folderu "frontend": `cd frontend`
    -   Uruchom polecenie: `npm install`, aby zainstalować wymagane zależności frontendowe.
   
4.  Zainstaluj zależności backendowe
    -   W katalogu projektu przejdź do folderu "backend": `cd backend`
    -   Uruchom polecenie: `pip install -r requirements.txt`, aby zainstalować wymagane zależności backendowe.
    
6.  Uruchom serwery
    -   W folderze "backend" uruchom polecenie: `python manage.py runserver`, aby uruchomić serwer deweloperski Django.
    -   W osobnym terminalu przejdź do folderu "frontend" i uruchom polecenie: `npm start`, aby uruchomić serwer deweloperski React.

7.  Dostęp do aplikacji
    -   Otwórz przeglądarkę internetową i odwiedź adres `http://localhost:3000`, aby wyświetlić frontend React.
    -   W przypadku backendu Django, można uzyskać dostęp do punktów końcowych API, odwiedzając adres `http://127.0.0.1:8000`.
    
## Zespół projektowy:
1. Paulina Hryciuk – kierownik projektu, programista back-end 
2. Alicja Dąbrowska – programista front-end 
3. Michał Bagiński – tester, projektant UX/UI
4. Emil Falkowski – tester, analityk
5. Dominika Jabłońska – programista front-end 
