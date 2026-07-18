'use client'

import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Link,
} from '@react-pdf/renderer'

const ACCESS_URL =
  'https://v0-150-recetas-de-postres-brasilenos.vercel.app/seuacesso'

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#FFF8F5',
    padding: 0,
    fontFamily: 'Helvetica',
  },
  topBand: {
    backgroundColor: '#C0392B',
    height: 10,
    width: '100%',
  },
  bottomBand: {
    backgroundColor: '#C0392B',
    height: 10,
    width: '100%',
    position: 'absolute',
    bottom: 0,
    left: 0,
  },
  container: {
    paddingHorizontal: 48,
    paddingTop: 40,
    paddingBottom: 40,
    flex: 1,
    alignItems: 'center',
  },
  badge: {
    backgroundColor: '#C0392B',
    borderRadius: 50,
    paddingHorizontal: 18,
    paddingVertical: 6,
    marginBottom: 24,
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontFamily: 'Helvetica-Bold',
    letterSpacing: 1.5,
  },
  titleLarge: {
    fontSize: 28,
    fontFamily: 'Helvetica-Bold',
    color: '#1A0A00',
    textAlign: 'center',
    marginBottom: 6,
    lineHeight: 1.3,
  },
  titleAccent: {
    fontSize: 28,
    fontFamily: 'Helvetica-Bold',
    color: '#C0392B',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 1.3,
  },
  divider: {
    width: 60,
    height: 3,
    backgroundColor: '#C0392B',
    borderRadius: 2,
    marginBottom: 28,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 28,
    width: '100%',
    marginBottom: 22,
    borderWidth: 1.5,
    borderColor: '#F0D9D5',
  },
  cardTitle: {
    fontSize: 13,
    fontFamily: 'Helvetica-Bold',
    color: '#1A0A00',
    marginBottom: 6,
    textAlign: 'center',
  },
  cardSubtitle: {
    fontSize: 11,
    color: '#6B4A42',
    textAlign: 'center',
    lineHeight: 1.6,
    marginBottom: 18,
  },
  urlBox: {
    backgroundColor: '#FFF0EC',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: '#F5C6BB',
    marginBottom: 18,
  },
  urlLabel: {
    fontSize: 8,
    color: '#A0605A',
    fontFamily: 'Helvetica-Bold',
    letterSpacing: 1,
    marginBottom: 3,
  },
  urlText: {
    fontSize: 10,
    color: '#C0392B',
    fontFamily: 'Helvetica-Bold',
    textDecoration: 'underline',
  },
  ctaButton: {
    backgroundColor: '#C0392B',
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 24,
    alignItems: 'center',
    width: '100%',
  },
  ctaButtonText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontFamily: 'Helvetica-Bold',
    textAlign: 'center',
  },
  ctaButtonSub: {
    color: '#FFD5CC',
    fontSize: 9,
    textAlign: 'center',
    marginTop: 3,
  },
  warningCard: {
    backgroundColor: '#FFFBE6',
    borderRadius: 10,
    padding: 16,
    width: '100%',
    borderWidth: 1.5,
    borderColor: '#F5E199',
    marginBottom: 22,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
  },
  warningIcon: {
    fontSize: 18,
    color: '#B7860B',
    marginRight: 10,
    marginTop: 1,
  },
  warningContent: {
    flex: 1,
  },
  warningTitle: {
    fontSize: 11,
    fontFamily: 'Helvetica-Bold',
    color: '#7A5800',
    marginBottom: 4,
  },
  warningText: {
    fontSize: 10,
    color: '#7A5800',
    lineHeight: 1.6,
  },
  whatsappCard: {
    backgroundColor: '#EDFAF1',
    borderRadius: 10,
    padding: 16,
    width: '100%',
    borderWidth: 1.5,
    borderColor: '#A8E6BE',
    marginBottom: 22,
  },
  whatsappTitle: {
    fontSize: 11,
    fontFamily: 'Helvetica-Bold',
    color: '#1A6635',
    marginBottom: 5,
    textAlign: 'center',
  },
  whatsappText: {
    fontSize: 10,
    color: '#1A6635',
    lineHeight: 1.6,
    textAlign: 'center',
    marginBottom: 10,
  },
  whatsappSteps: {
    gap: 4,
  },
  whatsappStep: {
    fontSize: 10,
    color: '#1A6635',
    lineHeight: 1.5,
    paddingLeft: 8,
  },
  footer: {
    paddingTop: 8,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 9,
    color: '#B09080',
    textAlign: 'center',
  },
})

