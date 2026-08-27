---
routeSlug: "eurusd-price-profiling"
lang: "es"
title: "Perfilado de precios del EURUSD: una caracterización estadística previa a cualquier hipótesis"
summary: "18 análisis descriptivos del EURUSD sobre 1.439.786 barras M1 (2022-2025), auditados contra una corrección de tasa de falso descubrimiento sobre los 101 tests corridos en la línea. Un documento sobre método, no sobre una señal."
tags: ["price-profiling", "eurusd", "estadistica-descriptiva", "microestructura", "metodologia"]
date: "2026-08-14"
readMinutes: 11
featured: false
---

## Por qué perfilar antes de hipotetizar

La mayoría de los procesos de investigación arranca con una idea sobre el
mercado y después busca datos que la sostengan. Preferimos invertir ese orden
al menos una vez por instrumento y hacernos primero una pregunta más básica:
qué hace efectivamente esta serie de precios, con independencia de cualquier
estrategia que tengamos en mente. Este caso es ese trabajo de base para el
EURUSD. Se trata de un documento de referencia antes que de un hallazgo, y
está escrito para ser consultado mientras se diseñan futuras líneas de
investigación.

La distinción tiene consecuencias operativas. Este informe no lleva veredicto
PASA / NO PASA / DESCARTADA, porque aquí no se está testeando ninguna señal:
sólo hay un conjunto de mediciones tomadas sobre la muestra histórica
completa. Toda hipótesis que más adelante toque alguno de estos patrones
necesita igual su propio fundamento económico y su propio test fuera de
muestra. Tomar un resultado de perfilado como origen de una hipótesis
equivaldría a minar dos veces el mismo dataset buscando el mismo efecto, un
camino bien documentado hacia el falso positivo.

Conviene también ser explícitos sobre qué queda fuera del alcance de esta
página. Las magnitudes exactas, las direcciones y las ventanas horarias
específicas detrás de cada hallazgo pertenecen a la investigación subyacente y
no se publican acá. Lo que sí publicamos es el método: cómo se formuló cada
pregunta, con cuánta exigencia se la testeó y qué se hizo con los resultados
que terminaron siendo ruido. Quien busque un patrón operable no lo va a
encontrar; quien esté evaluando un proceso de investigación va a encontrar
justamente la parte que distingue un proceso de otro.

## Datos y método

La muestra es EURUSD M1, cotizaciones bid de HistData, entre el 02-01-2022 y
el 31-12-2025: 1.439.786 barras M1, agregadas hacia H1 y barras diarias. Las
sesiones se definen en EST sin ajuste por horario de verano - Asia, Londres y
Nueva York, más las ventanas de solapamiento y de hueco entre ellas. Fijar el
reloj de sesión en lugar de seguir el DST mantiene estables los límites de
sesión a lo largo de los cuatro años, al costo de un desfasaje de una hora
respecto del horario local de mercado durante parte de cada año.

El instrumental estadístico es deliberadamente convencional: tests t de una y
dos muestras, ANOVA, correlación de Pearson, test de normalidad de
Jarque-Bera, tests binomiales, test de rachas de Wald-Wolfowitz y tests
chi-cuadrado de independencia. Cada resultado queda registrado internamente
con su estadístico, su p-valor y su tamaño muestral, y marcado como in-sample.
Se corrieron dieciocho análisis en total, que cubren sesgo por sesión y por
hora, estacionalidad por día de la semana y por mes, forma de la distribución
de retornos, comportamiento del gap de fin de semana, independencia de las
rachas, reacción en números redondos, efectos de fin de mes y la forma en que
el máximo y el mínimo de cada sesión interactúan con el rango de la sesión
anterior.

## Dónde está realmente la estructura

El primer resultado tiene más que ver con la resolución que con el mercado.
Agregar los retornos por sesión completa suaviza variación que existe: varias
horas individuales muestran un sesgo direccional estadísticamente
significativo que el promedio a nivel sesión no muestra. Cruzar esa dimensión
horaria con el día de la semana lo afina todavía más, porque algunos de esos
sesgos se concentran en días puntuales y desaparecen en otros, una estructura
invisible desde cualquiera de las dos dimensiones tomada por separado.
Leemos esto más como advertencia metodológica que como hallazgo sobre el
EURUSD. El nivel de agregación en el que uno elige mirar es en sí mismo una
decisión de modelado, y un resultado nulo en una resolución dice muy poco
sobre la resolución inmediatamente inferior.

