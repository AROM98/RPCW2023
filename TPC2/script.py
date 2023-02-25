#!/usr/bin/python3

import lxml
from bs4 import BeautifulSoup

#read arq.xml
with open('arq.xml', 'r') as f:
    data = f.read()

#parse xml
soup = BeautifulSoup(data, 'xml')

count = 1
# for each ARQELEM write a new file with the content including all the tags in the ARQELEM
for arqelem in soup.find_all('ARQELEM'):
    print(arqelem.prettify())
    print('\n -------------------------------------------------- \n')
    with open('arqs/arq' + str(count) + '.xml', 'w') as f:
        f.write('<?xml version="1.0" encoding="iso-8859-1"?>\n')
        f.write(str(arqelem))
    count += 1

# Load the XSLT stylesheet
with open("stylesheet.xslt") as f:
    xslt_data = lxml.etree.parse(f)

# convert each ARQELEM to html with lxml
for i in range(1, count):
    # Load the XML data
    with open("arqs/arq" + str(i) + ".xml") as f:
        xml_data = lxml.etree.parse(f)
    # Create an XSLT transformer
    transformer = lxml.etree.XSLT(xslt_data)

    # Transform the XML data to HTML
    html_output = transformer(xml_data)

    # Save the HTML output to a file
    with open("html/arq" + str(i) + ".html", "wb") as f:
        f.write(html_output)