export function AccessPdfDocument() {
  return (
    <Document
      title="Tu Acceso - 150 Recetas de Dulces Brasileños"
      author="150 Recetas de Dulces Brasileños"
    >
      <Page size="A4" style={styles.page}>
        <View style={styles.topBand} />

        <View style={styles.container}>
          {/* Badge */}
          <View style={styles.badge}>
            <Text style={styles.badgeText}>ACCESO CONFIRMADO</Text>
          </View>

          {/* Title */}
          <Text style={styles.titleLarge}>150 Recetas de</Text>
          <Text style={styles.titleAccent}>Dulces Brasileños Virales</Text>
          <View style={styles.divider} />

          {/* Main CTA Card */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>
              Haz clic abajo para acceder a todo tu contenido
            </Text>
            <Text style={styles.cardSubtitle}>
              Todas tus 150 recetas + 5 bonos exclusivos te esperan en el
              siguiente enlace. El acceso es inmediato.
            </Text>

            {/* URL Box */}
            <View style={styles.urlBox}>
              <Text style={styles.urlLabel}>TU ENLACE DE ACCESO</Text>
              <Link src={ACCESS_URL} style={styles.urlText}>
                {ACCESS_URL}
              </Link>
            </View>

            {/* CTA Button */}
            <Link src={ACCESS_URL} style={{ textDecoration: 'none' }}>
              <View style={styles.ctaButton}>
                <Text style={styles.ctaButtonText}>
                  ACCEDER A MIS RECETAS AHORA
                </Text>
                <Text style={styles.ctaButtonSub}>
                  Toca aqui para abrir tu area de miembros
                </Text>
              </View>
            </Link>
          </View>

          {/* Warning */}
          <View style={styles.warningCard}>
            <View style={styles.warningContent}>
              <Text style={styles.warningTitle}>
                ⚠ Importante: Guarda este enlace
              </Text>
              <Text style={styles.warningText}>
                Este es tu enlace de acceso personal. Guarda este PDF o el
                enlace en un lugar seguro para no perder el acceso a tus
                recetas. No compartas este enlace con otras personas.
              </Text>
            </View>
          </View>

          {/* WhatsApp Save */}
          <View style={styles.whatsappCard}>
            <Text style={styles.whatsappTitle}>
              Guarda tu acceso en WhatsApp
            </Text>
            <Text style={styles.whatsappText}>
              La forma mas facil de no perder tu enlace es guardarlo en
              WhatsApp. Sigue estos pasos:
            </Text>
            <View style={styles.whatsappSteps}>
              <Text style={styles.whatsappStep}>
                1. Abre WhatsApp y entra a tus propios mensajes (o crea un
                grupo contigo mismo)
              </Text>
              <Text style={styles.whatsappStep}>
                2. Pega el enlace:{' '}
                <Text style={{ fontFamily: 'Helvetica-Bold' }}>
                  {ACCESS_URL}
                </Text>
              </Text>
              <Text style={styles.whatsappStep}>
                3. Envialo y ya lo tendras guardado siempre en tu telefono
              </Text>
            </View>
          </View>

          {/* Footer */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>
              © 150 Recetas de Dulces Brasileños Virales · Acceso personal
              intransferible
            </Text>
          </View>
        </View>

        <View style={styles.bottomBand} />
      </Page>
    </Document>
  )
}
