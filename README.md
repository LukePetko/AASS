# AASS projekt - Nikola Blahovičová, Lukáš Peťko

## Systém na zadávanie dochádzky

Tento repozitár obsahuje zdrojové kódy k projektu na predmet AASS - LS 2022/23

Jednotlivé časti sa nachádzajú vo vetvách:

- `mucho` - aplikácia kde služby medzi sebou komunikujú cez REST volania
- `camunda` - aplikácia kde služby medzi sebou komunujú za pomoci camundy
- `kafka` - aplikácia kde služby medzi sebou komunujú za pomoci kafky

Pre spustenie je potrebné (všetky vetvy):
- mať nainštalovaný `node` a `yarn`
- nanavigovať sa do tohoto repozitára
- v root priečinku spustiť príkaz `yarn` (nainštaluje potrebné knižnice) a následne `yarn run dev` (spustí vývojové prostredie)

> Poznámka: pri zmene vetiev je potrebné spustiť znova príkaz `yarn`, nakoľko každá vetva vyžaduje trocha iné knižnice

Pre spustenie camunda verzie
- spustenie podľa návodu na camunda webe (docker container + deploy diagramu - vo vetve `camunda` je to `project.bpmn`)

Pre spustenie kafka verzie
- vetva obsahuje `docker-compose.yml`, ktorý obsahuje `kafka` a `zookeeper` kontajnery. Pred spustením projektu cez `yarn run dev` musia bežať 
