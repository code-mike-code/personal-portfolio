import React, { useEffect } from 'react';
import styles from './PrivacyPolicy.module.css';

export default function PrivacyPolicy() {
  useEffect(() => {
    document.body.classList.add('hide-header-grid');
    return () => {
      document.body.classList.remove('hide-header-grid');
    };
  }, []);
  return (
    <div className={styles.pageContainer}>
      <main className={styles.content}>
        <h1>Polityka Prywatności i Cookies</h1>
        <p>
          <strong>devMike.pl</strong>
        </p>
        <p>Data wejścia w życie: 29 listopada 2025 r.</p>

        <hr />

        <h2>1. Administrator Danych Osobowych</h2>
        <p>
          Administratorem danych osobowych przetwarzanych na stronie internetowej{' '}
          <strong>devMike.pl</strong> (zwana dalej: „Stroną") jest osoba
          fizyczna będąca właścicielem strony.
        </p>
        <p>
          <strong>Dane kontaktowe administratora:</strong>
        </p>
        <ul>
          <li>Adres strony: https://devMike.pl</li>
          <li>Formularz kontaktowy dostępny na stronie</li>
        </ul>
        <p>
          W przypadku pytań dotyczących przetwarzania danych osobowych prosimy o
          skontaktowanie się poprzez formularz dostępny na Stronie.
        </p>

        <hr />

        <h2>2. Inspektor Ochrony Danych</h2>
        <p>
          Ze względu na fakt, że administratorem jest osoba fizyczna, nie został
          wyznaczony inspektor ochrony danych.
        </p>

        <hr />

        <h2>3. Cel Przetwarzania Danych Osobowych</h2>
        <p>
          Dane osobowe zbierane za pośrednictwem formularza kontaktowego (imię i
          adres e-mail) są przetwarzane w następujących celach:
        </p>
        <ul>
          <li>
            Udzielenie odpowiedzi na zapytanie lub wiadomość przesłaną przez
            formularz kontaktowy
          </li>
          <li>Komunikacja w sprawie współpracy lub ofert zawodowych</li>
          <li>Archiwizacja korespondencji w celach dokumentacji</li>
        </ul>

        <hr />

        <h2>4. Podstawa Prawna Przetwarzania Danych</h2>
        <p>
          Przetwarzanie danych osobowych z formularza kontaktowego odbywa się na
          podstawie:
        </p>
        <ul>
          <li>
            Prawnie uzasadnionego interesu administratora (Art. 6 ust. 1 lit. f
            RODO) – udzielenie odpowiedzi na zapytanie i komunikacja z
            potencjalnym klientem lub partnerem biznesowym
          </li>
          <li>
            Podjęcia działań na żądanie osoby, zanim dojdzie do zawarcia umowy
            (Art. 6 ust. 1 lit. b RODO) – w przypadku zapytań dotyczących
            współpracy
          </li>
        </ul>

        <hr />

        <h2>5. Odbiorcy Danych Osobowych</h2>
        <p>
          Dane osobowe z formularza kontaktowego mogą być udostępnione
          następującym odbiorcom:
        </p>
        <ul>
          <li>
            Dostawcy usług hostingowych – w zakresie niezbędnym do utrzymania
            funkcjonalności Strony
          </li>
          <li>
            Dostawcy usług poczty elektronicznej – w celu wysyłania odpowiedzi
            na zapytania
          </li>
          <li>
            Dostawca usług analityki (Google Analytics) – w zakresie opisanym w
            punkcie 7 niniejszej Polityki
          </li>
        </ul>
        <p>
          Poza wymienionymi podmiotami dane osobowe nie będą udostępniane osobom
          trzecim, chyba że wymagać będzie tego prawo.
        </p>

        <hr />

        <h2>6. Okres Przechowywania Danych Osobowych</h2>
        <p>Dane osobowe z formularza kontaktowego przechowywane są:</p>
        <ul>
          <li>
            Przez okres korespondencji – co najmniej do udzielenia odpowiedzi na
            zapytanie
          </li>
          <li>
            Po zakończeniu komunikacji – przez okres 12 miesięcy od ostatniej
            wiadomości (w celu archiwizacji i dokumentacji)
          </li>
          <li>
            Po upływie 12 miesięcy – dane są usuwane, chyba że istnieje obowiązek
            prawny nakazujący ich dłuższe przechowywanie
          </li>
        </ul>

        <hr />

        <h2>7. Pliki Cookies i Google Analytics</h2>
        <h3>7.1 Czym są cookies?</h3>
        <p>
          Strona wykorzystuje pliki cookies – małe pliki tekstowe zapisywane na
          urządzeniu odwiedzającego w celu rejestracji i obserwacji ruchu na
          Stronie za pośrednictwem usługi Google Analytics.
        </p>
        <h3>7.2 Google Analytics</h3>
        <p>
          Na Stronie zainstalowana jest usługa Google Analytics firmy Google LLC
          (dalej: „Google"), która zbiera następujące cookies:
        </p>
        <ul>
          <li>
            <code>_ga</code> – główny identyfikator sesji
          </li>
          <li>
            <code>_gat</code> – przepustnicy dla żądań do Google Analytics
          </li>
          <li>
            <code>_gid</code> – identyfikator użytkownika dla bieżącej sesji
          </li>
        </ul>
        <h3>7.3 Cel użycia cookies</h3>
        <p>Cookies Google Analytics są wykorzystywane w celu:</p>
        <ul>
          <li>Analizy ruchu na Stronie</li>
          <li>Obserwacji zachowania użytkowników</li>
          <li>Zrozumienia sposobu korzystania ze Strony</li>
          <li>Poprawy funkcjonalności i treści Strony</li>
          <li>Zbierania statystyk dotyczących liczby odwiedzających</li>
        </ul>
        <h3>7.4 Podstawa prawna dla cookies</h3>
        <p>
          Przetwarzanie danych za pośrednictwem Google Analytics odbywa się na
          podstawie:
        </p>
        <ul>
          <li>
            Prawnie uzasadnionego interesu administratora (Art. 6 ust. 1 lit. f
            RODO) – analiza ruchu i statystyki odwiedzin służą doskonaleniu
            Strony i lepszemu zrozumieniu jej użytkowników
          </li>
          <li>
            W zakresie wymaganym przez prawo – może być również wymagana zgoda
            użytkownika w zależności od ustawień
          </li>
        </ul>
        <h3>7.5 Zarządzanie cookies</h3>
        <p>Użytkownik ma możliwość:</p>
        <ul>
          <li>
            <strong>Zaakceptowania cookies</strong> – przez zamknięcie baneru
            informacyjnego lub zgodę wyrażoną w formie wymaganego checkboxa
          </li>
          <li>
            <strong>Odrzucenia cookies</strong> – poprzez zmianę ustawień
            przeglądarki internetowej
          </li>
          <li>
            <strong>Usunięcia cookies</strong> – za pośrednictwem ustawień
            przeglądarki (Historia → Wyczyść dane przeglądania)
          </li>
        </ul>
        <p>
          Większość przeglądarek internetowych (Chrome, Firefox, Safari, Edge)
          pozwala na:
        </p>
        <ul>
          <li>Automatyczne przyjmowanie lub odrzucanie cookies</li>
          <li>Usuwanie cookies przy zamknięciu przeglądarki</li>
          <li>Blokowanie cookies z określonych witryn</li>
        </ul>
        <p>
          Instrukcje zarządzania cookies w poszczególnych przeglądarkach znajdują
          się na stronach producenta przeglądarki.
        </p>
        <h3>7.6 Konsekwencje odmowy cookies</h3>
        <p>
          W przypadku odmowy zaakceptowania cookies analityczne Strona będzie
          nadal funkcjonować, jednak nie będziemy w stanie zbierać danych na
          temat ruchu i statystyk odwiedzin. Niektóre funkcjonalności mogą
          działać z ograniczeniami.
        </p>

        <hr />

        <h2>8. Prawa Osób, Których Dane Dotyczą</h2>
        <p>
          Każda osoba, której dane osobowe przetwarzamy, ma prawo do:
        </p>
        <h3>8.1 Prawo dostępu do danych</h3>
        <p>
          Prawo do otrzymania potwierdzenia, czy dane dotyczące tej osoby są
          przetwarzane, oraz dostępu do tych danych.
        </p>
        <h3>8.2 Prawo do sprostowania</h3>
        <p>
          Prawo do żądania sprostowania nieprawidłowych lub niekompletnych danych
          osobowych.
        </p>
        <h3>8.3 Prawo do usunięcia</h3>
        <p>
          Prawo do żądania usunięcia danych osobowych (prawo do bycia
          zapomnianym) w przypadkach określonych w RODO.
        </p>
        <h3>8.4 Prawo do ograniczenia przetwarzania</h3>
        <p>
          Prawo do żądania ograniczenia przetwarzania danych osobowych w
          określonych przypadkach.
        </p>
        <h3>8.5 Prawo do przenoszenia danych</h3>
        <p>
          Prawo do otrzymania danych osobowych w strukturyzowanym, powszechnie
          używanym formacie i możliwości ich przeniesienia do innego
          administratora.
        </p>
        <h3>8.6 Prawo do sprzeciwu</h3>
        <p>
          Prawo do sprzeciwu wobec przetwarzania danych osobowych na podstawie
          prawnie uzasadnionego interesu.
        </p>
        <h3>8.7 Prawo do wniesienia skargi</h3>
        <p>
          Prawo do wniesienia skargi do Prezesa Urzędu Ochrony Danych Osobowych
          (UODO) w przypadku naruszenia praw wynikających z RODO.
        </p>
        <p>
          <strong>Adres UODO:</strong>
          <br />
          Urząd Ochrony Danych Osobowych
          <br />
          ul. Stawki 2
          <br />
          00-193 Warszawa
          <br />
          Tel.: +48 22 531 03 00
          <br />
          E-mail: uodo@uodo.gov.pl
        </p>

        <hr />

        <h2>9. Realizacja Praw Osób, Których Dane Dotyczą</h2>
        <p>
          W celu realizacji swoich praw wynikających z RODO (dostęp,
          sprostowanie, usunięcie, ograniczenie, przeniesienie danych, sprzeciw),
          prosimy o skontaktowanie się z administratorem poprzez:
        </p>
        <ul>
          <li>Formularz kontaktowy dostępny na Stronie</li>
          <li>Wiadomość na adres e-mail podany w formularzu</li>
        </ul>
        <p>
          Administrator rozpatrzy wnioski w terminie 30 dni od ich otrzymania, a
          w uzasadnionych przypadkach termin ten może być przedłużony do 90 dni.
        </p>

        <hr />

        <h2>10. Bezpieczeństwo Danych Osobowych</h2>
        <p>
          Administrator podejmuje odpowiednie techniczne i organizacyjne środki
          bezpieczeństwa w celu ochrony danych osobowych przed:
        </p>
        <ul>
          <li>Nieautoryzowanym dostępem</li>
          <li>Utratą danych</li>
          <li>Zniszczeniem danych</li>
          <li>Zmianą danych</li>
        </ul>
        <p>
          Strona wykorzystuje szyfrowanie HTTPS do zabezpieczenia transmisji
          danych z formularza kontaktowego. Dane przesyłane za pośrednictwem
          formularza są szyfrowane i bezpieczne.
        </p>

        <hr />

        <h2>11. Linki do Stron Trzecich</h2>
        <p>
          Strona może zawierać linki do innych witryn internetowych.
          Administrator nie odpowiada za polityki prywatności oraz praktyki
          przetwarzania danych przez podmioty trzecie. Zalecamy zapoznanie się z
          polityką prywatności każdej zewnętrznej strony, którą odwiedzacie
          poprzez linki umieszczone na naszej Stronie.
        </p>

        <hr />

        <h2>12. Zmiany w Polityce</h2>
        <p>
          Administrator zastrzega sobie prawo do zmian niniejszej Polityki
          prywatności i cookies w dowolnym momencie. Wszelkie zmiany wejdą w
          życie w momencie opublikowania zaktualizowanej wersji na Stronie.
          Zalecamy regularne zapoznawanie się z niniejszą Polityką, aby być na
          bieżąco ze zmianami.
        </p>
        <p>Data ostatniej aktualizacji: 29 listopada 2025 r.</p>

        <hr />

        <h2>13. Dane Kontaktowe</h2>
        <p>
          W przypadku pytań, wątpliwości lub próśb dotyczących niniejszej
          Polityki prywatności i cookies prosimy o skontaktowanie się przez:
        </p>
        <ul>
          <li>
            <strong>Formularz kontaktowy:</strong> https://devMike.pl
          </li>
          <li>
            <strong>Strona internetowa:</strong> https://devMike.pl
          </li>
        </ul>

        <hr />

        <h2>14. Obowiązujące Prawo</h2>
        <p>
          Niniejsza Polityka prywatności i cookies podlegają prawu polskiemu
          oraz rozporządzeniu Parlamentu Europejskiego i Rady (UE) 2016/679 z
          dnia 27 kwietnia 2016 r. w sprawie ochrony osób fizycznych w związku z
          przetwarzaniem danych osobowych i swobodnym przepływem takich danych
          (RODO).
        </p>

        <hr />

        <p>
          <strong>Dokument wchodzi w życie: 29 listopada 2025 r.</strong>
        </p>

        <hr />

        <p>
          <em>
            Polityka prywatności i cookies jest dokumentem obowiązującym na
            stronie https://devMike.pl. Jej naruszenie podlega konsekwencjom
            prawnym.
          </em>
        </p>
      </main>
    </div>
  );
}