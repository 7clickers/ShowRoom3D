import subprocess, os,re

# indicare il path del file target
pathTarget='./latex/nuovo.txt'

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

fileTarget=''
with open(pathTarget,'r') as file:
    fileTarget=file.read()

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
    fileTarget=fileTarget.replace(tPedice,tIS)
    fileTarget=fileTarget.replace(tIS,tIS+'\\textsuperscript{g}')
# fileTarget contiene i pedici sui termini desiderati

with open(pathTarget,'w') as file:
    file.write(fileTarget)