Un resultado vinculado encaja peor con el resto del documento. Testeando la
muestra semanal completa, el retorno del viernes y el del lunes siguiente
resultan estadísticamente relacionados. Lo reportamos porque contradice el
supuesto informal de que los días de trading adyacentes son extracciones
independientes, y porque hoy no podemos explicar el mecanismo. El flujo de
información del fin de semana, efectos de posicionamiento alrededor del cierre
semanal y un artefacto del reloj de sesión fijo son en parte plausibles, y
este dataset no permite separarlos. Resolverlo requeriría un segundo
instrumento con la misma estructura semanal o una descomposición intradiaria
de la apertura del lunes, y ninguna de las dos cosas forma parte de este
estudio.

## Rango de sesión, breakouts y memoria

Cuatro de los dieciocho análisis atacan la misma pregunta de fondo: cuando una
sesión rompe los extremos del rango de una sesión previa, ¿ocurre algo
después? Testeando cada eslabón de la cadena diaria de sesiones con un
chi-cuadrado de independencia, encontramos un eslabón específico con un efecto
de continuación estadísticamente significativo y de magnitud relevante. El
resto de la cadena no muestra nada. Donde el efecto aparece, la dirección es
de continuación, y preferimos reportar la asimetría de manera directa antes
que vestir una única celda significativa como una propiedad general del
instrumento.

Dos resultados adyacentes le dan contexto a ese hallazgo. Ciertos pares de
sesiones consecutivas muestran una tendencia mucho mayor a que la sesión
posterior permanezca íntegramente dentro del rango de la anterior en lugar de
romperlo, sin que ningún lado del rango esté favorecido - no hay sesgo
direccional hacia tomar el máximo más veces que el mínimo, ni a la inversa. Y
cuando comparamos una sesión contra su propio rango de un día atrás, y por
separado contra la sesión que la precedió inmediatamente en el intradiario, la
comparación día contra día es la que muestra mayor tendencia a extenderse.
Nuestra lectura es que algunas sesiones cargan más memoria de su propia
actividad previa que de la sesión que les hizo el traspaso horas antes, algo
consistente con que la composición de participantes sea más estable entre días
a la misma hora de reloj que a lo largo de la rueda. Ese mecanismo es una
interpretación nuestra, no algo que estos tests identifiquen.

La ubicación intradiaria de los extremos sigue la misma lógica: ciertas
ventanas del día son bastante más propensas a contener el máximo o el mínimo
diario que otras, de un modo consistente con las diferencias de liquidez en
los solapamientos de mercado. El equivalente semanal - la distribución de
máximos y mínimos semanales entre los días de la semana - también es despareja,
pero nunca la testeamos formalmente, así que queda acá como nota descriptiva y
nada más.

## Forma de la distribución y contexto de riesgo

Los retornos H1 muestran un exceso de curtosis de 15,6, con Jarque-Bera
rechazando normalidad a p-valor prácticamente nulo tanto en H1 como en barras
diarias (n = 24.115 y 1.052 respectivamente). Es el único resultado que
reportamos con su magnitud completa, porque es contexto de riesgo y no un
edge direccional: un supuesto de distribución normal usado para colocar stops
o dimensionar posiciones subestimaría de manera relevante la probabilidad de
movimientos extremos en el horizonte H1. Las barras diarias se comportan mejor
que las horarias, que es el efecto esperado de la agregación y un recordatorio
de que el horizonte en el que se parametriza el riesgo importa tanto como el
parámetro.

Los gaps de fin de semana, en cambio, resultan un fenómeno menor de lo que
sugiere su reputación. Son pequeños en promedio y la gran mayoría cierra
dentro de una ventana corta tras la reapertura, lo que leemos como ruido de
liquidez de reapertura, con poca evidencia de un repricing informado que se
arrastre hacia la semana.

## Qué no mostró evidencia

Los resultados nulos merecen enunciarse con la misma claridad, y en este caso
no hay costo alguno en publicarlos completos, porque ninguno es monetizable.
La dirección diaria no muestra desvío significativo respecto de la
aleatoriedad bajo el test de rachas de Wald-Wolfowitz (p = 0,309). Los niveles
redondos de 50 pips no producen reacción sistemática (binomial p = 0,069, lo
bastante cerca del umbral convencional como para que no tomemos el rechazo
como zanjado en ninguna dirección). Los retornos diarios simples no muestran
sesgo direccional aislado por día de la semana, con p > 0,08 para todos los
días, algo que es una pregunta distinta del patrón horario descripto arriba y
que no lo contradice. La incidencia de breakouts de sesión no muestra
estacionalidad mensual una vez testeada correctamente. No hay efecto de calma
estival entre junio y agosto (p = 0,78) ni efecto de rebalanceo de fin de mes,
ni sobre el rango (p = 0,73) ni sobre la dirección (p = 0,68).

