<?xml version='1.0'?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
	xmlns:msxml="urn:schemas-microsoft-com:xslt"
	xmlns:gx="urn:shemas-artech-com:gx"
	exclude-result-prefixes="msxml gx"
	xmlns:gxca="urn:GXControlAdap">
  <xsl:output method="html"/>
  <xsl:template match="/" >
    <xsl:apply-templates select="/GxControl"/>
  </xsl:template>
  <xsl:template match="GxControl">
    <xsl:choose>
      <xsl:when test="@type = 'HMask2'">
        <xsl:call-template name="RenderHMask2"/>
      </xsl:when>
    </xsl:choose>
  </xsl:template>

  <!-- HMask design render -->
  <!-- ///////////////////  Implement your render here  ///////////////////-->
  <xsl:template name="RenderHMask2">
    <span atomicselection="true">       
   		Mask: <xsl:value-of select="gxca:GetPropValue('Picture')"/>
    </span>
  </xsl:template>


  <!-- Helpers Templates -->


</xsl:stylesheet>
