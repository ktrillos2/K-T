import React from 'react';
import { Document, Page, Text, View, StyleSheet, Font, Image } from '@react-pdf/renderer';

// Register fonts if needed. Using standard Helvetica/Courier for now to avoid bundle issues,
// but can easily add TTF/WOFF here.
// Font.register({ family: 'Inter', src: 'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZJhjp-Ek-_EeA.woff' });

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: 'Helvetica',
    fontSize: 12,
    color: '#1a1a1a',
    backgroundColor: '#ffffff',
  },
  header: {
    marginBottom: 40,
    borderBottom: '2pt solid #000',
    paddingBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  titleWrapper: {
    flex: 1,
  },
  title: {
    fontSize: 28,
    fontFamily: 'Helvetica-Bold',
    textTransform: 'uppercase',
    color: '#000',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 10,
    color: '#666',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  logoContainer: {
    width: 60,
    height: 60,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  logoText: {
    color: '#fff',
    fontSize: 24,
    fontFamily: 'Helvetica-Bold',
  },
  section: {
    marginBottom: 30,
  },
  label: {
    fontSize: 10,
    color: '#666',
    textTransform: 'uppercase',
    marginBottom: 4,
    fontFamily: 'Helvetica-Bold',
  },
  value: {
    fontSize: 14,
    color: '#000',
    fontFamily: 'Helvetica-Bold',
  },
  billingBox: {
    borderLeft: '2pt solid #000',
    paddingLeft: 10,
    marginBottom: 20,
  },
  beneficiaryBox: {
    borderLeft: '2pt solid #666',
    paddingLeft: 10,
    marginTop: 15,
  },
  table: {
    width: '100%',
    marginTop: 20,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#f3f4f6',
    padding: 10,
    borderBottom: '1pt solid #e5e7eb',
  },
  tableColHeader1: { width: '70%', fontSize: 10, fontFamily: 'Helvetica-Bold', color: '#4b5563' },
  tableColHeader2: { width: '30%', fontSize: 10, fontFamily: 'Helvetica-Bold', color: '#4b5563', textAlign: 'right' },
  tableRow: {
    flexDirection: 'row',
    padding: 15,
    borderBottom: '1pt solid #e5e7eb',
  },
  tableCol1: { width: '70%', paddingRight: 10 },
  tableCol2: { width: '30%', textAlign: 'right' },
  serviceTitle: {
    fontSize: 14,
    fontFamily: 'Helvetica-Bold',
    marginBottom: 8,
    color: '#000',
  },
  serviceDesc: {
    fontSize: 10,
    color: '#4b5563',
    lineHeight: 1.5,
    marginBottom: 4,
  },
  bulletPoint: {
    flexDirection: 'row',
    marginTop: 6,
    marginLeft: 5,
  },
  bulletText: {
    fontSize: 9,
    color: '#4b5563',
    marginLeft: 4,
  },
  price: {
    fontSize: 16,
    fontFamily: 'Helvetica-Bold',
    color: '#000',
  },
  totalsContainer: {
    marginTop: 30,
    borderTop: '2pt solid #000',
    paddingTop: 15,
    alignItems: 'flex-end',
  },
  totalLabel: {
    fontSize: 10,
    textTransform: 'uppercase',
    color: '#666',
    fontFamily: 'Helvetica-Bold',
    marginBottom: 4,
  },
  totalAmount: {
    fontSize: 32,
    fontFamily: 'Helvetica-Bold',
    color: '#000',
  },
  footer: {
    position: 'absolute',
    bottom: 40,
    left: 40,
    right: 40,
    borderTop: '1pt solid #e5e7eb',
    paddingTop: 15,
  },
  footerTitle: {
    fontSize: 10,
    fontFamily: 'Helvetica-Bold',
    color: '#000',
    marginBottom: 5,
  },
  footerText: {
    fontSize: 9,
    color: '#666',
    lineHeight: 1.4,
  },
});

interface KTDocumentProps {
  cliente: string;
  valor: string | number;
  servicio: string;
  tipo: 'cotizacion' | 'cuenta';
}

export const KTDocumentNative: React.FC<KTDocumentProps> = ({ cliente, valor, servicio, tipo }) => {
  const isCtaCobro = tipo === 'cuenta';
  const formattedValue = typeof valor === 'number' 
    ? valor.toLocaleString('es-CO') 
    : parseInt(valor.toString()).toLocaleString('es-CO');

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Encabezado */}
        <View style={styles.header}>
          <View style={styles.titleWrapper}>
            <Text style={styles.title}>
              {isCtaCobro ? 'CUENTA DE COBRO' : 'COTIZACIÓN DE SERVICIOS'}
            </Text>
            <Text style={styles.subtitle}>K&T Agencia Digital & Comercial</Text>
          </View>
          <View style={styles.logoContainer}>
            <Text style={styles.logoText}>K&T</Text>
          </View>
        </View>

        {/* Datos Principales */}
        <View style={styles.section}>
          <View style={styles.billingBox}>
            <Text style={styles.label}>Facturar a</Text>
            <Text style={styles.value}>{cliente}</Text>
          </View>

          {isCtaCobro && (
            <View style={styles.beneficiaryBox}>
              <Text style={styles.label}>A nombre de (Beneficiario)</Text>
              <Text style={styles.value}>Keyner Steban Trillos Useche</Text>
              <Text style={{ fontSize: 10, color: '#666', marginTop: 4 }}>RUT: 1090384736-8</Text>
              <Text style={{ fontSize: 10, color: '#666', marginTop: 2 }}>Concepto: Estándar Vegaltex Tactical Colombia</Text>
            </View>
          )}
        </View>

        {/* Detalles del Servicio */}
        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={styles.tableColHeader1}>CONCEPTO / DESCRIPCIÓN TÉCNICA</Text>
            <Text style={styles.tableColHeader2}>MONTO (COP)</Text>
          </View>
          
          <View style={styles.tableRow}>
            <View style={styles.tableCol1}>
              <Text style={styles.serviceTitle}>{servicio}</Text>
              
              {!isCtaCobro && (
                <View style={{ marginTop: 10 }}>
                  <View style={styles.bulletPoint}>
                    <Text style={{ color: '#000', fontSize: 9 }}>•</Text>
                    <Text style={styles.bulletText}>Hosting exclusivo en Vercel de alto rendimiento.</Text>
                  </View>
                  <View style={styles.bulletPoint}>
                    <Text style={{ color: '#000', fontSize: 9 }}>•</Text>
                    <Text style={styles.bulletText}>Optimización SEO estructurada y avanzada.</Text>
                  </View>
                </View>
              )}
            </View>
            <View style={styles.tableCol2}>
              <Text style={styles.price}>${formattedValue}</Text>
            </View>
          </View>
        </View>

        {/* Totales */}
        <View style={styles.totalsContainer}>
          <Text style={styles.totalLabel}>Total a Cancelar</Text>
          <Text style={styles.totalAmount}>${formattedValue}</Text>
        </View>

        {/* Footer Comercial y Garantía (solo para Cotización) */}
        {!isCtaCobro && (
          <View style={styles.footer}>
            <Text style={styles.footerTitle}>⭐ Soporte y Garantía K&T</Text>
            <Text style={styles.footerText}>
              Garantizamos la funcionalidad de nuestro código en entornos de producción. 
              Se incluye una garantía sin costo adicional de 3 meses por fallas críticas de software (bugs) 
              así como despliegue de correcciones de UI y UX.
            </Text>
          </View>
        )}
      </Page>
    </Document>
  );
};

export default KTDocumentNative;