## La auditoría, que es el resultado real

El output más importante de esta línea de investigación es metodológico.
Cuando abrimos los hallazgos de continuación de sesión con mayor detalle, por
mes calendario y por día de la semana, una auditoría interna de nuestro propio
análisis detectó dos problemas concretos.

El primero es una falla de validez del test. Los chi-cuadrado de independencia
exigen un conteo esperado mínimo por celda - la regla práctica habitual es
cinco - y la apertura más fina generó varias celdas muy por debajo de ese
umbral, lo que invalida la aproximación chi-cuadrado justamente donde
aparecían los patrones más interesantes. Rehacer esa apertura sobre un test
apropiado para celdas ralas cambió qué patrones sobrevivían. Ahí está la parte
incómoda: la versión original del análisis no estaba mal en su aritmética,
estaba mal en su elección de test, y nada en el output lo señalaba. Sólo lo
detectó una reexaminación deliberada.

Multiplicidad es el segundo problema. A lo largo de toda esta línea
corrimos 101 tests estadísticos, y con un umbral nominal del 5% un puñado de
resultados significativos es lo que produce el puro azar. Aplicamos el
procedimiento de Benjamini-Hochberg, que controla la tasa de falso
descubrimiento - la proporción esperada de falsos positivos entre los
resultados declarados significativos - en lugar de la tasa de error por
familia, con el argumento de que esto es perfilado exploratorio, donde una
proporción controlada de falsos positivos es un precio aceptable a cambio de
conservar potencia. La corrección recortó de manera apreciable la cantidad de
resultados significativos defendibles.

Todos los hallazgos reportados arriba sobreviven a ambos controles. Los que no
lo hicieron fueron descartados en lugar de conservarse con una salvedad
adjunta, que consideramos la única opción honesta: un resultado corregido que
se reporta con asterisco tiende a recordarse sin él.

Queda un problema abierto y preferimos nombrarlo antes que dejarlo pasar. La
corrección de Benjamini-Hochberg se aplicó sobre los 101 tests como una única
familia, una decisión defendible pero no la única posible. Una lectura más
estricta argumentaría que la familia debería incluir todos los tests corridos
en todas las líneas de investigación sobre este instrumento; una más laxa
trataría cada uno de los dieciocho análisis como familia propia. La primera
eliminaría más hallazgos de los que eliminamos; la segunda restituiría
algunos. Elegimos la definición intermedia antes de ver qué resultados iba a
descartar, y la dejamos asentada acá para que la decisión sea auditable.

## Cómo se usa este documento, y qué no habilita

Este perfilado se consulta y deliberadamente nunca se mina. Su función es
construir intuición sobre el instrumento antes de que una hipótesis se
formalice en otra instancia del proceso: dónde se concentra la volatilidad,
cuán pesadas son las colas, qué efectos de calendario son reales y cuáles son
folklore, cómo se relaciona el rango de una sesión con el de la siguiente.

Esa disciplina tiene un costo que conviene enunciar. Como todos los efectos
descriptos acá se midieron sobre la muestra completa 2022-2025, esa muestra
queda parcialmente gastada para estas preguntas puntuales. Una hipótesis
construida sobre alguno de estos patrones no puede validarse fuera de muestra
sobre los mismos cuatro años en ningún sentido significativo; una validación
genuina exigiría otro período, otro instrumento o una ventana de forward
testing que no existía cuando se corrió el perfilado. En mi opinión, esa
restricción es la correcta y hay que aceptarla. La alternativa es un proceso
de investigación que sigue encontrando lo que ya sabe que está ahí.

## Mayor detalle

El detalle técnico completo - magnitudes exactas, direcciones, ventanas
horarias específicas, cada parámetro testeado y el conjunto completo de
figuras - se mantiene en un repositorio privado de investigación, ya que forma
parte de un activo de investigación en curso. Escribime si querés discutir la
metodología o algún resultado puntual con mayor profundidad.
