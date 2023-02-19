#!/usr/bin/env python3

import json
import os

#read file
with open('mapa.json', 'r') as f:
    data = json.load(f)

#order alphabetically
cidades = data['cidades']
cidades.sort(key=lambda c: c['nome'])

ligacoes = data['ligações']
#cidades.sort(key=lambda c: c['origem'])

#ordenar alfabeticamentes
#cidades = data['cidades']
#cidades.sort(key=)

pagWeb = """
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title>Mapa Virtual</title>
    </head>
    <body>
        <h1>Mapa Virtual</h1>
        <table>
            <tr>
                <td width="30%" valign="top">
                    <h3>Índice</h3>
                    <a name="indice"/>
                    <!-- Lista com o índice -->
                    <ul>
"""

for c in cidades:
    pagWeb += f"""
            <li>
                <a href="#{c['id']}"> {c['nome']} </a>
            </li>
    """    

pagWeb += """</ul>
            </td>
            <td width="70%">
            <!-- Informação das cidades -->
            """

for c in cidades:

    pagWeb += f"""
                    <a name="{c['id']}"/>
                    <h3> {c['nome']}</h3>
                    <p><b>População: </b> {c['população']}</p>
                    <p><b>Descrição: </b> {c['descrição']}</p>
                    <p><b>Distrito: </b>{c['distrito']}</p>
            """
    
     # para cada cidade, procurar as ligações e adicionar os nomdes de detino a uma lista de ligações
    pagWeb += f"""
                    <p><b>Ligações: </b> 
        """
    
    for l in ligacoes:
        if l['origem'] == c['id']:
            for d in cidades:
                if d['id'] == l['destino']:
                    pagWeb += f"""
                        <a href="#{l['destino']}"> {d['nome']},  </a>
                    """

    pagWeb += f' </p>'
  
    
    pagWeb += """
                    <address>[<a href="#indice"> Voltar ao índice </a>]</address>
                    <center>
                        <hr width="80%"/>
                    </center>
        """

pagWeb += """
                </td>
            </tr>
        </table>
    </body>
</html>
"""

print(pagWeb)




