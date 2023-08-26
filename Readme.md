Stworzenie tego projektu obejmowało następujące kroki: Utworzenie aplikacji służącej do zakupu biletów, która do końca projektu posłuży jako źródło do zbierania przykładowych danych.

Następnym krokiem była integracja systemu Hubspot, w celu zebrania danych i przeanalizowania sposobu integracji z własnym oprogramowaniem, przesyłania danych oraz wynikających z tego procesu korzyści i potencjalnych użyć. Po integracji z Hubspotem skopiowałem kilka zapytań idących do ich strony i przekleiłem je do własnego API, które potem serwowało te stałe dane do prostej strony wyświetlającej je w sposób podobny do Hubspota. Następnie podmieniłem logikę Hubspota z strony z biletami na własną implementację, która wysyłała dane do własnego API, według schematu Hubspota.

Ostatnią fazą była przemiana panelu wyświetlającego dane, tak aby miał lepszą użytkowość oraz połączenie go ze stroną do biletów w jedną aplikację. Dla szybszego postępu użyłem gotowych komponentów AntDesign. Kiedy obie aplikacje były na jednej stronie połączyłem je najpierw za pomocą Reactowego context API, aby móc zrobić jeden spójny i zamknięty system. Potem context API został zamieniony na imitację klienta API, który dane przechowuje lokalnie w przeglądarce, lecz jego architektura sprawia, że kod zachowuje się jakby korzystał z prawdziwego Rest API.

Aby uruchomić projekt należy:
npm install
lub 
yarn install
- aby zainstalować zależności.
npm run
lub
yarn run
- aby uruchomić projekt.
