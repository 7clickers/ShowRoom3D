import re

# pulizia file:rimuove tutti i comandi tex inseriti da questo script nel documento target
def puliziaTesto(testo):
    testo=testo.replace('\\textsubscript{g}',"")
    for d in listaNomiDocumenti:
        testo = testo.replace("\\textit{" + d + "}", d)
    return testo

# sostituisce all'interno del testo i termini di glossario attribuendo il pedice
def sostituisciGlossario(testo):
    contenuto=''
    listaTermini=[]
    # aggiungo alla listaTermini i termini del glossario
    lett=['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']
    for l in lett:
        with open('./latex/esterni/doc_esterna/glossario/res/sections/alphabet/'
        +l+'/'+l+'.tex','r') as file:
            contenuto=contenuto+file.read()
    sottoSezioni = re.findall(r"subsection\{{1}.*?\}{1}%parola", contenuto)
    for sezione in sottoSezioni:
        parola = re.search("(?<=subsection\{{1})([a-zA-Z]\s*)+", sezione)
        if parola:
            listaTermini.insert(0, parola.group(0))
    # aggiungo alla listaTermini i termini plurali del glossario
    for l in lett:
        with open('./latex/esterni/doc_esterna/glossario/res/sections/alphabet_plurals/'
        +l+'/'+l+'.tex','r') as file:
            righe = file.readlines()
            for riga in righe:
                if len(riga.strip()) != 0:              
                    listaTermini.insert(0,riga.rstrip("\n"))
    # trovo e sostituisco i termini con il pedice
    print(listaTermini)
    for t in listaTermini:
        pattern=r'\b.*?\b' + re.escape(t) + r'\b.*?\b'
        parole_trovate = re.findall(pattern, testo,flags=re.IGNORECASE)
        for parola in parole_trovate:
            tPedice=''
            if parola[0].isupper():
                tPedice = parola.capitalize()
            else:
                tPedice = parola.lower()
            tPedice=tPedice+'\\\\textsubscript{g}'
            testo = re.sub(r'\b' + parola + r'\b', tPedice, testo)
    return testo

def sostituisciNomiDocumenti(fileTarget):
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
    return fileTarget

# indicare il path del file target
pathTarget='./prova.tex'
fileTarget=''
listaNomiDocumenti=["Piano di Progetto","Norme di Progetto","Piano di Qualifica","Glossario","Lettera di Presentazione",
"Verbale","Studio di Fattibilità","Diario di Bordo"]

with open(pathTarget,'r') as file:
    fileTarget=file.read()

fileTarget=puliziaTesto(fileTarget)
fileTarget=sostituisciGlossario(fileTarget)
fileTarget=sostituisciNomiDocumenti(fileTarget)

# scrittura su file
with open(pathTarget,'w') as file:
    file.write(fileTarget)