1. KOZMETIKA:

-   Unijeti sve produkte u tabeli kozmetika ( cosmetics ).
-   Unijeti u tabeli nabavke kozmetike (cosmetics_procurements) svaki put nove nabavke ( izabrati iz select liste produkt iz tabele cosmetics, unijeti kolicinu, nabavnu cijenu).
-   Ovo ce aktivirati observer da se unese novi red unutar tabele cosmetics_warehouses, gdje ce se unijeti cosmetics_id, kolicina, nabavna cijena.
-   Prodaja se unosi u tabeli prodaja kozmetike ( cosmetics_sales ), tako sto se izabere artikal iz select liste, odabere se kolicina prodatih artikala, kao i prodajna cijena po artiklu ( total se racuna automatski ). Ako je artikal otvoren za upotrebu unutar radnje, ili je dat' nekom na poklon, za prodajnu cijenu staviti 0. Na poslatom zahtjevu, odradice se validacija za kolicinu. Ako je validacija uspjesna, napraviti observer koji ce update-ovati tabelu cosmetics_warehouse na sljedeci nacin:
    ** Ako postoji vise od 1 reda u cosmetics_warehouse za dati cosmetics_id, onda treba update-ovati najstariji prvo, dok ne dodje do kolicine 0, zatim nastaviti istu logiku prema novijim redovima unutar tabele magacin kozmetike.
    // TODO: OSMISLITI LOGIKU KAKO UPDATE-OVATI MAGACIN KADA IMA VISE REDOVA ZA UPDATE ZBOG KOLICINE
    ** Ako postoji samo 1 red, onda ga azurirati sa podacima
