import re

# indicare il path del file target
pathTarget='./latex/nuovo.txt'
fileTarget=''
listaNomiDocumenti=["ciao","come"]

with open(pathTarget,'r') as file:
    fileTarget=file.read()
print(fileTarget)
# pulizia file:rimuove tutti i comandi tex inseriti da questo script nel documento target
fileTarget=fileTarget.replace('\\textsuperscript{g}',"")

for d in listaNomiDocumenti:

    listaMatchesDocumenti=re.findall("\\textit\{ciao\}",fileTarget,re.IGNORECASE)

    setNomi=set()
    for nome in listaMatchesDocumenti:
        setNomi.add(nome)
    for doc in setNomi:
        fileTarget=fileTarget.replace(doc,d) 
        print("sono qua")

# AGGIUNTA PEDICI SULLE PAROLE DI GLOSSARIO ========================
contenuto=''
lett=['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']
for l in lett:
    with open('./latex/esterni/doc_esterna/glossario/res/sections/alphabet/'
    +l+'/'+l+'.tex','r') as file:
        contenuto=contenuto+file.read()
# contenuto contiene le sezioni riguardanti i termini del glossario

sottoSezioni = re.findall("subsection\{{1}[a-zA-Z]*\}{1}%parola",contenuto)
# sottoSezioni é una lista contenente tutti i tag subsection riguardanti i termini del glossario

listaTermini=[]
while sottoSezioni:
    parola=re.search('(?<=subsection\{{1})[a-zA-Z]*',sottoSezioni.pop(0))
    listaTermini.insert(0,parola.group(0))
# listaTermini é una lista che contiene tutti i termini del glossario

setIS=set()
for t in listaTermini:
    listaMatches=re.findall(t,fileTarget,re.IGNORECASE)
    # listaMaches contiene tutti i matches trovati del termine ignorando la capitolazione
    for item in listaMatches:
        setIS.add(item)
# setIS contiene tutti i termini da sostituire nel documento senza doppioni

# per ogni termine
for tIS in setIS:
    tPedice=tIS+'\\textsuperscript{g}'
    fileTarget=fileTarget.replace(tIS,tIS+'\\textsuperscript{g}')
# fileTarget contiene i pedici sui termini desiderati

# SCRITTURA DEI NOMI DEI DOCUMENTI NEL FORMATO CORRETTO ========================

listaMatchesDocumenti=[]
indice=0
for d in listaNomiDocumenti:
    listaMatchesDocumenti=re.findall(d,fileTarget,re.IGNORECASE)
    setNomi=set()
    for nome in listaMatchesDocumenti:
        setNomi.add(nome)
    for doc in setNomi:
        formatoCorrettoDocumento="\\textit{"+listaNomiDocumenti[indice]+"}"
        fileTarget=fileTarget.replace(doc,formatoCorrettoDocumento) 
        indice+=1

with open(pathTarget,'w') as file:
    file.write(fileTarget)

    