#!/usr/bin/env python3

import json
import os

# for each file in html folder, read the file and retrive the value of h1 tag
# and create a list with the values
# then create a html file with the list

titulos = []

for file in os.listdir('html'):
    if file.endswith('.html'):
        with open(os.path.join('html', file), 'r') as f:
            lines = f.readlines()
            for line in lines:
                if line.startswith('<h1>'):
                    # get the value of h1 tag
                    h1 = line[4:-6]
                    # create a dictionary with the id and the name
                    # the id is the number of the file read
                    titulo = {'id': file[3:-5], 'nome': h1}
                    # add the dictionary to the list
                    titulos.append(titulo)


                    


#order alphabetically by name
titulos.sort(key=lambda c: c['nome'])


pagWeb = """
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title>Arquivo Virtual</title>
    </head>
    <body>
        <h1>Arquivo Virtual</h1>
        <table>
            <tr>
                <td width="30%" valign="top">
                    <h3>Índice</h3>
                    <a name="indice"/>
                    <!-- Lista com o índice -->
                    <ul>
"""

for c in titulos:
    pagWeb += f"""
            <li>
                <a href="{c['id']}"> {c['nome']} </a>
            </li>
    """    


pagWeb += """   </ul>
                </td>
            </tr>
        </table>
    </body>
</html>
"""

with open('html/arq.html', 'w') as f:
    f.write(pagWeb)



