import * as React from 'react'
import { Button, Platform, ScrollView, StyleSheet, Text, View } from 'react-native'
import { i18n } from 'example-i18n'
import { I18n } from 'react-i18next'
import { Form } from '~/components/Form'
import exampleModules from 'example-modules'

i18n.init()
const { ns } = i18n.registerTranslations(__filename, require('./App.i18n.json'))

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 30,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
})

type Props = { [K in never]: string }

export default class App extends React.Component<Props> {
  public changeLanguage = () => {
    i18n.changeLanguage(i18n.locale() === 'en' ? 'de' : 'en')
  }

  public render() {
    return (
      <ScrollView testID="welcome" style={{ flex: 1, backgroundColor: '#F5FCFF' }}>
        <View style={styles.container}>
          <Text style={styles.instructions}>{exampleModules}</Text>
          <Text style={styles.welcome}>{i18n.t('welcome')}</Text>
          <I18n ns={ns}>
            {t => (
              <View>
                <Text style={styles.instructions}>{t('get_started')}</Text>
                <Text style={styles.instructions}>
                  {t(Platform.select({ ios: 'instructions_ios', android: 'instructions_android' }))}
                </Text>
                <Button onPress={this.changeLanguage} title={t('common:welcome_btn')} />
              </View>
            )}
          </I18n>
          <Form />
        </View>
      </ScrollView>
    )
  }
}
