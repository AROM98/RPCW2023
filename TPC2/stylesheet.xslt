<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output method="html" indent="yes" encoding="UTF-8"/>
  <xsl:template match="/">
    <html>
      <head>
        <title><xsl:value-of select="//*[local-name()='IDENTI']"/></title>
      </head>
      <body>
        <h1><xsl:value-of select="//*[local-name()='IDENTI']"/></h1>
        <img src="{//*[local-name()='IMAGEM']/@NOME}" alt="Arqueossítio image"/>
        <table>
          <xsl:for-each select="//*[not(self::DESCRI or self::DESARQ or self::INTERP or self::BIBLIO)]">
            <tr>
              <td><b><xsl:value-of select="local-name()"/>:</b></td>
              <td><xsl:value-of select="."/></td>
            </tr>
          </xsl:for-each>
          <tr>
            <td><b>Descrição:</b></td>
            <td><xsl:value-of select="//*[local-name()='DESCRI']/*[local-name()='LIGA']"/></td>
          </tr>
          <tr>
            <td><b>Descrição Arqueológica:</b></td>
            <td><xsl:value-of select="//*[local-name()='DESARQ']"/></td>
          </tr>
          <tr>
            <td><b>Interpretação:</b></td>
            <td><xsl:value-of select="//*[local-name()='INTERP']/*[local-name()='LIGA']"/></td>
          </tr>
          <tr>
            <td><b>Depósito:</b></td>
            <td><xsl:value-of select="//*[local-name()='DEPOSI']"/></td>
          </tr>
          <tr>
            <td><b>Bibliografia:</b></td>
            <td><xsl:value-of select="//*[local-name()='BIBLIO']"/></td>
          </tr>
        </table>
        <p><b>Autor:</b> <xsl:value-of select="//*[local-name()='AUTOR']"/></p>
        <p><b>Data:</b> <xsl:value-of select="//*[local-name()='DATA']"/></p>
        <center>
        <address>[<a href="/"> Voltar ao índice </a>]</address>
        </center>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
