import os
import re

# funzione che elimina i comandi \textsubscript{g} da tutti i termini di glossario presenti all'interno del testo
def pulisciTerminiGlossario(testo):
    pattern = r'\textsubscript{g}'
    nuova_stringa = ""
    testo=testo.replace(pattern, nuova_stringa)
    return testo

# funzione che elimina i comandi \textit da tutti i nomi dei documenti presenti all'interno del testo
def pulisciNomiDocumenti(testo,nomiDocumenti):
    for documento in nomiDocumenti:
        pattern=r'\textit{'+documento+r'}'
        testo=testo.replace(pattern, documento)
    return testo

# funzione che ritorna una lista contenente tutti i termini presenti all'interno del glossario
def recuperoListaTerminiGlossario():
    contenuto=''
    lett=['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']
    for l in lett:
        with open('./latex/esterni/doc_esterna/glossario/res/sections/alphabet/'
        +l+'/'+l+'.tex','r') as file:
            contenuto=contenuto+file.read()
    reg='(?<=subsection{)(.*)(?=}%parola)'
    return re.findall(reg,contenuto)

# funzione che ritorna una lista contenente tutti i termini plurali del glossario
def recuperoListaPlurali():
    lett=['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']
    listaPlurali=[]
    for l in lett:
        with open('./latex/esterni/doc_esterna/glossario/res/sections/alphabet_plurals/'
        +l+'/'+l+'.tex','r') as file:
            righe=file.readlines()
            for riga in righe:
                riga=riga.strip().rstrip("\n")
                if len(riga) > 0:
                    listaPlurali.insert(0,riga)
    return listaPlurali

# funzione che ritorna il testo con i pedici sia sui termini di glossario che sui termini di glossario plurali
def aggiungiPediciGlossario(testo):
    glossario=recuperoListaTerminiGlossario()
    plurali=recuperoListaPlurali()
    listaTermini=glossario+plurali
    for termine in listaTermini:
        lista_match=re.findall(termine,testo,re.IGNORECASE)
        lista_match=set(lista_match)
        termineCapitalized=termine.capitalize()
        termineLowered=termine.lower()
        if termineCapitalized in lista_match:
            nuova_stringa=termineCapitalized+r'\\textsubscript{g}'
            testo=re.sub(r'\b'+termineCapitalized+r'\b', nuova_stringa, testo)
            lista_match.discard(termineCapitalized)
        if termineLowered in lista_match:
            nuova_stringa=termineLowered+r'\\textsubscript{g}'
            testo=re.sub(r'\b'+termineLowered+r'\b', nuova_stringa, testo)
            lista_match.discard(termineLowered)
        for match in lista_match:
            nuova_stringa=match+r'\\textsubscript{g}'
            testo=re.sub(r'\b'+match+r'\b', nuova_stringa, testo)         
    return testo

# funzione che ritorna il testo con i nomi dei documenti formattati con il formato corretto
def formattaNomiDocumenti(testo,nomiDocumenti):
    for nome in nomiDocumenti:
        nuova_stringa=r'\textit{'+nome+r'}'
        lista_match=re.findall(nome,testo,re.IGNORECASE)
        lista_match=set(lista_match)
        if nome in lista_match:
            testo=testo.replace(nome, nuova_stringa)
            lista_match.discard(nome)
        for match in lista_match:
            testo=testo.replace(match, nuova_stringa)
    return testo

# ================================================== MAIN =======================================================
# inserire in pathTarget il path del file che si vuole scansionare con lo script (usare / per separare le directory
# e NON servono caratteri di escape per i caratteri speciali)

nomiDocumenti=['Piano di Progetto','Norme di Progetto','Piano di Qualifica','Glossario','Lettera di Presentazione',
                'Verbale','Studio di Fattibilità','Diario di Bordo','Analisi dei Requisiti']

# directory di partenza
directory = './latex'
pathGlossario='./latex/esterni/doc_esterna/glossario'

# ciclo attraverso tutte le cartelle e sottocartelle
for root, dirs, files in os.walk(directory):
    if not root.startswith(pathGlossario):
        print(root)
        for file in files:
            # controlla se il file ha estensione .tex
            if file.endswith('.tex'):
                # apri il file in modalità scrittura
                with open(os.path.join(root, file), 'r+') as f:
                    # leggo il contenuto del file
                    fileTarget=f.read()
                    # Riporta il cursore all'inizio del file
                    f.seek(0)
                    # scrivi il contenuto del file
                    fileTarget=pulisciTerminiGlossario(fileTarget)
                    fileTarget=pulisciNomiDocumenti(fileTarget,nomiDocumenti)
                    fileTarget=aggiungiPediciGlossario(fileTarget)
                    fileTarget=formattaNomiDocumenti(fileTarget,nomiDocumenti)
                    # print(f.name)
                    f.write(fileTarget)