# repository_html
Wymagania niefunkcjonalne
-------------------------

-   Dostępność przez stronę http (serwis działa w intranecie,
    bezpieczeństwo realizowane poprzez korporacyjny VPN)
-   Wymagane środowisko UNIX (biblioteki imagemagick i skrypty bash)
    oraz serwer http Tomcat w wersji min 8.5 (lub kompatybilny)
-   Serwis korzysta z api Flyhacks w celu uzyskiwania informacji o
    destynacji oraz tłumaczeń (za uzyskanie/tworzenie kluczy odpowiada
    administrator serwisu flyhacks). Endpointy:

    -   https://www.flyhacks.pl/autocomplete.php
    -   <https://flyhacks.pl/api/langs/translateLang/>
-   Serwis pozwala na dodanie czcionek TrueType (pliki ttf wgrywane są
    na serwer przez administratora)

 
-

Scenariusze
===========

Wygenerowanie testowe bannerów dla kampanii
-------------------------------------------

Rys. 2 Diagram Sekwencji dla generowania testowego
